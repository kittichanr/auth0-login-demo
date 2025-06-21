import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Profile component now accepts a user prop for manual ROPG flow,
// but can also fall back to useAuth0() if no prop is passed (though App.jsx now always passes it).
const Profile = ({ user: userProp }) => {
  const { user: sdkUser, isLoading: sdkIsLoading } = useAuth0();

  // Use the user prop if provided (from ROPG flow), otherwise use user from SDK.
  // App.jsx now always provides `effectiveUser` as `userProp`.
  const user = userProp || sdkUser;

  // isLoading should ideally be determined by the App component now,
  // but we can keep a check here for robustness or if Profile is used elsewhere.
  if (sdkIsLoading && !userProp) { // Only consider SDK loading if no userProp is overriding.
    return <div>Loading profile ...</div>;
  }

  if (!user) {
    return <div>Not logged in or user data not available.</div>;
  }

  return (
    <div>
      {user.picture && <img src={user.picture} alt={user.name || 'User'} />}
      <h2>{user.name || 'User'}</h2>
      {user.email && <p>{user.email}</p>}
      {/* You can add more user details here if available */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </div>
  );
};

export default Profile;
