# The Wedding Entity

Next.js 16 App Router site for The Wedding Entity. One app, one command: `npm run dev`.

The tree is split so UI stays in `src/frontend`, data and form services stay in `src/backend`, and Next.js routes stay in `src/app`.

```
src/
  app/                      # routes, layout, metadata, API handlers
    api/inquiry/route.ts
    api/newsletter/route.ts
  frontend/                 # UI only
    components/{chrome,home,interior,marks,motion}
    hooks/
    styles/
    lib/api.ts              # fetch helper for /api/*
  backend/                  # data + server logic
    content/                # navigation, copy, frames
    services/               # inquiry + newsletter stores
    lib/validation.ts
```

Aliases:

- `@/*` → `src/*`
- `@frontend/*` → `src/frontend/*`
- `@backend/*` → `src/backend/*`

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Forms

- Contact inquiry posts to `POST /api/inquiry` with `{ name, email, eventType, eventDate?, location?, message }`.
- Newsletter forms post to `POST /api/newsletter` with `{ email }`.
- Both stores are in-memory for now (reset on server restart).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run test:unit` | Vitest |
| `npm run test:e2e` | Playwright |
| `npm run verify:independence` | Brand-independence scan |
| `npm run quality` | lint + types + unit + build + independence |
