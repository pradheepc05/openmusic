import EmptyState from '../components/common/EmptyState';
import { Music } from 'lucide-react';

export default function Home() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Good evening</h1>
        <p className="text-sm text-zinc-400">
          Trending, popular, and picks for you land here in Phase 3.
        </p>
      </header>
      <EmptyState
        title="Nothing to play yet"
        description="Audius integration arrives in Phase 3."
        icon={<Music size={32} />}
      />
    </section>
  );
}