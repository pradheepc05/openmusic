import { Play } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import type { Track } from '../../types/music';

interface SongCardProps {
  track: Track;
  onPlay?: (track: Track) => void;
}

export default function SongCard({ track, onPlay }: SongCardProps) {
  return (
    <div className="group rounded-xl bg-zinc-900/50 p-3 transition hover:bg-zinc-900">
      <div className="relative mb-3">
        <SafeImage
          src={track.artwork}
          alt={track.title}
          className="aspect-square w-full rounded-lg"
        />
        <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/80">
          {track.provider}
        </span>
        <button
          type="button"
          onClick={() => onPlay?.(track)}
          aria-label={`Play ${track.title}`}
          className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 opacity-0 shadow-lg transition group-hover:opacity-100 hover:scale-105"
        >
          <Play size={18} fill="currentColor" />
        </button>
      </div>
      <h3 className="truncate text-sm font-semibold">{track.title}</h3>
      <p className="truncate text-xs text-zinc-400">{track.artist}</p>
    </div>
  );
}