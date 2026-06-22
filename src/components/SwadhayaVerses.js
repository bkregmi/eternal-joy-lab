import React, { useState, useRef, useMemo } from 'react';
import SlokaViewer from './SlokaViewer';
import gopiGeet from '../data/gopi-geet.json';
import govindaAdipurusha from '../data/govinda-adipurusha.json';
import gitaDhyanam from '../data/gita-dhyanam.json';
import gitaVerses from '../data/gita-selected-verses.json';
import guruStotram from '../data/guru-stotram.json';
import hanumanChalisa from '../data/hanuman-chalisa.json';
import ramStuti from '../data/ram-stuti.json';
import vishnuSahasranamam from '../data/vishnu-sahasranama.json';
import gopalSahasranamam from '../data/gopal-sahastranam.json';
const SwadhayaVerses = () => {
  const [activeTab, setActiveTab] = useState('gita');
  const scrollerRef = useRef(null);

  const scriptures = useMemo(() => ({
    'gita': { 
      name: 'Bhagawat Gita', 
      data: [...gitaDhyanam, ...gitaVerses /* , ...anotherGitaFile */], 
      title: 'Srimad Bhagawat Gita Verses' 
    },
    'bhagavatam': { 
      name: 'Bhagavatam', 
      data: [...gopiGeet, ...govindaAdipurusha], 
      title: 'Srimad Bhagavatam Verses' 
    },
    'guru-stotram': {
      name: 'Guru Stotram',
      data: guruStotram,
      title: 'Shri Guru Stotram'
    },
    'hanuman-chalisa': {
      name: 'Hanuman Chalisa',
      data: [...hanumanChalisa, ...ramStuti],
      title: 'Hanuman Chalisa'
    },
    'vishnu-sahasranamam': {
      name: 'Vishnu Sahasranamam',
      data: vishnuSahasranamam,
      title: 'Vishnu Sahasranamam'
    },
    'gopal-sahasranamam': {
      name: 'Gopal  Sahasranamam',
      data: gopalSahasranamam,
      title: 'Gopal Sahasranamam'
    }
  }), []);

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="swadhaya-verses">
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
        <button className="btn btn-secondary" onClick={() => scroll('left')} style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}>&lt;</button>
        
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
              className={`btn ${activeTab === key ? 'btn-primary' : 'btn-secondary'}`} 
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

        <button className="btn btn-secondary" onClick={() => scroll('right')} style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}>&gt;</button>
      </div>

      <SlokaViewer data={scriptures[activeTab].data} pageTitle={scriptures[activeTab].title} />
    </div>
  );
};

export default SwadhayaVerses;