import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import SongCard from '../components/music/SongCard';
import EmptyState from '../components/common/EmptyState';
import Skeleton from '../components/common/Skeleton';
import { useMockLoading } from '../hooks/useMockLoading';
import { mockTracks } from '../mocks/tracks';

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get('q') ?? '').trim();

  const results = q
    ? mockTracks.filter((t) =>
        `${t.title} ${t.artist}`.toLowerCase().includes(q.toLowerCase()),
      )
    : [];

  const loading = useMockLoading(q);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Search</h1>
        <p className="text-sm text-zinc-400">
          {q
            ? `Results for “${q}” (${results.length})`
            : 'Type in the top bar to search.'}
        </p>
      </header>

      {!q && (
        <EmptyState
          title="Start typing"
          description="Search for songs or artists across providers."
          icon={<SearchIcon size={32} />}
        />
      )}

      {q && loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      )}

      {q && !loading && results.length === 0 && (
        <EmptyState
          title="No results"
          description={`Nothing matched “${q}”. Try a different search.`}
        />
      )}

      {q && !loading && results.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((t) => (
            <SongCard key={t.id} track={t} />
          ))}
        </div>
      )}
    </div>
  );
}