import { create } from 'zustand';
import { audio } from '../services/audio';
import { useLibraryStore } from './libraryStore';
import type { Track } from '../types/music';

export type Repeat = 'off' | 'all' | 'one';

interface PlayerState {
  queue: Track[];
  index: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: Repeat;

  playQueue: (tracks: Track[], startIndex?: number) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;

  _ended: () => void;
}

const VOLUME_KEY = 'openmusic:volume';

function loadVolume(): number {
  try {
    const v = Number(localStorage.getItem(VOLUME_KEY));
    return Number.isFinite(v) && v >= 0 && v <= 1 ? v : 0.8;
  } catch {
    return 0.8;
  }
}

function saveVolume(v: number) {
  try {
    localStorage.setItem(VOLUME_KEY, String(v));
  } catch {
    /* ignore */
  }
}

function pickNext(get: () => PlayerState): number {
  const s = get();
  if (s.shuffle && s.queue.length > 1) {
    let i = s.index;
    while (i === s.index) i = Math.floor(Math.random() * s.queue.length);
    return i;
  }
  const i = s.index + 1;
  if (i < s.queue.length) return i;
  return s.repeat === 'all' ? 0 : -1;
}

function startAt(
  set: (p: Partial<PlayerState>) => void,
  get: () => PlayerState,
  i: number,
) {
  const track = get().queue[i];
  if (!track || !track.streamUrl) {
    set({ isPlaying: false });
    return;
  }
  useLibraryStore.getState().addRecentlyPlayed(track);

  audio.src = track.streamUrl;
  audio.currentTime = 0;
  audio.volume = get().muted ? 0 : get().volume;
  set({
    index: i,
    currentTime: 0,
    duration: track.duration || 0,
    isPlaying: true,
  });
  audio.play().catch(() => set({ isPlaying: false }));
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  queue: [],
  index: -1,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: loadVolume(),
  muted: false,
  shuffle: false,
  repeat: 'off',

  playQueue: (tracks, startIndex = 0) => {
    if (!tracks.length) return;
    set({ queue: tracks });
    startAt(set, get, Math.max(0, Math.min(startIndex, tracks.length - 1)));
  },

  toggle: () => {
    if (!audio.src) return;
    if (audio.paused) audio.play().catch(() => set({ isPlaying: false }));
    else audio.pause();
  },

  next: () => {
    const i = pickNext(get);
    if (i >= 0) startAt(set, get, i);
    else set({ isPlaying: false });
  },

  prev: () => {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      set({ currentTime: 0 });
      return;
    }
    const i = get().index - 1;
    if (i >= 0) startAt(set, get, i);
    else {
      audio.currentTime = 0;
      set({ currentTime: 0 });
    }
  },

  seek: (time) => {
    if (!audio.src) return;
    audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0));
    set({ currentTime: audio.currentTime });
  },

  setVolume: (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    audio.volume = clamped;
    audio.muted = false;
    saveVolume(clamped);
    set({ volume: clamped, muted: false });
  },

  toggleMute: () => {
    const muted = !get().muted;
    audio.muted = muted;
    set({ muted });
  },

  toggleShuffle: () => set({ shuffle: !get().shuffle }),

  cycleRepeat: () =>
    set({
      repeat:
        get().repeat === 'off'
          ? 'all'
          : get().repeat === 'all'
          ? 'one'
          : 'off',
    }),

  _ended: () => {
    if (get().repeat === 'one') {
      audio.currentTime = 0;
      audio.play().catch(() => set({ isPlaying: false }));
      return;
    }
    const i = pickNext(get);
    if (i >= 0) startAt(set, get, i);
    else set({ isPlaying: false });
  },
}));

// Apply persisted volume to the actual <audio> element at boot
audio.volume = usePlayerStore.getState().volume;