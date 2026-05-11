import React from 'react';
import AudioPlayer from './AudioPlayer';

const PersonalAudio = () => {
  return (
    <div className="personal-audio-page">
      <AudioPlayer category="personal" />
      <div className="container whiteBG" style={{ marginTop: '20px', padding: '20px' }}>
        <p>Access your personal audio recordings and practice sessions.</p>
      </div>
    </div>
  );
};

export default PersonalAudio;