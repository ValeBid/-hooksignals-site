import Link from 'next/link';
import { notFound } from 'next/navigation';

const examplePages: Record<string, any> = {
  fitness: {
    title: 'Fitness Hook Examples',
    niche: 'fitness',
    audience: 'fitness creators and coaches',
    examples: [
      ['I fixed one squat mistake and my legs finally started growing', 84],
      ['This 10-minute workout failed until I changed the first exercise', 78],
      ['Stop doing this warmup if your shoulders always hurt', 73],
      ['The exercise everyone skips that changed my pullups', 69],
      ['I trained abs for 30 days and one habit mattered most', 76],
      ['This is my workout routine', 31],
    ],
  },
  ai: {
    title: 'AI Hook Examples',
    niche: 'AI',
    audience: 'AI creators, builders and operators',
    examples: [
      ['I tested 12 AI tools and only one saved me 5 hours a week', 86],
      ['This AI workflow replaced the task I hated most', 79],
      ['Most AI videos fail because the hook sounds like a feature list', 75],
      ['I built an AI agent and it failed for one unexpected reason', 82],
      ['Before you buy another AI tool, check this workflow first', 74],
      ['AI is changing everything', 18],
    ],
  },
  finance: {
    title: 'Finance Hook Examples',
    niche: 'personal finance',
    audience: 'finance creators',
    examples: [
      ['I tracked every expense for 30 days and found one silent leak', 82],
      ['This budgeting mistake costs beginners more than they think', 77],
      ['Before you invest, fix this one cash-flow problem', 74],
      ['I compared two savings plans and one quietly won', 70],
      ['Most people lose money before they even start investing', 68],
      ['Money tips you need to know', 22],
    ],
  },
  saas: {
    title: 'SaaS Hook Examples',
    niche: 'SaaS',
    audience: 'founders and SaaS marketers',
    examples: [
      ['We changed one onboarding step and activation jumped overnight', 83],
      ['This SaaS landing page lost users before the demo', 78],
      ['The feature nobody clicked became our strongest sales hook', 76],
      ['I rewrote one pricing section and trials increased', 80],
      ['Most SaaS demos fail before the product appears', 72],
      ['Our SaaS is really good', 16],
    ],
  },
  ecommerce: {
    title: 'Ecommerce Hook Examples',
    niche: 'ecommerce',
    audience: 'store owners and product marketers',
    examples: [
      ['This product looked boring until we changed the first line', 79],
      ['The hook that made shoppers understand the problem instantly', 74],
      ['Stop selling the feature before showing the pain', 72],
      ['I changed one product angle and clicks finally made sense', 76],
      ['This product page mistake kills buyer trust', 71],
      ['Best product ever', 14],
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(examplePages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = examplePages[params.slug];
  if (!page) return {};
  return {
    title: page.title,
    description: `Browse ${page.niche} hook examples with scores, patterns and pre-publish lessons for ${page.audience}.`,
    alternates: { canonical: `/hook-examples/${params.slug}` },
  };
}

export default function HookExamplesPage({ params }: { params: { slug: string } }) {
  const page = examplePages[params.slug];
  if (!page) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: page.title,
    description: `Examples of ${page.niche} hooks with directional scores and analysis prompts.`,
    url: `https://hooksignals.com/hook-examples/${params.slug}`,
  };

  return (
    <main className="min-h-screen bg-[#030507] px-5 py-12 text-white md:px-8 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[38px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.025))] p-7 shadow-[0_30px_120px_rgba(0,0,0,.42)] md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Hook examples library</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.06em] md:text-7xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">Use these examples to understand what makes a {page.niche} hook strong, weak, specific or too vague before publishing.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/hook-analyzer?niche=${encodeURIComponent(page.niche)}&audience=${encodeURIComponent(page.audience)}`} className="rounded-2xl bg-white px-6 py-4 text-sm font-black text-black">Analyze your hook</Link>
            <Link href={`/hooks/${params.slug === 'finance' ? 'personal-finance' : params.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-black text-white">View niche analyzer</Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          {page.examples.map(([hook, score]: [string, number]) => (
            <div key={hook} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Example hook</p>
                  <h2 className="mt-3 text-xl font-black leading-8">“{hook}”</h2>
                </div>
                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-3 text-center">
                  <p className="text-3xl font-black text-cyan-300">{score}</p>
                  <p className="text-xs text-white/42">score</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-white/52">{score >= 75 ? 'Strong because it combines specificity, tension and a clear payoff.' : score >= 50 ? 'Usable, but the stakes or payoff could be sharper.' : 'Weak because it is too broad, vague or missing a concrete viewer benefit.'}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-[34px] border border-cyan-300/20 bg-cyan-300/[0.055] p-7 md:p-9">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Use this before publishing</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Do not copy examples blindly. Score your own angle.</h2>
          <p className="mt-4 max-w-3xl leading-8 text-white/58">The best hook depends on platform, niche, audience and the matching title or thumbnail. Use HookSignals to test your own first line before posting.</p>
          <Link href="/hook-analyzer" className="mt-6 inline-flex rounded-2xl bg-white px-6 py-4 text-sm font-black text-black">Open Hook Analyzer</Link>
        </section>
      </div>
    </main>
  );
}
