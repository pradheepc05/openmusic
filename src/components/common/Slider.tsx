import { cn } from '../../utils/cn';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  ariaLabel: string;
  className?: string;
}

export default function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  ariaLabel,
  className,
}: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={ariaLabel}
      className={cn(
        'h-1 w-full cursor-pointer appearance-none rounded-full bg-zinc-700 accent-emerald-500',
        className,
      )}
    />
  );
}