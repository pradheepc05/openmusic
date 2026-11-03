import { useParams } from 'react-router-dom';
import SongList from '../components/music/SongList';
import SafeImage from '../components/common/SafeImage';
import EmptyState from '../components/common/EmptyState';
import Skeleton from '../components/common/Skeleton';
import { useMockLoading } from '../hooks/useMockLoading';
import { usePlayerStore } from '../store/playerStore';
import { mockPlaylists } from '../mocks/playlists';

export default function Playlist() {
  const { id } = useParams<{ id: string }>();
  const loading = useMockLoading(id);
  const playlist = mockPlaylists.find((p) => p.id === id);
  const playQueue = usePlayerStore((s) => s.playQueue);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
          <Skeleton className="h-40 w-40 rounded-lg sm:h-48 sm:w-48" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (!playlist) {
    return (
      <EmptyState
        title="Playlist not found"
        description={`No playlist with id “${id}”.`}
      />
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
        <SafeImage
          src={playlist.tracks[0]?.artwork}
          alt={playlist.name}
          className="h-40 w-40 rounded-lg sm:h-48 sm:w-48"
        />
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-400">
            Playlist
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">{playlist.name}</h1>
          <p className="mt-1 text-sm text-zinc-400">
            {playlist.tracks.length}{' '}
            {playlist.tracks.length === 1 ? 'track' : 'tracks'}
          </p>
        </div>
      </header>

      <SongList
        tracks={playlist.tracks}
        onPlay={(_, i) => playQueue(playlist.tracks, i)}
      />
    </div>
  );
}