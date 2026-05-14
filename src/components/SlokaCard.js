import React from 'react';

/**
 * SlokaCard - Optimized for Sacred Verses
 * Features: Sanskrit Script, Transliteration, and Meaning
 */
const SlokaCard = ({ original, transliteration, meaning, source }) => {
  const cardStyle = {
    background: 'linear-gradient(135deg, #fffdf5 0%, #ffffff 100%)',
    border: 'none', // Removed the internal border
    borderLeft: '8px solid #ff9933', // Reinstated saffron border
    padding: '30px',
    borderRadius: '15px',
    marginBottom: '30px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
    textAlign: 'center'
  };

  return (
    <div style={cardStyle}>
      {/* Sanskrit Text */}
      <div style={{ fontSize: '1.6em', color: '#c92200', fontWeight: 'bold', marginBottom: '15px', lineHeight: '1.8' }}>
        {original}
      </div>
      
      {/* Transliteration */}
      {transliteration && (
        <div style={{ fontSize: '1.1em', fontStyle: 'italic', color: '#7f8c8d', marginBottom: '20px' }}>
          {transliteration}
        </div>
      )}

      {/* Meaning */}
      <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', color: '#2c3e50', lineHeight: '1.6' }}>
        <strong style={{ color: '#c92200', display: 'block', marginBottom: '5px' }}>Meaning</strong>
        {meaning}
      </div>

      {source && <div style={{ marginTop: '15px', color: '#ff9933', fontWeight: 'bold' }}>— {source}</div>}
    </div>
  );
};

export default SlokaCard;