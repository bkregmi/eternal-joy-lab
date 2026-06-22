import React from 'react';
import quotes from '../data/home-quotes.json';

const SpiritualQuote = ({ text, author }) => (
  <div className="quote-item" style={{
    background: '#fff',
    borderLeft: '6px solid #ff9933',
    padding: '35px',
    borderRadius: '15px',
    marginBottom: '35px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
    fontFamily: "'Georgia', serif"
  }}>
    <p style={{ fontSize: '1.3em', color: '#333', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '20px' }}>
      "{text}"
    </p>
    <div style={{ textAlign: 'right', fontSize: '1.1em', fontWeight: 'bold', color: '#c92200' }}>
      &mdash; {author}
    </div>
  </div>
);

function Wisdom() {
  return (
    <div className="quotes-page" style={{ backgroundColor: '#fcfaf5', minHeight: '100vh', padding: '60px 20px' }}>
      <div className="container-fluid" style={{ padding: '0 10px' }}>
        <div className="row">
          <div className="col-12 text-center" style={{ marginBottom: '50px', padding: 0 }}>
            <h1 style={{ color: '#c92200', fontSize: '2.6em', fontFamily: "'Georgia', serif", fontWeight: 'bold', marginTop: '0' }}>
              Words of Wisdom
            </h1>
            <div style={{ width: '100px', height: '4px', background: '#ff9933', margin: '20px auto' }}></div>
            <p className="lead" style={{ color: '#555', fontSize: '1.2em' }}>
              Timeless insights from enlightened masters to illuminate the path.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-12" style={{ padding: 0 }}>
            {quotes.map((quote, index) => (
              <SpiritualQuote key={index} text={quote.text} author={quote.author} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wisdom;