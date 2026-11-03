import { useEffect, useState } from 'react';

/**
 * Simulates async loading for a fixed duration.
 * Re-triggers whenever `key` changes (used to show skeletons
 * while filters/queries change in Phase 2).
 *
 * Phase 3+ will replace this with real `useMusic` loading flags.
 */
export function useMockLoading(key: unknown = null, ms = 300): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [key, ms]);

  return loading;
}