import Slider from '../common/Slider';
import { formatTime } from '../../utils/formatTime';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (t: number) => void;
  showLabels?: boolean;
}

export default function ProgressBar({ currentTime, duration, onSeek, showLabels = true }: ProgressBarProps) {
  return (
    <div className="flex w-full items-center gap-2">
      {showLabels && (
        <span className="w-9 text-right text-[10px] tabular-nums text-zinc-400">
          {formatTime(currentTime)}
        </span>
      )}
      <Slider
        min={0}
        max={Math.max(duration, 1)}
        step={1}
        value={currentTime}
        onChange={onSeek}
        ariaLabel="Seek"
        className="flex-1"
      />
      {showLabels && (
        <span className="w-9 text-[10px] tabular-nums text-zinc-400">
          {formatTime(duration)}
        </span>
      )}
    </div>
  );
}