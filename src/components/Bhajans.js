import React from 'react';
import bhajans from '../data/bhajans.json';
import AudioPlayer from './AudioPlayer';

const Bhajans = () => {
  return (
    <div className="bhajans-page">
      {/* Integrating the AudioPlayer directly prevents the iframe nesting issue */}
      <AudioPlayer category="nepali-bhajans" />
      
      <div className="container whiteBG" style={{ marginTop: '20px', padding: '20px' }}>
      {bhajans.map((bhajan, index) => (
        <div key={index} className="bhajan-section">
          <h2>{bhajan.title}</h2>
          {bhajan.slokas.map((sloka) => (
            <div key={sloka.id} className="sloka">
              {sloka.sanskrit.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {sloka.meaning && (
                <p className="meaning"><em>{sloka.meaning}</em></p>
              )}
            </div>
          ))}
          <hr />
        </div>
      ))}
      </div>
    </div>
  );
};

export default Bhajans;