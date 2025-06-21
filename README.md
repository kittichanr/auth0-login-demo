# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Auth0 Login Demo

A React application demonstrating Auth0 authentication with custom Resource Owner Password Grant (ROPG) flow.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Auth0:
   - Copy `.env.example` to `.env`
   - Fill in your Auth0 configuration:
     ```
     VITE_AUTH0_DOMAIN=your-domain.auth0.com
     VITE_AUTH0_CLIENT_ID=your-client-id
     VITE_AUTH0_AUDIENCE=https://your-domain.auth0.com/api/v2/
     ```

4. **Important**: Enable Resource Owner Password Grant in your Auth0 application:
   - Go to Auth0 Dashboard → Applications → Your App → Settings
   - Scroll to Advanced Settings → Grant Types
   - Enable "Password" (Resource Owner Password Grant)
   - Save changes

5. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

The application uses the following environment variables (prefixed with `VITE_` for Vite):

- `VITE_AUTH0_DOMAIN`: Your Auth0 domain
- `VITE_AUTH0_CLIENT_ID`: Your Auth0 application client ID
- `VITE_AUTH0_AUDIENCE`: Your Auth0 API audience

## Features

- Custom login form with email/password
- Resource Owner Password Grant flow
- User profile display
- Secure token management
- Environment-based configuration

## Security Notes

- The `.env` file is gitignored to prevent committing sensitive credentials
- Always use environment variables for configuration in production
- Consider using Auth0's standard redirect flow for production applications
