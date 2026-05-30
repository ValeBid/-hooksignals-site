#!/usr/bin/env bash
# HookSignalOS — Production Verification Gate
# Run after every PR merge to confirm production is healthy.
# Usage: ./ops/scripts/verify-production.sh

set -e

PROD_URL="https://hooksignals.com"
EXPECTED_ORIGIN="https://github.com/ValeBid/-hooksignals-site"
PASS=0
FAIL=0
WARN=0

pass() { echo "  ✓ $1"; ((PASS++)); }
fail() { echo "  ✗ $1"; ((FAIL++)); }
warn() { echo "  ⚠ $1"; ((WARN++)); }
header() { echo ""; echo "── $1 ──────────────────────────────────"; }

echo "╔══════════════════════════════════════════════╗"
echo "║   HookSignalOS — Production Verification     ║"
echo "╚══════════════════════════════════════════════╝"
echo "Date: $(date -u '+%Y-%m-%d %H:%M UTC')"

# ── 1. Git state ────────────────────────────────────────────────────────────
header "1. Git"

if git diff --quiet && git diff --cached --quiet; then
  pass "Working tree clean"
else
  fail "Uncommitted changes detected"
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" = "main" ]; then
  pass "On main branch"
else
  warn "On branch: $CURRENT_BRANCH (expected main after merge)"
fi

LOCAL_SHA=$(git rev-parse HEAD)
REMOTE_SHA=$(git ls-remote origin main | awk '{print $1}')
if [ "$LOCAL_SHA" = "$REMOTE_SHA" ]; then
  pass "Local main matches origin/main ($LOCAL_SHA)"
else
  fail "Local main ($LOCAL_SHA) does not match origin/main ($REMOTE_SHA)"
fi

# ── 2. DNS ──────────────────────────────────────────────────────────────────
header "2. DNS"

CLERK_DNS=$(dig clerk.hooksignals.com +short 2>/dev/null)
if [ -n "$CLERK_DNS" ]; then
  pass "clerk.hooksignals.com resolves to: $CLERK_DNS"
else
  fail "clerk.hooksignals.com NXDOMAIN — Clerk JS will not load"
  echo "     FIX: Add CNAME record in DNS: clerk → frontend-api.clerk.services"
fi

PROD_DNS=$(dig hooksignals.com +short 2>/dev/null | head -1)
if [ -n "$PROD_DNS" ]; then
  pass "hooksignals.com resolves to: $PROD_DNS"
else
  fail "hooksignals.com does not resolve"
fi

# ── 3. HTTP responses ────────────────────────────────────────────────────────
header "3. HTTP"

check_url() {
  local url="$1"
  local label="$2"
  local status
  status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$url" 2>/dev/null)
  if [ "$status" = "200" ]; then
    pass "$label → $status"
  elif [ "$status" = "301" ] || [ "$status" = "302" ]; then
    warn "$label → $status (redirect)"
  else
    fail "$label → $status"
  fi
}

check_url "$PROD_URL" "Homepage"
check_url "$PROD_URL/hook-analyzer" "Hook Analyzer"
check_url "$PROD_URL/pricing" "Pricing"
check_url "$PROD_URL/sign-in" "Sign In"
check_url "$PROD_URL/sign-up" "Sign Up"
check_url "$PROD_URL/sitemap.xml" "Sitemap"
check_url "$PROD_URL/robots.txt" "Robots.txt"
check_url "$PROD_URL/youtube-video-analyzer" "YouTube Analyzer"
check_url "$PROD_URL/shorts-script-generator" "Shorts Script Generator"

DASHBOARD_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "$PROD_URL/dashboard" 2>/dev/null)
if [[ "$DASHBOARD_STATUS" =~ ^(200|302|307)$ ]]; then
  pass "Dashboard accessible: $DASHBOARD_STATUS (auth redirect expected)"
else
  fail "Dashboard returned unexpected status: $DASHBOARD_STATUS"
fi

# ── 4. SEO spot check ────────────────────────────────────────────────────────
header "4. SEO"

HOMEPAGE_TITLE=$(curl -s --max-time 10 "$PROD_URL" 2>/dev/null | grep -o '<title>[^<]*</title>' | head -1)
echo "  Homepage title: $HOMEPAGE_TITLE"

if echo "$HOMEPAGE_TITLE" | grep -q "HookSignals | HookSignals"; then
  fail "Duplicate HookSignals suffix in homepage title"
else
  pass "No duplicate title suffix on homepage"
fi

SITEMAP=$(curl -s --max-time 10 "$PROD_URL/sitemap.xml" 2>/dev/null)
if echo "$SITEMAP" | grep -q "hooksignals.com"; then
  pass "Sitemap contains hooksignals.com URLs"
else
  fail "Sitemap missing or malformed"
fi

# ── 5. Summary ───────────────────────────────────────────────────────────────
echo ""
echo "══════════════════════════════════════════════"
echo "PASS: $PASS  FAIL: $FAIL  WARN: $WARN"
echo ""
if [ "$FAIL" -eq 0 ]; then
  echo "VERDICT: ✓ PRODUCTION VERIFIED"
else
  echo "VERDICT: ✗ PRODUCTION HAS $FAIL FAILURE(S) — DO NOT MARK COMPLETE"
fi
echo "══════════════════════════════════════════════"
