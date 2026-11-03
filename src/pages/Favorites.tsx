import { Heart } from 'lucide-react';
import SongCard from '../components/music/SongCard';
import EmptyState from '../components/common/EmptyState';
import Skeleton from '../components/common/Skeleton';
import { useMockLoading } from '../hooks/useMockLoading';
import { mockTracks } from '../mocks/tracks';

export default function Favorites() {
  const loading = useMockLoading();
  // Placeholder favorites until Phase 6 wires libraryStore.
  const favorites = mockTracks.slice(0, 6);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Favorites</h1>
        <p className="text-sm text-zinc-400">Tracks you've hearted.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Heart tracks you love. Persistence arrives in Phase 6."
          icon={<Heart size={32} />}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {favorites.map((t) => (
            <SongCard key={t.id} track={t} />
          ))}
        </div>
      )}
    </div>
  );
}