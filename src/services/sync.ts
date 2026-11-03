import { supabase } from './supabase';
import { useLibraryStore } from '../store/libraryStore';
import { usePlaylistStore } from '../store/playlistStore';
import type { Playlist, Track } from '../types/music';

/** Push current local favorites and playlists to Supabase. */
export async function pushLocalToCloud(userId: string) {
  if (!supabase) return;

  const { favorites } = useLibraryStore.getState();
  const { playlists } = usePlaylistStore.getState();

  // Favorites
  if (favorites.length > 0) {
    await supabase.from('favorites').upsert(
      favorites.map((t) => ({
        user_id: userId,
        track_id: t.id,
        track: t,
      })),
      { onConflict: 'user_id,track_id' },
    );
  }

  // Playlists
  for (const p of playlists) {
    await supabase.from('playlists').upsert(
      {
        id: p.id,
        user_id: userId,
        name: p.name,
        tracks: p.tracks,
      },
      { onConflict: 'id' },
    );
  }
}

/** Pull cloud favorites and playlists into the local stores. */
export async function pullCloudToLocal(userId: string) {
  if (!supabase) return;

  const [favs, pls] = await Promise.all([
    supabase.from('favorites').select('track').eq('user_id', userId),
    supabase.from('playlists').select('*').eq('user_id', userId),
  ]);

  if (favs.data) {
    useLibraryStore.setState({
      favorites: favs.data.map((r) => r.track as Track),
    });
  }

  if (pls.data) {
    usePlaylistStore.setState({
      playlists: pls.data.map((r) => ({
        id: r.id,
        name: r.name,
        tracks: r.tracks as Track[],
        createdAt: new Date(r.created_at).getTime(),
      })) as Playlist[],
    });
  }
}