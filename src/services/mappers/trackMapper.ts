import type { Track } from '../../types/music';

/**
 * Maps a raw Audius track response to the app's Track shape.
 * Raw shape reference: docs.audius.co/sdk/tracks
 */
export function mapAudiusTrack(raw: any, host: string): Track {
  return {
    id: `audius:${raw.id}`,
    provider: 'audius',
    title: raw.title ?? 'Untitled',
    artist: raw.user?.name ?? raw.user?.handle ?? 'Unknown artist',
    artwork:
      raw.artwork?.['480x480'] ??
      raw.artwork?.['150x150'] ??
      undefined,
    duration: Number(raw.duration) || 0,
    streamUrl: `${host}/v1/tracks/${raw.id}/stream`,
    genre: raw.genre ?? undefined,
    permalink: raw.permalink ?? undefined,
  };
}