# Leashed

Standard Next.js App Router project.

## Structure

- `src/app` — routes, layouts, and styles
- `src/components` — React components
- `src/lib` — shared TypeScript utilities
- `public` — optimized static assets

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

For a separate API service, copy `.env.example` to `.env.local` and set `BACKEND_URL`.

This source package excludes `node_modules`, `.next`, build caches, test captures, design references, and unused working assets.
