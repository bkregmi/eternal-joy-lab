import React, { useState } from 'react';

/**
 * Component to handle image loading with a graceful fallback
 */
const PoseImage = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div style={{ 
      margin: '10px auto', 
      height: '100px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#fcfaf5',
      borderRadius: '8px',
      border: '1px dashed #e0e0e0',
      width: '100%',
      overflow: 'hidden'
    }}>
      {!hasError ? (
        <img 
          src={`${process.env.PUBLIC_URL}/${src}`} 
          alt={alt} 
          style={{ maxHeight: '100px', borderRadius: '5px' }} 
          onError={() => setHasError(true)}
        />
      ) : (
        <div style={{ 
          textAlign: 'center', 
          color: '#888', // Slightly darker for better contrast
          padding: '5px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100%' // Occupy full height of parent div
        }}>
          <div style={{ fontSize: '1em', fontWeight: 'bold', marginBottom: '5px', color: '#555' }}>{alt}</div>
          <div style={{ fontSize: '0.7em', letterSpacing: '0.5px', fontStyle: 'italic' }}>Image Pending</div>
        </div>
      )}
    </div>
  );
};

const Yogasana = () => {
  const [activeTab, setActiveTab] = useState('surya-kriya');

  const yogaPractices = {
    'surya-kriya': {
      name: 'Surya Kriya',
      description: 'A potent 21-step yogic practice of tremendous antiquity, designed as a holistic process for health, wellness, and complete inner well-being.',
      features: [
        'Aligns the system with celestial cycles.',
        'Creates a stable foundation for higher levels of energy.',
        'Balances hormonal levels and improves vitality.'
      ],
      sequence: [
        { pos: 1, name: 'Pranamasana', alt: 'Prayer Pose', image: 'media/images/yoga/pranamasana.jpg' },
        { pos: 2, name: 'Hastauttanasana', alt: 'Raised Arms Pose', image: 'media/images/yoga/hastauttanasana.jpg' },
        { pos: 3, name: 'Padahastasana', alt: 'Hand to Foot Pose', image: 'media/images/yoga/padahastasana.jpg' },
        { pos: 4, name: 'Ashwa Sanchalanasana', alt: 'Equestrian Pose (L)', image: 'media/images/yoga/ashwa-sanchalanasana.jpg' },
        { pos: 5, name: 'Parvatasana', alt: 'Mountain Pose', image: 'media/images/yoga/parvatasana.jpg' },
        { pos: 6, name: 'Ashtanga Namaskara', alt: 'Salute with 8 parts', image: 'media/images/yoga/ashtanga-namaskara.jpg' },
        { pos: 7, name: 'Bhujangasana', alt: 'Cobra Pose', image: 'media/images/yoga/bhujangasana.jpg' },
        { pos: 8, name: 'Parvatasana', alt: 'Mountain Pose', image: 'media/images/yoga/parvatasana.jpg' },
        { pos: 9, name: 'Ashwa Sanchalanasana', alt: 'Equestrian Pose (R)', image: 'media/images/yoga/ashwa-sanchalanasana.jpg' },
        { pos: 10, name: 'Padahastasana', alt: 'Hand to Foot Pose', image: 'media/images/yoga/padahastasana.jpg' },
        { pos: 11, name: 'Hastauttanasana', alt: 'Raised Arms Pose', image: 'media/images/yoga/hastauttanasana.jpg' },
        { pos: 12, name: 'Pranamasana', alt: 'Prayer Pose', image: 'media/images/yoga/pranamasana.jpg' },
        { pos: 13, name: 'Samasthiti', alt: 'Steady Standing', image: 'media/images/yoga/samasthiti.jpg' },
        { pos: 14, name: 'Pranamasana', alt: 'Prayer Pose', image: 'media/images/yoga/pranamasana.jpg' },
        { pos: 15, name: 'Hastauttanasana', alt: 'Raised Arms Pose', image: 'media/images/yoga/hastauttanasana.jpg' },
        { pos: 16, name: 'Padahastasana', alt: 'Hand to Foot Pose', image: 'media/images/yoga/padahastasana.jpg' },
        { pos: 17, name: 'Ashwa Sanchalanasana', alt: 'Equestrian Pose (L)', image: 'media/images/yoga/ashwa-sanchalanasana.jpg' },
        { pos: 18, name: 'Parvatasana', alt: 'Mountain Pose', image: 'media/images/yoga/parvatasana.jpg' },
        { pos: 19, name: 'Bhujangasana', alt: 'Cobra Pose', image: 'media/images/yoga/bhujangasana.jpg' },
        { pos: 20, name: 'Parvatasana', alt: 'Mountain Pose', image: 'media/images/yoga/parvatasana.jpg' },
        { pos: 21, name: 'Ashwa Sanchalanasana', alt: 'Equestrian Pose (R)', image: 'media/images/yoga/ashwa-sanchalanasana.jpg' }
      ]
    },
    'surya-namaskar': {
      name: 'Surya Namaskar',
      description: 'A sequence of 12 powerful yoga poses that provide a complete cardiovascular workout and improve physical and mental flexibility.',
      features: [
        'Total body workout for muscles and joints.',
        'Improves blood circulation and digestive system.',
        'Relaxes the mind and sharpens focus.'
      ],
      sequence: [
        { pos: 1, name: 'Pranamasana', alt: 'Prayer Pose', image: 'media/images/yoga/pranamasana.jpg' },
        { pos: 2, name: 'Hastauttanasana', alt: 'Raised Arms Pose', image: 'media/images/yoga/hastauttanasana.jpg' },
        { pos: 3, name: 'Padahastasana', alt: 'Hand to Foot Pose', image: 'media/images/yoga/padahastasana.jpg' },
        { pos: 4, name: 'Ashwa Sanchalanasana', alt: 'Equestrian Pose', image: 'media/images/yoga/ashwa-sanchalanasana.jpg' },
        { pos: 5, name: 'Parvatasana', alt: 'Mountain Pose', image: 'media/images/yoga/parvatasana.jpg' },
        { pos: 6, name: 'Ashtanga Namaskara', alt: 'Salute with Eight Parts', image: 'media/images/yoga/ashtanga-namaskara.jpg' },
        { pos: 7, name: 'Bhujangasana', alt: 'Cobra Pose', image: 'media/images/yoga/bhujangasana.jpg' },
        { pos: 8, name: 'Parvatasana', alt: 'Mountain Pose', image: 'media/images/yoga/parvatasana.jpg' },
        { pos: 9, name: 'Ashwa Sanchalanasana', alt: 'Equestrian Pose', image: 'media/images/yoga/ashwa-sanchalanasana.jpg' },
        { pos: 10, name: 'Padahastasana', alt: 'Hand to Foot Pose', image: 'media/images/yoga/padahastasana.jpg' },
        { pos: 11, name: 'Hastauttanasana', alt: 'Raised Arms Pose', image: 'media/images/yoga/hastauttanasana.jpg' },
        { pos: 12, name: 'Pranamasana', alt: 'Prayer Pose', image: 'media/images/yoga/pranamasana.jpg' }
      ]
    },
    'yogasanas': {
      name: 'Yogasanas',
      description: 'A set of powerful postures that align the inner system and the celestial geometry, becoming a step towards a higher state of consciousness.',
      features: [
        'Relief of chronic health conditions.',
        'Stabilization of the body, mind, and energy system.',
        'Evolution of body and mind towards ultimate well-being.'
      ],
      sequence: [
        { pos: 1, name: 'Nadi Vibhajana', alt: 'Preparatory Stretch', category: 'Preparatory Pose', image: 'media/images/yoga/nadi-vibhajana.jpg' },
        { pos: 2, name: 'Padahastasana', alt: 'Hand to Foot Pose', category: 'Standing Poses', image: 'media/images/yoga/padahastasana.jpg' },
        { pos: 3, name: 'Konasana', alt: 'Angle Pose', category: 'Standing Poses', image: 'media/images/yoga/konasana.jpg' },
        { pos: 4, name: 'Trikonasana', alt: 'Triangle Pose', category: 'Standing Poses', image: 'media/images/yoga/trikonasana.jpg' },
        { pos: 5, name: 'Vrikshasana', alt: 'Tree Pose', category: 'Standing Poses', image: 'media/images/yoga/vrikshasana.jpg' },
        { pos: 6, name: 'Shavasana', alt: 'Corpse Pose', category: 'Standing Poses', image: 'media/images/yoga/shavasana.jpg' },
        { pos: 7, name: 'Ekpada Utthanapadasana', alt: 'One Leg Raised (44°) - Endeavor to Rise', category: 'Lying Down Poses', image: 'media/images/yoga/ekpada-utthanapadasana-44.jpg' },
        { pos: 8, name: 'Ekpada Utthanapadasana', alt: 'One Leg Raised (90°) - Endeavor to Rise', category: 'Lying Down Poses', image: 'media/images/yoga/ekpada-utthanapadasana-90.jpg' },
        { pos: 9, name: 'Dwipada Utthanpadasana', alt: 'Two Legs Raised Pose', category: 'Lying Down Poses', image: 'media/images/yoga/dwipada-utthanpadasana.jpg' },
        { pos: 10, name: 'Shalabhasana', alt: 'Locust Pose', category: 'Lying Down Poses', image: 'media/images/yoga/shalabhasana.jpg' },
        { pos: 11, name: 'Makarasana', alt: 'Crocodile Pose', category: 'Lying Down Poses', image: 'media/images/yoga/makarasana.jpg' },
        { pos: 12, name: 'Naukasana', alt: 'Boat Pose (Hands)', category: 'Lying Down Poses', image: 'media/images/yoga/naukasana-hands.jpg' },
        { pos: 13, name: 'Naukasana', alt: 'Boat Pose (Feet)', category: 'Lying Down Poses', image: 'media/images/yoga/naukasana-feet.jpg' },
        { pos: 14, name: 'Naukasana', alt: 'Boat Pose (Both)', category: 'Lying Down Poses', image: 'media/images/yoga/naukasana-both.jpg' },
        { pos: 15, name: 'Bhujangasana', alt: 'Cobra Pose', category: 'Lying Down Poses', image: 'media/images/yoga/bhujangasana.jpg' },
        { pos: 16, name: 'Dhanurasana', alt: 'Bow Pose', category: 'Lying Down Poses', image: 'media/images/yoga/dhanurasana.jpg' },
        { pos: 17, name: 'Paschimottanasana', alt: 'Seated Forward Bend', category: 'Sitting Poses', image: 'media/images/yoga/paschimottanasana.jpg' },
        { pos: 18, name: 'Janu Shirsasana', alt: 'Head-to-Knee Pose', category: 'Sitting Poses', image: 'media/images/yoga/janu-shirsasana.jpg' },
        { pos: 19, name: 'Matsyendrasana', alt: 'Snail Pose', category: 'Sitting Poses', image: 'media/images/yoga/matsyendrasana.jpg' },
        { pos: 20, name: 'Sushanti Meditation', alt: 'Perfect Calm - 61 point relaxation', category: 'Resting Posture', image: 'media/images/yoga/sushanti.jpg' },
        { pos: 21, name: 'Patangasana', alt: 'Butterfly - 2 min', category: 'Bandhas', image: 'media/images/yoga/patangasana.jpg' },
        { pos: 22, name: 'Shishupalasana', alt: 'Rock your baby - 2 min', category: 'Bandhas', image: 'media/images/yoga/shishupalasana.jpg' },
        { pos: 23, name: 'Yoga Mudras', alt: 'Yogic Seal', category: 'Bandhas', image: 'media/images/yoga/yoga-mudras.jpg' },
        { pos: 24, name: 'Lolasana', alt: 'Swinging', category: 'Bandhas', image: 'media/images/yoga/lolasana.jpg' },
        { pos: 25, name: 'Uddyana Bandha', alt: 'Diaphragm Lock', category: 'Bandhas', image: 'media/images/yoga/uddyana-bandha.jpg' }
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

            <h2 style={{ color: '#c92200', fontFamily: "'Georgia', serif", fontWeight: 'bold', borderBottom: '2px solid #ff9933', paddingBottom: '5px' }}>
              {current.name}
            </h2>
            
            <div className="info-box" style={{ marginBottom: '15px', fontSize: '1.1em', color: '#555', fontFamily: "'Georgia', serif" }}>
              <p><strong>Description:</strong> {current.description}</p>
            </div>

            <div className="details-container" style={{ 
              textAlign: 'left', 
              padding: '20px', 
              borderRadius: '15px', 
              backgroundColor: '#f8f9fa',
              border: '1px solid #eceeef',
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}>
              <h3 className="sh3" style={{ color: '#2c3e50' }}>Benefits & Practice Details</h3>
              <div style={{ marginTop: '20px' }}>
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

            {current.sequence && (
              <div className="info-box" style={{ marginBottom: '10px', fontSize: '1.1em', color: '#555', fontFamily: "'Georgia', serif" }}>
                <p><strong>Pose Sequence:</strong></p>
              </div>
            )}

            {current.sequence && (
              <div className="sequence-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
                gap: '10px', 
                marginBottom: '20px' 
              }}>
                {current.sequence.map((step, idx) => {
                  const showHeader = step.category && (idx === 0 || step.category !== current.sequence[idx - 1].category);
                  return (
                    <React.Fragment key={step.pos}>
                      {showHeader && (
                        <div style={{ 
                          gridColumn: '1 / -1', 
                          textAlign: 'left', 
                          margin: '10px 0 5px 0', 
                          padding: '5px 0',
                          borderBottom: '1px solid #f0e6d2', 
                          color: '#c92200', 
                          fontWeight: 'bold',
                          fontSize: '1.1em',
                          fontFamily: "'Georgia', serif"
                        }}>
                          {step.category}
                        </div>
                      )}
                      <div style={{ 
                        background: '#fff', 
                        padding: '10px', 
                        borderRadius: '10px', 
                        textAlign: 'center', 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        borderLeft: '4px solid #ff9933'
                      }}>
                        <div style={{ color: '#ff9933', fontWeight: 'bold' }}>Step {step.pos}</div>
                        {step.image && <PoseImage src={step.image} alt={step.name} />}
                        <div style={{ fontSize: '0.95em', fontWeight: 'bold', color: '#333' }}>{step.name}</div>
                        <div style={{ fontSize: '0.8em', color: '#777', fontStyle: 'italic' }}>{step.alt}</div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}

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