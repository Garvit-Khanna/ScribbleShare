import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { StyledEngineProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <StyledEngineProvider injectFirst>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
        <App />
      </GoogleOAuthProvider>
      </StyledEngineProvider>
    </React.StrictMode>,
)
