# Password Generator — Frontend

> Stage 1 · Initial setup and UI

A minimal React interface for configuring and generating passwords via the backend API.

## Stack

- **Framework** — React 18
- **Build tool** — Vite 6
- **Language** — TypeScript 5 (strict mode)
- **Styling** — Tailwind CSS v4

## Structure

```
src/
├── components/
│   ├── PasswordDisplay.tsx   # Password input + copy button
│   └── StrengthIndicator.tsx # Strength bar based on length and class count
├── App.tsx                   # Main UI and state
├── api.ts                    # Fetch wrapper for /api/generate
├── index.css                 # Tailwind import
└── main.tsx                  # Entry point
```

## UI

Per the spec, the interface includes a length slider, four character class toggles, a generate button, a password display, a copy to clipboard button, and a strength indicator.

## Getting Started

```bash
npm install
npm run dev    # http://localhost:5173
```

Requires the backend running on `http://localhost:3001`. Vite proxies `/api` requests automatically.