import { enabledProviders } from './providers/providerRegistry';
import type { Track } from '../types/music';

export const musicService = {
  async getTrending(genre?: string): Promise<Track[]> {
    const results = await Promise.allSettled(
      enabledProviders().map((p) => p.getTrending(genre)),
    );
    return results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
  },

  async search(query: string): Promise<Track[]> {
    const results = await Promise.allSettled(
      enabledProviders().map((p) => p.search(query)),
    );
    return results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
  },
};