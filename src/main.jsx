import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import './index.css';
import { auth0Config, validateAuth0Config } from './config/auth0.js';

// Validate Auth0 configuration
if (!validateAuth0Config()) {
  throw new Error('Auth0 configuration is missing. Please check your .env file.');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      // Adding audience here for completeness with the SDK, though ROPG flow will specify it directly.
      // If you intend to use useAuth0().getAccessTokenSilently() or getAccessTokenWithPopup() for other things,
      // this audience will be used.
      audience={auth0Config.audience}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
);
