import { ListMusic } from 'lucide-react';
import { usePlayer } from '../../hooks/usePlayer';
import { usePlayerStore } from '../../store/playerStore';
import SafeImage from '../common/SafeImage';
import ProgressBar from './ProgressBar';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';

interface MiniPlayerProps {
  onOpenQueue: () => void;
}

export default function MiniPlayer({ onOpenQueue }: MiniPlayerProps) {
  const { currentTrack, isPlaying, currentTime, duration, volume, muted, shuffle, repeat } = usePlayer();

  const toggle = usePlayerStore((s) => s.toggle);
  const prev = usePlayerStore((s) => s.prev);
  const next = usePlayerStore((s) => s.next);
  const seek = usePlayerStore((s) => s.seek);
  const setVolume = usePlayerStore((s) => s.setVolume);
  const toggleMute = usePlayerStore((s) => s.toggleMute);
  const toggleShuffle = usePlayerStore((s) => s.toggleShuffle);
  const cycleRepeat = usePlayerStore((s) => s.cycleRepeat);

  if (!currentTrack) return null;

  return (
    <div className="border-t border-zinc-800 bg-zinc-950">
      <div className="px-3 pt-1.5">
        <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} showLabels={false} />
      </div>
      <div className="flex items-center gap-3 px-3 py-2">
        <SafeImage src={currentTrack.artwork} alt={currentTrack.title} className="h-11 w-11 rounded" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{currentTrack.title}</p>
          <p className="truncate text-xs text-zinc-400">{currentTrack.artist}</p>
        </div>
        <PlayerControls
          isPlaying={isPlaying}
          shuffle={shuffle}
          repeat={repeat}
          onToggle={toggle}
          onPrev={prev}
          onNext={next}
          onToggleShuffle={toggleShuffle}
          onCycleRepeat={cycleRepeat}
          compact
        />
        <VolumeControl volume={volume} muted={muted} onVolume={setVolume} onToggleMute={toggleMute} />
        <button
          onClick={onOpenQueue}
          aria-label="Open queue"
          className="text-zinc-400 transition hover:text-white"
        >
          <ListMusic size={18} />
        </button>
      </div>
    </div>
  );
}