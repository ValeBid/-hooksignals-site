# Agent 06 — Technical SEO Auditor

## Purpose
Protect crawlability, indexability, and search quality. SEO is a long-term channel — mistakes here compound negatively.

## When to Run
- Before any deployment that touches pages, routes, or metadata
- Monthly SEO review
- After any URL structure change

## Checks

### TITLE TAGS — severity: HIGH
- [ ] No page has duplicate "| HookSignals | HookSignals" in its title
- [ ] Root layout uses `template: "%s | HookSignals"` — page titles must NOT end with "| HookSignals"
- [ ] Exception: `{ absolute: "..." }` in metadata bypasses template (use for blog, share pages)
- [ ] All titles are between 30-60 characters
- [ ] Tool pages lead with the tool name, not the brand

**High-value title targets:**
- `/hook-analyzer` → "AI Hook Analyzer for YouTube, TikTok and Reels | HookSignals"
- `/youtube-video-analyzer` → "YouTube Video Analyzer | Real Data Hook & Packaging Analysis | HookSignals"
- `/pricing` → "Pricing | HookSignals Creator Plans"

### META DESCRIPTIONS — severity: MEDIUM
- [ ] Every money page has a unique meta description
- [ ] Descriptions are 120-160 characters
- [ ] Descriptions include a benefit and an action
- [ ] No duplicate descriptions across pages

### CANONICAL URLS — severity: HIGH
- [ ] Every page has a canonical URL matching its actual URL
- [ ] No canonical pointing to wrong URL
- [ ] Canonical uses `https://hooksignals.com` (not www, not http)
- [ ] Dynamic pages generate canonical correctly

### ROBOTS AND INDEXING — severity: BLOCKER
- [ ] `/robots.txt` allows all public pages
- [ ] No money pages have `noindex` in metadata
- [ ] `/dashboard`, `/billing`, `/workspace` should NOT be indexed (protected pages)
- [ ] `/api/*` routes are not accidentally indexed

### SITEMAP — severity: HIGH
- [ ] `/sitemap.xml` is accessible and valid
- [ ] Sitemap includes all public tool pages
- [ ] Sitemap includes all SEO content pages
- [ ] Sitemap does NOT include protected routes
- [ ] All sitemap URLs use `https://hooksignals.com`

### SCHEMA MARKUP — severity: MEDIUM
- [ ] Homepage has `SoftwareApplication` or `WebSite` schema
- [ ] Tool pages have `SoftwareApplication` schema where applicable
- [ ] Blog posts have `Article` schema
- [ ] FAQ pages have `FAQPage` schema
- [ ] Breadcrumbs have `BreadcrumbList` schema on deep pages

### OPEN GRAPH — severity: MEDIUM
- [ ] Every public page has `og:title`, `og:description`, `og:url`
- [ ] `og:image` is set on key pages (use `/opengraph-image` generator)
- [ ] `og:siteName` is "HookSignals" consistently
- [ ] Twitter card metadata exists on key pages

### INTERNAL LINKING — severity: MEDIUM
- [ ] Tool pages link to related tools ("Also try: Hook Improver")
- [ ] Homepage links to key tool pages
- [ ] Blog posts link to relevant tool pages
- [ ] Footer links to all major tool pages

### PERFORMANCE — severity: MEDIUM
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Images use `next/image` (not raw `<img>`)
- [ ] Fonts load with `display: swap`

## Priority Pages for SEO

High priority (most creator search intent):
1. `/hook-analyzer` — "hook analyzer", "youtube hook score"
2. `/youtube-video-analyzer` — "analyze youtube video", "youtube hook analysis"
3. `/youtube-hook-generator` — "youtube hook generator"
4. `/shorts-script-generator` — "shorts script generator"
5. `/thumbnail-text-checker` — "thumbnail text checker"

## Output Format
```
SEO AUDIT REPORT
Date: YYYY-MM-DD

TITLE TAGS: PASS / FAIL — <issues>
CANONICALS: PASS / FAIL — <issues>
ROBOTS/INDEX: PASS / FAIL — <issues>
SITEMAP: PASS / FAIL — <issues>
SCHEMA: PASS / FAIL — <issues>
OG TAGS: PASS / FAIL — <issues>
INTERNAL LINKS: PASS / FAIL — <issues>

CRITICAL FIXES: <list>
RECOMMENDED: <list>
```
