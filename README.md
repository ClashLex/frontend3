# Blog Platform

A full-stack blog platform built with Next.js and Supabase.

## Setup

1. Create a Supabase project at supabase.com
2. Run `supabase/migrations/001_initial.sql` in the Supabase SQL editor
3. Copy your project URL and anon key into `frontend/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm test             # unit tests
npm run test:e2e     # Playwright integration tests
```
