import { Heart } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';

export default function Favorites() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Favorites</h1>
        <p className="text-sm text-zinc-400">Tracks you’ve hearted.</p>
      </header>
      <EmptyState
        title="No favorites yet"
        description="Favourites arrive in Phase 6."
        icon={<Heart size={32} />}
      />
    </section>
  );
}