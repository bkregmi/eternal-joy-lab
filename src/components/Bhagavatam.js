import React from 'react';
import AudioPlayer from './AudioPlayer';

const Bhagavatam = () => {
  return (
    <div className="bhagavatam-page">
      {/* The AudioPlayer handles the nested Skandha/Group structure automatically */}
      <AudioPlayer category="bhagavatam" />
      <div className="container whiteBG" style={{ marginTop: '20px', padding: '20px' }}>
        <p>Explore the divine nectar of Srimad Bhagavatam organized by Skandhas.</p>
      </div>
    </div>
  );
};

export default Bhagavatam;