
---

### `docs/phase-07-backend-deploy.md`
```markdown
# Phase 7 — Backend & Deployment

**Goal:** Production deploy on Vercel + optional Supabase accounts.

## Part A — Vercel deployment (required)
- [ ] Push repo to GitHub
- [ ] Import repo at https://vercel.com/new
- [ ] Framework preset: **Vite**; build `npm run build`; output `dist`
- [ ] Env vars in Vercel dashboard:
  - `VITE_AUDIUS_APP_NAME`
  - `VITE_JAMENDO_CLIENT_ID` (optional)
- [ ] `vercel.json` rewrites every path → `/index.html`
- [ ] Verify: `https://<app>.vercel.app/search` refreshes without 404
- [ ] Confirm build **does not** expose `VITE_*` secrets — none exist;
      all `VITE_*` are public by design

## Part B — Supabase accounts (optional)
- [ ] Create project at https://supabase.com
- [ ] Enable Email + Google auth
- [ ] Schema:
  ```sql
  create table favorites (
    user_id uuid references auth.users not null,
    track_id text not null,
    track jsonb not null,
    created_at timestamptz default now(),
    primary key (user_id, track_id)
  );

  create table playlists (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users not null,
    name text not null,
    tracks jsonb not null default '[]',
    created_at timestamptz default now()
  );

  -- RLS
  alter table favorites enable row level security;
  alter table playlists enable row level security;

  create policy "own favorites" on favorites
    for all using (auth.uid() = user_id);

  create policy "own playlists" on playlists
    for all using (auth.uid() = user_id);