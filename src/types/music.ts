export type ProviderId = 'audius' | 'jamendo';

export interface Track {
  id: string;
  provider: ProviderId;
  title: string;
  artist: string;
  artwork?: string;
  duration: number;
  streamUrl: string;
  genre?: string;
  permalink?: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  createdAt: number;
}