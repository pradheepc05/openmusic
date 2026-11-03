import { useState } from 'react';
import SongCard from '../components/music/SongCard';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import { useTrending } from '../hooks/useMusic';
import { genres } from '../mocks/genres';

export default function Explore() {
  const [genre, setGenre] = useState<string | null>(null);
  const { data, loading, error } = useTrending(genre ?? undefined);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="text-sm text-zinc-400">Browse trending by genre on Audius.</p>
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
      ) : error ? (
        <EmptyState title="Could not load genre" description={error} />
      ) : data.length === 0 ? (
        <EmptyState title="No tracks in this genre" />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data.map((t) => (
            <SongCard key={t.id} track={t} />
          ))}
        </div>
      )}
    </div>
  );
}