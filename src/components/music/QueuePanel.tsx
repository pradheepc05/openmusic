import { X } from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';
import SafeImage from '../common/SafeImage';

interface QueuePanelProps {
  open: boolean;
  onClose: () => void;
}

export default function QueuePanel({ open, onClose }: QueuePanelProps) {
  const queue = usePlayerStore((s) => s.queue);
  const index = usePlayerStore((s) => s.index);
  const playQueue = usePlayerStore((s) => s.playQueue);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <aside className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-full flex-col border-l border-zinc-800 bg-zinc-950">
        <header className="flex items-center justify-between border-b border-zinc-800 p-4">
          <h2 className="font-semibold">Queue</h2>
          <button onClick={onClose} aria-label="Close queue" className="text-zinc-400 hover:text-white">
            <X size={18} />
          </button>
        </header>
        <ul className="flex-1 overflow-y-auto p-2">
          {queue.length === 0 ? (
            <li className="p-4 text-center text-sm text-zinc-500">Queue is empty.</li>
          ) : (
            queue.map((t, i) => (
              <li key={`${t.id}-${i}`}>
                <button
                  onClick={() => playQueue(queue, i)}
                  className={`flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm transition ${
                    i === index ? 'bg-zinc-800' : 'hover:bg-zinc-900'
                  }`}
                >
                  <SafeImage src={t.artwork} alt="" className="h-9 w-9 rounded" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{t.title}</p>
                    <p className="truncate text-xs text-zinc-400">{t.artist}</p>
                  </div>
                  {i === index && (
                    <span className="ml-1 h-2 w-2 rounded-full bg-emerald-400" aria-label="Now playing" />
                  )}
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>
    </>
  );
}