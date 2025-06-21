import React from 'react';

// LogoutButton now receives an onLogout prop from App.jsx
// which handles both SDK logout and clearing manual ROPG tokens/state.
const LogoutButton = ({ onLogout }) => {
  if (!onLogout) {
    // Fallback or error if onLogout is not provided, though App.jsx should always provide it.
    console.error("LogoutButton: onLogout prop is required.");
    // You could potentially use useAuth0().logout here as a fallback,
    // but it wouldn't clear the ROPG tokens.
    return <button disabled>Log Out (Error)</button>;
  }

  return (
    <button onClick={onLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
