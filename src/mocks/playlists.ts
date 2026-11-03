import type { Playlist } from '../types/music';
import { mockTracks } from './tracks';

const byId = (ids: string[]) => mockTracks.filter((t) => ids.includes(t.id));

export const mockPlaylists: Playlist[] = [
  {
    id: 'pl-focus',
    name: 'Deep Focus',
    tracks: byId(['audius:4', 'jamendo:5', 'audius:6', 'audius:20']),
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: 'pl-neon',
    name: 'Neon Nights',
    tracks: byId(['audius:1', 'audius:2', 'audius:3', 'audius:19', 'audius:16']),
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: 'pl-quiet',
    name: 'Quiet Evenings',
    tracks: byId(['audius:11', 'audius:12', 'audius:13', 'jamendo:14']),
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
  },
  {
    id: 'pl-indie',
    name: 'Indie Mix',
    tracks: byId(['jamendo:17', 'audius:18', 'audius:9', 'audius:10']),
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45,
  },
];