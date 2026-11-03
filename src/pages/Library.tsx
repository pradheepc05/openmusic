import { useState } from 'react';
import { ListMusic, Clock } from 'lucide-react';
import SongCard from '../components/music/SongCard';
import PlaylistCard from '../components/music/PlaylistCard';
import EmptyState from '../components/common/EmptyState';
import CreatePlaylistDialog from '../components/music/CreatePlaylistDialog';
import { useLibraryStore } from '../store/libraryStore';
import { usePlaylistStore } from '../store/playlistStore';
import { usePlayerStore } from '../store/playerStore';

type Tab = 'playlists' | 'recent';

export default function Library() {
  const [tab, setTab] = useState<Tab>('playlists');
  const [showCreate, setShowCreate] = useState(false);

  const playlists = usePlaylistStore((s) => s.playlists);
  const recentlyPlayed = useLibraryStore((s) => s.recentlyPlayed);
  const playQueue = usePlayerStore((s) => s.playQueue);

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Your Library</h1>
          <p className="text-sm text-zinc-400">Playlists and recently played.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400"
        >
          New playlist
        </button>
      </header>

      <div className="flex gap-2 border-b border-zinc-800 pb-1">
        {(['playlists', 'recent'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm transition ${
              tab === t
                ? 'bg-emerald-500 text-zinc-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {t === 'playlists' ? <ListMusic size={14} /> : <Clock size={14} />}
            {t === 'playlists' ? 'Playlists' : 'Recently played'}
          </button>
        ))}
      </div>

      {tab === 'playlists' &&
        (playlists.length === 0 ? (
          <EmptyState
            title="No playlists yet"
            description="Create your first playlist to get started."
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {playlists.map((p) => (
              <PlaylistCard key={p.id} playlist={p} />
            ))}
          </div>
        ))}

      {tab === 'recent' &&
        (recentlyPlayed.length === 0 ? (
          <EmptyState
            title="Nothing played yet"
            description="Tracks you play will show up here."
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {recentlyPlayed.map((t, i) => (
              <SongCard key={t.id} track={t} onPlay={() => playQueue(recentlyPlayed, i)} />
            ))}
          </div>
        ))}

      <CreatePlaylistDialog open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}