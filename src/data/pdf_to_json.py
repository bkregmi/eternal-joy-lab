import json
import re
from pathlib import Path

try:
    from PyPDF2 import PdfReader
except ImportError:
    print("Please install PyPDF2: pip install PyPDF2")
    exit(1)

# Optional: for IAST transliteration
try:
    from indic_transliteration.sanscript import transliterate, DEVANAGARI, IAST
    has_transliterator = True
except ImportError:
    has_transliterator = False
    print("IAST transliteration will be skipped. Install indic-transliteration for this feature.")

PDF_PATH = "Sri_Vishnu_Sahasranama_Stotram.pdf"
OUTPUT_JSON = "vishnu-sahasranama.json"

# 1. Extract text from PDF
def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

# 2. Split into verses (simple heuristic: double newlines or numbered)
def split_verses(text):
    # Try to split by verse numbers (e.g., 1., 2., ... or ॥ १॥)
    # This regex may need adjustment based on actual PDF formatting
    verses = re.split(r"\n+॥?\s*\d+\s*॥?\n+", text)
    # Remove empty and whitespace-only entries
    verses = [v.strip() for v in verses if v.strip()]
    return verses

# 3. Build JSON structure
def build_json(verses):
    data = []
    for idx, verse in enumerate(verses, 1):
        sanskrit = verse
        english = ""  # Placeholder for IAST
        meaning = ""  # Placeholder for meaning
        if has_transliterator:
            try:
                english = transliterate(sanskrit, DEVANAGARI, IAST)
            except Exception:
                english = ""
        data.append({
            "id": idx,
            "sanskrit": sanskrit,
            "english": english,
            "meaning": meaning
        })
    return data

if __name__ == "__main__":
    pdf_file = Path(PDF_PATH)
    if not pdf_file.exists():
        print(f"PDF file not found: {PDF_PATH}")
        exit(1)
    text = extract_text_from_pdf(pdf_file)
    verses = split_verses(text)
    json_data = build_json(verses)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)
    print(f"Extracted {len(json_data)} verses to {OUTPUT_JSON}")
