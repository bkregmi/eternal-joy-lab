import React from 'react';
import AudioPlayer from './AudioPlayer';

const GitaSanskrit = () => {
  return (
    <div className="gita-sanskrit-page">
      {/* This category matches the key in tracks.json */}
      <AudioPlayer category="gita-sanskrit" />
      <div className="container whiteBG" style={{ marginTop: '20px', padding: '20px' }}>
        <p>Listen to the original Sanskrit Slokas of Srimad Bhagwat Gita.</p>
      </div>
    </div>
  );
};

export default GitaSanskrit;