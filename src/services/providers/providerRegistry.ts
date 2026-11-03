import { audiusProvider } from './audiusProvider';
import type { MusicProvider } from '../../types/provider';

export const providers: MusicProvider[] = [audiusProvider];

export const enabledProviders = (): MusicProvider[] =>
  providers.filter((p) => p.isEnabled());