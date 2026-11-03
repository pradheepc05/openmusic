import { useState } from 'react';
import SongCard from '../components/music/SongCard';
import PlaylistCard from '../components/music/PlaylistCard';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import { useMockLoading } from '../hooks/useMockLoading';
import { mockPlaylists } from '../mocks/playlists';
import { mockTracks } from '../mocks/tracks';

type Tab = 'playlists' | 'recent';

export default function Library() {
  const [tab, setTab] = useState<Tab>('playlists');
  const loading = useMockLoading(tab);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Your Library</h1>
        <p className="text-sm text-zinc-400">Playlists and recently played.</p>
      </header>

      <div className="flex gap-2 border-b border-zinc-800 pb-1">
        {(['playlists', 'recent'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-3 py-1 text-sm transition ${
              tab === t
                ? 'bg-emerald-500 text-zinc-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {t === 'playlists' ? 'Playlists' : 'Recently played'}
          </button>
        ))}
      </div>

      {tab === 'playlists' &&
        (loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : mockPlaylists.length === 0 ? (
          <EmptyState
            title="No playlists yet"
            description="Create your first playlist in Phase 6."
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {mockPlaylists.map((p) => (
              <PlaylistCard key={p.id} playlist={p} />
            ))}
          </div>
        ))}

      {tab === 'recent' &&
        (loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockTracks.slice(0, 5).map((t) => (
              <SongCard key={t.id} track={t} />
            ))}
          </div>
        ))}
    </div>
  );
}