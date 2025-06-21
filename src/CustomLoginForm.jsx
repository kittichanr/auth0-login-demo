import React, { useState } from 'react';

// Retrieve Auth0 config from main.jsx or environment variables
// For simplicity, directly using placeholders here.
// In a real app, you'd import these or use a config service.
const AUTH0_DOMAIN = 'YOUR_AUTH0_DOMAIN'; // Replace!
const AUTH0_CLIENT_ID = 'YOUR_AUTH0_CLIENT_ID'; // Replace!
// This should be your API identifier or https://<your-domain>.auth0.com/userinfo
const AUTH0_AUDIENCE = 'YOUR_AUTH0_AUDIENCE'; // Replace!


const CustomLoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (AUTH0_DOMAIN === 'YOUR_AUTH0_DOMAIN' || AUTH0_CLIENT_ID === 'YOUR_AUTH0_CLIENT_ID' || AUTH0_AUDIENCE === 'YOUR_AUTH0_AUDIENCE') {
      setError('Auth0 configuration is not set. Please replace placeholders in CustomLoginForm.jsx and main.jsx.');
      setIsLoading(false);
      // In a real app, these would ideally come from a config that's checked earlier
      // or from the Auth0Provider context if possible, though that's for SDK managed values.
      alert('Critical Auth0 configuration missing in CustomLoginForm.jsx. Please check console and code.');
      console.error('CustomLoginForm.jsx: Fill in AUTH0_DOMAIN, AUTH0_CLIENT_ID, and AUTH0_AUDIENCE');
      return;
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', AUTH0_CLIENT_ID);
    params.append('username', email);
    params.append('password', password);
    params.append('audience', AUTH0_AUDIENCE);
    // Add scopes you need. 'openid profile email' are common for ID tokens.
    // If your API requires specific scopes for the access token, add them.
    params.append('scope', 'openid profile email');


    try {
      const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error_description || data.error || 'Login failed. Please check your credentials.');
        setIsLoading(false);
        return;
      }

      // On success, Auth0 returns id_token, access_token, expires_in, token_type
      if (data.id_token && data.access_token) {
        onLoginSuccess(data.id_token, data.access_token);
      } else {
        setError('Login successful, but token(s) not received.');
      }

    } catch (err) {
      console.error('Login request error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};

export default CustomLoginForm;
