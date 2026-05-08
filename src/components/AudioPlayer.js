import React, { useState, useRef, useEffect, useMemo } from 'react';
import trackData from '../data/tracks.json';
import './AudioPlayer.css';
const AudioPlayer = ({ category }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [activePlaylist, setActivePlaylist] = useState([]);
  const audioRef = useRef(null);
  
  // Handle nested structure for Bhagavatam vs flat for Gita
  const rawData = trackData[category] || [];
  const allTracks = useMemo(() => {
    return category === 'bhagavatam' 
      ? rawData.flatMap(group => group.tracks) 
      : rawData;
  }, [category, rawData]);

  // Effect to handle playback when track or playlist changes
  useEffect(() => {
    if (audioRef.current && activePlaylist.length > 0 && activePlaylist[currentTrackIndex]) {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    }
  }, [currentTrackIndex, activePlaylist]);

  const playTrack = (index, playlist = allTracks) => {
    setActivePlaylist(playlist);
    setCurrentTrackIndex(index);
  };

  const handleCheckboxChange = (track) => {
    setSelectedTracks(prev => {
      const exists = prev.some(t => t.path === track.path);
      return exists ? prev.filter(t => t.path !== track.path) : [...prev, track];
    });
  };

  const currentTrack = activePlaylist[currentTrackIndex] || allTracks[0];

  return (
    <div className="audio-player-page">
      <div className="row">
        <div className="col-md-12 whiteBG">
          <div id="player">
            {category === 'bhagavatam' ? (
              <h4 className="sh3">Srimad Bhagawatam</h4>
            ) : (
              <h1>Srimad Bhagawat Gita(Sanskrit Slokas)</h1>
            )}
            
            <audio 
              id="audio"
              ref={audioRef} 
              controls 
              autoPlay
              src={currentTrack?.path}
              onEnded={() => {
                if (currentTrackIndex < activePlaylist.length - 1) {
                  playTrack(currentTrackIndex + 1, activePlaylist);
                }
              }}
            >
              Your browser does not support the audio element.
            </audio>
            
            <div className="controls">
              <button id="first" className="myButton" onClick={() => playTrack(0, allTracks)}>&lt;&lt;</button>
              <button id="prev" className="myButton" onClick={() => playTrack(Math.max(0, currentTrackIndex - 1), activePlaylist)}>&lt;</button>
              <button id="next" className="myButton" onClick={() => playTrack(Math.min(activePlaylist.length - 1, currentTrackIndex + 1), activePlaylist)}>&gt;</button>
              <button id="last" className="myButton" onClick={() => playTrack(allTracks.length - 1, allTracks)}>&gt;&gt;</button>
              <button id="allSongs" className="myButton" onClick={() => playTrack(0, allTracks)}>Play All</button>
              <button id="selectedSongs" className="myButton" onClick={() => playTrack(0, selectedTracks)} disabled={selectedTracks.length === 0}>Play Selected</button>
            </div>

            <div id="songs">
              <button id="showSongs" className="myButton" style={{ display: showPlaylist ? 'none' : 'inline-block' }} onClick={() => setShowPlaylist(true)}>
                Show Songs
              </button>
              <button id="hideSongs" className="myButton" style={{ display: showPlaylist ? 'inline-block' : 'none' }} onClick={() => setShowPlaylist(false)}>
                Hide Songs
              </button>

              <div id="playlist1" style={{ display: showPlaylist ? 'block' : 'none' }}>
                {category === 'bhagavatam' ? (
                  rawData.map((group, gIdx) => (
                    <span key={gIdx} className="mp3">
                      <h2>{group.group}</h2>
                      {group.tracks.map((track, tIdx) => (
                        <div key={tIdx}>
                          <input 
                            type="checkbox" 
                            value={track.path}
                            checked={selectedTracks.some(t => t.path === track.path)}
                            onChange={() => handleCheckboxChange(track)}
                          />
                          <span 
                            style={{ cursor: 'pointer', color: currentTrack?.path === track.path ? 'white' : '' }}
                            onClick={() => playTrack(allTracks.findIndex(t => t.path === track.path), allTracks)}
                          >
                            {track.name}
                          </span>
                        </div>
                      ))}
                    </span>
                  ))
                ) : (
                  <span className="mp3">
                    {allTracks.map((track, index) => (
                      <div key={index}>
                        <input 
                          type="checkbox" 
                          value={track.path}
                          checked={selectedTracks.some(t => t.path === track.path)}
                          onChange={() => handleCheckboxChange(track)}
                        />
                        <span 
                          style={{ cursor: 'pointer', color: currentTrack?.path === track.path ? 'white' : '' }}
                          onClick={() => playTrack(index, allTracks)}
                        >
                          {track.name}
                        </span>
                      </div>
                    ))}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
