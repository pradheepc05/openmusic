interface ImportMetaEnv {
  readonly VITE_AUDIUS_APP_NAME: string;
  readonly VITE_JAMENDO_CLIENT_ID?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}