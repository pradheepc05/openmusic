
---

## 2. `docs/ROADMAP.md` (full replacement)

```markdown
# OpenMusic Roadmap

| Phase | Name                     | Status | Tag       |
|-------|--------------------------|--------|-----------|
| 1     | Frontend foundation      | ✅     | `phase-1` |
| 2     | UI implementation        | ✅     | `phase-2` |
| 3     | Audius integration       | ✅     | `phase-3` |
| 4     | Jamendo integration      | ✅     | `phase-4` |
| 5     | Audio engine             | ✅     | `phase-5` |
| 6     | User library             | ✅     | `phase-6` |
| 7     | Backend & deployment     | ⏳     | `phase-7` |

**Status legend:** ⏳ not started · 🚧 in progress · ✅ done

## Progress

- ✅ **Phase 1 — Frontend foundation** (tag `phase-1`)
  Vite + React + TS, Tailwind v4, routing shell, layout,
  placeholder pages, SPA rewrite, type-safe env, error boundary.
  Verified by `scripts/verify-phase1.ps1`.

- ✅ **Phase 2 — UI Implementation** (tag `phase-2`)
  Mock dataset, `SongCard`, `SongList`, `PlaylistCard`, `SafeImage`,
  `Slider`, skeleton states, responsive pages. Verified by
  `scripts/verify-phase2.ps1`.

- ✅ **Phase 3 — Audius Integration** (tag `phase-3`)
  Shared `http.ts`, `MusicProvider` contract, `audiusProvider` with
  host discovery, `trackMapper`, `providerRegistry`, `musicService`,
  `useMusic` hooks. Real Audius data. Verified by
  `scripts/verify-phase3.ps1`.

- ✅ **Phase 4 — Jamendo Integration** (tag `phase-4`)
  Optional Jamendo provider, `mapJamendoTrack`, registry update,
  graceful skip when env missing, merged search + trending.
  Verified by `scripts/verify-phase4.ps1`.

- ✅ **Phase 5 — Audio Engine** (tag `phase-5`)
  Single `Audio()` instance, `playerStore` (queue / shuffle / repeat /
  volume), `useAudioEvents`, `MiniPlayer`, `QueuePanel`, real playback
  across Home / Search / Explore / Playlist. Verified by
  `scripts/verify-phase5.ps1`.

- ✅ **Phase 6 — User Library** (tag `phase-6`)
  `libraryStore` (favorites + recently played) and `playlistStore`
  (CRUD), both persisted with `zustand/persist`. Heart toggle and
  add-to-playlist menu on cards and rows. Library / Favorites /
  Playlist pages use real stores. Verified by
  `scripts/verify-phase6.ps1`.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- Zustand + `zustand/persist`
- React Router v6
- Axios (shared instance in `services/http.ts`)
- HTML5 `<audio>` (single instance in `services/audio.ts`)
- Audius (primary) + Jamendo (optional, licensed)
- Hosting: Vercel · Repo: GitHub · DB (Phase 7): Supabase