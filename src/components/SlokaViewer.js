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

  return (
    <div className="sloka-viewer-page">
      <div className="row">
        <div className="col-md-12 whiteBG">
          <section style={{ padding: '10px' }}>
            <h2>{pageTitle}</h2>
            <div className="controls">
              <label>
                <input type="checkbox" checked={visibility.sanskrit} onChange={() => toggleVisibility('sanskrit')} />
                Sanskrit
              </label>
              <label>
                <input type="checkbox" checked={visibility.english} onChange={() => toggleVisibility('english')} />
                English
              </label>
              <label>
                <input type="checkbox" checked={visibility.meaning} onChange={() => toggleVisibility('meaning')} />
                Meaning
              </label>
            </div>

            {data.map((item, index) => (
              <article key={item.title || index} className="prayer-item">
                <h4 className="sh3">{item.title}</h4>
                {item.slokas.map((sloka, sIdx) => (
                  <div key={`${item.title}-sloka-${sloka.id}-${sIdx}`} className="sloka-container" style={{ marginBottom: '20px' }}>
                    {visibility.sanskrit && sloka.sanskrit && (
                      <div className="sanskrit" style={{ fontWeight: 'bold', color: '#c92200' }}>
                        {sloka.sanskrit.map((line, idx) => (
                          <p key={idx} style={{ margin: '2px 0' }}>{line}</p>
                        ))}
                      </div>
                    )}
                    {visibility.english && sloka.english && (
                      <div className="english" style={{ fontStyle: 'italic', margin: '5px 0' }}>
                        {sloka.english.map((line, idx) => (
                          <p key={idx} style={{ margin: '2px 0' }}>{line}</p>
                        ))}
                      </div>
                    )}
                    {visibility.meaning && typeof sloka.meaning === 'string' && (
                      <div className="meaning" style={{ marginTop: '5px', color: '#333' }}>
                        <p><strong>Meaning:</strong> {sloka.meaning}</p>
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