export const genres = [
  'Electronic',
  'Lo-fi',
  'Hip Hop',
  'Rock',
  'Jazz',
  'Ambient',
  'Pop',
  'Indie',
] as const;

export type Genre = (typeof genres)[number];