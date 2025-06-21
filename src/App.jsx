import React, { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CustomLoginForm from './CustomLoginForm'; // Will create this next
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import './App.css';
import { jwtDecode } from 'jwt-decode'; // For decoding ID token

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('id_token');
// Helper to get user from localStorage (if stored as JSON string)
const getStoredUser = () => {
  const storedUser = localStorage.getItem('user_profile');
  try {
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Error parsing stored user:", e);
    localStorage.removeItem('user_profile');
    return null;
  }
};


function App() {
  const {
    logout: sdkLogout,
    isAuthenticated: sdkIsAuthenticated,
    user: sdkUser,
    isLoading: sdkIsLoading
  } = useAuth0();

  // Manual authentication state
  const [isAuthenticatedManually, setIsAuthenticatedManually] = useState(!!getToken());
  const [manualUser, setManualUser] = useState(getStoredUser());
  const [isLoadingManually, setIsLoadingManually] = useState(true); // For initial check

  useEffect(() => {
    // This effect is to initialize the manual auth state from localStorage
    const token = getToken();
    if (token) {
      setIsAuthenticatedManually(true);
      if (!manualUser) { // If user is not in state, try to decode from token or get from storage
        try {
          const decodedToken = jwtDecode(token);
          // Basic user object from ID token. You might want more.
          const userFromToken = {
            name: decodedToken.name,
            email: decodedToken.email,
            picture: decodedToken.picture
          };
          setManualUser(userFromToken);
          localStorage.setItem('user_profile', JSON.stringify(userFromToken));
        } catch (error) {
          console.error("Error decoding token on initial load:", error);
          // Token might be invalid, clear it
          localStorage.removeItem('id_token');
          localStorage.removeItem('user_profile');
          setIsAuthenticatedManually(false);
        }
      }
    }
    setIsLoadingManually(false);
  }, []); // Empty dependency array: runs once on mount

  const handleCustomLoginSuccess = useCallback((idToken, accessToken) => {
    localStorage.setItem('id_token', idToken);
    // Optionally store access_token if needed for API calls outside of Auth0Provider context
    localStorage.setItem('access_token', accessToken);

    try {
      const decodedToken = jwtDecode(idToken);
      const userProfile = {
        name: decodedToken.name,
        email: decodedToken.email,
        picture: decodedToken.picture,
        // Add any other claims from id_token you need
      };
      localStorage.setItem('user_profile', JSON.stringify(userProfile));
      setManualUser(userProfile);
      setIsAuthenticatedManually(true);
    } catch (error) {
      console.error("Error decoding token after login:", error);
      // Handle error, maybe logout
    }
  }, []);

  const handleLogout = useCallback(() => {
    // Logout from Auth0 SDK (clears Auth0 session cookie and SDK state)
    sdkLogout({ logoutParams: { returnTo: window.location.origin } });
    // Clear manual authentication state and tokens
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token'); // If stored
    localStorage.removeItem('user_profile');
    setManualUser(null);
    setIsAuthenticatedManually(false);
  }, [sdkLogout]);

  // Determine overall loading state
  // If using SDK features like isLoading, you might want to combine them.
  // For ROPG, sdkIsLoading might not be relevant for the login part itself.
  const isLoading = isLoadingManually || sdkIsLoading;


  if (isLoading) {
    return <div>Loading Application...</div>;
  }

  // Prefer manual authentication state if it's set (meaning ROPG login was successful)
  // Otherwise, fall back to SDK's state (e.g., if a session was already active via redirect)
  const effectiveIsAuthenticated = isAuthenticatedManually || sdkIsAuthenticated;
  const effectiveUser = manualUser || sdkUser;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Auth0 Custom ROPG Flow</h1>
        {effectiveIsAuthenticated ? (
          <>
            <Profile user={effectiveUser} /> {/* Pass user data to Profile */}
            <LogoutButton onLogout={handleLogout} /> {/* Pass custom logout */}
          </>
        ) : (
          <CustomLoginForm onLoginSuccess={handleCustomLoginSuccess} />
        )}
      </header>
    </div>
  );
}

export default App;
