import React, { useState, useRef, useEffect, useMemo } from 'react';
import trackData from '../data/tracks.json';
import './AudioPlayer.css';
const AudioPlayer = ({ category }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [activePlaylist, setActivePlaylist] = useState([]);
  const [activeYoutubeId, setActiveYoutubeId] = useState(null);
  const audioRef = useRef(null);
  
  // Helper to extract YouTube ID from various URL formats
  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Handle nested structure for Bhagavatam vs flat for Gita
  const rawData = trackData[category] || [];
  
  // Dynamically check if data is grouped (like Bhagavatam) or flat (like Gita)
  const isGrouped = useMemo(() => {
    return rawData.length > 0 && rawData[0].group && Array.isArray(rawData[0].tracks);
  }, [rawData]);

  const allTracks = useMemo(() => {
    return isGrouped 
      ? rawData.flatMap(group => group.tracks) 
      : rawData;
  }, [category, rawData]);

  // Automatically set the playlist queue when the category changes
  useEffect(() => {
    setActivePlaylist(allTracks);
    setCurrentTrackIndex(0);
  }, [allTracks]);

  // Effect to handle playback when track or playlist changes
  useEffect(() => {
    if (audioRef.current && activePlaylist.length > 0 && activePlaylist[currentTrackIndex]) {
      audioRef.current.load(); // Required for .m4a and dynamic source changes
    }
  }, [currentTrackIndex, activePlaylist]);

  const playTrack = (index, playlist = allTracks) => {
    setActivePlaylist(playlist);
    setCurrentTrackIndex(index);
    if (audioRef.current) audioRef.current.load(); // Prepare the new source immediately
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
        <div className="col-md-12">
          <div id="player" style={{ 
            background: '#fffcf5', 
            padding: '30px', 
            borderRadius: '20px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid #f0e6d2'
          }}>
            <h1 style={{ color: '#c92200', fontFamily: "'Georgia', serif", fontWeight: 'bold', textAlign: 'center', textTransform: 'capitalize', borderBottom: '2px solid #ff9933', paddingBottom: '15px' }}>
              🕉️ {category.replace(/-/g, ' ')} 🕉️
            </h1>
            
            {activeYoutubeId && (
              <div className="youtube-container" style={{ marginBottom: '20px', textAlign: 'center' }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                  <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <button 
                  className="btn btn-default btn-sm" 
                  style={{ marginTop: '10px' }}
                  onClick={() => setActiveYoutubeId(null)}
                >
                  Close Video
                </button>
              </div>
            )}

            <div className="now-playing" style={{ 
              textAlign: 'center', 
              margin: '20px 0', 
              padding: '15px', 
              backgroundColor: '#fff', 
              borderRadius: '10px', 
              borderLeft: '5px solid #ff9933',
              fontFamily: "'Georgia', serif"
            }}>
              <div style={{ color: '#777', fontSize: '0.9em', fontStyle: 'italic' }}>Now Chanting:</div>
              <div style={{ color: '#333', fontSize: '1.3em', fontWeight: 'bold' }}>{currentTrack?.name || 'Select a track'}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <audio 
                id="audio"
                ref={audioRef} 
                controls 
                autoPlay
                src={currentTrack?.path}
                style={{ width: '100%', maxWidth: '600px' }}
                onError={(e) => console.error("Audio Load Error. Tried path:", currentTrack?.path)}
                onEnded={() => {
                  if (currentTrackIndex < activePlaylist.length - 1) {
                    playTrack(currentTrackIndex + 1, activePlaylist);
                  }
                }}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
            
            <div className="controls" style={{ textAlign: 'center', marginBottom: '30px' }}>
              <style>{`
                .player-btn { background: #ff9933; color: white; border: none; padding: 10px 20px; margin: 5px; border-radius: 25px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .player-btn:hover { background: #e68a00; transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0,0,0,0.15); }
                .player-btn:disabled { background: #ccc; cursor: not-allowed; transform: none; box-shadow: none; }
                .track-row { padding: 10px; border-radius: 8px; transition: background 0.2s; border-bottom: 1px solid #f9f4e8; display: flex; align-items: center; }
                .track-row:hover { background: #fff5e6; }
                .track-row.active { background: #ffefe0; border-left: 4px solid #ff9933; }
              `}</style>
              <button id="first" className="player-btn" onClick={() => playTrack(0, allTracks)}>&lt;&lt;</button>
              <button id="prev" className="player-btn" onClick={() => playTrack(Math.max(0, currentTrackIndex - 1), activePlaylist)}>&lt;</button>
              <button id="next" className="player-btn" onClick={() => playTrack(Math.min(activePlaylist.length - 1, currentTrackIndex + 1), activePlaylist)}>&gt;</button>
              <button id="last" className="player-btn" onClick={() => playTrack(allTracks.length - 1, allTracks)}>&gt;&gt;</button>
              <button id="allSongs" className="player-btn" onClick={() => playTrack(0, allTracks)}>Play All</button>
              <button id="selectedSongs" className="player-btn" onClick={() => playTrack(0, selectedTracks)} disabled={selectedTracks.length === 0}>Play Selected</button>
            </div>

            <div id="songs">
              <button className="player-btn" style={{ display: showPlaylist ? 'none' : 'inline-block', marginBottom: '15px' }} onClick={() => setShowPlaylist(true)}>
                Show Songs
              </button>
              <button className="player-btn" style={{ display: showPlaylist ? 'inline-block' : 'none', marginBottom: '15px' }} onClick={() => setShowPlaylist(false)}>
                Hide Songs
              </button>

              <div id="playlist1" style={{ display: showPlaylist ? 'block' : 'none' }}>
                {isGrouped ? (
                  rawData.map((group, gIdx) => (
                    <div key={gIdx} className="mp3-group" style={{ marginBottom: '20px' }}>
                      <h2 style={{ color: '#8b4513', fontSize: '1.2em', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '10px' }}>{group.group}</h2>
                      {group.tracks.map((track, tIdx) => (
                        <div key={tIdx} className={`track-row ${currentTrack?.path === track.path ? 'active' : ''}`}>
                          <input 
                            type="checkbox" 
                            style={{ marginRight: '10px' }}
                            value={track.path}
                            checked={selectedTracks.some(t => t.path === track.path)}
                            onChange={() => handleCheckboxChange(track)}
                          />
                          <span 
                            style={{ 
                              cursor: 'pointer', 
                              fontWeight: currentTrack?.path === track.path ? 'bold' : 'normal',
                              color: currentTrack?.path === track.path ? '#c92200' : 'inherit'
                            }}
                            onClick={() => playTrack(allTracks.findIndex(t => t.path === track.path), allTracks)}
                          >
                            {currentTrack?.path === track.path && <span style={{ marginRight: '8px' }}>🪔</span>}
                            {track.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="mp3-list">
                    {allTracks.map((track, index) => (
                      <div key={index} className={`track-row ${currentTrack?.path === track.path ? 'active' : ''}`}>
                        <input 
                          type="checkbox" 
                          style={{ marginRight: '10px' }}
                          value={track.path}
                          checked={selectedTracks.some(t => t.path === track.path)}
                          onChange={() => handleCheckboxChange(track)}
                        />
                        <span 
                          style={{ 
                            cursor: 'pointer', 
                            fontWeight: currentTrack?.path === track.path ? 'bold' : 'normal'
                          }}
                          onClick={() => playTrack(index, allTracks)}
                        >
                          {currentTrack?.path === track.path && <span style={{ marginRight: '8px' }}>🪔</span>}
                          {track.name}
                        </span>
                        {track.youtubeLink && (
                          <button 
                            className="btn btn-link btn-xs"
                            style={{ color: '#FF0000', textDecoration: 'none', marginLeft: 'auto', padding: 0 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (audioRef.current) audioRef.current.pause();
                              setActiveYoutubeId(getYoutubeId(track.youtubeLink));
                            }}
                          >
                            &#x25BA; Watch
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
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
