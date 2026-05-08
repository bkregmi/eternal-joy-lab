import React from 'react';
import quotes from '../data/home-quotes.json';

function Home() {
  return (
    <section>
      <h2>Welcome to Spiritual Journey</h2>
      {quotes.map((quote, index) => (
        <blockquote className="blockquote" key={index}>
          <p>
            {quote.text}
          </p>
          <footer className="blockquote-footer">
            {quote.author}
          </footer>
        </blockquote>
      ))}
    </section>
  );
}

export default Home;
