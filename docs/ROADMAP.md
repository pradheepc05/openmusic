
---

## 2. `docs/ROADMAP.md` (final)

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
| 7     | Backend & deployment     | ✅     | `phase-7` |

**Status legend:** ⏳ not started · 🚧 in progress · ✅ done

## Progress

- ✅ **Phase 1 — Frontend foundation** (tag `phase-1`)
  Vite + React + TS, Tailwind v4, routing shell, layout, placeholder
  pages, SPA rewrite, type-safe env, error boundary.

- ✅ **Phase 2 — UI Implementation** (tag `phase-2`)
  Mock dataset, `SongCard`, `SongList`, `PlaylistCard`, `SafeImage`,
  `Slider`, skeleton states, responsive pages.

- ✅ **Phase 3 — Audius Integration** (tag `phase-3`)
  Shared `http.ts`, `MusicProvider` contract, `audiusProvider` with host
  discovery, `trackMapper`, `providerRegistry`, `musicService`,
  `useMusic` hooks. Real Audius data.

- ✅ **Phase 4 — Jamendo Integration** (tag `phase-4`)
  Optional Jamendo provider, `mapJamendoTrack`, registry update,
  graceful skip when env missing, merged search + trending.

- ✅ **Phase 5 — Audio Engine** (tag `phase-5`)
  Single `Audio()` instance, `playerStore` (queue / shuffle / repeat /
  volume), `useAudioEvents`, `MiniPlayer`, `QueuePanel`, real playback.

- ✅ **Phase 6 — User Library** (tag `phase-6`)
  `libraryStore` (favorites + recently played) and `playlistStore`
  (CRUD), both persisted. Heart toggle and add-to-playlist menu.

- ✅ **Phase 7 — Backend & Deployment** (tag `phase-7`)
  Vercel production deploy, optional Supabase auth + sync, RLS policies,
  first-login migration, deployment readiness verifier.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- Zustand + `zustand/persist`
- React Router v6
- Axios (shared instance in `services/http.ts`)
- HTML5 `<audio>` (single instance in `services/audio.ts`)
- Audius (primary) + Jamendo (optional, licensed)
- Hosting: Vercel · Repo: GitHub · DB (optional): Supabase

## Post-Phase 7 roadmap (optional)

- Two-way Supabase realtime sync
- Password reset / magic-link UI
- Drag-to-reorder playlists
- Keyboard shortcuts (space, arrows)
- Android app via React Native/Expo reusing `src/services/`