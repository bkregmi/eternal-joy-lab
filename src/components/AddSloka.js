import React, { useState } from 'react';
import { useAuth } from '../data/AuthContext';

const AddSloka = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState('daily-prayers');
  const [title, setTitle] = useState('');
  const [sanskrit, setSanskrit] = useState('');
  const [english, setEnglish] = useState('');
  const [meaning, setMeaning] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [generatedJson, setGeneratedJson] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Saving...' });

    // Prepare the data structure to match your existing JSON format
    const newEntry = {
      title: title.trim(),
      slokas: [
        {
          id: Date.now(),
          sanskrit: sanskrit.split('\n').filter(line => line.trim() !== ''),
          english: english.split('\n').filter(line => line.trim() !== ''),
          meaning: meaning.trim()
        }
      ]
    };

    const jsonString = JSON.stringify(newEntry, null, 2);
    setGeneratedJson(jsonString);

    // If the user is authenticated, attempt to push directly to GitHub via the API Bridge
    if (user) {
      try {
        setStatus({ type: 'info', message: 'Syncing with GitHub repository...' });
        const response = await fetch('https://mr36ku54ql.execute-api.us-east-1.amazonaws.com/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            filePath: `src/data/${category}.json`, 
            newEntry: newEntry 
          })
        });

        if (response.ok) {
          setStatus({ type: 'success', message: 'Success! Sloka committed to GitHub. Changes will appear in a few minutes.' });
        } else {
          throw new Error('Sync failed');
        }
      } catch (err) {
        setStatus({ type: 'danger', message: 'Auto-sync failed. Please manually add the JSON snippet below.' });
      }
    } else {
      setStatus({ type: 'success', message: 'JSON Generated! Copy the code below and add it to your data file.' });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJson);
    setStatus({ type: 'info', message: 'Copied to clipboard!' });
  };

  return (
    <div className="container whiteBG" style={{ marginTop: '20px', padding: '30px', borderRadius: '15px' }}>
      <h2 style={{ color: '#c92200', borderBottom: '2px solid #ff9933', paddingBottom: '10px' }}>Contribute Sloka</h2>
      
      {status.message && (
        <div className={`alert alert-${status.type}`}>{status.message}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Target Category (JSON File)</label>
          <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="daily-prayers">Daily Prayers</option>
            <option value="blissful-stuties">Blissful Stuties</option>
            <option value="invokation-slokas">Invocation Slokas</option>
            <option value="bhajans">Nepali Bhajans</option>
          </select>
        </div>

        <div className="form-group">
          <label>Sloka Title</label>
          <input 
            type="text" 
            className="form-control" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. Guru Ashtakam"
            required 
          />
        </div>

        <div className="form-group">
          <label>Sanskrit Verses (One line per verse)</label>
          <textarea 
            className="form-control" 
            rows="5" 
            value={sanskrit} 
            onChange={(e) => setSanskrit(e.target.value)}
            placeholder="Enter Sanskrit lines..."
            required
          />
        </div>

        <div className="form-group">
          <label>English Transliteration (One line per verse)</label>
          <textarea 
            className="form-control" 
            rows="5" 
            value={english} 
            onChange={(e) => setEnglish(e.target.value)}
            placeholder="Enter English lines..."
          />
        </div>

        <div className="form-group">
          <label>Meaning</label>
          <textarea 
            className="form-control" 
            rows="3" 
            value={meaning} 
            onChange={(e) => setMeaning(e.target.value)}
            placeholder="Enter the translation..."
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#ff9933', borderColor: '#ff9933', borderRadius: '20px', padding: '10px 25px' }}>
          Generate JSON
        </button>
      </form>

      {generatedJson && (
        <div style={{ marginTop: '30px' }}>
          <h4 style={{ color: '#c92200' }}>Generated Snippet:</h4>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '8px', overflowX: 'auto' }}>
            {generatedJson}
          </pre>
          <button className="btn btn-info" onClick={copyToClipboard} style={{ marginTop: '10px' }}>
            Copy to Clipboard
          </button>
        </div>
      )}
      
    </div>
  );
};

export default AddSloka;