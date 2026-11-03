import SongCard from '../components/music/SongCard';
import Skeleton from '../components/common/Skeleton';
import { useMockLoading } from '../hooks/useMockLoading';
import { mockTracks } from '../mocks/tracks';
import type { Track } from '../types/music';

function logPlay(track: Track) {
  // eslint-disable-next-line no-console
  console.log('[Phase 2] would play:', track.title);
}

function Shelf({
  title,
  tracks,
  loading,
}: {
  title: string;
  tracks: Track[];
  loading: boolean;
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
  const loading = useMockLoading();

  const trending = mockTracks.slice(0, 10);
  const madeForYou = [...mockTracks].reverse().slice(0, 10);
  const recently = mockTracks.slice(5, 10);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Good evening</h1>
        <p className="text-sm text-zinc-400">
          Here's what's happening on OpenMusic right now.
        </p>
      </header>

      <Shelf title="Trending now" tracks={trending} loading={loading} />
      <Shelf title="Made for you" tracks={madeForYou} loading={loading} />
      <Shelf title="Recently played" tracks={recently} loading={loading} />
    </div>
  );
}