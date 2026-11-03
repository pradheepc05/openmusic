# OpenMusic — Documentation

OpenMusic is a free, licensed, ad-free music streaming web app built on
Audius and Jamendo. This `docs/` folder holds the roadmap and per-phase
implementation notes.

## Index

- [ROADMAP.md](./ROADMAP.md) — high-level plan and phases
- [phase-01-foundation.md](./phase-01-foundation.md)
- [phase-02-ui.md](./phase-02-ui.md)
- [phase-03-audius.md](./phase-03-audius.md)
- [phase-04-jamendo.md](./phase-04-jamendo.md)
- [phase-05-audio-engine.md](./phase-05-audio-engine.md)
- [phase-06-library.md](./phase-06-library.md)
- [phase-07-backend-deploy.md](./phase-07-backend-deploy.md)

## Conventions

- One branch per phase: `feat/phase-<n>-<slug>`
- One tag per completed phase: `phase-<n>`
- Each phase doc must be updated (checkboxes ticked) before tagging.

# OpenMusic

Free, ad-free music streaming web app built on Audius and Jamendo.

**Status:** Phase 1 complete — frontend foundation shipped.
See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for the full plan.

## Quickstart

```powershell
npm install
cp .env.example .env.local      # fill in VITE_AUDIUS_APP_NAME
npm run dev                     # http://localhost:5173