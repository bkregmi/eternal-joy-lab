import React from 'react';

const PillarCard = ({ title, letter, color, description, labelClass }) => (
  <div className="col-md-6" style={{ marginBottom: '30px', display: 'flex' }}>
    <div className="pillar-item" style={{
      padding: '25px',
      background: '#fff',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      flex: 1,
      borderTop: `4px solid ${color}`
    }}>
      <h3 style={{ color: '#2c3e50', marginTop: 0 }}>
        <span className={`label ${labelClass}`} style={{ marginRight: '10px', borderRadius: '50%', padding: '5px 12px' }}>
          {letter}
        </span>
        {title}
      </h3>
      <p style={{ color: '#444', lineHeight: '1.7' }}>
        {description}
      </p>
    </div>
  </div>
);

function Home() {
  const pillars = [
    {
      letter: 'S',
      title: 'adhana',
      labelClass: 'label-primary',
      color: '#3498db',
      description: (
        <>
          <strong>The Foundation of Discipline.</strong> Sadhana is the daily spiritual practice that prepares the vessel of the body and mind. 
          Through dedicated daily prayers, Pranayama (breathwork), and Yogasana, we tune our internal instruments.
        </>
      )
    },
    {
      letter: 'S',
      title: 'wadhaya',
      labelClass: 'label-success',
      color: '#27ae60',
      description: (
        <>
          <strong>The Light of Knowledge.</strong> Swadhaya involves the study of sacred scriptures and the Self. 
          By contemplating the Gita and Bhagavatam, we cultivate the Viveka (discernment) necessary for grace.
        </>
      )
    },
    {
      letter: 'S',
      title: 'atsanga',
      labelClass: 'label-warning',
      color: '#f39c12',
      description: (
        <>
          <strong>The Power of Association.</strong> Associating with the Truth through holy company, Bhajans, and divine discourses that nourish the heart and reinforce spiritual aspirations.
        </>
      )
    },
    {
      letter: 'S',
      title: 'ewa',
      labelClass: 'label-danger',
      color: '#e74c3c',
      description: (
        <>
          <strong>The Joy of Selfless Service.</strong> The transformation of inner joy into external action. By serving others without expectation, we dissolve the ego and experience oneness.
        </>
      )
    }
  ];

  return (
    <div className="home-container" style={{ backgroundColor: '#fcfaf5', padding: '20px' }}>
      <section className="philosophy-section whiteBG" style={{ padding: '40px', borderRadius: '20px', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h1 className="text-center" style={{ color: '#c92200', marginBottom: '15px', fontFamily: "'Georgia', serif", fontWeight: 'bold' }}>The SSSS Philosophy</h1>
        <p className="lead text-center" style={{ fontSize: '1.25em', color: '#555', maxWidth: '800px', margin: '0 auto 40px auto' }}>
          At Eternal Joy Lab, we follow a holistic roadmap for spiritual evolution known as the <strong>SSSS Philosophy</strong>. 
          This framework integrates ancient wisdom into modern living through four essential pillars:
        </p>

        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {pillars.map((pillar, idx) => (
            <PillarCard key={idx} {...pillar} />
          ))}
        </div>
        
        <div className="text-center" style={{ marginTop: '30px', fontStyle: 'italic', color: '#888', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <p style={{ fontSize: '1.2em' }}>"When these four pillars are balanced, life becomes a lab for eternal joy."</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
