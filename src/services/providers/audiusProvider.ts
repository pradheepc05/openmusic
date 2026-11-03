import { http } from '../http';
import { mapAudiusTrack } from '../mappers/trackMapper';
import type { MusicProvider } from '../../types/provider';
import type { Track } from '../../types/music';

const APP_NAME = import.meta.env.VITE_AUDIUS_APP_NAME ?? 'OpenMusic';
const DISCOVERY_URL = 'https://api.audius.co';

let hostPromise: Promise<string> | null = null;

/**
 * Audius recommends selecting a host at startup because availability
 * can change. We cache the first host for the session.
 * Ref: audius.gitbook.io — "selecting a host each time your application starts up"[reference:3]
 */
async function getHost(): Promise<string> {
  if (!hostPromise) {
    hostPromise = http
      .get<{ data: string[] }>(DISCOVERY_URL)
      .then((r) => r.data.data[0]);
  }
  return hostPromise;
}

async function fetchTracks(
  path: string,
  params: Record<string, unknown>,
): Promise<Track[]> {
  const host = await getHost();
  const { data } = await http.get(`${host}${path}`, {
    params: { app_name: APP_NAME, ...params },
  });

  const raw = Array.isArray(data.data) ? data.data : [];
  return raw.map((t: any) => mapAudiusTrack(t, host));
}

export const audiusProvider: MusicProvider = {
  id: 'audius',

  isEnabled() {
    return true; // Audius is open; app_name is encouraged but not strictly required
  },

  async getTrending(genre?: string) {
    return fetchTracks('/v1/tracks/trending', {
      limit: 24,
      ...(genre ? { genre } : {}),
    });
  },

  async search(query: string) {
    if (!query.trim()) return [];
    return fetchTracks('/v1/tracks/search', {
      query: query.trim(),
      limit: 24,
    });
  },
};