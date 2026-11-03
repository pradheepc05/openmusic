import { FormEvent, useState } from 'react';
import { Menu, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { useAuthStore } from '../../store/authStore';
import { Link } from 'react-router-dom';

interface TopbarProps {
  onMenu: () => void;
}

export default function Topbar({ onMenu }: TopbarProps) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
const signOut = useAuthStore((s) => s.signOut);

// after the search form:
{user ? (
  <button onClick={signOut} className="text-xs text-zinc-400 hover:text-white">
    Sign out
  </button>
) : (
  <Link to="/login" className="text-xs text-emerald-400 hover:text-emerald-300">
    Sign in
  </Link>
)}
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed) navigate(`${routes.search}?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur">
      <button className="md:hidden" onClick={onMenu} aria-label="Open menu">
        <Menu size={20} />
      </button>

      <form onSubmit={onSubmit} className="relative w-full max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search songs, artists…"
          className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-3 text-sm placeholder-zinc-500 outline-none focus:border-zinc-600"
        />
      </form>
    </header>
  );
}