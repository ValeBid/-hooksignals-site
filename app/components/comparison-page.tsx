import SimpleNav from "./simple-nav";
import SiteFooter from "./site-footer";
import FAQSchema from "./faq-schema";
import BreadcrumbSchema from "./breadcrumb-schema";

export type CompFeature = {
  capability: string;
  hooksignals: string;
  competitor: string;
  hsAdvantage?: boolean;
};

export type WorkflowStep = {
  step: string;
  hs: string;
  competitor: string;
};

export type DecisionRow = {
  need: string;
  choose: "hooksignals" | "competitor" | "both";
};

export type Tradeoff = {
  title: string;
  desc: string;
};

export type ComparisonData = {
  competitor: {
    name: string;
    slug: string;
  };
  hero: {
    badge: string;
    subheadline: string;
  };
  summary: {
    chooseHS: string[];
    chooseComp: string[];
  };
  features: CompFeature[];
  workflow: WorkflowStep[];
  decisions: DecisionRow[];
  benefits: { title: string; desc: string }[];
  tradeoffs: Tradeoff[];
  faq: { question: string; answer: string }[];
};

function CheckIcon() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-[10px] font-black text-emerald-300">✓</span>
  );
}

function CrossIcon() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/8 text-[10px] text-white/30">✗</span>
  );
}

function CTABlock({ competitor }: { competitor: string }) {
  return (
    <div className="my-10 rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.08),rgba(124,58,237,.06))] p-7 md:p-10">
      <h3 className="text-2xl font-black tracking-tight md:text-3xl">
        See how HookSignals scores your video packaging before you publish.
      </h3>
      <p className="mt-3 max-w-2xl text-base leading-7 text-white/55">
        Paste a YouTube URL or your hook text. Get AI scores across 9 packaging dimensions — title clarity, hook strength, CTR potential and more — in seconds.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/youtube-video-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-6 py-3 text-sm font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.18)] transition hover:scale-[1.01]">
          Analyze Your Video →
        </a>
        <a href="/pricing" className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-black text-white/75 transition hover:bg-white/[0.08]">
          View Pricing
        </a>
      </div>
      <p className="mt-4 text-xs text-white/28">No YouTube login required. Uses public YouTube Data API. Scores are directional guidance — not guaranteed results.</p>
    </div>
  );
}

export default function ComparisonPage({ data }: { data: ComparisonData }) {
  const { competitor, hero, summary, features, workflow, decisions, benefits, tradeoffs, faq } = data;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: `HookSignals vs ${competitor.name}`, path: `/compare/hooksignals-vs-${competitor.slug}` },
  ];

  return (
    <div className="min-h-screen bg-[#030507] text-white">
      <FAQSchema items={faq} />
      <BreadcrumbSchema crumbs={crumbs} />
      <SimpleNav />

      <main className="mx-auto max-w-[1120px] px-5 pb-20 pt-12 md:px-8">

        {/* Breadcrumb UI */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-white/35">
          <a href="/" className="transition hover:text-white">Home</a>
          <span>/</span>
          <a href="/compare" className="transition hover:text-white">Compare</a>
          <span>/</span>
          <span className="text-white/60">HookSignals vs {competitor.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
            {hero.badge}
          </div>
          <h1 className="text-5xl font-black tracking-[-0.05em] leading-tight md:text-6xl lg:text-7xl">
            HookSignals<br />vs {competitor.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/youtube-video-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.20)] transition hover:scale-[1.01]">
              Analyze Your Video →
            </a>
            <a href="/pricing" className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 font-black text-white/75 transition hover:bg-white/[0.08]">
              View Pricing
            </a>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="mb-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] border border-cyan-300/25 bg-cyan-300/[0.05] p-6 md:p-8">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Choose HookSignals if…</p>
            <ul className="space-y-3">
              {summary.chooseHS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/75">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-8">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/40">Choose {competitor.name} if…</p>
            <ul className="space-y-3">
              {summary.chooseComp.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/65">
                  <span className="mt-1 shrink-0 text-[10px] text-white/30">◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="mb-6">
          <h2 className="mb-6 text-3xl font-black tracking-tight">Feature comparison</h2>
          <div className="overflow-x-auto rounded-[28px] border border-white/10">
            <table className="w-full min-w-[580px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40 w-[40%]">Capability</th>
                  <th className="bg-cyan-300/[0.05] px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-cyan-300 w-[30%]">
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      HookSignals
                    </span>
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40 w-[30%]">{competitor.name}</th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={row.capability} className={`border-b border-white/[0.06] ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}>
                    <td className="px-5 py-4 font-medium text-white/80">{row.capability}</td>
                    <td className={`px-5 py-4 ${row.hsAdvantage ? "bg-cyan-300/[0.05]" : "bg-cyan-300/[0.02]"}`}>
                      <span className={`font-medium ${row.hsAdvantage ? "text-cyan-200" : "text-white/65"}`}>{row.hooksignals}</span>
                    </td>
                    <td className="px-5 py-4 text-white/50">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <CTABlock competitor={competitor.name} />

        {/* Workflow Comparison */}
        <section className="mb-12">
          <h2 className="mb-2 text-3xl font-black tracking-tight">Workflow comparison</h2>
          <p className="mb-7 text-base leading-7 text-white/50">
            How each tool fits into the creator publishing process — from idea to upload.
          </p>
          <div className="overflow-x-auto rounded-[28px] border border-white/10">
            <table className="w-full min-w-[580px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40 w-[24%]">Stage</th>
                  <th className="bg-cyan-300/[0.05] px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-cyan-300 w-[38%]">
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      HookSignals
                    </span>
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40 w-[38%]">{competitor.name}</th>
                </tr>
              </thead>
              <tbody>
                {workflow.map((row, i) => (
                  <tr key={row.step} className={`border-b border-white/[0.06] ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}>
                    <td className="px-5 py-4 font-black text-white/80">{row.step}</td>
                    <td className="bg-cyan-300/[0.025] px-5 py-4 text-white/70">{row.hs}</td>
                    <td className="px-5 py-4 text-white/50">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Decision Matrix */}
        <section className="mb-12">
          <h2 className="mb-2 text-3xl font-black tracking-tight">Decision matrix</h2>
          <p className="mb-7 text-base leading-7 text-white/50">
            Match your most important goal to the right tool.
          </p>
          <div className="overflow-x-auto rounded-[28px] border border-white/10">
            <table className="w-full min-w-[460px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40">If you need to…</th>
                  <th className="bg-cyan-300/[0.05] px-5 py-4 text-center text-xs font-black uppercase tracking-[0.12em] text-cyan-300">HookSignals</th>
                  <th className="px-5 py-4 text-center text-xs font-black uppercase tracking-[0.12em] text-white/40">{competitor.name}</th>
                </tr>
              </thead>
              <tbody>
                {decisions.map((row, i) => (
                  <tr key={row.need} className={`border-b border-white/[0.06] ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}>
                    <td className="px-5 py-4 text-white/75">{row.need}</td>
                    <td className={`px-5 py-4 text-center ${row.choose === "hooksignals" ? "bg-cyan-300/[0.05]" : "bg-cyan-300/[0.02]"}`}>
                      {row.choose === "hooksignals" || row.choose === "both" ? <CheckIcon /> : <CrossIcon />}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {row.choose === "competitor" || row.choose === "both" ? <CheckIcon /> : <CrossIcon />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12 rounded-[32px] border border-white/10 bg-white/[0.025] p-7 md:p-10">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Why creators choose HookSignals</p>
          <h2 className="mb-7 text-3xl font-black tracking-tight">Built for the pre-publish decision.</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-[22px] border border-white/10 bg-black/24 p-5">
                <p className="font-black text-white">{b.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/hook-analyzer" className="rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.06] px-5 py-2.5 text-sm font-black text-cyan-200 transition hover:bg-cyan-300/[0.12]">
              Hook Analyzer
            </a>
            <a href="/youtube-title-analyzer" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/65 transition hover:bg-white/[0.08]">
              Title Analyzer
            </a>
            <a href="/youtube-video-analyzer" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/65 transition hover:bg-white/[0.08]">
              Video Analyzer
            </a>
            <a href="/how-scores-work" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/65 transition hover:bg-white/[0.08]">
              How Scores Work
            </a>
          </div>
        </section>

        <CTABlock competitor={competitor.name} />

        {/* Honest Tradeoffs */}
        <section className="mb-12">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-white/40">Honest tradeoffs</p>
          <h2 className="mb-2 text-3xl font-black tracking-tight">Where {competitor.name} may be a better fit.</h2>
          <p className="mb-7 text-base leading-7 text-white/50">
            HookSignals is not the right tool for every workflow. Here is where {competitor.name} has a genuine advantage.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {tradeoffs.map((t) => (
              <div key={t.title} className="rounded-[24px] border border-white/10 bg-black/22 p-5">
                <p className="font-black text-white/85">{t.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/52">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.025] p-7 md:p-10">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-emerald-300">Frequently asked questions</p>
            <h2 className="mb-8 text-3xl font-black tracking-tight">HookSignals vs {competitor.name} — answered.</h2>
            <div className="space-y-6">
              {faq.map((item) => (
                <div key={item.question} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-black text-white">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-[32px] border border-cyan-300/25 bg-[linear-gradient(135deg,rgba(34,211,238,.09),rgba(124,58,237,.07))] p-8 text-center md:p-12">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Ready to score your packaging before it goes live?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/55">
            HookSignals analyzes your hook, title and thumbnail signals before you publish. No YouTube login required.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/youtube-video-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-8 py-4 font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.22)] transition hover:scale-[1.01]">
              Analyze Your Video Free →
            </a>
            <a href="/pricing" className="rounded-2xl border border-white/12 bg-white/[0.05] px-8 py-4 font-black text-white/75 transition hover:bg-white/[0.10]">
              See Plans
            </a>
          </div>
          <p className="mt-5 text-xs text-white/28">Free tier included. No credit card required to start.</p>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
