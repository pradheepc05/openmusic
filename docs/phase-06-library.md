# Phase 6 --- User Library

**Status:** ✅ Complete\
**Tag:** `phase-6`\
**Completed:** 2026-11-03

**Goal:** Favourites, playlists, and recently played --- persisted
locally via `zustand/persist` until Supabase arrives in Phase 7.

## Tasks

-   [x] `store/libraryStore.ts` --- `zustand/persist`
    -   [x] `favorites: Track[]` + `toggleFavorite(t)`
    -   [x] `recentlyPlayed: Track[]` (maximum 30, newest first,
        deduplicated)
    -   [x] `isFavorite(id)` helper
    -   [x] `clearRecentlyPlayed()`
-   [x] `store/playlistStore.ts` --- `zustand/persist`
    -   [x] `playlists: Playlist[]`
    -   [x] `createPlaylist(name)` → returns new ID
    -   [x] `renamePlaylist(id, name)`
    -   [x] `deletePlaylist(id)`
    -   [x] `addToPlaylist(id, track)` --- deduplicated
    -   [x] `removeFromPlaylist(id, trackId)`
    -   [x] `getPlaylist(id)` selector
-   [x] `playerStore.startAt` →
    `useLibraryStore.addRecentlyPlayed(track)`
-   [x] `components/music/FavoriteButton.tsx` --- heart toggle
-   [x] `components/music/AddToPlaylistMenu.tsx` --- dropdown + "New
    playlist"
-   [x] `components/music/CreatePlaylistDialog.tsx` --- modal
-   [x] `SongCard` shows heart and add-to-playlist controls on hover
-   [x] `SongList` shows heart and add-to-playlist controls per row
-   [x] `Favorites.tsx` reads `libraryStore.favorites`
-   [x] `Library.tsx` --- tabs: Playlists + Recently Played, "New
    playlist" button
-   [x] `Playlist.tsx` --- reads `playlistStore`, supports rename,
    delete, remove-track, and empty state

## Acceptance Criteria

-   [x] Favouriting a track persists across reloads
-   [x] Playlist CRUD survives reloads
-   [x] Deleting a playlist removes its route (Playlist page →
    EmptyState)
-   [x] Recently Played shows the last 30 unique tracks
-   [x] Adding a track to a playlist twice is a no-op
-   [x] "New playlist" from the add-to-playlist menu adds the current
    track

## Verification (All Passed)

-   [x] `npx tsc -b` --- clean (exit 0)
-   [x] `npm run build` --- succeeds
-   [x] `scripts/verify-phase6.ps1` → **Phase 6: PASS** (5/5 sections)
-   [x] Manual smoke test --- favourite, create playlist, add track,
    rename, delete, and recently played all work

## Files Created in This Phase

**✅**
