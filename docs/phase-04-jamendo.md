# Phase 4 --- Jamendo Integration

**Status:** ✅ Complete\
**Tag:** `phase-4`\
**Completed:** 2026-11-03

**Goal:** Add Jamendo as an optional licensed provider. Disabled by
default when no client ID is configured.

## Tasks

-   [x] Register / obtain Jamendo client ID (test key `709fa152` used
    during development)
-   [x] `.env.example` --- `VITE_JAMENDO_CLIENT_ID` placeholder present
-   [x] `services/providers/jamendoProvider.ts` --- implements
    `MusicProvider`
    -   [x] `isEnabled()` → `!!VITE_JAMENDO_CLIENT_ID`
    -   [x] `getTrending(genre?)` → `/tracks/?order=popularity_total`
        (or `tags=<tag>&order=popularity_month` when genre is set)
    -   [x] `search(q)` → `/tracks/?search=<q>&order=relevance`
    -   [x] `audioformat=mp32`, `include=musicinfo`
-   [x] `trackMapper.ts` --- `mapJamendoTrack(raw)` (ID prefix
    `jamendo:`)
-   [x] `providerRegistry.ts` --- register Jamendo
-   [x] Provider badge on `SongCard` (already shipped in Phase 2)
-   [x] README attribution section added

## Acceptance Criteria

-   [x] With client ID set: search returns merged Audius + Jamendo
    results
-   [x] With client ID empty: app runs unchanged, Jamendo is silently
    skipped
-   [x] Every Jamendo track has `provider: 'jamendo'`, `permalink`, and
    `streamUrl` pointing to `raw.audio`
-   [x] No secret leaked --- only `VITE_JAMENDO_CLIENT_ID` (public) is
    present

## Verification (All Passed)

-   [x] `npx tsc -b` --- clean (exit 0)
-   [x] `npm run build` --- succeeds
-   [x] `providerRegistry` imports and lists both providers
-   [x] `mapJamendoTrack` present in mapper
-   [x] Graceful skip when client ID is missing
-   [x] Jamendo `/tracks/` responds with `headers.status = 'succeed'`
-   [x] Jamendo search `"lofi"` returns results
-   [x] Jamendo tag `"lofi"` returns results
-   [x] `npm run preview` --- all routes return 200 with SPA shell
-   [x] `scripts/verify-phase4.ps1` → **Phase 4: PASS** (5/5 sections)

## Files Created in This Phase

**✅**
