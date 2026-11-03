# Phase 1 — Frontend Foundation

**Goal:** Running Vite + React + TS app with Tailwind, routing, layout shell,
and no playback yet.

## Prerequisites
- Node.js 20+ (`node -v`)
- npm 10+

## Tasks
- [ ] `npm create vite@latest openmusic -- --template react-ts`
- [ ] Install runtime deps:
      `npm i react-router-dom axios zustand lucide-react`
- [ ] Install dev deps:
      `npm i -D tailwindcss @tailwindcss/vite`
- [ ] Configure `vite.config.ts` — add `tailwindcss()` plugin
- [ ] `globals.css` imports `@import "tailwindcss";`
- [ ] Import `globals.css` in `main.tsx`
- [ ] `App.tsx` → `<BrowserRouter>` + `<Routes>` skeleton (7 routes + 404)
- [ ] `MainLayout.tsx` — `Sidebar` + `Topbar` + `<Outlet />`
- [ ] Placeholder pages so every route renders
- [ ] `.env.example` committed; `.env.local` git-ignored
- [ ] `vercel.json` SPA rewrite committed
- [ ] `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` present

## Acceptance criteria
- `npm run dev` starts on `http://localhost:5173`
- Every route in `constants/routes.ts` renders without errors
- Tailwind utility classes visibly apply (e.g. `bg-zinc-950`)
- Refreshing `/search` does not 404 in `vite preview`

## Files touched
`vite.config.ts`, `src/main.tsx`, `src/App.tsx`,
`src/styles/globals.css`, `src/components/layout/*`,
`src/pages/*` (stubs), `src/constants/routes.ts`,
`.env.example`, `.gitignore`, `vercel.json`

## Git
```bash
git checkout -b feat/phase-1-foundation
# ...work...
git add .
git commit -m "feat(foundation): vite + tailwind + routing shell"
git push -u origin feat/phase-1-foundation
# merge PR → main, then:
git tag phase-1 && git push --tags