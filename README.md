```
# iFiCodeFood

This repository contains the source code for the iFiCodeFood application, split into two sub-projects:
- **client/**: React frontend
- **server/**: Node.js/Express backend

## Prerequisites

- Git (>= 2.x)
- Node.js (>= 14.x)
- Yarn (>= 1.22.x)

## Setup

1. Clone the repository  
   ```
   git clone https://github.com/your-org/iFiCodeFood.git
   cd iFiCodeFood
   ```

2. Copy and configure environment variables  
   ```
   cp .env.example .env
   ```
   - Open `.env` in your editor  
   - Fill in any required credentials (database URI, API keys, etc.)

3. Install dependencies  
   ```
   # From the project root
   cd client && yarn install
   cd ../server && yarn install
   ```

## Development

Launch both the frontend and backend in development mode:

```bash
# In one terminal
cd client
yarn start

# In another terminal
cd server
yarn start
```

- Frontend will run on http://localhost:3000  
- Backend API will run on http://localhost:5000 (or the port specified in your .env)

## Build & Deployment

### Client

1. Build the production bundle  
   ```bash
   cd client
   yarn build
   ```
2. Deploy the contents of `client/build/` to your static hosting provider.

### Server

1. Ensure the `.env` file on your production server is correctly configured.
2. Install dependencies and start in production mode:  
   ```bash
   cd server
   yarn install --production
   NODE_ENV=production yarn start
   ```
3. Configure your process manager (e.g., PM2, systemd) or platform (Heroku, AWS, etc.) to keep the server running.

---

You're all set! Reach out to the dev team if you run into any setup issues.