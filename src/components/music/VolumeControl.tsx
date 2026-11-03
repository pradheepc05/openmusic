import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import Slider from '../common/Slider';

interface VolumeControlProps {
  volume: number;
  muted: boolean;
  onVolume: (v: number) => void;
  onToggleMute: () => void;
}

export default function VolumeControl({ volume, muted, onVolume, onToggleMute }: VolumeControlProps) {
  const Icon = muted ? VolumeX : volume === 0 ? Volume : volume < 0.5 ? Volume1 : Volume2;
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <button onClick={onToggleMute} aria-label={muted ? 'Unmute' : 'Mute'} className="text-zinc-400 hover:text-white">
        <Icon size={16} />
      </button>
      <Slider
        min={0}
        max={100}
        step={1}
        value={muted ? 0 : Math.round(volume * 100)}
        onChange={(v) => onVolume(v / 100)}
        ariaLabel="Volume"
        className="w-20"
      />
    </div>
  );
}