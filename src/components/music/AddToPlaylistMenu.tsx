import { useState } from 'react';
import { ListPlus, Plus, Check } from 'lucide-react';
import { usePlaylistStore } from '../../store/playlistStore';
import CreatePlaylistDialog from './CreatePlaylistDialog';
import type { Track } from '../../types/music';

interface AddToPlaylistMenuProps {
  track: Track;
  size?: number;
}

export default function AddToPlaylistMenu({ track, size = 16 }: AddToPlaylistMenuProps) {
  const [open, setOpen] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [addedTo, setAddedTo] = useState<string | null>(null);

  const playlists = usePlaylistStore((s) => s.playlists);
  const addToPlaylist = usePlaylistStore((s) => s.addToPlaylist);

  const handleAdd = (id: string) => {
    addToPlaylist(id, track);
    setAddedTo(id);
    setTimeout(() => {
      setAddedTo(null);
      setOpen(false);
    }, 600);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-label="Add to playlist"
        className="p-1 text-zinc-400 transition hover:text-white"
      >
        <ListPlus size={size} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full z-40 mt-1 w-56 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {playlists.length === 0 && (
              <p className="px-3 py-2 text-xs text-zinc-500">No playlists yet</p>
            )}
            {playlists.map((p) => {
              const alreadyHas = p.tracks.some((t) => t.id === track.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  disabled={alreadyHas}
                  onClick={() => handleAdd(p.id)}
                  className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition ${
                    alreadyHas
                      ? 'cursor-default text-zinc-500'
                      : 'text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {addedTo === p.id ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <ListPlus size={14} />
                  )}
                  <span className="flex-1 truncate">{p.name}</span>
                  {alreadyHas && <span className="text-[10px]">added</span>}
                </button>
              );
            })}
            <div className="my-1 border-t border-zinc-800" />
            <button
              type="button"
              onClick={() => {
                setShowCreate(true);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-emerald-400 hover:bg-zinc-800"
            >
              <Plus size={14} />
              New playlist
            </button>
          </div>
        </>
      )}

      <CreatePlaylistDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={(id) => handleAdd(id)}
      />
    </div>
  );
}