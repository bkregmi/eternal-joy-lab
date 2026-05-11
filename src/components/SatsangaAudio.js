import React from 'react';
import AudioPlayer from './AudioPlayer';

const SatsangaAudio = () => {
  return (
    <div className="satsanga-audio-page">
      <AudioPlayer category="satsanga" />
      <div className="container whiteBG" style={{ marginTop: '20px', padding: '20px' }}>
        <p>Listen to recordings from our Saturday Satsanga sessions.</p>
      </div>
    </div>
  );
};

export default SatsangaAudio;