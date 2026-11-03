import { Compass } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';

export default function Explore() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Explore</h1>
        <p className="text-sm text-zinc-400">Genres and moods.</p>
      </header>
      <EmptyState
        title="Genres arrive soon"
        description="Explore is wired up in Phase 2–3."
        icon={<Compass size={32} />}
      />
    </section>
  );
}