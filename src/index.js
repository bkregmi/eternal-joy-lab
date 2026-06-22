import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
