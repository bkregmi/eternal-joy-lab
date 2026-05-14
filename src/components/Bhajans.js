import React from 'react';
import bhajans from '../data/bhajans.json';
import AudioPlayer from './AudioPlayer';

const Bhajans = () => {
  return (
    <div className="bhajans-page" style={{ backgroundColor: '#fcfaf5', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Integrating the AudioPlayer directly prevents the iframe nesting issue */}
      <AudioPlayer category="nepali-bhajans" />
      
      <div className="container" style={{ marginTop: '30px' }}>
        {bhajans.map((bhajan, index) => (
          <div key={index} className="bhajan-section" style={{ 
            background: '#fff', 
            padding: '35px', 
            borderRadius: '20px', 
            marginBottom: '40px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: 'none',
            borderTop: '6px solid #ff9933'
          }}>
            <h2 style={{ color: '#c92200', textAlign: 'center', fontFamily: "'Georgia', serif", marginBottom: '30px', fontWeight: 'bold' }}>
              {bhajan.title}
            </h2>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              {bhajan.slokas.map((sloka) => (
                <div key={sloka.id} className="sloka" style={{ marginBottom: '30px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25em', color: '#333', lineHeight: '1.8', marginBottom: '12px' }}>
                    {sloka.sanskrit.map((line, i) => (
                      <p key={i} style={{ margin: '2px 0' }}>{line}</p>
                    ))}
                  </div>
                  {sloka.meaning && (
                    <div className="meaning" style={{ fontStyle: 'italic', color: '#777', marginTop: '15px', borderTop: '1px dashed #eee', paddingTop: '10px' }}>
                      "{sloka.meaning}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bhajans;