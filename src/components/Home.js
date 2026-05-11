import React from 'react';
import quotes from '../data/home-quotes.json';

function Home() {
  return (
    <div className="home-container">
      <section className="philosophy-section whiteBG" style={{ padding: '30px', borderRadius: '15px', marginBottom: '30px' }}>
        <h2 className="text-center" style={{ color: '#c92200', marginBottom: '30px' }}>The SSSS Philosophy</h2>
        <p className="lead text-center" style={{ fontSize: '1.2em', color: '#555' }}>
          At Eternal Joy Lab, we follow a holistic roadmap for spiritual evolution known as the <strong>SSSS Philosophy</strong>. 
          This framework integrates ancient wisdom into modern living through four essential pillars:
        </p>

        <div className="row" style={{ marginTop: '40px' }}>
          <div className="col-md-6" style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#2c3e50' }}><span className="label label-primary">S</span>adhana</h3>
            <p><strong>The Foundation of Discipline.</strong> Sadhana is the daily spiritual practice that prepares the vessel of the body and mind. 
            Through dedicated daily prayers, Pranayama (breathwork), and Yogasana, we tune our internal instruments to resonate with higher frequencies of existence.</p>
          </div>
          <div className="col-md-6" style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#2c3e50' }}><span className="label label-success">S</span>wadhaya</h3>
            <p><strong>The Light of Knowledge.</strong> Swadhaya involves the study of sacred scriptures and the study of the Self. 
            By contemplating the wisdom of the Srimad Bhagavat Gita and Srimad Bhagavatam, we cultivate the Viveka (discernment) necessary to navigate life with clarity and grace.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6" style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#2c3e50' }}><span className="label label-warning">S</span>atsanga</h3>
            <p><strong>The Power of Association.</strong> Humans are deeply influenced by their environment. 
            Satsanga is the act of associating with the Truth through holy company, uplifting Bhajans, and divine discourses that nourish the heart and reinforce our spiritual aspirations.</p>
          </div>
          <div className="col-md-6" style={{ marginBottom: '25px' }}>
            <h3 style={{ color: '#2c3e50' }}><span className="label label-danger">S</span>ewa</h3>
            <p><strong>The Joy of Selfless Service.</strong> Sewa is the ultimate expression of spiritual growth. 
            It is the transformation of inner joy into external action. By serving others without expectation, we dissolve the ego and experience the oneness of all creation.</p>
          </div>
        </div>
        
        <div className="text-center" style={{ marginTop: '20px', fontStyle: 'italic', color: '#777' }}>
          <p>"When these four pillars are balanced, life becomes a lab for eternal joy."</p>
        </div>
      </section>

      <section className="quotes-section">
        <h3 className="text-center" style={{ marginBottom: '30px', color: '#666' }}>Words of Wisdom</h3>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            {quotes.map((quote, index) => (
              <blockquote className="blockquote whiteBG" key={index} style={{ padding: '20px', borderRadius: '10px', marginBottom: '20px', borderLeft: '5px solid #c92200' }}>
                <p style={{ fontSize: '1.1em' }}>
                  "{quote.text}"
                </p>
                <footer className="blockquote-footer" style={{ marginTop: '10px' }}>
                  {quote.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
