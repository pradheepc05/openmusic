import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, Trash2, Play, X } from 'lucide-react';
import SongList from '../components/music/SongList';
import SafeImage from '../components/common/SafeImage';
import EmptyState from '../components/common/EmptyState';
import { usePlaylistStore } from '../store/playlistStore';
import { usePlayerStore } from '../store/playerStore';
import { routes } from '../constants/routes';

export default function Playlist() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const playlist = usePlaylistStore((s) => s.playlists.find((p) => p.id === id));
  const renamePlaylist = usePlaylistStore((s) => s.renamePlaylist);
  const deletePlaylist = usePlaylistStore((s) => s.deletePlaylist);
  const removeFromPlaylist = usePlaylistStore((s) => s.removeFromPlaylist);
  const playQueue = usePlayerStore((s) => s.playQueue);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(playlist?.name ?? '');

  if (!playlist) {
    return (
      <EmptyState
        title="Playlist not found"
        description="It may have been deleted."
      />
    );
  }

  const commitRename = () => {
    renamePlaylist(playlist.id, name);
    setEditing(false);
  };

  const handleDelete = () => {
    if (confirm(`Delete "${playlist.name}"?`)) {
      deletePlaylist(playlist.id);
      navigate(routes.library);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
        <SafeImage
          src={playlist.tracks[0]?.artwork}
          alt={playlist.name}
          className="h-40 w-40 rounded-lg sm:h-48 sm:w-48"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wide text-zinc-400">Playlist</p>
          {editing ? (
            <div className="mt-1 flex items-center gap-2">
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') commitRename();
                  if (e.key === 'Escape') setEditing(false);
                }}
                className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-2xl font-bold outline-none focus:border-zinc-500"
              />
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-zinc-400 hover:text-white"
                aria-label="Cancel rename"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <h1 className="truncate text-3xl font-bold sm:text-4xl">{playlist.name}</h1>
          )}
          <p className="mt-1 text-sm text-zinc-400">
            {playlist.tracks.length}{' '}
            {playlist.tracks.length === 1 ? 'track' : 'tracks'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={playlist.tracks.length === 0}
              onClick={() => playQueue(playlist.tracks, 0)}
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-emerald-400"
            >
              <Play size={16} fill="currentColor" /> Play
            </button>
            <button
              type="button"
              onClick={() => {
                setName(playlist.name);
                setEditing(true);
              }}
              className="flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500"
            >
              <Pencil size={14} /> Rename
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-red-600 hover:text-red-400"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </header>

      {playlist.tracks.length === 0 ? (
        <EmptyState
          title="This playlist is empty"
          description="Add tracks with the + icon on any song card or row."
        />
      ) : (
        <SongList
          tracks={playlist.tracks}
          onPlay={(_, i) => playQueue(playlist.tracks, i)}
        />
      )}

      {/* Extra small "remove" affordance — appended below the list */}
      {playlist.tracks.length > 0 && (
        <details className="rounded-xl border border-zinc-800 p-3 text-sm">
          <summary className="cursor-pointer text-zinc-400">Manage tracks</summary>
          <ul className="mt-3 space-y-1">
            {playlist.tracks.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-2">
                <span className="truncate">
                  <span className="text-zinc-200">{t.title}</span>
                  <span className="text-zinc-500"> — {t.artist}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFromPlaylist(playlist.id, t.id)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}