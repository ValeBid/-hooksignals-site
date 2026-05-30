# Agent 03 — Conversion Leak Detector

## Purpose
Find every place where a user drops out of the funnel before signing up or paying. Each leak costs real revenue.

## When to Run
- Before any major launch
- Weekly during early customer acquisition
- After any funnel change (homepage, pricing, checkout)

## Funnel Stages
```
COLD VISITOR → HOMEPAGE → PRICING / TOOL → SIGN UP → ACTIVATE → UPGRADE → RETAIN
```

## Checks

### HOMEPAGE ENTRY — severity: HIGH
- [ ] Hero headline clearly communicates the product value in one sentence
- [ ] Primary CTA is visible above the fold on desktop and mobile
- [ ] Primary CTA text is action-oriented (not "Learn More" or "Get Started")
- [ ] Secondary CTA exists for users not ready to sign up
- [ ] Hero does NOT require scrolling to understand the product
- [ ] Page load time < 3s on 4G (check Vercel Speed Insights)
- [ ] No layout shift that disrupts reading on mobile

### PRICING DISCOVERY — severity: HIGH
- [ ] Pricing is reachable in ≤ 2 clicks from homepage
- [ ] Pricing page has a clear primary CTA for each plan
- [ ] Pricing page answers: "What do I get?" and "What does it cost?"
- [ ] Trial or free tier is clearly explained
- [ ] Plan comparison shows feature differences (not just price)
- [ ] Checkout button on pricing goes directly to checkout (not another landing page)

### SIGN-UP FRICTION — severity: HIGH
- [ ] Sign-up form is a single step (Clerk handles complexity)
- [ ] Sign-up page does NOT ask for credit card (free tier)
- [ ] Sign-up redirect goes to the right place (tool or dashboard, not a blank page)
- [ ] Email verification does not break the flow (Clerk handles in-place)
- [ ] Mobile sign-up is usable on 375px screen width

### CHECKOUT FRICTION — severity: BLOCKER
- [ ] Paddle checkout loads without errors
- [ ] `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` is set in Vercel production env
- [ ] Checkout succeeds with test card in sandbox, real card in production
- [ ] Post-checkout redirect goes to `/dashboard?checkout=success`
- [ ] Success banner appears on dashboard after checkout

### MOBILE CONVERSION — severity: HIGH
- [ ] Homepage CTA is tappable (min 44px touch target)
- [ ] Sign-up form works on mobile keyboard without layout issues
- [ ] Pricing page is readable on 375px without horizontal scroll
- [ ] Checkout frame is usable on mobile

### DEAD CTAs — severity: BLOCKER
- [ ] No CTA button goes to a 404 page
- [ ] No CTA button submits without feedback (loading state, error state)
- [ ] No CTA that says "Sign up free" but requires a credit card
- [ ] No "Analyze now" button that does nothing when clicked

## Scoring Rubric
| Score | Meaning |
|---|---|
| 0 BLOCKERs, 0 HIGH | Funnel is solid |
| 0 BLOCKERs, 1-3 HIGH | Acceptable, fix in 1 week |
| Any BLOCKER | Must fix immediately |
| 3+ HIGH | Significant revenue impact — fix this sprint |

## Output Format
```
CONVERSION LEAK REPORT
Date: YYYY-MM-DD
Funnel stage tested: <stage>
Device tested: Desktop / Mobile

LEAKS FOUND:
- [BLOCKER] <description> — <page> — <recommended fix>
- [HIGH] <description> — <page> — <recommended fix>
- [MEDIUM] <description> — <page> — <recommended fix>

ESTIMATED IMPACT: High / Medium / Low
PRIORITY ORDER: <numbered list>
```
