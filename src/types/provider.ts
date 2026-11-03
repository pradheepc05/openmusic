import type { Track } from './music';

export type ProviderId = 'audius' | 'jamendo';

export interface MusicProvider {
  id: ProviderId;
  /** False when required env (e.g. Jamendo client ID) is missing. */
  isEnabled(): boolean;
  getTrending(genre?: string): Promise<Track[]>;
  search(query: string): Promise<Track[]>;
}