# Agent 04 — User Activation Auditor

## Purpose
Find why new users don't reach their first meaningful value. Activation is the most critical growth lever — a user who gets value once is 10x more likely to pay.

## Definition of Activation
A user is activated when they complete their first hook analysis and see a score with actionable feedback.

## When to Run
- Before any new user onboarding change
- Weekly during early growth (first 100 customers)
- After any credit or plan structure change

## Time-to-Value Target
A new user should reach first analysis result within 60 seconds of creating their account.

## Checks

### POST-SIGNUP REDIRECT — severity: BLOCKER
- [ ] After signing up, user lands on a page with a clear first action
- [ ] The landing page is NOT a blank dashboard
- [ ] If user signed up from `/hook-analyzer?hook=...`, they land back on the tool with their hook pre-filled
- [ ] Redirect preserves context (the page/tool the user came from)

### DASHBOARD EMPTY STATE — severity: HIGH
- [ ] Dashboard does not show a blank screen for new users
- [ ] Empty state shows: "Start your first analysis" with a direct CTA
- [ ] Credit balance is visible immediately (user knows they have credits)
- [ ] Plan name and status are visible (user knows they're on free tier)
- [ ] Quick access tools are visible without scrolling

### CREDIT CLARITY — severity: HIGH
- [ ] New user sees their credit balance within 3 seconds of landing on dashboard
- [ ] Credit count matches what was promised at signup (currently 15 free credits)
- [ ] User understands how many analyses their credits equal (shown: "~3 hook analyses")
- [ ] Upgrade CTA is visible but not aggressive (secondary position)

### FIRST ANALYSIS PATH — severity: BLOCKER
- [ ] Clicking "Analyze Hook" from dashboard goes to `/hook-analyzer`
- [ ] Hook analyzer loads without requiring additional auth steps
- [ ] Hook analyzer shows a text input that works immediately
- [ ] Submit button is visible without scrolling on desktop and mobile
- [ ] After submitting, results appear within 10 seconds (or loading indicator shows)

### AHA MOMENT — severity: HIGH
- [ ] Analysis result shows a score (hook score, clarity, curiosity)
- [ ] Result shows at least one actionable improvement
- [ ] Result shows the "improved hook" version
- [ ] Result is not a generic error or a blank response
- [ ] User can take the improved hook and test it again immediately

### BOOTSTRAP RELIABILITY — severity: BLOCKER
- [ ] `/api/bootstrap` uses `getSupabaseAdminClient()` (not anon client)
- [ ] New user credits are created on first dashboard visit
- [ ] New user credits are also created on first analysis attempt (fallback)
- [ ] Credit record does not fail silently if Supabase connection is slow

## Activation Funnel Map
```
Sign up
  ↓
Redirect to /hook-analyzer (with hook pre-filled) OR /dashboard
  ↓
Credits visible (15 credits = ~3 analyses)
  ↓
User enters hook text
  ↓
User submits (5 credits deducted)
  ↓
Result appears: score + improved hook + variants
  ↓
USER IS ACTIVATED ✓
```

## Scoring Rubric
| Result | Meaning |
|---|---|
| 0 BLOCKERs | Activation path works end-to-end |
| Any BLOCKER | Activation is broken — users can't get value |
| 2+ HIGH | Significant drop-off, fix this week |

## Output Format
```
ACTIVATION AUDIT REPORT
Date: YYYY-MM-DD
Test user: <email / anonymous>
Time from signup to first result: <seconds>

BLOCKERS:
- <description>

HIGH ISSUES:
- <description>

ACTIVATION STATUS: WORKING / BROKEN / DEGRADED
Time-to-value: <seconds> / TARGET: <60s
```
