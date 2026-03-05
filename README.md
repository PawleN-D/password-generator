# Password Generator

> Full-stack password generator — React frontend + Express backend

A minimal web app that generates passwords based on user-selected options. Configured via a simple UI, served through a REST API.

## Structure

```
password-generator/
├── backend/    # Express + TypeScript  (port 3001)
└── frontend/   # Vite + React + TypeScript  (port 5173)
```

## Getting Started

Run both servers in separate terminals.

**Backend**
```bash
cd backend
npm install
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## How It Works

The frontend sends a `GET` request to `/api/generate` with the user's selected options as query params. Vite proxies the request to the backend at `localhost:3001`, which validates the options, generates the password, and returns it as plain text.