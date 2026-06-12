import React, { useState } from 'react';
import { useAuth } from '../data/AuthContext';

const MediaManager = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState('personal');
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [generatedJson, setGeneratedJson] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const entry = {
      name: name.trim(),
      path: path.trim() || (youtubeLink ? "" : "/media/audio/default.mp3"),
      ...(youtubeLink && { youtubeLink: youtubeLink.trim() })
    };

    const jsonString = JSON.stringify(entry, null, 2);
    setGeneratedJson(jsonString);

    if (user) {
      try {
        const response = await fetch('https://mr36ku54ql.execute-api.us-east-1.amazonaws.com/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            filePath: 'src/data/manual_tracks.json', 
            newEntry: entry,
            category: category,
            type: 'object-merge'
          })
        });
        if (response.ok) {
          alert('✅ Media entry committed! Site will update shortly.');
          setName(''); setPath(''); setYoutubeLink('');
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error("API Error Response:", errorData);
        }
      } catch (err) {
        console.error('Sync Connection Error:', err);
      }
    }
  };

  return (
    <div className="container whiteBG" style={{ marginTop: '20px', padding: '30px', borderRadius: '15px' }}>
      <h2 style={{ color: '#c92200', borderBottom: '2px solid #ff9933', paddingBottom: '10px' }}>Media Manager</h2>
      <p className="text-muted">Generate entries for your <code>manual_tracks.json</code> file.</p>

      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Category</label>
              <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="personal">Personal Audio</option>
                <option value="satsanga">Satsanga</option>
                <option value="gita-sanskrit">Gita Sanskrit</option>
                <option value="nepali-bhajans">Nepali Bhajans</option>
              </select>
            </div>

            <div className="form-group">
              <label>Track Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="e.g. Evening Meditation"
                required 
              />
            </div>

            <div className="form-group">
              <label>Local Path (Relative to Public)</label>
              <input 
                type="text" 
                className="form-control" 
                value={path} 
                onChange={(e) => setPath(e.target.value)} 
                placeholder="/media/audio/personal/track1.mp3"
              />
              <small className="text-info">Leave empty if using only YouTube.</small>
            </div>

            <div className="form-group">
              <label>YouTube Link (Optional)</label>
              <input 
                type="url" 
                className="form-control" 
                value={youtubeLink} 
                onChange={(e) => setYoutubeLink(e.target.value)} 
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#ff9933', borderColor: '#ff9933' }}>
              Generate Entry
            </button>
          </form>
        </div>

        <div className="col-md-6">
          {generatedJson && (
            <div className="panel panel-info">
              <div className="panel-heading">JSON Snippet</div>
              <div className="panel-body">
                <pre style={{ fontSize: '0.85em' }}>{generatedJson}</pre>
                <button 
                  className="btn btn-default btn-sm"
                  onClick={() => navigator.clipboard.writeText(generatedJson)}
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="alert alert-warning" style={{ marginTop: '30px' }}>
        <h4>Engineering Note:</h4>
        <p>Since this is a static site, you must manually move your <code>.mp3</code> or <code>.mp4</code> files into the <code>public/media/audio/</code> folder in your repository, then run <code>node src/data/generate-playlist.js</code> to rebuild the library.</p>
      </div>
    </div>
  );
};

export default MediaManager;