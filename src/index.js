import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Dynamically load Bootstrap 3 from a CDN to resolve the "Module not found" error.
// This bypasses the need for a local 'npm install bootstrap@3'.
const bootstrapLink = document.createElement('link');
bootstrapLink.rel = 'stylesheet';
bootstrapLink.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
document.head.appendChild(bootstrapLink);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Using BrowserRouter is fine for S3 if "Error Document" is set to index.html. 
        Otherwise, consider using HashRouter for maximum compatibility. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
