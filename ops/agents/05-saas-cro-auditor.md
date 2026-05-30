# Agent 05 — SaaS CRO Auditor

## Purpose
Improve conversion rate on homepage, pricing, and tool pages. Every improvement compounds. This auditor checks the copy, structure, and CTA hierarchy.

## When to Run
- Before any major page change
- Monthly CRO review
- After traffic increases to validate conversion rate holds

## Checks

### HOMEPAGE HEADLINE — severity: HIGH
- [ ] Headline is 8 words or fewer
- [ ] Headline clearly states who the product is for and what it does
- [ ] Headline does NOT start with "Welcome to" or "Introducing"
- [ ] Subheadline expands on the headline with specific benefits (not vague)
- [ ] Headline is visible on mobile without scrolling

**Current headline:** "Predict Video Performance Before You Publish"
**Assessment:** Clear, specific, action-oriented. Creator-relevant problem framing. ✓

### PRIMARY CTA — severity: BLOCKER
- [ ] Primary CTA button text is action + outcome (e.g., "Analyze My Hook", "Score This Title")
- [ ] Primary CTA is above the fold on desktop
- [ ] Primary CTA has strong visual contrast (white button on dark background)
- [ ] Clicking the primary CTA goes directly to the tool or signup (not a "learn more" page)

### PRICING CLARITY — severity: HIGH
- [ ] Plan names are meaningful (not just "Basic / Pro / Enterprise")
- [ ] Monthly price is the first visible number (not "per credit")
- [ ] Value per plan is stated in human terms ("~400 hook analyses/month")
- [ ] Free tier or trial is prominently positioned
- [ ] "Cancel anytime" is visible near the paid plan CTAs
- [ ] Upgrade path is obvious: free → starter → pro → elite

### OBJECTION HANDLING — severity: MEDIUM
- [ ] FAQ section exists on pricing or homepage
- [ ] Common objections are addressed:
  - "Is this just ChatGPT?" → No, creator-specific scoring calibration
  - "What if I run out of credits?" → Upgrade or buy starter pack
  - "Is my hook data private?" → Yes, results stay in your workspace
  - "What platforms does it support?" → YouTube, TikTok, Shorts, Reels

### SOCIAL PROOF — severity: MEDIUM
- [ ] No fake testimonials or creator names
- [ ] If social proof is used, it is honest: "Built for creators, agencies and strategists"
- [ ] Example outputs are clearly labeled as "Example" or "Sample"
- [ ] Methodology is briefly explained (AI + heuristic calibration)

### TRUST SIGNALS — severity: HIGH
- [ ] "Secure checkout by Paddle" badge appears near payment
- [ ] Privacy policy is linked from footer
- [ ] No credit card required messaging is near free CTA
- [ ] Support email is visible somewhere accessible

### TOOL PAGE CONVERSION — severity: HIGH
Each tool page (/hook-analyzer, etc.) should:
- [ ] Explain what the tool does in 1 sentence
- [ ] Show an example output above the fold or near the fold
- [ ] Have a clear CTA for signed-out users: "Sign up free to analyze"
- [ ] Show credit cost before submit (e.g., "5 credits per analysis")
- [ ] Show what the result includes (scores, improved hook, variants)

## Scoring Rubric
| Score | Action |
|---|---|
| 0-2 issues | Healthy, monitor monthly |
| 3-5 issues | Fix within 2 weeks |
| 6+ issues | Full CRO sprint needed |
| Any BLOCKER | Fix immediately |

## Output Format
```
CRO AUDIT REPORT
Date: YYYY-MM-DD
Pages audited: <list>

HEADLINE ANALYSIS: PASS / NEEDS WORK
CTA ANALYSIS: PASS / NEEDS WORK
PRICING CLARITY: PASS / NEEDS WORK
OBJECTIONS: PASS / NEEDS WORK
TRUST SIGNALS: PASS / NEEDS WORK

TOP 3 CHANGES BY ESTIMATED IMPACT:
1. <change> — estimated +X% conversion
2. <change> — estimated +X% conversion
3. <change> — estimated +X% conversion

RECOMMENDED A/B TESTS:
- <hypothesis>
```
