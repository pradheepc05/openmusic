import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { usePlaylistStore } from '../../store/playlistStore';

interface CreatePlaylistDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (id: string) => void;
}

export default function CreatePlaylistDialog({
  open,
  onClose,
  onCreated,
}: CreatePlaylistDialogProps) {
  const [name, setName] = useState('');
  const createPlaylist = usePlaylistStore((s) => s.createPlaylist);

  useEffect(() => {
    if (open) setName('');
  }, [open]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = createPlaylist(name);
    onCreated?.(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-950 p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">New playlist</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-zinc-400 hover:text-white">
            <X size={18} />
          </button>
        </div>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Playlist name"
          className="mb-4 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-zinc-600"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}