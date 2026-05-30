# Agent 01 — Production Verification Gate

## Purpose
Ensure no task is marked complete until production is verified. This gate prevents shipping broken code, missing env vars, DNS failures, or unverified deployments.

## When to Run
Before marking ANY task, PR, or phase complete.

## Inputs
- Branch name
- PR number or merge commit
- Vercel project ID: `prj_OOmqfF2akIRQqRnhZx8fbh5IErnN`
- Team ID: `team_y2570EY426oHrohs7r4Ihn3i`
- Production URL: `https://hooksignals.com`

## Checks

### GIT — severity: BLOCKER
- [ ] `git status` shows clean working tree (no uncommitted changes)
- [ ] All changes are on a named branch (not main directly)
- [ ] Branch is pushed to remote

### GITHUB — severity: BLOCKER
- [ ] PR is opened against main
- [ ] PR is reviewed (or self-reviewed with test evidence)
- [ ] PR is merged into main
- [ ] Latest commit on origin/main matches the PR merge commit

### VERCEL — severity: BLOCKER
- [ ] Production deployment state is READY (not BUILDING or ERROR)
- [ ] Production deployment `githubCommitSha` matches `origin/main` HEAD
- [ ] Deployment target is `production` (not preview)

### PRODUCTION ROUTES — severity: BLOCKER
- [ ] `https://hooksignals.com` returns 200 with correct title
- [ ] `https://hooksignals.com/hook-analyzer` returns 200
- [ ] `https://hooksignals.com/pricing` returns 200
- [ ] `https://hooksignals.com/sign-in` returns 200 and Clerk widget renders
- [ ] `https://hooksignals.com/sign-up` returns 200 and Clerk widget renders
- [ ] `https://hooksignals.com/dashboard` redirects to `/sign-in` for unauthenticated users
- [ ] No production route returns 404 for key pages

### CLERK — severity: BLOCKER
- [ ] `clerk.hooksignals.com` DNS resolves (CNAME to `frontend-api.clerk.services`)
- [ ] Clerk JS loads without console errors
- [ ] `<SignIn />` component renders (not blank)
- [ ] `<SignUp />` component renders (not blank)
- [ ] Auth redirect to `/sign-in?redirect_url=<destination>` works

### CONSOLE ERRORS — severity: HIGH
- [ ] No `ERR_NAME_NOT_RESOLVED` errors
- [ ] No `Failed to load Clerk` errors
- [ ] No uncaught JS exceptions on key pages

### SEO — severity: MEDIUM
- [ ] No page has `| HookSignals | HookSignals` in its title
- [ ] `https://hooksignals.com/sitemap.xml` returns valid XML
- [ ] `https://hooksignals.com/robots.txt` returns valid robots.txt

## Scoring Rubric
- All BLOCKERs pass → eligible for completion
- Any BLOCKER fails → task is NOT complete, must fix first
- HIGH failures → document and fix in same PR if possible
- MEDIUM failures → document and create follow-up issue

## Output Format
```
PRODUCTION VERIFICATION REPORT
Date: YYYY-MM-DD HH:MM UTC
Branch: <branch>
PR: #<number>
Merge commit: <sha>
origin/main: <sha>
Vercel deployment: <id>
Vercel state: READY / ERROR / BUILDING
Production URL: https://hooksignals.com

BLOCKERS:
- [ ] ...

HIGH:
- [ ] ...

MEDIUM:
- [ ] ...

VERDICT: PASS / FAIL
```

## DNS Fix Reference
If `clerk.hooksignals.com` fails:
1. Log in to Namecheap (or your DNS provider)
2. Go to Advanced DNS for `hooksignals.com`
3. Add record: Type=CNAME, Host=clerk, Value=frontend-api.clerk.services, TTL=Automatic
4. Wait 5-30 minutes for propagation
5. Verify with: `dig clerk.hooksignals.com`
