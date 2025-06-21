import React, { useState } from 'react';
import { auth0Config, validateAuth0Config } from './config/auth0.js';

const CustomLoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validateAuth0Config()) {
      setError('Auth0 configuration is not set. Please check your .env file.');
      setIsLoading(false);
      alert('Critical Auth0 configuration missing. Please check your .env file.');
      console.error('CustomLoginForm: Auth0 configuration is missing. Please check your .env file.');
      return;
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', auth0Config.clientId);
    params.append('username', email);
    params.append('password', password);
    params.append('audience', auth0Config.audience);
    // Add scopes you need. 'openid profile email' are common for ID tokens.
    // If your API requires specific scopes for the access token, add them.
    params.append('scope', 'openid profile email');

    try {
      const response = await fetch(`https://${auth0Config.domain}/oauth/token`, {
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
