import { http } from '../http';
import { mapJamendoTrack } from '../mappers/trackMapper';
import type { MusicProvider } from '../../types/provider';
import type { Track } from '../../types/music';

const BASE = 'https://api.jamendo.com/v3.0/tracks/';

/** Our genre chips → Jamendo tags (lowercase, no spaces). */
const GENRE_TO_TAG: Record<string, string> = {
  Electronic: 'electronic',
  'Lo-fi': 'lofi',
  'Hip Hop': 'hiphop',
  Rock: 'rock',
  Jazz: 'jazz',
  Ambient: 'ambient',
  Pop: 'pop',
  Indie: 'indie',
};

function clientId(): string | undefined {
  const v = import.meta.env.VITE_JAMENDO_CLIENT_ID;
  return v && v.trim() ? v.trim() : undefined;
}

async function fetchTracks(params: Record<string, unknown>): Promise<Track[]> {
  const id = clientId();
  if (!id) return [];

  const { data } = await http.get(BASE, {
    params: {
      client_id: id,
      format: 'json',
      limit: 24,
      include: 'musicinfo',
      audioformat: 'mp32',
      ...params,
    },
  });

  return (data.results ?? []).map(mapJamendoTrack);
}

export const jamendoProvider: MusicProvider = {
  id: 'jamendo',

  isEnabled() {
    return !!clientId();
  },

  async getTrending(genre?: string) {
    const tag = genre ? GENRE_TO_TAG[genre] : undefined;
    return fetchTracks(
      tag
        ? { tags: tag, order: 'popularity_month' }
        : { order: 'popularity_total' },
    );
  },

  async search(query: string) {
    const q = query.trim();
    if (!q) return [];
    return fetchTracks({ search: q, order: 'relevance' });
  },
};