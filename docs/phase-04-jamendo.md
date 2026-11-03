
---

### `docs/phase-04-jamendo.md`
```markdown
# Phase 4 — Jamendo Integration

**Goal:** Add Jamendo as an optional licensed provider. Disabled by
default when no client ID is configured.

## Tasks
- [ ] Register app at https://devportal.jamendo.com → get client ID
- [ ] `.env.example`: add `VITE_JAMENDO_CLIENT_ID=`
- [ ] `services/providers/jamendoProvider.ts` — implements `MusicProvider`
  - [ ] `isEnabled()` → `!!import.meta.env.VITE_JAMENDO_CLIENT_ID`
  - [ ] `getTrending()` → `/tracks/?order=popularity_total`
  - [ ] `search(q)` → `/tracks/?search=<q>&order=relevance`
  - [ ] `audioformat=mp32`, `include=musicinfo`
- [ ] `trackMapper.ts`: add `mapJamendoTrack(raw): Track`
      (id prefix `jamendo:`)
- [ ] Register in `providerRegistry.ts`
- [ ] Show provider badge on `SongCard` (small "Audius" / "Jamendo" pill)
- [ ] Document attribution requirement in README (Jamendo license)

## Acceptance criteria
- With client ID set: search returns merged Audius + Jamendo results
- With client ID empty: app runs unchanged, Jamendo silently skipped
- Every track has `provider`, `permalink`, and (if Jamendo) attribution
- No secret leaked — only `VITE_JAMENDO_CLIENT_ID` (public) is present

## Legal notes
- Jamendo **requires attribution** for free-tier usage. Display
  "Music by <artist> via Jamendo" in player or track menu.
- Commercial use may require a paid Jamendo license — check before
  monetizing.

## Git
```bash
git checkout -b feat/phase-4-jamendo
git commit -m "feat(jamendo): optional provider + merged search"
git tag phase-4 && git push --tags