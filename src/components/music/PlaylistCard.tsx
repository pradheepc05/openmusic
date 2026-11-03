import { Link } from 'react-router-dom';
import SafeImage from '../common/SafeImage';
import { routes } from '../../constants/routes';
import type { Playlist } from '../../types/music';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const cover = playlist.tracks[0]?.artwork;

  return (
    <Link
      to={routes.playlist(playlist.id)}
      className="group block rounded-xl bg-zinc-900/50 p-3 transition hover:bg-zinc-900"
    >
      <SafeImage
        src={cover}
        alt={playlist.name}
        className="mb-3 aspect-square w-full rounded-lg"
      />
      <h3 className="truncate text-sm font-semibold">{playlist.name}</h3>
      <p className="text-xs text-zinc-400">
        {playlist.tracks.length}{' '}
        {playlist.tracks.length === 1 ? 'track' : 'tracks'}
      </p>
    </Link>
  );
}