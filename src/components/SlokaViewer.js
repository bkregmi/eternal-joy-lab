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
    padding: '20px',
    minHeight: '100vh'
  };

  const controlSectionStyle = {
    background: '#fff',
    padding: '15px',
    borderRadius: '12px',
    marginBottom: '30px',
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
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <section style={{ padding: '20px' }}>
            <h1 className="text-center" style={{ color: '#c92200', fontFamily: "'Georgia', serif", marginBottom: '30px', fontWeight: 'bold' }}>
              {pageTitle}
            </h1>
            
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
              <article key={item.title || index} className="prayer-item" style={{ marginBottom: '40px', border: 'none' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #ff9933', paddingBottom: '10px', marginBottom: '25px', fontFamily: "'Georgia', serif" }}>
                  {item.title}
                </h2>
                {item.slokas.map((sloka, sIdx) => (
                  <div key={`${item.title}-sloka-${sloka.id}-${sIdx}`} className="sloka-container" style={{ 
                    background: '#fff',
                    padding: '25px',
                    borderRadius: '15px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 15px rgba(0,0,0,0.04)',
                    border: 'none', // Removed the internal border
                    borderLeft: '6px solid #ff9933' // Reinstated saffron border
                  }}>
                    {visibility.sanskrit && sloka.sanskrit && (
                      <div className="sanskrit" style={{ fontSize: '1.4em', color: '#c92200', textAlign: 'center', marginBottom: '15px', lineHeight: '1.8', fontWeight: 'bold' }}>
                        {sloka.sanskrit.map((line, idx) => (
                          <p key={idx} style={{ margin: '2px 0' }}>{line}</p>
                        ))}
                      </div>
                    )}
                    {visibility.english && sloka.english && (
                      <div className="english" style={{ fontStyle: 'italic', textAlign: 'center', color: '#7f8c8d', marginBottom: '15px', fontSize: '1.1em' }}>
                        {sloka.english.map((line, idx) => (
                          <p key={idx} style={{ margin: '2px 0' }}>{line}</p>
                        ))}
                      </div>
                    )}
                    {visibility.meaning && sloka.meaning && (
                      <div className="meaning" style={{ borderTop: '1px solid #eee', paddingTop: '15px', color: '#444', lineHeight: '1.6' }}>
                        <p><strong style={{ color: '#c92200' }}>Meaning:</strong> {sloka.meaning}</p>
                      </div>
                    )}
                  </div>
                ))}
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SlokaViewer;