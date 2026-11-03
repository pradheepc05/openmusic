import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Search</h1>
        <p className="text-sm text-zinc-400">
          {q ? `Results for “${q}”` : 'Type in the top bar to search.'}
        </p>
      </header>
      <EmptyState
        title={q ? 'No results yet' : 'Start typing'}
        description="Cross-provider search arrives in Phase 3–4."
        icon={<SearchIcon size={32} />}
      />
    </section>
  );
}