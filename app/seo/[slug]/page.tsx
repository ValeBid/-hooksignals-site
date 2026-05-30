import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisonPages, siteUrl } from "../../lib/seo-content";
import FAQSchema from "../../components/faq-schema";
import BreadcrumbSchema from "../../components/breadcrumb-schema";

const pages = Object.fromEntries(comparisonPages.map((p) => [p.slug, p]));

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return comparisonPages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const page = pages[params.slug];
  if (!page) return {};
  return {
    title: `${page.title} | HookSignals`,
    description: page.description,
    alternates: { canonical: `${siteUrl}/seo/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}/seo/${page.slug}`,
      siteName: "HookSignals",
      type: "article",
    },
  };
}

const DEFAULT_HS_STRENGTHS = [
  "Scores the hook before publishing — no guesswork",
  "Connects hook, title and thumbnail into one pre-publish workflow",
  "Detects retention risk and weak audience triggers before upload",
  "Saves every analysis to a searchable creator workspace",
] as const;

const DEFAULT_WHEN_ALT = [
  "You publish rarely and already have a peer review process",
  "Your current hooks consistently achieve strong retention",
  "You only need generic copywriting without retention scoring",
  "You do not need saved workflow history",
] as const;

const DEFAULT_TABLE: [string, string, string][] = [
  ["Hook scoring",              "Calibrated AI score", "Manual or none"],
  ["Retention risk check",      "Built in",            "Not available"],
  ["Title + thumbnail workflow","Integrated",          "Separate tools"],
  ["Saved analysis history",    "Workspace included",  "Not included"],
  ["Platform context",          "Shorts, TikTok, etc.","Generic"],
];

export default function SeoComparisonPage({ params }: Props) {
  const page = pages[params.slug];
  if (!page) notFound();

  const isBestOf = page.pageType === "best-of";
  const strengths  = page.hsStrengths  ?? DEFAULT_HS_STRENGTHS;
  const whenAlt    = page.whenAltEnough ?? DEFAULT_WHEN_ALT;
  const tableRows  = page.tableRows    ?? DEFAULT_TABLE;
  const faqs       = page.faqs        ?? [];

  return (
    <main className="min-h-screen bg-[#020408] px-5 py-16 text-white md:px-8 md:py-20">
      {/* Structured data */}
      <BreadcrumbSchema
        crumbs={[
          { name: "HookSignals", path: "/" },
          { name: "SEO Hub", path: "/seo" },
          { name: page.title, path: `/seo/${page.slug}` },
        ]}
      />
      {faqs.length > 0 && (
        <FAQSchema items={faqs.map(({ q, a }) => ({ question: q, answer: a }))} />
      )}

      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb nav */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-white">HookSignals</Link>
          <span>/</span>
          <Link href="/seo" className="hover:text-white">SEO Hub</Link>
          <span>/</span>
          <span className="text-white/65">{page.title}</span>
        </nav>

        {/* Hero */}
        <section className="rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.025))] p-7 shadow-[0_30px_100px_rgba(0,0,0,.40)] md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">
            {isBestOf ? "Buyer's guide" : "Comparison guide"}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/58">
            {page.description}
          </p>
          {page.competitorFocus && (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
              <span className="font-bold text-white/55">{page.competitor}:</span>{" "}
              {page.competitorFocus}
            </p>
          )}
        </section>

        {/* Strengths / When alt */}
        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[30px] border border-cyan-300/20 bg-cyan-300/[0.055] p-7">
            <h2 className="text-2xl font-black tracking-tight">
              {isBestOf ? "What HookSignals does well" : "Where HookSignals is stronger"}
            </h2>
            <div className="mt-5 grid gap-2.5">
              {strengths.map((item) => (
                <p
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/24 p-4 text-sm leading-6 text-white/68"
                >
                  <span className="mt-0.5 shrink-0 text-emerald-300">✓</span>
                  {item}
                </p>
              ))}
            </div>
          </article>
          <article className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
            <h2 className="text-2xl font-black tracking-tight">
              {isBestOf ? "When another tool may fit better" : `When ${page.competitor} may be enough`}
            </h2>
            <div className="mt-5 grid gap-2.5">
              {whenAlt.map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/24 p-4 text-sm leading-6 text-white/55"
                >
                  {item}
                </p>
              ))}
            </div>
          </article>
        </section>

        {/* Comparison table */}
        <section className="mt-6 overflow-hidden rounded-[30px] border border-white/10 bg-black/24">
          <div className="grid grid-cols-3 bg-white/[0.06] p-4 text-xs font-black uppercase tracking-[0.12em] text-white">
            <span>Need</span>
            <span className="text-cyan-300">HookSignals</span>
            <span className="text-white/50">{page.competitor}</span>
          </div>
          {tableRows.map(([need, hs, other]) => (
            <div
              key={need}
              className="grid grid-cols-3 border-t border-white/10 p-4 text-sm leading-6 text-white/58"
            >
              <span className="font-semibold text-white/72">{need}</span>
              <span className="text-cyan-200">{hs}</span>
              <span>{other}</span>
            </div>
          ))}
        </section>

        {/* FAQ section */}
        {faqs.length > 0 && (
          <section className="mt-6 rounded-[30px] border border-white/10 bg-white/[0.025] p-7 md:p-9">
            <h2 className="text-3xl font-black tracking-[-0.04em]">Frequently asked questions</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {faqs.map(({ q, a }) => (
                <div
                  key={q}
                  className="rounded-[24px] border border-white/10 bg-black/24 p-5"
                >
                  <h3 className="text-lg font-black leading-6 text-white">{q}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">{a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Internal links */}
        <section className="mt-6 rounded-[28px] border border-white/10 bg-black/18 p-5 md:p-7">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/38">
            Related resources
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              ["/hook-analyzer", "Hook Analyzer"],
              ["/viral-hook-examples", "Viral Hook Examples"],
              ["/hook-psychology", "Hook Psychology"],
              ["/tools", "All Creator Tools"],
              ["/pricing", "Pricing"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:border-cyan-300/25 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-6 rounded-[34px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.10),rgba(124,58,237,.08))] p-7 text-center md:p-10">
          <h2 className="text-3xl font-black tracking-[-0.04em] md:text-4xl">
            Test your hook before publishing.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/58">
            Score your opening line for clarity, curiosity and retention risk in seconds.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/hook-analyzer"
              className="rounded-2xl bg-white px-6 py-4 font-black text-black transition hover:scale-[1.01]"
            >
              Analyze a hook
            </Link>
            <Link
              href="/checkout/pro"
              className="rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.08] px-6 py-4 font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]"
            >
              Start Creator Pro
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
