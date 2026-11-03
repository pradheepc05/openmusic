import { useEffect } from 'react';
import { audio } from '../services/audio';
import { usePlayerStore } from '../store/playerStore';

/**
 * Mount once at app root (MainLayout). A module-level `bound` flag
 * makes this safe under React StrictMode / HMR double-invocation.
 */
let bound = false;

export function useAudioEvents() {
  useEffect(() => {
    if (bound) return;
    bound = true;

    const onTime = () => usePlayerStore.setState({ currentTime: audio.currentTime });
    const onMeta = () => usePlayerStore.setState({ duration: audio.duration || 0 });
    const onPlay = () => usePlayerStore.setState({ isPlaying: true });
    const onPause = () => usePlayerStore.setState({ isPlaying: false });
    const onEnded = () => usePlayerStore.getState()._ended();
    const onError = () => usePlayerStore.setState({ isPlaying: false });

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('durationchange', onMeta);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('durationchange', onMeta);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      bound = false;
    };
  }, []);
}