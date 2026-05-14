import React, { useState, useEffect } from 'react';
import './PrayerViewer.css';

const SlokaViewer = ({ data, pageTitle }) => {
  const [visibility, setVisibility] = useState({
    sanskrit: true,
    english: false,
    meaning: false
  });

  useEffect(() => {
    if (pageTitle) document.title = pageTitle;
  }, [pageTitle]);

  if (!data || data.length === 0) {
    return <div className="whiteBG" style={{ padding: '20px' }}>No verses available.</div>;
  }

  const toggleVisibility = (key) => {
    setVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const pageStyle = {
    backgroundColor: '#fcfaf5',
    padding: '5px 10px',
    minHeight: '100vh'
  };

  const controlSectionStyle = {
    background: '#fff',
    padding: '5px 10px',
    borderRadius: '12px',
    marginBottom: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    border: '1px solid #f0e6d2'
  };

  const checkboxStyle = {
    cursor: 'pointer',
    fontWeight: 'normal',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '1.1em',
    color: '#555',
    margin: 0
  };

  return (
    <div className="sloka-viewer-page" style={pageStyle}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', float: 'none' }}>
        <div className="row" style={{ margin: 0 }}>
          <div className="col-xs-12 text-center" style={{ marginBottom: '2px', padding: 0 }}>
            <h1 style={{ color: '#c92200', fontSize: '2.2em', fontFamily: "'Georgia', serif", fontWeight: 'bold', marginTop: '0' }}>
              {pageTitle}
            </h1>
            <div style={{ width: '100px', height: '3px', background: '#ff9933', margin: '5px auto' }}></div>
          </div>
        </div>

        <div className="row" style={{ margin: 0 }}>
          <div className="col-xs-12" style={{ padding: 0 }}>
            <div className="controls" style={controlSectionStyle}>
                <label style={checkboxStyle}>
                  <input type="checkbox" style={{ marginRight: '8px' }} checked={visibility.sanskrit} onChange={() => toggleVisibility('sanskrit')} />
                  Sanskrit
                </label>
                <label style={checkboxStyle}>
                  <input type="checkbox" style={{ marginRight: '8px' }} checked={visibility.english} onChange={() => toggleVisibility('english')} />
                  Transliteration
                </label>
                <label style={checkboxStyle}>
                  <input type="checkbox" style={{ marginRight: '8px' }} checked={visibility.meaning} onChange={() => toggleVisibility('meaning')} />
                  Meaning
                </label>
              </div>

            {data.map((item, index) => (
              <article key={item.title || index} className="prayer-item" style={{ marginBottom: '10px', border: 'none' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #ff9933', paddingBottom: '3px', marginBottom: '8px', fontFamily: "'Georgia', serif", fontWeight: 'bold', fontSize: '1.5em' }}>
                  {item.title}
                </h2>
                {item.slokas.map((sloka, sIdx) => (
                  <div key={`${item.title}-sloka-${sloka.id}-${sIdx}`} className="sloka-container" style={{ 
                    background: '#fff',
                    padding: '10px 10px',
                    borderRadius: '15px',
                    marginBottom: '5px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    fontFamily: "'Georgia', serif",
                    border: 'none', // Removed the internal border
                    borderLeft: '6px solid #ff9933' // Reinstated saffron border
                  }}>
                    {visibility.sanskrit && sloka.sanskrit && (
                      <div className="sanskrit" style={{ fontSize: '1.1em', color: '#c92200', textAlign: 'center', marginBottom: '3px', lineHeight: '1.4', fontWeight: 'bold' }}>
                        {sloka.sanskrit.map((line, idx) => (
                          <p key={idx} style={{ margin: '1px 0', fontSize: '1.1em' }}>{line}</p>
                        ))}
                      </div>
                    )}
                    {visibility.english && sloka.english && (
                      <div className="english" style={{ fontStyle: 'italic', textAlign: 'center', color: '#7f8c8d', marginBottom: '3px', fontSize: '1.0em' }}>
                        {sloka.english.map((line, idx) => (
                          <p key={idx} style={{ margin: '1px 0', fontSize: '0.95em' }}>{line}</p>
                        ))}
                      </div>
                    )}
                    {visibility.meaning && sloka.meaning && (
                      <div className="meaning" style={{ borderTop: '1px solid #eee', paddingTop: '3px', color: '#444', lineHeight: '1.4', fontSize: '0.9em' }}>
                        <p><strong style={{ color: '#c92200' }}>Meaning:</strong> {sloka.meaning}</p>
                      </div>
                    )}
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlokaViewer;