import { cn } from '../../utils/cn';

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-zinc-800/80', className)}
    />
  );
}