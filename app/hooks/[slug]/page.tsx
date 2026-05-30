import Link from "next/link";
import { notFound } from "next/navigation";
import FAQSchema from "../../components/faq-schema";
import BreadcrumbSchema from "../../components/breadcrumb-schema";

type NichePage = {
  title: string;
  niche: string;
  audience: string;
  description: string;
  examples: [string, string][]; // [hook, why it works]
  faqs: readonly { q: string; a: string }[];
};

const pages: Record<string, NichePage> = {
  "youtube-shorts": {
    title: "YouTube Shorts Hook Analyzer",
    niche: "YouTube Shorts",
    audience: "short-form creators",
    description:
      "Analyze YouTube Shorts hooks for clarity, curiosity, retention risk and first-second stopping power.",
    examples: [
      [
        "I tested 37 YouTube hooks and one doubled retention in 48 hours",
        "Specific test (37), measurable result (doubled), defined timeframe — all three retention signals in one line.",
      ],
      [
        "I uploaded 100 Shorts in 30 days and only one changed everything",
        "Scale (100 uploads) + curiosity gap (which one?) + timeframe (30 days) = strong first-second pull.",
      ],
      [
        "The first 3 seconds ruined this Short before anyone saw the payoff",
        "Names the failure point, creates urgency, implies a fixable mistake — viewer checks their own content instantly.",
      ],
    ],
    faqs: [
      {
        q: "What makes a strong YouTube Shorts hook?",
        a: "Shorts hooks need to work within the first 1–3 seconds because viewers can swipe immediately. The best hooks are specific (name the subject), fast (no warmup) and create a clear reason to stay — a result, a mistake or an open curiosity loop.",
      },
      {
        q: "How long should a YouTube Shorts hook be?",
        a: "Shorts hooks should land the core promise in 5–10 words. The viewer's decision happens before your second sentence. Long setups kill Shorts retention faster than almost any other mistake.",
      },
      {
        q: "Can HookSignals analyze Shorts hooks specifically?",
        a: "Yes. The analyzer accepts a platform input. When YouTube Shorts is selected, scoring weights fast pacing, visual simplicity and immediate payoff more heavily than long-form hooks.",
      },
    ],
  },
  tiktok: {
    title: "TikTok Hook Analyzer",
    niche: "TikTok",
    audience: "TikTok creators",
    description:
      "Score TikTok hooks for pattern interruption, clarity, curiosity and viewer retention.",
    examples: [
      [
        "I tried the TikTok hook format everyone copies and found one problem",
        "Critiques a common behavior, implies the viewer may be making the same mistake, creates curiosity about the flaw.",
      ],
      [
        "This 5-second opening made people watch until the end",
        "Specific timeframe (5 seconds) + measurable outcome (watch until end) — credibility without vagueness.",
      ],
      [
        "Stop starting TikToks like this if you want retention",
        "Direct command + undefined behavior creates urgency — viewer wants to know what to stop.",
      ],
    ],
    faqs: [
      {
        q: "How does TikTok's algorithm respond to hook quality?",
        a: "TikTok measures watch time and completion rate heavily in the first few seconds. A hook that gets viewers past 3 seconds signals topic relevance, which pushes the video to a larger audience. A weak hook creates immediate drop-off that suppresses distribution.",
      },
      {
        q: "Are TikTok hooks different from YouTube Shorts hooks?",
        a: "TikTok hooks benefit more from pattern interruption — breaking the visual or tonal expectation of the feed. YouTube Shorts hooks need clearer payoff promises because viewers often arrive with more intentional behavior. Both reward specificity and speed.",
      },
      {
        q: "What is the biggest TikTok hook mistake?",
        a: "Starting with context before tension. 'So today I wanted to talk about...' burns the first seconds on setup. Start with the most interesting part of the video — the result, the mistake, or the question.",
      },
    ],
  },
  "instagram-reels": {
    title: "Instagram Reels Hook Analyzer",
    niche: "Instagram Reels",
    audience: "Reels creators",
    description:
      "Improve Reels hooks with a clearer visual promise, audience trigger and retention angle.",
    examples: [
      [
        "I changed one Reel opening and the saves doubled",
        "Specific action (one change) + measurable metric (saves doubled) = proof-based hook with no vagueness.",
      ],
      [
        "This Reels hook works because the promise is instantly visual",
        "Meta-hook that demonstrates the principle while modeling it — strong for educational creators.",
      ],
      [
        "Most Reels lose viewers before the value appears",
        "Names the common failure, implies the viewer may be affected, creates urgency to hear the solution.",
      ],
    ],
    faqs: [
      {
        q: "What makes a Reels hook work differently than TikTok?",
        a: "Instagram Reels viewers often have stronger visual expectations. The on-screen text and visual frame matter as much as the spoken hook. A Reels hook needs to work even if sound is off — which means the visual promise must stand alone.",
      },
      {
        q: "How does saves count affect Reels distribution?",
        a: "Instagram weights saves and shares heavily in its distribution algorithm. A hook that promises reference-worthy content (tutorials, checklists, frameworks) tends to drive saves more than entertainment hooks. Matching hook type to content intent improves saves rate.",
      },
      {
        q: "Should Reels hooks be written or spoken?",
        a: "Both matter. The spoken hook carries emotion and pacing, but the on-screen text in the first 1–2 seconds carries the discoverability signal. A strong Reels hook aligns both so they reinforce the same promise.",
      },
    ],
  },
  fitness: {
    title: "Fitness Hook Analyzer",
    niche: "fitness",
    audience: "fitness creators and coaches",
    description:
      "Analyze fitness hooks for transformation promise, specificity, credibility and viewer motivation.",
    examples: [
      [
        "I fixed one squat mistake and my legs finally started growing",
        "Single fix + specific muscle + implied long struggle — fitness viewers recognize the frustration instantly.",
      ],
      [
        "This 10-minute workout failed until I changed the first exercise",
        "Time (10 minutes) + failure narrative + single change = strong proof-based hook for busy audiences.",
      ],
      [
        "Stop doing this warmup if your shoulders always hurt",
        "Direct warning + specific body part + pain recognition — viewer checks whether they do the same thing.",
      ],
    ],
    faqs: [
      {
        q: "What makes fitness hooks perform well?",
        a: "Fitness hooks work best when they name a specific pain (shoulders hurt, legs not growing) and imply an achievable fix. Transformation promises need a credibility anchor — a timeframe, a test, or a personal result — to avoid sounding like clickbait.",
      },
      {
        q: "How specific should a fitness hook be?",
        a: "Name the muscle, the movement, the condition, or the audience type whenever possible. 'Build bigger legs' is weaker than 'My legs finally grew after I fixed this one squat problem.' The more specific the promise, the faster the viewer sees relevance.",
      },
      {
        q: "Do fitness hooks need a credibility signal?",
        a: "Yes. Fitness is a trust-heavy niche — viewers have seen countless overblown claims. A personal result, a specific test, or a time constraint adds credibility that makes the hook feel worth watching.",
      },
    ],
  },
  ai: {
    title: "AI Content Hook Analyzer",
    niche: "AI",
    audience: "AI creators and builders",
    description:
      "Score AI content hooks for novelty, practical payoff, specificity and audience relevance.",
    examples: [
      [
        "I tested 12 AI tools and only one saved me 5 hours a week",
        "Scale (12 tools) + specific result (5 hours/week) + single winner = high credibility, curiosity about which one.",
      ],
      [
        "This AI workflow replaced the task I hated most",
        "Personal + specific task reference + implied transformation — relatable for anyone using AI in their work.",
      ],
      [
        "Most AI videos fail because the hook sounds like a feature list",
        "Self-referential critique of the niche, positions the creator as the exception — strong for meta-AI content.",
      ],
    ],
    faqs: [
      {
        q: "Why do AI content hooks often underperform?",
        a: "AI content hooks tend to lead with features or capabilities — 'this AI can do X.' Viewers care about outcomes, not features. The strongest AI hooks lead with a specific problem solved, time saved, or result achieved.",
      },
      {
        q: "How do you avoid sounding generic in AI content?",
        a: "Specificity is the antidote to generic AI content. Name the exact tool, the exact workflow, the exact outcome. 'I saved 5 hours a week' beats 'save time with AI' every time because the viewer can picture the result.",
      },
      {
        q: "Is AI content oversaturated on YouTube and TikTok?",
        a: "Volume is high, but quality hooks are still rare. Most AI videos lead with hype. Hooks that lead with a specific, tested result or a credible personal workflow stand out precisely because most competitors do not bother with specificity.",
      },
    ],
  },
  saas: {
    title: "SaaS Hook Analyzer",
    niche: "SaaS",
    audience: "founders and SaaS marketers",
    description:
      "Analyze SaaS hooks for pain clarity, outcome promise, buyer relevance and conversion intent.",
    examples: [
      [
        "We changed one onboarding step and activation jumped overnight",
        "Single change + specific metric (activation) + fast result — credibility for founders who know how hard activation is.",
      ],
      [
        "This SaaS landing page lost users before the demo",
        "Names the failure point, names the asset (landing page), creates urgency for anyone with a demo funnel.",
      ],
      [
        "The feature nobody clicked became our strongest sales hook",
        "Contrast (neglected → strongest) + curiosity about which feature — compelling for product teams.",
      ],
    ],
    faqs: [
      {
        q: "What makes a SaaS hook effective for founder content?",
        a: "SaaS founders respond to specificity about metrics they care about — activation rate, churn, conversion, onboarding drop-off. A hook that names a real metric and implies a replicable fix gets attention from operators who recognize the problem.",
      },
      {
        q: "Should SaaS hooks be technical or emotional?",
        a: "Both work — but they target different audiences. Technical hooks (naming metrics) target operators and founders. Emotional hooks (naming the frustration behind the metric) target broader business audiences. The key is picking one and being specific.",
      },
      {
        q: "Can HookSignals help with SaaS video content?",
        a: "Yes. The analyzer accepts niche context — entering 'SaaS' makes the hook scoring, weakness analysis, title pairings and thumbnail angles more relevant to founders, product teams and operator audiences.",
      },
    ],
  },
  ecommerce: {
    title: "Ecommerce Hook Analyzer",
    niche: "ecommerce",
    audience: "store owners and product marketers",
    description:
      "Improve ecommerce hooks with clearer product promise, pain point and buying trigger.",
    examples: [
      [
        "This product looked boring until we changed the first line",
        "Contrast (boring → compelling) + single change + creator self-disclosure — strong for ecommerce marketers.",
      ],
      [
        "The hook that made shoppers understand the problem instantly",
        "Outcome focus (understand the problem) + implied benefit for the creator's customers — demonstrates the value.",
      ],
      [
        "Stop selling the feature before showing the pain",
        "Direct instruction + named mistake + implied framework — actionable for anyone writing product copy.",
      ],
    ],
    faqs: [
      {
        q: "How are ecommerce hooks different from creator hooks?",
        a: "Ecommerce hooks need to trigger purchase intent alongside curiosity. They must quickly establish the problem the product solves, the buyer who has that problem, and why this product is the answer — all before context or features.",
      },
      {
        q: "What is the biggest ecommerce hook mistake?",
        a: "Leading with the product's features instead of the buyer's pain. 'This backpack has 14 pockets' fails where 'I stopped losing things in my bag after switching to this' succeeds because one creates relevance and the other creates a mental picture.",
      },
      {
        q: "Can HookSignals help with product video scripts?",
        a: "Yes. The hook analyzer and script generator work together for product videos. Analyze the product hook first, then build the script opener around the strongest angle before recording.",
      },
    ],
  },
  coaching: {
    title: "Coaching Hook Analyzer",
    niche: "coaching",
    audience: "coaches and consultants",
    description:
      "Score coaching hooks for pain specificity, authority, transformation promise and buyer trust.",
    examples: [
      [
        "I changed one client question and sales calls got easier",
        "Single change + specific asset (client question) + clear outcome — relevant for any coach running calls.",
      ],
      [
        "Most coaches lose leads because the hook is too broad",
        "Self-referential critique of the niche, names the failure mode, implies the speaker knows the fix.",
      ],
      [
        "This opening made the transformation obvious in 3 seconds",
        "Speed (3 seconds) + specific outcome (obvious transformation) + implied teachable framework — strong for educators.",
      ],
    ],
    faqs: [
      {
        q: "Why do coaching hooks often underperform?",
        a: "Coaching hooks tend to be too generic — 'I help entrepreneurs build their dream business.' Specific pain, specific audience, and specific outcome dramatically outperform broad positioning hooks because potential clients recognize themselves faster.",
      },
      {
        q: "Should a coach's hook mention transformation or process?",
        a: "Transformation outperforms process almost every time. Viewers are buying the result, not the method. Hook on the outcome — then use the video to explain the process that produces it.",
      },
      {
        q: "How does HookSignals help coaches improve their content?",
        a: "By scoring the opening hook for clarity, niche relevance and retention risk, HookSignals helps coaches identify whether their first line creates an immediate reason for the right buyer to keep watching — before the content goes live.",
      },
    ],
  },
  "personal-finance": {
    title: "Personal Finance Hook Analyzer",
    niche: "personal finance",
    audience: "finance creators",
    description:
      "Analyze finance hooks for clarity, trust, specificity and viewer payoff without vague money claims.",
    examples: [
      [
        "I tracked every expense for 30 days and found one silent leak",
        "Specific action (30 days tracking) + discovered result + 'silent leak' creates curiosity about which expense.",
      ],
      [
        "This budgeting mistake costs beginners more than they think",
        "Names the audience (beginners) + implies hidden cost + creates urgency to find out what the mistake is.",
      ],
      [
        "Before you invest, fix this one cash-flow problem",
        "Sequence (before investing) + single fix + urgency — hooks viewers who are already thinking about investing.",
      ],
    ],
    faqs: [
      {
        q: "How do finance hooks build trust quickly?",
        a: "Personal finance is a trust-sensitive niche. Hooks that show a personal result or a tested method build more trust than hooks that make promises about money outcomes. 'I tracked my expenses and found $340 in waste' is more trustworthy than 'Save hundreds every month.'",
      },
      {
        q: "What finance hook patterns perform best?",
        a: "Test-and-result hooks ('I tried X and found Y') and mistake-avoidance hooks ('Stop doing this before you invest') consistently outperform promise-based hooks in finance because they feel more honest and specific to viewers.",
      },
      {
        q: "Should personal finance hooks include specific dollar amounts?",
        a: "Specific numbers dramatically increase hook credibility when they are real and verifiable from personal experience. Vague money promises ('make more money') have become noise. A specific tracked result ('I found $340 in subscriptions I forgot about') is believable and relatable.",
      },
    ],
  },
  "real-estate": {
    title: "Real Estate Hook Analyzer",
    niche: "real estate",
    audience: "agents and real estate creators",
    description:
      "Score real estate hooks for local relevance, buyer tension, seller pain and lead intent.",
    examples: [
      [
        "This listing mistake makes buyers scroll past in 2 seconds",
        "Specific timeframe (2 seconds) + named audience (buyers) + identifiable mistake — agents want to know immediately.",
      ],
      [
        "I compared 3 neighborhoods and one had a hidden risk",
        "Comparison structure + specific number + 'hidden risk' creates urgency for buyers actively searching.",
      ],
      [
        "Before you price your home, check this one signal",
        "Sequence (before pricing) + specific action type + single signal = high relevance for sellers in decision mode.",
      ],
    ],
    faqs: [
      {
        q: "What makes real estate hooks effective?",
        a: "Real estate hooks work best when they address the specific stage of the buyer or seller journey. A buyer in active search mode responds to local risk signals and comparison hooks. A seller preparing to list responds to pricing and preparation hooks. Match the hook tension to the viewer's decision state.",
      },
      {
        q: "How can real estate content creators compete with large channels?",
        a: "Hyper-local specificity is an advantage larger channels cannot easily replicate. A hook that names a specific neighborhood, market condition, or local mistake will always outperform a generic real estate hook for viewers in that market.",
      },
      {
        q: "Should real estate hooks focus on buyers or sellers?",
        a: "Define one audience per video. Buyer hooks (inspection mistakes, neighborhood risks, offer strategy) and seller hooks (pricing signals, staging, listing errors) need different tension points. Trying to speak to both usually means serving neither.",
      },
    ],
  },

  // ── New niches ─────────────────────────────────────────────────────────────
  gaming: {
    title: "Gaming Hook Analyzer",
    niche: "gaming",
    audience: "gaming creators and streamers",
    description:
      "Score gaming hooks for excitement clarity, skill payoff and first-second stopping power across YouTube and TikTok.",
    examples: [
      [
        "I found a strategy that nobody in ranked uses and it won 9 games straight",
        "Discovery + exclusivity + measurable win streak — gaming viewers want the edge immediately.",
      ],
      [
        "This setting change improved my aim more than 200 hours of practice",
        "Specific metric (200 hours) + contrasted with single change = strong credibility hook for skill-focused audiences.",
      ],
      [
        "Stop losing ranked games because of this one decision in the first 30 seconds",
        "Direct warning + specific trigger (first 30 seconds) + named consequence — high relevance for competitive players.",
      ],
    ],
    faqs: [
      {
        q: "What makes a gaming hook stop the scroll?",
        a: "Gaming viewers respond to hooks that promise a skill edge, a discovery, or a mistake they're making. The hook must establish the game or context quickly, name the specific benefit, and create curiosity about the exact method — without giving away the answer before the video starts.",
      },
      {
        q: "How long should a gaming hook be?",
        a: "Gaming hooks on Shorts and TikTok should land in under 8 words. Long-form gaming content allows slightly more setup, but the core curiosity signal still needs to appear in the first 5 seconds. Gameplay footage can carry context the spoken hook doesn't need to explain.",
      },
      {
        q: "Should gaming hooks name the specific game?",
        a: "Yes when possible. A hook naming a specific game (Valorant, Warzone, Minecraft) immediately filters to the right audience and improves relevance signals. Generic gaming hooks ('get better at FPS') perform worse than specific ones.",
      },
    ],
  },
  finance: {
    title: "Finance Content Hook Analyzer",
    niche: "finance",
    audience: "finance creators and investors",
    description:
      "Analyze finance content hooks for credibility, specificity, clarity and trust-building without vague outcome claims.",
    examples: [
      [
        "I analyzed 50 earnings reports and found the same red flag in every company that fell",
        "Scale (50 reports) + pattern discovery + implied protective insight — strong for investor-audience content.",
      ],
      [
        "This investment mistake cost me $4,000 before I understood what I was doing wrong",
        "Personal loss + specific amount + learning arc — credible, relatable, no unverifiable promises.",
      ],
      [
        "Before you rebalance your portfolio, check this one metric first",
        "Sequence (before rebalancing) + single check + urgency for viewers actively managing investments.",
      ],
    ],
    faqs: [
      {
        q: "How do finance hooks avoid sounding like hype?",
        a: "Finance hooks that lead with personal tests, analyzed data, or specific mistakes feel more credible than outcome promises. 'I tracked this metric for 6 months' is more trustworthy than 'The secret to building wealth' because it implies a testable, honest finding.",
      },
      {
        q: "What are the strongest finance hook patterns?",
        a: "Test-and-discovery hooks, mistake-avoidance hooks, and before/after comparison hooks outperform promise-based hooks in finance. Viewers in this niche have high sensitivity to hype and respond better to verifiable, experience-based claims.",
      },
      {
        q: "Should finance hooks include disclaimers?",
        a: "On-screen disclaimers can appear in the description or at the end of the video. The hook itself should not open with disclaimer language — it kills the tension before the viewer decides to stay. Focus the hook on the educational or analytical insight, not the financial outcome.",
      },
    ],
  },
  crypto: {
    title: "Crypto Content Hook Analyzer",
    niche: "crypto",
    audience: "crypto creators and analysts",
    description:
      "Score cryptocurrency content hooks for analytical credibility, discovery framing and clear educational payoff.",
    examples: [
      [
        "I analyzed 50 crypto projects that failed and found one pattern they all shared",
        "Scale + pattern discovery + educational framing — strong without implying investment advice.",
      ],
      [
        "This on-chain signal appeared 30 days before every major move in the last two years",
        "Specific timeframe (30 days) + historical track record (two years) + technical credibility for analyst audiences.",
      ],
      [
        "Most crypto content teaches you the wrong thing to watch on-chain",
        "Critique of the niche + implied insider knowledge + curiosity gap — positions creator as a contrarian authority.",
      ],
    ],
    faqs: [
      {
        q: "How do crypto hooks build credibility without making price predictions?",
        a: "Focus hooks on analysis, patterns, and frameworks rather than outcomes. 'I studied this on-chain signal for 6 months' is credible. 'This coin is going to 10x' is not. Education-framed hooks outperform prediction hooks in both trust and long-term audience retention.",
      },
      {
        q: "What crypto hook patterns perform best on YouTube?",
        a: "Pattern discovery hooks ('I found the same signal in every major crash'), analysis hooks ('I analyzed X projects and found Y'), and mistake-avoidance hooks ('Stop making this DeFi error') consistently outperform price-prediction hooks because they have rewatch value and build analytical credibility.",
      },
      {
        q: "Should crypto content hooks mention specific coins?",
        a: "Naming a specific coin in the hook increases relevance for viewers already interested in that asset and improves search discoverability. General crypto hooks compete with more content. Be specific when the analysis is genuinely specific — not just for clickability.",
      },
    ],
  },
  business: {
    title: "Business Content Hook Analyzer",
    niche: "business",
    audience: "founders, operators and business creators",
    description:
      "Analyze business content hooks for ROI clarity, founder relevance, specific outcome framing and operational credibility.",
    examples: [
      [
        "I cut my client onboarding time by 60% after changing one document",
        "Specific metric (60%) + single change + specific asset (document) — immediately relevant for service businesses.",
      ],
      [
        "The sales framework that doubled my close rate in two months",
        "Metric (doubled) + timeframe (two months) + named system — credible without vague entrepreneurship promises.",
      ],
      [
        "The business mistake I made for 18 months that cost more than any failed product",
        "Personal admission + timeframe + implied hard lesson — founders recognize this pattern from their own experience.",
      ],
    ],
    faqs: [
      {
        q: "What makes business content hooks credible?",
        a: "Specific operational metrics (close rate, onboarding time, revenue, churn) anchor business hooks in verifiable reality. Founders and operators have high tolerance for nuance and low tolerance for vague promises. Name the metric, the timeframe, and the single change.",
      },
      {
        q: "Should business hooks focus on revenue or process?",
        a: "Process hooks often outperform revenue hooks because they imply a repeatable, teachable system. 'I changed one onboarding step and activation improved' is more credible than 'I went from $0 to $100k' because the mechanism is specific and learnable.",
      },
      {
        q: "How do business hooks work for both B2B and B2C content?",
        a: "B2B business hooks should name the operational role or department affected ('if your sales team struggles with cold email'). B2C business hooks can be broader but still need a specific problem and implied solution. Niche context in the analyzer makes recommendations more relevant to your specific audience.",
      },
    ],
  },
  education: {
    title: "Education Content Hook Analyzer",
    niche: "education",
    audience: "educators, tutors and learning creators",
    description:
      "Score education content hooks for learning outcome clarity, student relevance and engagement past the first sentence.",
    examples: [
      [
        "I taught this concept 100 different ways and one explanation worked every time",
        "Scale (100 attempts) + pattern discovery + universal claim — compelling for both educators and learners.",
      ],
      [
        "Most students fail this exam because of one preparation mistake — not lack of effort",
        "Names the audience (students) + reframes failure cause + implies actionable fix — high relevance during exam season.",
      ],
      [
        "This study technique sounds obvious but almost nobody does it correctly",
        "Apparent simplicity + hidden depth + curiosity gap — strong for learning-optimization content.",
      ],
    ],
    faqs: [
      {
        q: "What makes education content hooks keep viewers watching?",
        a: "Education hooks work best when they name a learning outcome or a common mistake the viewer already suspects they're making. Hooks that imply 'you've been doing this wrong' create immediate relevance for learners who have already put in effort without results.",
      },
      {
        q: "Should education hooks target students or teachers?",
        a: "Define one audience per video. Student hooks should name the exam, subject, or skill level. Teacher and educator hooks should name the classroom problem or teaching challenge. Mixed-audience hooks tend to serve neither group effectively.",
      },
      {
        q: "How does platform affect education hook length?",
        a: "Short-form education (Shorts, TikTok) needs the hook to land in under 6 words — 'The memory trick nobody teaches you' works. Long-form educational YouTube can use a slightly longer hook but still needs the core curiosity signal in the first 5 seconds.",
      },
    ],
  },
  podcast: {
    title: "Podcast Hook Analyzer",
    niche: "podcast",
    audience: "podcasters and audio creators",
    description:
      "Analyze podcast episode hooks for listener retention, topic clarity and the reason to choose this episode right now.",
    examples: [
      [
        "My highest-downloaded episode started with this one question — and I never expected it",
        "Personal result + specific asset (question) + surprise element — compelling for podcasters wanting to grow downloads.",
      ],
      [
        "I analyzed 50 podcast intros and found the pattern that keeps listeners past the first minute",
        "Scale (50 intros) + specific metric (past the first minute) + pattern discovery — strong for podcast growth content.",
      ],
      [
        "Stop starting your podcast episodes like this if you want loyal listeners",
        "Direct command + implied mistake + specific desired outcome (loyal listeners) — immediately actionable for podcasters.",
      ],
    ],
    faqs: [
      {
        q: "What makes a podcast episode hook effective?",
        a: "Podcast hooks compete with every other episode in the feed. The hook must answer 'why this episode, right now?' It should name the guest's most surprising insight, the listener's most relevant pain, or the counterintuitive conclusion — not just the episode topic.",
      },
      {
        q: "How do podcast video clips use hooks differently than audio?",
        a: "Video clip hooks (for YouTube and social) need to work visually as well as aurally. The on-screen text or first visible frame carries the hook signal for viewers who scroll with sound off. A strong podcast clip hook aligns the spoken and visual promise in the first 3 seconds.",
      },
      {
        q: "Should every podcast episode have a different hook style?",
        a: "Varying hook styles across episodes (curiosity-gap, proof, warning, contrast) prevents audience fatigue. When every episode starts the same way, listeners stop processing the hook consciously. Rotating patterns keeps the opening fresh and maintains attention.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = pages[params.slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `https://hooksignals.com/hooks/${params.slug}` },
    openGraph: {
      title: `${page.title} | HookSignals`,
      description: page.description,
      url: `https://hooksignals.com/hooks/${params.slug}`,
      siteName: "HookSignals",
      type: "article",
    },
  };
}

export default function ProgrammaticHookPage({ params }: { params: { slug: string } }) {
  const page = pages[params.slug];
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-[#020408] px-5 py-12 text-white md:px-8 md:py-16">
      {/* Structured data */}
      <BreadcrumbSchema
        crumbs={[
          { name: "HookSignals", path: "/" },
          { name: "Hook Analyzers", path: "/tools" },
          { name: page.title, path: `/hooks/${params.slug}` },
        ]}
      />
      <FAQSchema items={page.faqs.map(({ q, a }) => ({ question: q, answer: a }))} />

      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb nav */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-white">HookSignals</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-white">Tools</Link>
          <span>/</span>
          <span className="text-white/65">{page.title}</span>
        </nav>

        {/* Hero */}
        <section className="rounded-[38px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.14),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.025))] p-7 shadow-[0_30px_120px_rgba(0,0,0,.42)] md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
            {page.niche} hook intelligence
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            {page.description} Built for {page.audience} who want a stronger opening line before publishing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/hook-analyzer?niche=${encodeURIComponent(page.niche)}`}
              className="rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-black transition hover:scale-[1.01]"
            >
              Analyze a {page.niche} hook
            </Link>
            <Link
              href="/tools"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/[0.07]"
            >
              View all tools
            </Link>
          </div>
        </section>

        {/* Example hooks */}
        <section className="mt-6">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/38">
            Example hooks — study these patterns
          </p>
          <div className="grid gap-4 lg:grid-cols-3">
            {page.examples.map(([hook, why], index) => (
              <div
                key={hook}
                className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
                  Example {index + 1}
                </p>
                <p className="mt-3 text-base font-black leading-7 text-white">
                  &ldquo;{hook}&rdquo;
                </p>
                <p className="mt-3 text-xs leading-5 text-white/45">{why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why niche context matters + what gets checked */}
        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[34px] border border-cyan-300/20 bg-cyan-300/[0.055] p-7">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">
              Why niche context matters
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight">
              Generic hook advice is not enough.
            </h2>
            <p className="mt-4 leading-7 text-white/58">
              A hook for {page.niche} needs different proof signals, pacing and viewer
              motivation than hooks in other markets. HookSignals uses platform, niche and
              audience context to make the analysis specific to your content type.
            </p>
          </div>
          <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-violet-200">
              What gets scored
            </p>
            <div className="mt-4 grid gap-2.5">
              {[
                "Clarity",
                "Curiosity gap",
                "Retention risk",
                "Audience trigger",
                "Title pairing suggestions",
                "Thumbnail angle ideas",
              ].map((item) => (
                <p key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/24 px-4 py-2.5 text-sm text-white/65">
                  <span className="text-emerald-300">✓</span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-6 rounded-[34px] border border-white/10 bg-black/22 p-7 md:p-9">
          <h2 className="text-2xl font-black tracking-tight">
            {page.niche} hook FAQ
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {page.faqs.map(({ q, a }) => (
              <div key={q} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-base font-black leading-6 text-white">{q}</h3>
                <p className="mt-3 text-sm leading-6 text-white/52">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="mt-6 rounded-[24px] border border-white/10 bg-black/18 p-5">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-white/35">
            Related tools and resources
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              ["/hook-analyzer", "Hook Analyzer"],
              ["/viral-hook-examples", "Hook Examples"],
              ["/hook-improver", "Hook Improver"],
              ["/youtube-hook-generator", "Hook Generator"],
              ["/retention-hook-examples", "Retention Hooks"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/58 transition hover:border-cyan-300/25 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
