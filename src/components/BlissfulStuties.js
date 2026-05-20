import React, { useState, useRef } from 'react';
import SlokaViewer from './SlokaViewer';
import stutiesData from '../data/blissful-stuties.json';
import ramStutiData from '../data/ram-stuti.json';

const BlissfulStuties = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showRamStuti, setShowRamStuti] = useState(false);
  const scrollerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="blissful-stuties">
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
          {stutiesData.map((item, index) => (
            <button 
              key={index}
              className={`btn ${activeIndex === index && !showRamStuti ? 'btn-primary' : 'btn-default'}`} 
              style={{ 
                marginRight: '10px', 
                flexShrink: 0,
                backgroundColor: activeIndex === index && !showRamStuti ? '#ff9933' : '#fff',
                borderColor: '#ff9933',
                color: activeIndex === index && !showRamStuti ? '#fff' : '#ff9933'
              }}
              onClick={() => { setActiveIndex(index); setShowRamStuti(false); }}
            >
              {item.title}
            </button>
          ))}
          <button
            className={`btn ${showRamStuti ? 'btn-primary' : 'btn-default'}`}
            style={{
              marginRight: '10px',
              flexShrink: 0,
              backgroundColor: showRamStuti ? '#ff9933' : '#fff',
              borderColor: '#ff9933',
              color: showRamStuti ? '#fff' : '#ff9933'
            }}
            onClick={() => setShowRamStuti(true)}
          >
            Ram Stuti
          </button>
        </div>

        <button className="btn btn-default" onClick={() => scroll('right')} style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}>&gt;</button>
      </div>

      <SlokaViewer 
        data={showRamStuti ? ramStutiData : [stutiesData[activeIndex]]} 
        pageTitle={showRamStuti ? 'Ram Stuti' : 'Blissful Stuties'} 
      />
    </div>
  );
};

export default BlissfulStuties;