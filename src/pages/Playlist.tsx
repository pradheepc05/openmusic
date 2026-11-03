import { useParams } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';

export default function Playlist() {
  const { id } = useParams<{ id: string }>();
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Playlist</h1>
        <p className="text-sm text-zinc-400">id: {id}</p>
      </header>
      <EmptyState
        title="Playlists arrive in Phase 6"
        description="This page will load from playlistStore."
      />
    </section>
  );
}