const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'tracks.json');
const audioRoot = path.join(__dirname, '../../public/media/audio');

const formatName = (fileName) => {
  const base = fileName.replace(/\.[^/.]+$/, ""); // Remove extension
  const parts = base.split('_'); // Split logical segments (Source_Title_Artist)

  const toTitleCase = (str) => {
    return str
      .split('-')
      .filter(word => !!word)
      .map(word => {
        const upper = word.toUpperCase();
        // Keep specific acronyms in uppercase
        if (['JKP', 'EJL', 'JPK', 'ELJ', 'SB'].includes(upper)) return upper;
        // Capitalize first letter of every word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ')
      .trim();
  };

  const formattedParts = parts.map(toTitleCase);

  if (formattedParts.length >= 3) {
    // Result format: Title - Artist (Source)
    return `${formattedParts[1]} - ${formattedParts[2]} (${formattedParts[0]})`;
  } else if (formattedParts.length === 2) {
    // Result format: Source - Title
    return `${formattedParts[0]} - ${formattedParts[1]}`;
  }
  return formattedParts[0];
};

// Folders with unique internal structures to skip auto-generation
const skipFolders = ['SriMadBhagwatGita', 'SriMadBhagawatam'];

const updatePlaylists = () => {
  if (!fs.existsSync(audioRoot)) return;
  const trackData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const folders = fs.readdirSync(audioRoot, { withFileTypes: true })
    .filter(d => d.isDirectory() && !skipFolders.includes(d.name))
    .map(d => d.name);

  folders.forEach(folder => {
    const category = folder.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
    const files = fs.readdirSync(path.join(audioRoot, folder)).filter(f => /\.(m4a|mp3)$/i.test(f));
    trackData[category] = files.map(f => ({ name: formatName(f), path: `/media/audio/${folder}/${f}` }));
    console.log(`✓ Synced ${folder} -> ${category}`);
  });
  fs.writeFileSync(jsonPath, JSON.stringify(trackData, null, 2) + '\n');
};

updatePlaylists();