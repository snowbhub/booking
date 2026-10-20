# Booking

Full, standalone source repository for the Booking barbershop management and online booking app. The Next.js app contains the frontend, API routes, and server-side business logic; local development runs as one server.

## Run locally on macOS

Requirements: Node.js 22 and npm.

```bash
git clone https://github.com/snowbhub/booking.git
cd booking
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3060>. By default, development uses an in-memory demo store, so no Supabase account is needed to start the app. Demo changes are not persisted.

## Connect Supabase

Set `DATABASE_URL` in `.env.local` to the PostgreSQL connection URI from the Supabase dashboard. Use a development/staging database while developing; local changes against the production URI affect live data.

Before first use with a database, apply the included, idempotent Booking migrations:

```bash
npm run db:migrate
npm run dev
```

`PANEL_PASSWORD` sets the panel password. Staff accounts and their password hashes are stored in the database. Optional keys for AI and messaging integrations are listed in `.env.example`; those integrations remain unavailable until configured.

Never commit `.env.local` or share database credentials. `NEXT_PUBLIC_BOOKING_TIME_ZONE` should match the shop's timezone.

## Useful commands

```bash
npm run dev          # development server on port 3060
npm run build        # production build
npm start            # serve the production build
npm test             # unit tests
npm run test:db      # migration/schema tests using PGlite
npm run db:migrate   # apply Booking migrations to DATABASE_URL
```

When running the unit tests, set `NEXT_PUBLIC_BOOKING_TIME_ZONE=America/Argentina/Buenos_Aires` to match the source fixture timezone:

```bash
NEXT_PUBLIC_BOOKING_TIME_ZONE=America/Argentina/Buenos_Aires npm test
```

## Project layout

- `src/app/` — pages, frontend, and API routes
- `src/components/` — interface components
- `src/lib/` — booking logic, data access, authentication, integrations
- `src/i18n/` — English, German, and Ukrainian translations
- `supabase/migrations/` — database schema and migrations

The initial application source is pinned to upstream commit `b5433b62213f88223c868cca279364d524546336`; Booking-specific changes are included directly in this repository's source files.
