import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Track } from '../types/music';

interface LibraryState {
  favorites: Track[];
  recentlyPlayed: Track[];

  toggleFavorite: (track: Track) => void;
  isFavorite: (id: string) => boolean;
  addRecentlyPlayed: (track: Track) => void;
  clearRecentlyPlayed: () => void;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      favorites: [],
      recentlyPlayed: [],

      toggleFavorite: (track) =>
        set((s) => ({
          favorites: s.favorites.some((f) => f.id === track.id)
            ? s.favorites.filter((f) => f.id !== track.id)
            : [track, ...s.favorites],
        })),

      isFavorite: (id) => get().favorites.some((f) => f.id === id),

      addRecentlyPlayed: (track) =>
        set((s) => ({
          recentlyPlayed: [
            track,
            ...s.recentlyPlayed.filter((t) => t.id !== track.id),
          ].slice(0, 30),
        })),

      clearRecentlyPlayed: () => set({ recentlyPlayed: [] }),
    }),
    { name: 'openmusic:library', version: 1 },
  ),
);