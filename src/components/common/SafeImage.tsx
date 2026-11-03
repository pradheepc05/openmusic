import { useState } from 'react';
import { cn } from '../../utils/cn';

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
      <rect fill="#27272a" width="300" height="300"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            fill="#71717a" font-family="system-ui, sans-serif" font-size="18">
        No cover
      </text>
    </svg>`,
  );

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export default function SafeImage({
  src,
  alt,
  className,
  fallback = FALLBACK,
}: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const finalSrc = !src || errored ? fallback : src;

  return (
    <div className={cn('relative overflow-hidden bg-zinc-800', className)}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-zinc-800" />
      )}
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setErrored(true);
          setLoaded(true);
        }}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
}