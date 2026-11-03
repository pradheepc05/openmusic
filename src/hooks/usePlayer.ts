import { usePlayerStore } from '../store/playerStore';

export function usePlayer() {
  return {
    currentTrack: usePlayerStore((s) => s.queue[s.index] ?? null),
    isPlaying: usePlayerStore((s) => s.isPlaying),
    currentTime: usePlayerStore((s) => s.currentTime),
    duration: usePlayerStore((s) => s.duration),
    volume: usePlayerStore((s) => s.volume),
    muted: usePlayerStore((s) => s.muted),
    shuffle: usePlayerStore((s) => s.shuffle),
    repeat: usePlayerStore((s) => s.repeat),
    queueLength: usePlayerStore((s) => s.queue.length),
  };
}