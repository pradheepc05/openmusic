import { Library as LibIcon } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';

export default function Library() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Your Library</h1>
        <p className="text-sm text-zinc-400">Playlists and recently played.</p>
      </header>
      <EmptyState
        title="No playlists yet"
        description="Local library arrives in Phase 6."
        icon={<LibIcon size={32} />}
      />
    </section>
  );
}