# Agent 08 — YouTube Intelligence Auditor

## Purpose
Evaluate whether HookSignals' product outputs are genuinely useful to creators. If the AI analysis is generic, vague, or wrong, users won't come back.

## When to Run
- After any AI model or prompt change
- Monthly quality review
- After user feedback indicates output quality issues
- Before any feature marketing claims

## Test Methodology
1. Submit 10 real hook samples (5 strong, 5 weak)
2. Evaluate each output against the rubric below
3. Check for calibration consistency
4. Check for niche/platform specificity

## Test Hooks

**Strong hooks (should score 70-90):**
1. "I tested 37 YouTube hooks and one doubled retention in 48 hours" — YouTube Shorts, creator niche
2. "Before you post your next Shorts, fix this one mistake that kills the first second" — YouTube Shorts
3. "I analyzed 100 viral TikToks and the pattern that wins every time surprised me" — TikTok, creator niche
4. "This one thumbnail word increased my CTR by 34% — here's why it works" — YouTube, creator niche
5. "Most creators lose 40% of viewers in the first 5 seconds — here's how to stop it" — any platform

**Weak hooks (should score 15-45):**
6. "This is my morning routine" — vague, no tension
7. "AI is changing everything" — generic, no specificity
8. "How I grew my channel" — no outcome, no curiosity
9. "Today I want to talk about hooks" — meta, no payoff
10. "Subscribe if you liked this" — not a hook

## Checks

### SCORE CALIBRATION — severity: HIGH
- [ ] Strong hooks consistently score 65-90 (not 30 or 99)
- [ ] Weak hooks consistently score 10-45 (not 65+)
- [ ] Scores correlate with actual hook quality signals (specificity, tension, outcome)
- [ ] Platform context changes the score appropriately (TikTok vs. long-form)
- [ ] Niche context is reflected in the output, not ignored

### OUTPUT USEFULNESS — severity: HIGH
- [ ] "Improved hook" is genuinely better than the input (not just rephrased)
- [ ] "Weakness" field identifies a real weakness (not generic praise)
- [ ] "Variants" are 3 meaningfully different alternatives (not variations on same theme)
- [ ] "Retention notes" are actionable (not "be more specific")
- [ ] "Title pairings" match the hook's promise (not generic)
- [ ] "Thumbnail angles" are visual and concrete (not "use bold text")

### CREATOR SPECIFICITY — severity: MEDIUM
- [ ] Platform context (YouTube/TikTok/Reels) changes the pacing advice
- [ ] Niche context (fitness/AI/SaaS) is reflected in weakness and variants
- [ ] Audience context (beginners/founders/creators) changes the trigger analysis
- [ ] Without context, the output still provides value (doesn't say "I can't analyze without context")

### ANTI-GAMING PROTECTION — severity: HIGH
- [ ] Nonsense input (e.g., "asdfjkl;") scores below 15
- [ ] Keyword stuffing (e.g., "YouTube hook viral retention CTR") doesn't score artificially high
- [ ] One-word inputs return the low-quality fallback
- [ ] Extremely long inputs (500+ chars) are handled gracefully

### CONSISTENCY — severity: MEDIUM
- [ ] Same hook submitted twice returns similar scores (±10 points)
- [ ] Model doesn't hallucinate niche details not in the input
- [ ] Model doesn't invent audience attributes

## Scoring Rubric
| Dimension | Weight | Score |
|---|---|---|
| Calibration accuracy | 30% | /10 |
| Output usefulness | 30% | /10 |
| Creator specificity | 20% | /10 |
| Anti-gaming | 10% | /10 |
| Consistency | 10% | /10 |
**Total: /10 weighted**

- 8.5+ → Production ready
- 6.5-8.4 → Needs prompt refinement
- < 6.5 → Quality issue, do not market as "AI-powered"

## Output Format
```
YOUTUBE INTELLIGENCE AUDIT
Date: YYYY-MM-DD
Model: <OPENAI_MODEL value>
Test hooks submitted: 10

CALIBRATION: <score>/10 — <notes>
USEFULNESS: <score>/10 — <notes>
SPECIFICITY: <score>/10 — <notes>
ANTI-GAMING: <score>/10 — <notes>
CONSISTENCY: <score>/10 — <notes>

WEIGHTED SCORE: <X>/10
VERDICT: PRODUCTION READY / NEEDS REFINEMENT / QUALITY ISSUE

WORST OUTPUTS:
- Hook: "<hook>"
  Issue: <description>
  Fix: <recommended prompt change>
```
