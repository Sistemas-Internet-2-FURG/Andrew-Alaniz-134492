import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Certifique-se de que o caminho para o App.js está correto.
import './index.css'; // Certifique-se de que o CSS está no mesmo diretório ou ajuste o caminho.


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
