import { NavLink } from 'react-router-dom';
import { Home, Search, Compass, Library, Heart, X } from 'lucide-react';
import { routes } from '../../constants/routes';

const links = [
  { to: routes.home, label: 'Home', icon: Home },
  { to: routes.search, label: 'Search', icon: Search },
  { to: routes.explore, label: 'Explore', icon: Compass },
  { to: routes.library, label: 'Library', icon: Library },
  { to: routes.favorites, label: 'Favorites', icon: Heart },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 shrink-0 border-r border-zinc-800 bg-zinc-950 p-4 transition-transform md:static md:z-auto md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            Open<span className="text-emerald-400">Music</span>
          </h1>
          <button className="md:hidden" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}