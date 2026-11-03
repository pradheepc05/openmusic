# Phase 1 --- Frontend Foundation

**Status:** ✅ Complete\
**Tag:** `phase-1`\
**Completed:** 2026-11-03

**Goal:** Running Vite + React + TS app with Tailwind, routing, layout
shell, and no playback yet.

## Prerequisites

-   Node.js 20+ (`node -v`)
-   npm 10+

## Tasks

-   [x] `npm create vite@latest openmusic -- --template react-ts`
-   [x] Install runtime deps:
    `npm i react-router-dom axios zustand lucide-react`
-   [x] Install dev deps: `npm i -D tailwindcss @tailwindcss/vite`
-   [x] Configure `vite.config.ts` --- add `tailwindcss()` plugin
-   [x] `globals.css` imports `@import "tailwindcss";`
-   [x] Import `globals.css` in `main.tsx`
-   [x] `App.tsx` → `<BrowserRouter>` + `<Routes>` skeleton (7 routes +
    404)
-   [x] `MainLayout.tsx` --- `Sidebar` + `Topbar` + `<Outlet />`
-   [x] Placeholder pages so every route renders
-   [x] `.env.example` committed; `.env.local` git-ignored
-   [x] `vercel.json` SPA rewrite committed
-   [x] `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
    present

## Acceptance criteria

-   [x] `npm run dev` starts on `http://localhost:5173`
-   [x] Every route in `constants/routes.ts` renders without errors
-   [x] Tailwind utility classes visibly apply (e.g. `bg-zinc-950`)
-   [x] Refreshing `/search` does not 404 in `vite preview`

## Verification (all passed)

-   [x] `npx tsc --noEmit` --- clean
-   [x] `npm run lint` --- clean
-   [x] `npm run build` --- succeeds
-   [x] `npm run preview` --- `/search`, `/explore`, `/library`,
    `/playlist/abc`, `/favorites`, `/does-not-exist` all return 200 with
    SPA shell
-   [x] Manual checklist (sidebar, active link, topbar search, 404 page,
    mobile drawer, dark theme) --- all pass
-   [x] No external API calls in Phase 1 (no `audius` / `jamendo` /
    `axios.` references in `src/`)
-   [x] `scripts/verify-phase1.ps1` → **Phase 1: PASS** (6/6 sections, 0
    failures)

## Files created in this phase (all verified ✅)

**✅**
