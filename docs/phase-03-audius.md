
---

### `docs/phase-03-audius.md`
```markdown
# Phase 3 — Audius Integration

**Goal:** Real trending tracks, real search, real playable stream URLs
from Audius.

## Tasks
- [ ] `services/http.ts` — shared axios instance (timeout 15s,
      error normalization interceptor)
- [ ] `services/providers/audiusProvider.ts` — implements `MusicProvider`
  - [ ] host discovery (`https://api.audius.co` → `data[0]`)
  - [ ] `getTrending(genre?)` via `/v1/tracks/trending`
  - [ ] `search(query)` via `/v1/tracks/search`
  - [ ] `isEnabled()` → `!!import.meta.env.VITE_AUDIUS_APP_NAME`
- [ ] `services/mappers/trackMapper.ts`
  - [ ] `mapAudiusTrack(raw): Track` (id prefix `audius:`)
- [ ] `services/providers/providerRegistry.ts` — register Audius
- [ ] `services/musicService.ts` — iterate `enabledProviders()`
- [ ] `hooks/useMusic.ts` — `useTrending(genre?)`, `useSearch(q)`
      with loading/error/data states
- [ ] Wire `Home`, `Search`, `Explore` to real data
- [ ] `types/env.d.ts` — `VITE_AUDIUS_APP_NAME: string`

## Acceptance criteria
- Home shows real Audius trending tracks with artwork and artist names
- Search returns Audius results for a real artist (e.g. "deadmau5")
- Clicking a track sets a real `streamUrl` on `services/audio.ts`
  and the browser's native `<audio>` console shows playback
  (controls not wired yet — that's Phase 5)
- Network errors show `ErrorBoundary` fallback, not a white screen

## Risks / notes
- **Stream URLs can expire.** Always re-fetch on play; never persist.
- **Rate limits.** Cache trending results in `sessionStorage`
  for 5 minutes.
- **CORS.** Audius allows browser calls; if blocked later, insert a
  Vercel serverless proxy in front of `services/http.ts` `baseURL`.

## Git
```bash
git checkout -b feat/phase-3-audius
git commit -m "feat(audius): provider, mapper, useMusic hook, real trending"
git tag phase-3 && git push --tags