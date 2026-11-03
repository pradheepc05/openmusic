import type { Track } from '../types/music';

/** Mock dataset — replaced by real Audius/Jamendo data in Phases 3–4. */
export const mockTracks: Track[] = [
  { id: 'audius:1',  provider: 'audius',  title: 'Midnight Drive',  artist: 'Neon Skyline',  artwork: 'https://picsum.photos/seed/om-01/300/300', duration: 214, genre: 'Electronic', streamUrl: '' },
  { id: 'audius:2',  provider: 'audius',  title: 'Neon Pulse',      artist: 'VHS Dreams',    artwork: 'https://picsum.photos/seed/om-02/300/300', duration: 198, genre: 'Electronic', streamUrl: '' },
  { id: 'audius:3',  provider: 'audius',  title: 'Chrome City',     artist: 'Neon Skyline',  artwork: 'https://picsum.photos/seed/om-03/300/300', duration: 241, genre: 'Electronic', streamUrl: '' },
  { id: 'audius:4',  provider: 'audius',  title: 'Rainy Window',    artist: 'Chill Studio',  artwork: 'https://picsum.photos/seed/om-04/300/300', duration: 187, genre: 'Lo-fi',      streamUrl: '' },
  { id: 'jamendo:5', provider: 'jamendo', title: 'Lofi Study',      artist: 'Beats by Flow', artwork: 'https://picsum.photos/seed/om-05/300/300', duration: 203, genre: 'Lo-fi',      streamUrl: '' },
  { id: 'audius:6',  provider: 'audius',  title: 'Late Night Jazz', artist: 'Chill Studio',  artwork: 'https://picsum.photos/seed/om-06/300/300', duration: 232, genre: 'Lo-fi',      streamUrl: '' },
  { id: 'audius:7',  provider: 'audius',  title: 'City Lights',     artist: 'MC Flow',       artwork: 'https://picsum.photos/seed/om-07/300/300', duration: 221, genre: 'Hip Hop',    streamUrl: '' },
  { id: 'jamendo:8', provider: 'jamendo', title: 'Street Poetry',   artist: 'MC Flow',       artwork: 'https://picsum.photos/seed/om-08/300/300', duration: 246, genre: 'Hip Hop',    streamUrl: '' },
  { id: 'audius:9',  provider: 'audius',  title: 'Electric Storm',  artist: 'Thunder Road',  artwork: 'https://picsum.photos/seed/om-09/300/300', duration: 258, genre: 'Rock',       streamUrl: '' },
  { id: 'audius:10', provider: 'audius',  title: 'Desert Highway',  artist: 'Thunder Road',  artwork: 'https://picsum.photos/seed/om-10/300/300', duration: 275, genre: 'Rock',       streamUrl: '' },
  { id: 'audius:11', provider: 'audius',  title: 'Blue Hour',       artist: 'The Quartet',   artwork: 'https://picsum.photos/seed/om-11/300/300', duration: 312, genre: 'Jazz',       streamUrl: '' },
  { id: 'audius:12', provider: 'audius',  title: 'Midnight Café',   artist: 'The Quartet',   artwork: 'https://picsum.photos/seed/om-12/300/300', duration: 287, genre: 'Jazz',       streamUrl: '' },
  { id: 'audius:13', provider: 'audius',  title: 'Ocean Waves',     artist: 'Aurora',        artwork: 'https://picsum.photos/seed/om-13/300/300', duration: 301, genre: 'Ambient',    streamUrl: '' },
  { id: 'jamendo:14',provider: 'jamendo', title: 'Weightless',      artist: 'Aurora',        artwork: 'https://picsum.photos/seed/om-14/300/300', duration: 334, genre: 'Ambient',    streamUrl: '' },
  { id: 'audius:15', provider: 'audius',  title: 'Summer Love',     artist: 'Lila Rose',     artwork: 'https://picsum.photos/seed/om-15/300/300', duration: 195, genre: 'Pop',        streamUrl: '' },
  { id: 'audius:16', provider: 'audius',  title: 'Neon Lights',     artist: 'Lila Rose',     artwork: 'https://picsum.photos/seed/om-16/300/300', duration: 208, genre: 'Pop',        streamUrl: '' },
  { id: 'jamendo:17',provider: 'jamendo', title: 'Paper Planes',    artist: 'Mira Sol',      artwork: 'https://picsum.photos/seed/om-17/300/300', duration: 188, genre: 'Indie',      streamUrl: '' },
  { id: 'audius:18', provider: 'audius',  title: 'Ghost Town',      artist: 'Mira Sol',      artwork: 'https://picsum.photos/seed/om-18/300/300', duration: 216, genre: 'Indie',      streamUrl: '' },
  { id: 'audius:19', provider: 'audius',  title: 'Spiral',          artist: 'Neon Skyline',  artwork: 'https://picsum.photos/seed/om-19/300/300', duration: 249, genre: 'Electronic', streamUrl: '' },
  { id: 'audius:20', provider: 'audius',  title: 'Coffee Shop',     artist: 'Beats by Flow', artwork: 'https://picsum.photos/seed/om-20/300/300', duration: 176, genre: 'Lo-fi',      streamUrl: '' },
];