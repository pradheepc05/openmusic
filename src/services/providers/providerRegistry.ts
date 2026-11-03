import { audiusProvider } from './audiusProvider';
import { jamendoProvider } from './jamendoProvider';
import type { MusicProvider } from '../../types/provider';

export const providers: MusicProvider[] = [audiusProvider, jamendoProvider];

export const enabledProviders = () => providers.filter((p) => p.isEnabled());