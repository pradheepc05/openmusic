# OpenMusic Roadmap

| Phase | Name                     | Status | Tag       |
|-------|--------------------------|--------|-----------|
| 1     | Frontend foundation      | ⏳     | `phase-1` |
| 2     | UI implementation        | ⏳     | `phase-2` |
| 3     | Audius integration       | ⏳     | `phase-3` |
| 4     | Jamendo integration      | ⏳     | `phase-4` |
| 5     | Audio engine             | ⏳     | `phase-5` |
| 6     | User library             | ⏳     | `phase-6` |
| 7     | Backend & deployment     | ⏳     | `phase-7` |

**Status legend:** ⏳ not started · 🚧 in progress · ✅ done

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- Zustand + `zustand/persist`
- React Router v6
- Axios (shared instance in `services/http.ts`)
- HTML5 `<audio>` (single instance in `services/audio.ts`)
- Audius (primary) + Jamendo (optional, licensed)
- Hosting: Vercel · Repo: GitHub · DB (Phase 7): Supabase