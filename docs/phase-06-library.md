
---

### `docs/phase-06-library.md`
```markdown
# Phase 6 — User Library

**Goal:** Favourites, playlists, recently played — persisted locally
(localStorage) until Supabase arrives in Phase 7.

## Tasks
- [ ] `store/libraryStore.ts` — `zustand/persist`:
  - [ ] `favorites: Track[]`, `toggleFavorite(t)`
  - [ ] `recentlyPlayed: Track[]` (max 30, newest first)
- [ ] `store/playlistStore.ts` — `zustand/persist`:
  - [ ] `playlists: Playlist[]`
  - [ ] `createPlaylist(name)`
  - [ ] `renamePlaylist(id, name)`
  - [ ] `deletePlaylist(id)`
  - [ ] `addToPlaylist(id, track)`
  - [ ] `removeFromPlaylist(id, trackId)`
- [ ] `utils/storage.ts` — typed wrapper for non-store keys
      (e.g. last search query)
- [ ] `Favorites.tsx` — read from `libraryStore.favorites`
- [ ] `Library.tsx` — tabs: Playlists (from `playlistStore`) +
      Recently Played
- [ ] `Playlist.tsx` — load by `:id` from `playlistStore`
- [ ] Heart icon on `SongCard` / `SongList` → toggles favorite
- [ ] "Add to playlist" menu on track context
- [ ] `playerStore._ended` calls `libraryStore.addRecentlyPlayed(track)`

## Acceptance criteria
- Favouriting a track persists across reload
- Playlist CRUD works and survives reload
- Deleting a playlist removes its route (Playlist page → `NotFound`)
- Recently Played shows last 30 unique tracks
- No track data is lost on reload (persist storage name:
  `openmusic-library`, `openmusic-playlists`)

## Migration note
Phase 7 will replace `zustand/persist` storage with Supabase calls for
authenticated users. Keep store action signatures stable so pages don't
need changing.

## Git
```bash
git checkout -b feat/phase-6-library
git commit -m "feat(library): favorites, playlists, recently played (local)"
git tag phase-6 && git push --tags