# Phase 3 --- Audius Integration

**Status:** ✅ Complete\
**Tag:** `phase-3`\
**Completed:** 2026-11-03

**Goal:** Real trending tracks, real search, and real playable stream
URLs from Audius.

## Tasks

-   [x] `services/http.ts` --- shared Axios instance (timeout 15s, error
    normalization interceptor)
-   [x] `services/providers/audiusProvider.ts` --- implements
    `MusicProvider`
    -   [x] Host discovery (`https://api.audius.co` → `data[0]`)
    -   [x] `getTrending(genre?)` via `/v1/tracks/trending`
    -   [x] `search(query)` via `/v1/tracks/search`
    -   [x] `isEnabled()` → always true (open API)
-   [x] `services/mappers/trackMapper.ts`
    -   [x] `mapAudiusTrack(raw, host): Track` (ID prefix `audius:`)
-   [x] `services/providers/providerRegistry.ts` --- register Audius
-   [x] `services/musicService.ts` --- iterate `enabledProviders()`
-   [x] `hooks/useMusic.ts` --- `useTrending(genre?)`, `useSearch(q)`
    with loading/error/data states
-   [x] Wire `Home`, `Search`, and `Explore` to real data
-   [x] `types/env.d.ts` --- `VITE_AUDIUS_APP_NAME: string`
-   [x] `types/provider.ts` --- `MusicProvider` interface

## Acceptance Criteria

-   [x] Home shows real Audius trending tracks with artwork and artist
    names
-   [x] Search returns Audius results for a real artist
-   [x] Every `Track` has `id` (`audius:<realId>`), `provider`, and
    `streamUrl`
-   [x] Network errors surface via `EmptyState` with an error message
-   [x] No Axios import outside `services/http.ts`
-   [x] No mock data used by Home / Search / Explore

## Verification (All Passed)

-   [x] `npx tsc -b` --- clean (exit 0)
-   [x] `npm run build` --- succeeds
-   [x] `api.audius.co` returns a host list
-   [x] `/v1/tracks/trending` returns tracks
-   [x] `/v1/tracks/search?query=lofi` returns tracks
-   [x] Mapper produces `audius:` prefixed IDs and `/v1/tracks/*/stream`
    URLs
-   [x] `npm run preview` --- all routes return 200 with SPA shell
-   [x] `scripts/verify-phase3.ps1` → **Phase 3: PASS** (5/5 sections)

## Files created in this phase (all verified ✅)

**✅**
