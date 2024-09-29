import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Auth0 configuration
const domain = "http://localhost:5174";
const clientId = "801725150326-2ntuh0a4r87vstre3fe5mgjfu1bb5fbh.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
 
    <GoogleOAuthProvider clientId={clientId}  >
      <App/>
    </GoogleOAuthProvider>

);
