import { Heart } from 'lucide-react';
import SongCard from '../components/music/SongCard';
import EmptyState from '../components/common/EmptyState';
import { useLibraryStore } from '../store/libraryStore';
import { usePlayerStore } from '../store/playerStore';

export default function Favorites() {
  const favorites = useLibraryStore((s) => s.favorites);
  const playQueue = usePlayerStore((s) => s.playQueue);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Favorites</h1>
        <p className="text-sm text-zinc-400">
          {favorites.length > 0
            ? `${favorites.length} ${favorites.length === 1 ? 'track' : 'tracks'} you've hearted.`
            : "Tracks you've hearted."}
        </p>
      </header>

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Heart any track and it will show up here."
          icon={<Heart size={32} />}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {favorites.map((t, i) => (
            <SongCard key={t.id} track={t} onPlay={() => playQueue(favorites, i)} />
          ))}
        </div>
      )}
    </div>
  );
}