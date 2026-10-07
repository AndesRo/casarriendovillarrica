import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Activa las animaciones de entrada solo si hay JavaScript.
document.documentElement.classList.add('js');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
