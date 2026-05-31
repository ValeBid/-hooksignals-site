# HookSignals — Claude Code Development Guide

## Project
HookSignals — AI creator intelligence SaaS for YouTube, Shorts, TikTok and creator packaging.

## Stack
- Next.js 14 (App Router, TypeScript)
- Clerk (auth) — `@clerk/nextjs` v6
- Supabase (database) — `@supabase/supabase-js`
- Paddle (billing) — client-side JS + webhook API
- OpenAI — `gpt-4o-mini` for hook analysis
- YouTube Data API v3 — via server-side `YOUTUBE_API_KEY` (primary YouTube provider)
- Apify — legacy/optional fallback for YouTube scraping (not required)
- Vercel (hosting + analytics)
- Tailwind CSS + Framer Motion

## Business Goal
First 100 paying customers. Every code change must serve: production functionality, auth/payment readiness, trust, activation, conversion, SEO, or growth.

## Critical Rules

### Before ANY commit
1. `npx tsc --noEmit` must pass with 0 errors
2. `npm run build` must succeed locally
3. No fake claims, fake metrics, or fake testimonials
4. No hardcoded secrets

### Before marking ANY task complete
Run `./ops/scripts/verify-production.sh` and confirm all checks pass.
See `ops/agents/01-production-verification-gate.md` for the full checklist.

## Architecture

### Auth
- `ClerkProvider` wraps root layout with `signInUrl="/sign-in"` and `signUpUrl="/sign-up"`
- Sign-in: `app/sign-in/[[...sign-in]]/page.tsx` (MUST be catch-all for OAuth callbacks)
- Sign-up: `app/sign-up/[[...sign-up]]/page.tsx` (MUST be catch-all)
- Middleware: `middleware.ts` protects `/dashboard`, `/workspace`, `/billing`, `/api/ai/*`, `/api/credits/*`
- Auth redirects go to `/sign-in?redirect_url=<destination>` (NOT Clerk's default accounts.dev)

### Database (Supabase)
- `getSupabaseClient()` — anon key + RLS, use only for public reads
- `getSupabaseAdminClient()` — service role key, use for all server-side writes
- NEVER use anon client in server routes that write data
- Tables: `credits`, `subscriptions`, `generations`, `profiles`, `leads`, `webhook_events`

### Credits System
- Free tier: 15 credits on signup (~3 analyses)
- Starter: $10 one-time, 250 credits
- Pro: $20/month, 2000 credits
- Elite: $50/month, 10000 credits
- Cost per analysis: 5 credits
- Bootstrap: `app/api/bootstrap/route.ts` and `app/lib/dashboard-data.ts`

### Paddle Billing
- Price IDs are defined in `app/lib/plans.ts` — single source of truth
- Price IDs must match `app/api/paddle/webhook/route.ts` and `app/checkout/[plan]/page.tsx`
- Webhook endpoint: `app/api/paddle/webhook/route.ts`
- Paddle webhook secret: `PADDLE_WEBHOOK_SECRET` env var
- Client token: `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` env var

## Title Tags (CRITICAL)
The root layout uses `template: "%s | HookSignals"`. Do NOT add `| HookSignals` to page-level `metadata.title` strings — it will be doubled.

**Correct:**
```tsx
export const metadata = { title: "Hook Analyzer" }
// Renders as: "Hook Analyzer | HookSignals"
```

**Wrong:**
```tsx
export const metadata = { title: "Hook Analyzer | HookSignals" }
// Renders as: "Hook Analyzer | HookSignals | HookSignals"
```

**Exception:** Use `{ absolute: "..." }` to bypass the template entirely (e.g., blog posts).

## Required Env Vars

| Var | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | YES | Clerk instance |
| `CLERK_SECRET_KEY` | YES | Server-side Clerk |
| `NEXT_PUBLIC_SUPABASE_URL` | YES | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | YES | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | YES | Supabase admin (server only) |
| `OPENAI_API_KEY` | YES | Hook analysis AI |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | YES | Paddle checkout |
| `PADDLE_WEBHOOK_SECRET` | YES | Webhook verification |
| `YOUTUBE_API_KEY` | For YouTube URL analyzer | YouTube Data API v3 (primary). Also checks `GOOGLE_YOUTUBE_API_KEY`, `YOUTUBE_DATA_API_KEY`. Without this, URL mode falls back to manual mode — page stays functional. |
| `APIFY_TOKEN` | Optional legacy | Apify scraper fallback if `YOUTUBE_API_KEY` is not set. Not required. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics |
| `OPENAI_MODEL` | Optional | Defaults to gpt-4o-mini |

## YouTube Video Analyzer

`/youtube-video-analyzer` is a real working tool (not early access).

- **URL mode**: Requires `YOUTUBE_API_KEY`. Fetches real public metadata via YouTube Data API v3.
- **Manual mode**: No API key needed. User pastes title, hook, thumbnail text. Always works.
- Provider priority: `YOUTUBE_API_KEY` → `APIFY_TOKEN` → graceful manual-mode fallback.
- Scores are AI estimates based on public packaging signals — never claim real CTR/retention data.

## Known Production Status — DNS (May 2026)
`clerk.hooksignals.com` CNAME was added by owner. Verify propagation with `dig clerk.hooksignals.com`.
If still NXDOMAIN, check Namecheap DNS for: Type=CNAME, Host=clerk, Value=frontend-api.clerk.services.

## HookSignalOS
See `ops/` directory for the full operating system:
- `ops/agents/` — auditors and agents for quality, growth, trust
- `ops/scripts/verify-production.sh` — production verification script

## Development Workflow
```bash
npm run dev          # local development
npx tsc --noEmit     # type check
npm run build        # production build
npx playwright test tests/production.spec.ts  # production tests
./ops/scripts/verify-production.sh            # full production gate
```
