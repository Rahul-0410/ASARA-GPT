import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <GoogleOAuthProvider clientId='587005655980-tgos2te9j5i5p185m90cj7suuc0hh3rc.apps.googleusercontent.com'>
      <App />
      </GoogleOAuthProvider>
  </React.StrictMode>,
);


