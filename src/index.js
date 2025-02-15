import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css"; 
import "primeicons/primeicons.css"; 
import "primeflex/primeflex.css";
import 'bootstrap/dist/css/bootstrap.min.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

