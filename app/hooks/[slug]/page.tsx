import Link from 'next/link';
import { notFound } from 'next/navigation';

const pages: Record<string, any> = {
  'youtube-shorts': {
    title: 'YouTube Shorts Hook Analyzer',
    niche: 'YouTube Shorts',
    audience: 'short-form creators',
    description: 'Analyze YouTube Shorts hooks for clarity, curiosity, retention risk and first-second stopping power.',
    examples: ['I tested 37 YouTube hooks and one doubled retention in 48 hours', 'I uploaded 100 shorts in 30 days and only one changed everything', 'The first 3 seconds ruined this Short before anyone saw the payoff'],
  },
  tiktok: {
    title: 'TikTok Hook Analyzer',
    niche: 'TikTok',
    audience: 'TikTok creators',
    description: 'Score TikTok hooks for pattern interruption, clarity, curiosity and viewer retention.',
    examples: ['I tried the TikTok hook format everyone copies and found one problem', 'This 5-second opening made people watch until the end', 'Stop starting TikToks like this if you want retention'],
  },
  'instagram-reels': {
    title: 'Instagram Reels Hook Analyzer',
    niche: 'Instagram Reels',
    audience: 'Reels creators',
    description: 'Improve Reels hooks with a clearer visual promise, audience trigger and retention angle.',
    examples: ['I changed one Reel opening and the saves doubled', 'This Reels hook works because the promise is instantly visual', 'Most Reels lose viewers before the value appears'],
  },
  fitness: {
    title: 'Fitness Hook Analyzer',
    niche: 'fitness',
    audience: 'fitness creators and coaches',
    description: 'Analyze fitness hooks for transformation promise, specificity, credibility and viewer motivation.',
    examples: ['I fixed one squat mistake and my legs finally started growing', 'This 10-minute workout failed until I changed the first exercise', 'Stop doing this warmup if your shoulders always hurt'],
  },
  ai: {
    title: 'AI Content Hook Analyzer',
    niche: 'AI',
    audience: 'AI creators and builders',
    description: 'Score AI content hooks for novelty, practical payoff, specificity and audience relevance.',
    examples: ['I tested 12 AI tools and only one saved me 5 hours a week', 'This AI workflow replaced the task I hated most', 'Most AI videos fail because the hook sounds like a feature list'],
  },
  saas: {
    title: 'SaaS Hook Analyzer',
    niche: 'SaaS',
    audience: 'founders and SaaS marketers',
    description: 'Analyze SaaS hooks for pain clarity, outcome promise, buyer relevance and conversion intent.',
    examples: ['We changed one onboarding step and activation jumped overnight', 'This SaaS landing page lost users before the demo', 'The feature nobody clicked became our strongest sales hook'],
  },
  ecommerce: {
    title: 'Ecommerce Hook Analyzer',
    niche: 'ecommerce',
    audience: 'store owners and product marketers',
    description: 'Improve ecommerce hooks with clearer product promise, pain point and buying trigger.',
    examples: ['This product looked boring until we changed the first line', 'The hook that made shoppers understand the problem instantly', 'Stop selling the feature before showing the pain'],
  },
  coaching: {
    title: 'Coaching Hook Analyzer',
    niche: 'coaching',
    audience: 'coaches and consultants',
    description: 'Score coaching hooks for pain specificity, authority, transformation promise and buyer trust.',
    examples: ['I changed one client question and sales calls got easier', 'Most coaches lose leads because the hook is too broad', 'This opening made the transformation obvious in 3 seconds'],
  },
  'personal-finance': {
    title: 'Personal Finance Hook Analyzer',
    niche: 'personal finance',
    audience: 'finance creators',
    description: 'Analyze finance hooks for clarity, trust, specificity and viewer payoff without vague money claims.',
    examples: ['I tracked every expense for 30 days and found one silent leak', 'This budgeting mistake costs beginners more than they think', 'Before you invest, fix this one cash-flow problem'],
  },
  'real-estate': {
    title: 'Real Estate Hook Analyzer',
    niche: 'real estate',
    audience: 'agents and real estate creators',
    description: 'Score real estate hooks for local relevance, buyer tension, seller pain and lead intent.',
    examples: ['This listing mistake makes buyers scroll past in 2 seconds', 'I compared 3 neighborhoods and one had a hidden risk', 'Before you price your home, check this one signal'],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = pages[params.slug];
  if (!page) return {};
  return {
    title: `${page.title} | HookSignals`,
    description: page.description,
    alternates: { canonical: `/hooks/${params.slug}` },
  };
}

export default function ProgrammaticHookPage({ params }: { params: { slug: string } }) {
  const page = pages[params.slug];
  if (!page) notFound();

  const faq = [
    `What makes a good ${page.niche} hook?`,
    `How does audience context change ${page.niche} hook performance?`,
    `Can HookSignals improve ${page.niche} titles and thumbnails too?`,
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((q) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: `${page.title} helps creators evaluate clarity, curiosity, retention risk and packaging fit before publishing.` } })),
  };

  return (
    <main className="min-h-screen bg-[#030507] px-5 py-12 text-white md:px-8 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[38px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.025))] p-7 shadow-[0_30px_120px_rgba(0,0,0,.42)] md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Programmatic hook intelligence</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.06em] md:text-7xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">{page.description} Built for {page.audience} who want a stronger first line before publishing.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/hook-analyzer?niche=${encodeURIComponent(page.niche)}`} className="rounded-2xl bg-white px-6 py-4 text-sm font-black text-black">Analyze a hook</Link>
            <Link href="/tools" className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-black text-white">View creator tools</Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {page.examples.map((example: string, index: number) => (
            <div key={example} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Example {index + 1}</p>
              <h2 className="mt-4 text-xl font-black leading-8">“{example}”</h2>
              <p className="mt-4 text-sm leading-6 text-white/52">This hook can be scored for clarity, curiosity, payoff and retention risk inside HookSignals.</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[34px] border border-cyan-300/20 bg-cyan-300/[0.055] p-7 md:p-9">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Why this page exists</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Generic hook advice is not enough.</h2>
            <p className="mt-4 leading-8 text-white/58">A hook for {page.niche} needs different proof, pacing and viewer motivation than a hook in another market. HookSignals uses platform, niche and audience context to make the analysis more specific.</p>
          </div>
          <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 md:p-9">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-violet-200">What gets checked</p>
            <div className="mt-5 grid gap-3">
              {['Clarity', 'Curiosity gap', 'Retention risk', 'Audience trigger', 'Title pairing', 'Thumbnail angle'].map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-black/24 p-4 text-sm text-white/66"><span className="mr-2 text-emerald-300">✓</span>{item}</p>)}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[34px] border border-white/10 bg-black/24 p-7 md:p-9">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">FAQ</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {faq.map((q) => <div key={q} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5"><h3 className="text-lg font-black">{q}</h3><p className="mt-3 text-sm leading-6 text-white/52">Use the analyzer to check clarity, specificity, retention risk and packaging fit before publishing.</p></div>)}
          </div>
        </section>
      </div>
    </main>
  );
}
