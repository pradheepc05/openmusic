
---

### `docs/phase-05-audio-engine.md`
```markdown
# Phase 5 — Audio Engine

**Goal:** Fully functional persistent player: play/pause, seek, next,
prev, shuffle, repeat, volume, queue, mini-player. Audio continues
across route changes.

## Tasks
- [ ] `services/audio.ts` — single `new Audio()` instance, `preload=auto`
- [ ] `store/playerStore.ts` — `queue`, `index`, `isPlaying`,
      `currentTime`, `duration`, `volume`, `muted`, `shuffle`, `repeat`
      and actions: `playQueue`, `toggle`, `next`, `prev`, `seek`,
      `setVolume`, `toggleMute`, `toggleShuffle`, `cycleRepeat`
- [ ] `hooks/useAudioEvents.ts` — **mount exactly once** in `MainLayout`:
  - [ ] `timeupdate` → `currentTime`
  - [ ] `loadedmetadata` → `duration`
  - [ ] `play` / `pause` → `isPlaying`
  - [ ] `ended` → `_ended()` (respect repeat-one)
- [ ] `hooks/usePlayer.ts` — thin wrapper reading store
- [ ] `PlayerControls.tsx` — play/pause/next/prev/shuffle/repeat
- [ ] `ProgressBar.tsx` + `VolumeControl.tsx` — both use `common/Slider.tsx`
- [ ] `MiniPlayer.tsx` — fixed bottom bar: cover, title, artist, controls,
      progress
- [ ] `MusicPlayer.tsx` — full "Now Playing" page view
- [ ] `QueuePanel.tsx` — slide-over drawer showing queue + reorder
- [ ] `SongList` — row click → `playQueue(tracks, index)`
- [ ] Guard: `useAudioEvents` mounted only in `MainLayout`
- [ ] Autoplay-blocked fallback: catch `play()` rejection → `isPlaying=false`

## Acceptance criteria
- Pressing play on a song starts audio
- Navigating between pages does **not** stop playback
- Next/prev work; `repeat=one` replays the same track on `ended`
- Shuffle picks a different index; `repeat=all` loops the queue
- Volume slider + mute toggle work; value persists on reload
- Only **one** `<audio>` element exists in DOM at any time

## Known gotchas
- Multiple `useAudioEvents()` mounts → duplicate `ended` events →
  double-advance. Guard with a module-level flag or mount once.
- Browser autoplay policy: first `play()` must follow a user gesture.
- Don't put `streamUrl` in `localStorage` — it expires.

## Git
```bash
git checkout -b feat/phase-5-audio-engine
git commit -m "feat(player): persistent audio, queue, shuffle, repeat"
git tag phase-5 && git push --tags