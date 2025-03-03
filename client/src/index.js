import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Importing Sass with Bootstrap CSS
import './App.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);