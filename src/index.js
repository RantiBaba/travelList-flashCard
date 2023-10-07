import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

//* Use index.css for the packing list app.
import './index.css';

//* Use styles.css for the flash card app.


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
