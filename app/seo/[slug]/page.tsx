import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisonPages, siteUrl } from "../../lib/seo-content";

const pages = Object.fromEntries(comparisonPages.map((page) => [page.slug, page]));

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props) {
  const page = pages[params.slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${siteUrl}/seo/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}/seo/${page.slug}`,
      type: "article",
    },
  };
}

export default function SeoComparisonPage({ params }: Props) {
  const page = pages[params.slug];
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-[#020408] px-5 py-20 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/seo" className="text-sm font-black text-cyan-300">Back to SEO hub</Link>
        <section className="mt-10 rounded-[36px] border border-white/10 bg-white/[0.04] p-7 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Comparison guide</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-0.06em] md:text-7xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/58">{page.description}</p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[30px] border border-cyan-300/20 bg-cyan-300/[0.055] p-7">
            <h2 className="text-3xl font-black tracking-tight">Where HookSignals is stronger</h2>
            <div className="mt-6 grid gap-3">
              {["Scores the hook before publishing", "Connects hook, title and thumbnail promise", "Finds retention risk and weak audience triggers", "Creates a repeatable pre-publish workflow"].map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-black/24 p-4 text-sm leading-6 text-white/68">{item}</p>)}
            </div>
          </article>
          <article className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
            <h2 className="text-3xl font-black tracking-tight">Where the alternative may be enough</h2>
            <div className="mt-6 grid gap-3">
              {["You publish rarely", "You already have a proven hook review process", "You only need generic copywriting", "You do not need saved workflow history"].map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-black/24 p-4 text-sm leading-6 text-white/58">{item}</p>)}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[30px] border border-white/10 bg-black/24 p-7 md:p-9">
          <h2 className="text-4xl font-black tracking-[-0.04em]">Comparison table</h2>
          <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10">
            <div className="grid grid-cols-3 bg-white/[0.06] p-4 text-sm font-black text-white"><span>Need</span><span>HookSignals</span><span>{page.competitor}</span></div>
            {[["Hook scoring", "Built in", "Manual or generic"], ["Retention diagnosis", "Creator-specific", "Usually not specific"], ["Title and thumbnail alignment", "Workflow-based", "Separate task"], ["Saved analysis", "Workspace-ready", "Depends on your setup"]].map(([need, hs, other]) => <div key={need} className="grid grid-cols-3 border-t border-white/10 p-4 text-sm leading-6 text-white/58"><span>{need}</span><span>{hs}</span><span>{other}</span></div>)}
          </div>
        </section>

        <section className="mt-8 rounded-[34px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.10),rgba(124,58,237,.08))] p-7 text-center md:p-10">
          <h2 className="text-4xl font-black tracking-[-0.04em]">Test your next hook before publishing.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/58">Start with one hook, check the score, then improve the title and thumbnail promise before the video goes live.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/hook-analyzer" className="rounded-2xl bg-white px-6 py-4 font-black text-black">Analyze a hook</Link>
            <Link href="/checkout/pro" className="rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.08] px-6 py-4 font-black text-cyan-100">Start Creator Pro</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
