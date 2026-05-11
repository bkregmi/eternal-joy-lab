import React, { useState } from 'react';

const Yogasana = () => {
  const [activeTab, setActiveTab] = useState('suriya-kriya');

  const yogaPractices = {
    'suriya-kriya': {
      name: 'Suriya Kriya',
      description: 'A potent 21-step yogic practice of tremendous antiquity, designed as a holistic process for health, wellness, and complete inner well-being.',
      features: [
        'Aligns the system with celestial cycles.',
        'Creates a stable foundation for higher levels of energy.',
        'Balances hormonal levels and improves vitality.'
      ]
    },
    'yogasanas': {
      name: 'Yogasanas',
      description: 'A set of powerful postures that align the inner system and the celestial geometry, becoming a step towards a higher state of consciousness.',
      features: [
        'Relief of chronic health conditions.',
        'Stabilization of the body, mind, and energy system.',
        'Evolution of body and mind towards ultimate well-being.'
      ]
    },
    'angamardhana': {
      name: 'Angamardhana',
      description: 'A series of dynamic processes to invigorate the body and reach peak physical fitness and mental clarity.',
      features: [
        'Strengthens the spine, skeletal and muscular systems.',
        'Builds physical strength, fitness, and tenacity.',
        'Uses your own body weight and requires no equipment.'
      ]
    },
    'padma-sadhana': {
      name: 'Padma Sadhana',
      description: 'A beautiful and powerful set of asanas, pranayamas, and meditation designed to help the practitioner blossom like a lotus.',
      features: [
        'Increases physical flexibility and endurance.',
        'Calms the mind and reduces stress.',
        'Enhances overall awareness and focus.'
      ]
    },
    'bhujangasana': {
      name: 'Bhujangasana (Cobra Pose)',
      description: 'A classic hatha yoga posture that involves a back-bending stretch to strengthen the spine and open the chest.',
      features: [
        'Strengthens the spine and stretches the chest.',
        'Stimulates abdominal organs and improves digestion.',
        'Relieves stress and improves respiratory function.'
      ]
    },
    'marjariasana': {
      name: 'Marjariasana (Cat Pose)',
      description: 'A gentle flow that warms the body and brings flexibility to the entire spine.',
      features: [
        'Improves spinal flexibility and posture.',
        'Stretches the back torso and neck.',
        'Massages the spine and abdominal organs.'
      ]
    }
  };

  const current = yogaPractices[activeTab];

  return (
    <div className="yogasana-page">
      <div className="row">
        <div className="col-md-12">
          <section className="whiteBG" style={{ padding: '10px', borderRadius: '15px', marginTop: '10px' }}>
            <div className="section-selector" style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              {Object.keys(yogaPractices).map((key) => (
                <button 
                  key={key}
                  className={`btn ${activeTab === key ? 'btn-primary' : 'btn-default'}`} 
                  style={{ marginRight: '10px', marginBottom: '10px' }}
                  onClick={() => setActiveTab(key)}
                >
                  {yogaPractices[key].name}
                </button>
              ))}
            </div>

            <h2 className="sh3" style={{ borderBottom: 'none', color: '#c92200', marginTop: 0 }}>{current.name}</h2>
            
            <div className="info-box" style={{ marginBottom: '20px', fontSize: '1.1em', color: '#555' }}>
              <p><strong>Description:</strong> {current.description}</p>
            </div>

            <div className="details-container" style={{ 
              textAlign: 'center', 
              padding: '40px', 
              borderRadius: '15px', 
              backgroundColor: '#f8f9fa',
              border: '1px solid #eceeef',
              transition: 'all 0.3s ease'
            }}>
              <h3 className="sh3" style={{ color: '#2c3e50' }}>Benefits & Practice Details</h3>
              <div style={{ textAlign: 'left', display: 'inline-block', marginTop: '20px' }}>
                <ul className="list-group" style={{ margin: 0 }}>
                  {current.features.map((feature, idx) => (
                    <li key={idx} className="list-group-item" style={{ border: 'none', backgroundColor: 'transparent', fontSize: '1.1em' }}>
                      <span className="glyphicon glyphicon-ok" style={{ color: '#27ae60', marginRight: '10px' }}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="navigation-hint" style={{ marginTop: '20px', textAlign: 'center', color: '#777' }}>
              <p>Practice under guidance for proper alignment and safety.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Yogasana;