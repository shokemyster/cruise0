# 🚢 Cruise0 – Auth0 App Modernisation Demo

This repository contains a proof of concept (PoC) demonstrating how Auth0 supports the modernization of the Cruise0 application into a React Single Page Application (SPA).

## 🎯 What this demo shows

- Email/Password authentication (Database connection)
- Google social login
- Account linking (same customer across providers)
- Email verification enforcement
- Branded New Universal Login
- React SPA integration using Auth0 SDK

## 🧠 Architecture

React SPA → Auth0 Universal Login → Identity Providers (DB + Google) → Cruise0 App

Authentication is centralized in Auth0. The SPA never handles passwords directly.

## 🧰 Tech Stack

- React (Vite)
- @auth0/auth0-react
- Auth0 (Universal Login, Actions, Management API)

## 🔐 Auth0 Tenant

Tenant: shokemyster  
Domain: shokemyster.jp.auth0.com

## ⚙️ Prerequisites

- Node.js 18+
- npm
- Auth0 account

## 🌱 Environment Variables

Create a `.env` file in the project root:

```env
VITE_AUTH0_DOMAIN=shokemyster.jp.auth0.com
VITE_AUTH0_CLIENT_ID=QfMrPyWLpoYnMX2pgQCRIwKU6H3t3TPq
```

Note: Auth0 domain and client ID are public identifiers for SPA apps. Do not commit secrets such as client secrets or management API tokens.

## 🔧 Auth0 Configuration

### Application

- Type: Single Page Application (SPA)
- Enable:
  - Database Connection (Username-Password-Authentication)
  - Google Social Connection

### URLs (Local Development)

Allowed Callback URLs:
http://localhost:5173

Allowed Logout URLs:
http://localhost:5173

Allowed Web Origins:
http://localhost:5173

### URLs (Production Example)

Allowed Callback URLs:
https://your-app.vercel.app

Allowed Logout URLs:
https://your-app.vercel.app

Allowed Web Origins:
https://your-app.vercel.app

## ▶️ Run Locally

npm install  
npm run dev

Open: http://localhost:5173

## 🏗 Build

npm run build  
npm run preview

## 🚀 Deployment

This app can be deployed to any static hosting platform such as Vercel, Netlify, or Cloudflare Pages.

### Example (Vercel)

1. Push this repository to GitHub  
2. Import the repository into Vercel  
3. Add environment variables:
   VITE_AUTH0_DOMAIN=...  
   VITE_AUTH0_CLIENT_ID=...  
4. Deploy  
5. Add deployed URL to Auth0 settings (Callback / Logout / Web Origins)

## 👤 Demo Users

Existing Customer (Email/Password):

Email: shokemyster@gmail.com
Password: provided separately

Email: hi.shoki@gmail.com
Password: provided separately

Google Login:

Use a Google account with the same email address to demonstrate account linking.

## 🎬 Demo Flow

1. Open the application  
2. Click "Sign up" to create a new user  
3. Click "Log in" to sign in using email/password  
4. Click "Continue with Google" to log in via Google  
5. Confirm both login methods represent the same user (account linking)  
6. Attempt login with unverified email → error is displayed  
7. Observe branded Universal Login:
   - Logo
   - Title: "Welcome Aboard"
   - Description: "Log in to book your travel with Cruise0"
   - Cruise-themed background

## 🔗 Account Linking (PoC)

Accounts are linked using the Auth0 Management API.

Example:

```bash
curl --request POST \
  --url "https://shokemyster.jp.auth0.com/api/v2/users/auth0%7C69eef7406230ed80ec086d4f/identities" \
  --header "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "provider": "google-oauth2",
    "user_id": "107712395213782047751"
  }'
```

Note: PRIMARY_USER_ID must be URL-encoded (auth0%7Cxxxx)

## 🏭 Production Approach (Account Linking)

In a real system:

- User-initiated linking flow
- Verified email required
- Re-authentication required
- Explicit user consent
- Backend service securely calls Management API

## 📧 Email Verification Enforcement

Implemented using Auth0 Post-Login Action:

- If email_verified === false → login denied
- User is redirected back with error
- React app displays the error message

## 🎨 Branding (Universal Login)

Configured using New Universal Login:

- Cruise0 logo
- Title: "Welcome Aboard"
- Description text

Note: Full background customization can be implemented using Universal Login page templates (requires custom domain in production).

## ⚠️ Notes

- This is a PoC, not a production-ready system
- No secrets are stored in this repository
- Management API tokens are generated locally and not committed

## 📌 Future Improvements

- Secure account linking flow with UI
- Backend API integration
- Role-Based Access Control (RBAC)
- Monitoring and logging integrations

## 💬 Summary

This demo shows how Auth0 enables:

- Secure SPA authentication
- Social login integration
- Unified customer identity
- Scalable and customizable login experiences