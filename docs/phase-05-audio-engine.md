# Phase 5 --- Audio Engine

**Status:** ✅ Complete\
**Tag:** `phase-5`\
**Completed:** 2026-11-03

**Goal:** Persistent playback across routes, queue with shuffle / repeat
/ volume, mini player fixed at the bottom, and queue drawer.

## Tasks

-   [x] `services/audio.ts` --- single module-level `new Audio()`
    instance
-   [x] `store/playerStore.ts` --- queue, index, play state, volume,
    shuffle, and repeat
    -   [x] `playQueue(tracks, startIndex)`
    -   [x] `toggle`, `next`, `prev`, `seek`
    -   [x] `setVolume`, `toggleMute`
    -   [x] `toggleShuffle`, `cycleRepeat`
    -   [x] `_ended` --- respects `repeat: 'one' | 'all' | 'off'`
-   [x] `hooks/useAudioEvents.ts` --- bound once (module flag guards
    StrictMode)
-   [x] `hooks/usePlayer.ts` --- selector wrapper
-   [x] `PlayerControls.tsx` --- play/pause, prev/next, shuffle, repeat
-   [x] `ProgressBar.tsx` --- seek slider and time labels
-   [x] `VolumeControl.tsx` --- slider and mute toggle
-   [x] `MiniPlayer.tsx` --- fixed bottom bar in `MainLayout`
-   [x] `QueuePanel.tsx` --- right-side drawer with current-track
    highlight
-   [x] `SongCard` / `SongList` clicks → `playQueue`
-   [x] Volume persisted in `localStorage` (`openmusic:volume`)

## Acceptance Criteria

-   [x] Audio plays across route navigation without interruption
-   [x] Only one `<audio>` element exists in the DOM at any time
-   [x] Queue plays sequentially and respects shuffle
-   [x] `Repeat: one` loops the same track on `ended`
-   [x] `Repeat: all` wraps the queue back to index 0
-   [x] Volume value persists across reloads
-   [x] Clicking a queue item jumps to that track
-   [x] Mini player shows current track artwork, title, artist, and
    controls

## Verification (All Passed)

-   [x] `npx tsc -b` --- clean (exit 0)
-   [x] `npm run build` --- succeeds
-   [x] `scripts/verify-phase5.ps1` → **Phase 5: PASS** (5/5 sections)
-   [x] Manual smoke test --- play, seek, next, previous, shuffle,
    repeat, volume, and queue all work

## Files Created in This Phase

**✅**
