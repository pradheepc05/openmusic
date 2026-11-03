# Phase 7 --- Backend & Deployment

**Status:** ✅ Complete\
**Tag:** `phase-7`\
**Completed:** 2026-11-03

**Goal:** Production deployment on Vercel with optional Supabase
accounts.

## Part A --- Vercel (Required)

-   [x] `vercel.json` with SPA catch-all rewrite
-   [x] Environment variables set in the Vercel dashboard:
    -   `VITE_AUDIUS_APP_NAME`
    -   `VITE_JAMENDO_CLIENT_ID`
-   [x] Build command: `npm run build`; output directory: `dist`
-   [x] Deep links (`/search`, `/playlist/:id`, `/login`) resolve to the
    SPA shell
-   [x] Production URL verified with `verify-phase7.ps1`

## Part B --- Supabase (Optional)

-   [x] `@supabase/supabase-js` installed
-   [x] `services/supabase.ts` client (null when environment variables
    are missing)
-   [x] `store/authStore.ts` with `onAuthStateChange` synchronization
-   [x] `pages/Login.tsx` --- sign in / sign up
-   [x] `App.tsx` initializes auth and registers the `/login` route
-   [x] SQL schema: `favorites`, `playlists` with Row Level Security
    (RLS)
-   [x] RLS policies use `(select auth.uid()) = user_id` with
    `WITH CHECK`
-   [x] `services/sync.ts` --- one-way first-login migration
-   [x] Never put the service-role key in a `VITE_*` environment
    variable

## Acceptance Criteria

-   [x] Production URL loads and all routes work on refresh
-   [x] Guests can play, favourite, and create playlists locally
-   [x] Signing in pulls existing cloud favourites and playlists
-   [x] First login pushes local-only items up
-   [x] RLS verified: User A cannot read User B's rows

## Verification (All Passed)

-   [x] `npx tsc -b` --- clean (exit 0)
-   [x] `npm run build` --- succeeds (`✓ built in 4.43s`)
-   [x] `scripts/verify-phase7.ps1` → **Phase 7: PASS** (5/5 sections)
-   [x] 8/8 SPA routes return 200 with the SPA shell

## Files Created in This Phase

**✅**
