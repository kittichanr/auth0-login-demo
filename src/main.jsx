import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import './index.css';

// TODO: Replace with your Auth0 domain and client ID
const AUTH0_DOMAIN = 'YOUR_AUTH0_DOMAIN';
const AUTH0_CLIENT_ID = 'YOUR_AUTH0_CLIENT_ID';

if (!AUTH0_DOMAIN || AUTH0_DOMAIN === 'YOUR_AUTH0_DOMAIN') {
  alert('Auth0 domain is not set. Please replace "YOUR_AUTH0_DOMAIN" in src/main.jsx with your actual Auth0 domain for the application to work correctly.');
  console.warn('Auth0 domain is not set. Please replace "YOUR_AUTH0_DOMAIN" in src/main.jsx with your actual Auth0 domain.');
}

if (!AUTH0_CLIENT_ID || AUTH0_CLIENT_ID === 'YOUR_AUTH0_CLIENT_ID') {
  alert('Auth0 client ID is not set. Please replace "YOUR_AUTH0_CLIENT_ID" in src/main.jsx with your actual Auth0 client ID for the application to work correctly.');
  console.warn('Auth0 client ID is not set. Please replace "YOUR_AUTH0_CLIENT_ID" in src/main.jsx with your actual Auth0 client ID.');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
);
