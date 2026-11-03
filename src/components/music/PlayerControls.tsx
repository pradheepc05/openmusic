import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from 'lucide-react';
import type { Repeat as RepeatMode } from '../../store/playerStore';

interface PlayerControlsProps {
  isPlaying: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleShuffle: () => void;
  onCycleRepeat: () => void;
  compact?: boolean;
}

export default function PlayerControls({
  isPlaying,
  shuffle,
  repeat,
  onToggle,
  onPrev,
  onNext,
  onToggleShuffle,
  onCycleRepeat,
  compact = false,
}: PlayerControlsProps) {
  const iconSize = compact ? 14 : 16;
  const playSize = compact ? 16 : 18;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <button
        onClick={onToggleShuffle}
        aria-label="Shuffle"
        className={`p-1 transition ${shuffle ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'}`}
      >
        <Shuffle size={iconSize} />
      </button>
      <button onClick={onPrev} aria-label="Previous" className="p-1 text-zinc-300 hover:text-white">
        <SkipBack size={iconSize + 2} />
      </button>
      <button
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 transition hover:bg-emerald-400"
      >
        {isPlaying ? (
          <Pause size={playSize} fill="currentColor" />
        ) : (
          <Play size={playSize} fill="currentColor" />
        )}
      </button>
      <button onClick={onNext} aria-label="Next" className="p-1 text-zinc-300 hover:text-white">
        <SkipForward size={iconSize + 2} />
      </button>
      <button
        onClick={onCycleRepeat}
        aria-label={`Repeat: ${repeat}`}
        className={`p-1 transition ${repeat !== 'off' ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'}`}
      >
        {repeat === 'one' ? <Repeat1 size={iconSize} /> : <Repeat size={iconSize} />}
      </button>
    </div>
  );
}