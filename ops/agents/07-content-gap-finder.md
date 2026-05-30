# Agent 07 — Content Gap Finder

## Purpose
Find content opportunities that can bring relevant creator traffic to HookSignals. SEO content compounds over time — early gaps become defensible moats.

## When to Run
- Monthly content review
- Before any new content sprint
- When traffic plateaus or declines

## Target Audience Keywords

**High-intent creator tools:**
- "youtube hook generator free"
- "hook analyzer for youtube"
- "how to write a youtube hook"
- "shorts script generator"
- "thumbnail text checker"
- "youtube title analyzer"
- "tiktok hook examples"
- "youtube hook examples"
- "retention hook formulas"

**Educational creator content:**
- "how to hook viewers in first 3 seconds"
- "youtube hook psychology"
- "best youtube title formulas"
- "why viewers leave videos early"
- "youtube thumbnail best practices"
- "shorts hook ideas"

**Comparison/alternative searches:**
- "vidiq alternative"
- "tubebuddy alternative"
- "chatgpt for youtube hooks"
- "best hook analyzer 2026"

## Checks

### EXISTING CONTENT AUDIT — severity: MEDIUM
- [ ] List all existing content pages under `/blog`, `/seo`, `/hooks`, `/hook-examples`
- [ ] Identify pages with thin content (< 500 words of useful text)
- [ ] Identify pages with no internal links pointing to them (orphans)
- [ ] Identify pages with no CTA linking to a tool

### MISSING TOOL PAGES — severity: HIGH
- [ ] Is there a page optimized for "tiktok hook analyzer"? → `/hooks/tiktok`  ✓ exists
- [ ] Is there a page for "instagram reels hook"? → `/hooks/instagram-reels` ✓ exists
- [ ] Is there a page for "podcast hook generator"? → check
- [ ] Is there a page for "linkedin hook examples"? → potential gap
- [ ] Is there a page for "youtube title ideas generator"? → check

### MISSING EDUCATIONAL CONTENT — severity: MEDIUM
- [ ] "How to write a YouTube hook" — comprehensive guide
- [ ] "YouTube Shorts hook formulas that work" — actionable guide
- [ ] "Why your hook matters more than your thumbnail" — educational
- [ ] "How to test your hook before publishing" → links to Hook Analyzer

### MISSING COMPARISON PAGES — severity: MEDIUM
- [ ] "HookSignals vs VidIQ" → exists ✓
- [ ] "HookSignals vs TubeBuddy" → exists ✓
- [ ] "HookSignals vs ChatGPT" → exists ✓
- [ ] "HookSignals vs manual hook writing" → exists ✓
- [ ] "Best hook analyzer tools" → exists ✓
- [ ] "Best creator tools 2026" → check

### INTERNAL LINK OPPORTUNITIES — severity: MEDIUM
For each gap found:
- [ ] Does the relevant tool page exist?
- [ ] Does the content page link to the tool?
- [ ] Does the blog link to the content page?

## Content Priority Framework
```
SCORE = Search Intent × Creator Relevance × Tool Connection × Traffic Potential
```

Score each gap 1-5 on each dimension. Build content scoring ≥ 12/20 first.

## Output Format
```
CONTENT GAP REPORT
Date: YYYY-MM-DD

HIGH VALUE GAPS:
- <keyword> | Volume estimate: <K> | Difficulty: <L/M/H> | Existing page: Y/N | Recommended: <action>

EXISTING THIN PAGES:
- <page> | Word count: <N> | Traffic: <estimate> | Fix: <action>

ORPHAN PAGES:
- <page> | Internal links to it: 0 | Fix: add link from <recommended source>

PRIORITY CONTENT QUEUE:
1. <title> — <keyword> — <format> — <connects to tool>
2. ...
```
