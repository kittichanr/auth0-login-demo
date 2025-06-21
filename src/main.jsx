import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import './index.css';

// TODO: Replace with your Auth0 domain and client ID
const AUTH0_DOMAIN = 'YOUR_AUTH0_DOMAIN';
const AUTH0_CLIENT_ID = 'YOUR_AUTH0_CLIENT_ID';
// TODO: Replace with your Auth0 API identifier (audience) if you have one, or your Auth0 domain for /userinfo
const AUTH0_AUDIENCE = 'YOUR_AUTH0_AUDIENCE';

if (!AUTH0_DOMAIN || AUTH0_DOMAIN === 'YOUR_AUTH0_DOMAIN') {
  alert('Auth0 domain is not set. Please replace "YOUR_AUTH0_DOMAIN" in src/main.jsx with your actual Auth0 domain for the application to work correctly.');
  console.warn('Auth0 domain is not set. Please replace "YOUR_AUTH0_DOMAIN" in src/main.jsx with your actual Auth0 domain.');
}

if (!AUTH0_CLIENT_ID || AUTH0_CLIENT_ID === 'YOUR_AUTH0_CLIENT_ID') {
  alert('Auth0 client ID is not set. Please replace "YOUR_AUTH0_CLIENT_ID" in src/main.jsx with your actual Auth0 client ID for the application to work correctly.');
  console.warn('Auth0 client ID is not set. Please replace "YOUR_AUTH0_CLIENT_ID" in src/main.jsx with your actual Auth0 client ID.');
}

if (!AUTH0_AUDIENCE || AUTH0_AUDIENCE === 'YOUR_AUTH0_AUDIENCE') {
  // We can make this a console warning as it's not always strictly required for ROPG to get an ID token,
  // but it is for access tokens for an API or for /userinfo.
  console.warn('Auth0 audience is not set in src/main.jsx. For ROPG, you will also need to set this in the fetch request. It might be your API identifier or https://YOUR_AUTH0_DOMAIN/userinfo.');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      // Adding audience here for completeness with the SDK, though ROPG flow will specify it directly.
      // If you intend to use useAuth0().getAccessTokenSilently() or getAccessTokenWithPopup() for other things,
      // this audience will be used.
      audience={AUTH0_AUDIENCE}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
);
