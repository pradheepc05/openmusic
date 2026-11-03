import { useState } from 'react';
import SongCard from '../components/music/SongCard';
import Skeleton from '../components/common/Skeleton';
import { useMockLoading } from '../hooks/useMockLoading';
import { mockTracks } from '../mocks/tracks';
import { genres } from '../mocks/genres';

export default function Explore() {
  const [genre, setGenre] = useState<string | null>(null);

  const tracks = genre
    ? mockTracks.filter((t) => t.genre === genre)
    : mockTracks;

  const loading = useMockLoading(genre);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="text-sm text-zinc-400">Browse by genre.</p>
      </header>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setGenre(null)}
          className={`rounded-full px-3 py-1 text-sm transition ${
            !genre
              ? 'bg-emerald-500 text-zinc-950'
              : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
          }`}
        >
          All
        </button>
        {genres.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGenre(g)}
            className={`rounded-full px-3 py-1 text-sm transition ${
              genre === g
                ? 'bg-emerald-500 text-zinc-950'
                : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {tracks.map((t) => (
            <SongCard key={t.id} track={t} />
          ))}
        </div>
      )}
    </div>
  );
}