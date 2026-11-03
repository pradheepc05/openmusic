
---

## 2. `docs/ROADMAP.md` (updated table + progress)

```markdown
# OpenMusic Roadmap

| Phase | Name                     | Status | Tag       |
|-------|--------------------------|--------|-----------|
| 1     | Frontend foundation      | ✅     | `phase-1` |
| 2     | UI implementation        | ✅     | `phase-2` |
| 3     | Audius integration       | ⏳     | `phase-3` |
| 4     | Jamendo integration      | ⏳     | `phase-4` |
| 5     | Audio engine             | ⏳     | `phase-5` |
| 6     | User library             | ⏳     | `phase-6` |
| 7     | Backend & deployment     | ⏳     | `phase-7` |

**Status legend:** ⏳ not started · 🚧 in progress · ✅ done

## Progress

- ✅ **Phase 1 — Frontend foundation** (tag `phase-1`)
  Vite + React + TS, Tailwind v4, routing shell, layout,
  placeholder pages, SPA rewrite, type-safe env, error boundary.
  Verified by `scripts/verify-phase1.ps1` — 6/6 sections pass.

- ✅ **Phase 2 — UI Implementation** (tag `phase-2`)
  Mock dataset (20 tracks, 4 playlists, 8 genres), `SongCard`,
  `SongList`, `PlaylistCard`, `SafeImage`, `Slider`, skeleton states,
  responsive Home / Search / Explore / Library / Favorites / Playlist
  pages. Verified by `scripts/verify-phase2.ps1` — 5/5 sections pass.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- Zustand + `zustand/persist`
- React Router v6
- Axios (shared instance in `services/http.ts` — Phase 3)
- HTML5 `<audio>` (single instance in `services/audio.ts` — Phase 5)
- Audius (primary) + Jamendo (optional, licensed)
- Hosting: Vercel · Repo: GitHub · DB (Phase 7): Supabase