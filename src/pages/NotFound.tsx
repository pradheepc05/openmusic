import { Link } from 'react-router-dom';
import { routes } from '../constants/routes';

export default function NotFound() {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-sm text-zinc-400">This page doesn’t exist.</p>
      <Link
        to={routes.home}
        className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400"
      >
        Back home
      </Link>
    </section>
  );
}