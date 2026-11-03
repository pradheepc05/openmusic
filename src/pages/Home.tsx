import SongCard from '../components/music/SongCard';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import { useTrending } from '../hooks/useMusic';
import type { Track } from '../types/music';

function logPlay(track: Track) {
  // eslint-disable-next-line no-console
  console.log('[Phase 3] would play:', track.title, track.streamUrl);
}

function Shelf({
  title,
  tracks,
  loading,
  error,
}: {
  title: string;
  tracks: Track[];
  loading: boolean;
  error: string | null;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <EmptyState title="Could not load tracks" description={error} />
      ) : tracks.length === 0 ? (
        <EmptyState title="Nothing here yet" description="Try again later." />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {tracks.map((t) => (
            <SongCard key={t.id} track={t} onPlay={logPlay} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const trending = useTrending();
  const electronic = useTrending('Electronic');

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Good evening</h1>
        <p className="text-sm text-zinc-400">
          Real Audius tracks now playing on OpenMusic.
        </p>
      </header>

      <Shelf
        title="Trending on Audius"
        tracks={trending.data}
        loading={trending.loading}
        error={trending.error}
      />
      <Shelf
        title="Electronic"
        tracks={electronic.data}
        loading={electronic.loading}
        error={electronic.error}
      />
    </div>
  );
}