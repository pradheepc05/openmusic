import { Heart } from 'lucide-react';
import { useLibraryStore } from '../../store/libraryStore';
import type { Track } from '../../types/music';

interface FavoriteButtonProps {
  track: Track;
  size?: number;
  className?: string;
}

export default function FavoriteButton({ track, size = 16, className = '' }: FavoriteButtonProps) {
  const isFav = useLibraryStore((s) => s.favorites.some((f) => f.id === track.id));
  const toggleFavorite = useLibraryStore((s) => s.toggleFavorite);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(track);
      }}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      className={`p-1 transition ${
        isFav ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'
      } ${className}`}
    >
      <Heart size={size} fill={isFav ? 'currentColor' : 'none'} />
    </button>
  );
}