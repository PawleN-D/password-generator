# Password Generator — Backend

> Stage 1 · Initial architecture and tooling

A lightweight REST API that generates passwords based on user-defined options. Single endpoint, no database, no auth.

## Stack

- **Runtime** — Node.js 18+
- **Framework** — Express 4
- **Language** — TypeScript 5 (strict mode)
- **Dev** — ts-node-dev

## Structure

```
src/
├── server.ts          # Entry point
├── routes/
│   └── generate.ts    # HTTP layer — parse, validate, respond
└── lib/
    └── password.ts    # Pure generation logic — no framework dependency
```

## API

`GET /api/generate`

| Param | Default | Constraints |
|---|---|---|
| `length` | `12` | Integer, 6–99 |
| `useUpperCase` | `true` | boolean |
| `useLowerCase` | `true` | boolean |
| `useNumber` | `true` | boolean |
| `useSpecialChar` | `false` | boolean |

`200` → `text/plain` password string  
`400` → `application/json` `{ "error": "reason" }`

## Getting Started

```bash
npm install
npm run dev    # http://localhost:3001
```