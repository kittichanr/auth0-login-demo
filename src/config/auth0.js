// Auth0 Configuration
export const auth0Config = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
};

// Validate that all required environment variables are set
export const validateAuth0Config = () => {
    const requiredVars = ['VITE_AUTH0_DOMAIN', 'VITE_AUTH0_CLIENT_ID', 'VITE_AUTH0_AUDIENCE'];
    const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);

    if (missingVars.length > 0) {
        console.error('Missing required Auth0 environment variables:', missingVars);
        return false;
    }

    return true;
}; 