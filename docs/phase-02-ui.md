
---

### `docs/phase-02-ui.md`
```markdown
# Phase 2 — UI Implementation

**Goal:** All screens render with static mock data. Player is a shell —
no real audio yet.

## Tasks
- [ ] `Sidebar.tsx` — nav links via `routes.ts`, active state
- [ ] `Topbar.tsx` — search input that pushes `/search?q=…`
- [ ] `Home.tsx` — greeting + horizontal shelves (trending, popular,
      recently played)
- [ ] `Search.tsx` — query from URL, debounced input, song grid
- [ ] `Explore.tsx` — genre/mood chips → filters
- [ ] `Library.tsx` — playlists + favorites tabs
- [ ] `Favorites.tsx` — favorites list
- [ ] `Playlist.tsx` — header + song list for `/playlist/:id`
- [ ] `NotFound.tsx` — 404
- [ ] Music components: `SongCard`, `SongList`, `PlaylistCard`
- [ ] Common: `Skeleton`, `EmptyState`, `Loader`, `SafeImage`,
      `ErrorBoundary`
- [ ] Responsive breakpoints: mobile sidebar drawer, `sm/md/lg` grids

## Acceptance criteria
- Every page renders with mock data from `src/mocks/` (or inline arrays)
- Sidebar collapses to drawer on `< md`
- Skeleton shows while data is mocked as loading
- Lighthouse mobile ≥ 90 for Performance and Accessibility on Home

## Files touched
`src/components/**`, `src/pages/**`, `src/constants/config.ts`

## Git
```bash
git checkout -b feat/phase-2-ui
git commit -m "feat(ui): home, search, explore, library pages with mocks"
git tag phase-2 && git push --tags