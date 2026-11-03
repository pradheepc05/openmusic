import { Play } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import { formatTime } from '../../utils/formatTime';
import type { Track } from '../../types/music';

interface SongListProps {
  tracks: Track[];
  onPlay?: (track: Track, index: number) => void;
}

export default function SongList({ tracks, onPlay }: SongListProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      {tracks.map((track, i) => (
        <button
          key={track.id}
          type="button"
          onClick={() => onPlay?.(track, i)}
          className="group flex w-full items-center gap-3 border-b border-zinc-800/50 px-3 py-2 text-left transition last:border-b-0 hover:bg-zinc-900"
        >
          <span className="w-6 text-center text-xs text-zinc-500">{i + 1}</span>
          <SafeImage src={track.artwork} alt="" className="h-10 w-10 rounded" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{track.title}</p>
            <p className="truncate text-xs text-zinc-400">{track.artist}</p>
          </div>
          <span className="hidden text-[10px] uppercase tracking-wide text-zinc-500 sm:inline">
            {track.provider}
          </span>
          <span className="text-xs text-zinc-400">{formatTime(track.duration)}</span>
          <Play
            size={16}
            className="ml-1 opacity-0 transition group-hover:opacity-100"
          />
        </button>
      ))}
    </div>
  );
}