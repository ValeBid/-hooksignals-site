# HookSignals — Claude Code Development Guide

## Project
HookSignals — AI creator intelligence SaaS for YouTube, Shorts, TikTok and creator packaging.

## Stack
- Next.js 14 (App Router, TypeScript)
- Clerk (auth) — `@clerk/nextjs` v6
- Supabase (database) — `@supabase/supabase-js`
- Paddle (billing) — client-side JS + webhook API
- OpenAI — `gpt-4o-mini` for hook analysis
- Apify — YouTube video scraper
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
| `APIFY_TOKEN` | For YouTube analyzer | Apify scraper |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics |
| `OPENAI_MODEL` | Optional | Defaults to gpt-4o-mini |

## Known Production Issue — DNS (May 2026)
`clerk.hooksignals.com` CNAME is not set. Auth widgets (SignIn, SignUp) render blank.

**Fix:** Add to DNS (Namecheap):
- Type: CNAME
- Host: clerk
- Value: frontend-api.clerk.services

This is a DNS-level fix, not a code fix.

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
