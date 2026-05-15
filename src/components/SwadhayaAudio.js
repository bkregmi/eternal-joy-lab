import React, { useState, useRef } from 'react';
import AudioPlayer from './AudioPlayer';

const SwadhayaAudio = () => {
  const [activeTab, setActiveTab] = useState('gita-sanskrit');
  const scrollerRef = useRef(null);

  const scriptures = {
    'gita-sanskrit': { name: 'Bhagawat Gita' },
    'bhagavatam': { name: 'Bhagavatam' }
  };

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="swadhaya-audio">
      <div className="scripture-nav" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        background: '#fff', 
        padding: '10px', 
        margin: '10px 15px',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: '10px',
        zIndex: 100,
        border: '1px solid #f0e6d2'
      }}>
        <button className="btn btn-default" onClick={() => scroll('left')} style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}>&lt;</button>
        
        <div ref={scrollerRef} style={{ 
          display: 'flex', 
          overflowX: 'auto', 
          whiteSpace: 'nowrap', 
          flex: 1, 
          margin: '0 10px',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}>
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {Object.keys(scriptures).map((key) => (
            <button 
              key={key}
              className={`btn ${activeTab === key ? 'btn-primary' : 'btn-default'}`} 
              style={{ 
                marginRight: '10px', 
                flexShrink: 0,
                backgroundColor: activeTab === key ? '#ff9933' : '#fff',
                borderColor: '#ff9933',
                color: activeTab === key ? '#fff' : '#ff9933'
              }}
              onClick={() => setActiveTab(key)}
            >
              {scriptures[key].name}
            </button>
          ))}
        </div>

        <button className="btn btn-default" onClick={() => scroll('right')} style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}>&gt;</button>
      </div>

      <AudioPlayer category={activeTab} />

      <div className="container whiteBG" style={{ margin: '20px 15px', padding: '20px', borderRadius: '15px', border: '1px solid #f0e6d2' }}>
        <p>Explore sacred scriptures through divine audio recordings and chantings.</p>
      </div>
    </div>
  );
};

export default SwadhayaAudio;