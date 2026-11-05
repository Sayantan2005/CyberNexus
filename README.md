# CyberNexus

A MERN-based cybersecurity community platform for cybersecurity students, beginner ethical hackers and CTF enthusiasts.

## Features

- JWT authentication and role-based access
- Cybersecurity news feed
- Automated RSS news ingestion
- CTF directory and filtering
- Community groups
- Group posts and comments
- User profiles
- Bookmarks
- Admin dashboard
- Responsive React + Tailwind UI

## Architecture

React/Vite/Tailwind -> Express/Node -> MongoDB
                         ^
                         |
                  Automation worker
                  (RSS + node-cron)

## Requirements

- Node.js 20+
- MongoDB local or MongoDB Atlas
- npm

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 3. Automation

```bash
cd automation
npm install
cp .env.example .env
npm run dev
```

The automation worker can run once on startup and then every 30 minutes.

## Default URLs

Frontend: http://localhost:5173
Backend: http://localhost:5000

## Security notes

- Never commit `.env`
- Never put API keys or MongoDB credentials in the frontend
- Use strong JWT secrets in production
- Restrict CORS to the deployed frontend origin
- Validate all incoming data on the server
- Rate-limit authentication endpoints before production
