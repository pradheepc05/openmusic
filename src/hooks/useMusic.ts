import { useEffect, useState } from 'react';
import type { Track } from '../types/music';   // ← add this line

export interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export function useTrending(genre?: string): AsyncState<Track[]> {
  const [state, setState] = useState<AsyncState<Track[]>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: [], loading: true, error: null });

    import('../services/musicService')
      .then(({ musicService }) => musicService.getTrending(genre))
      .then((tracks) => {
        if (!cancelled) setState({ data: tracks, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: [], loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [genre]);

  return state;
}

export function useSearch(query: string): AsyncState<Track[]> {
  const [state, setState] = useState<AsyncState<Track[]>>({
    data: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setState({ data: [], loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ data: [], loading: true, error: null });

    import('../services/musicService')
      .then(({ musicService }) => musicService.search(trimmed))
      .then((tracks) => {
        if (!cancelled) setState({ data: tracks, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: [], loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return state;
}