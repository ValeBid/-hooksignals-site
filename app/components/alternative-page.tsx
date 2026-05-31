import SimpleNav from "./simple-nav";
import SiteFooter from "./site-footer";
import FAQSchema from "./faq-schema";
import BreadcrumbSchema from "./breadcrumb-schema";

export type AltFeature = {
  capability: string;
  hooksignals: string;
  competitor: string;
  hsAdvantage?: boolean;
};

export type AltWorkflow = {
  step: string;
  hs: string;
  competitor: string;
};

export type AlternativeData = {
  competitor: { name: string; slug: string };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
  };
  painPoints: string[];
  summary: {
    switchToHS: string[];
    stayWith: string[];
  };
  features: AltFeature[];
  workflow: AltWorkflow[];
  pros: string[];
  cons: string[];
  whoShouldSwitch: string[];
  switchReasons: { title: string; desc: string }[];
  faq: { question: string; answer: string }[];
};

function CTAStrip() {
  return (
    <div className="my-10 rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.08),rgba(124,58,237,.06))] p-7 md:p-9">
      <h3 className="text-2xl font-black tracking-tight">Start with a free analysis.</h3>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
        Paste any YouTube URL or opening hook. Get AI packaging scores across 9 dimensions — hook strength, title clarity, CTR potential and retention risk — in under 30 seconds.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/youtube-video-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-6 py-3 text-sm font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.18)] transition hover:scale-[1.01]">
          Analyze Your Video Free →
        </a>
        <a href="/hook-analyzer" className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] px-6 py-3 text-sm font-black text-cyan-200 transition hover:bg-cyan-300/[0.12]">
          Analyze a Hook
        </a>
        <a href="/pricing" className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-black text-white/65 transition hover:bg-white/[0.08]">
          View Pricing
        </a>
      </div>
      <p className="mt-4 text-xs text-white/28">Free tier included. No YouTube login. Scores are directional guidance — not guaranteed results.</p>
    </div>
  );
}

export default function AlternativePage({ data }: { data: AlternativeData }) {
  const { competitor, hero, painPoints, summary, features, workflow, pros, cons, whoShouldSwitch, switchReasons, faq } = data;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Alternatives", path: "/alternatives" },
    { name: `${competitor.name} Alternative`, path: `/alternatives/${competitor.slug}-alternative` },
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
          <span className="text-white/45">Alternatives</span>
          <span>/</span>
          <span className="text-white/60">{competitor.name} Alternative</span>
        </nav>

        {/* Hero */}
        <div className="mb-14">
          <div className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
            {hero.badge}
          </div>
          <h1 className="text-5xl font-black tracking-[-0.05em] leading-tight md:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">{hero.subheadline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/youtube-video-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.20)] transition hover:scale-[1.01]">
              Try HookSignals Free →
            </a>
            <a href="/pricing" className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 font-black text-white/70 transition hover:bg-white/[0.08]">
              View Pricing
            </a>
          </div>
        </div>

        {/* Why creators look for an alternative */}
        <section className="mb-12 rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/40">Why creators look for an alternative</p>
          <h2 className="mb-5 text-2xl font-black tracking-tight">What brings most creators to this page.</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {painPoints.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-white/65">
                <span className="mt-0.5 shrink-0 text-[10px] text-amber-400">→</span>
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* Executive Summary */}
        <section className="mb-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] border border-cyan-300/25 bg-cyan-300/[0.05] p-6 md:p-8">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Switch to HookSignals if…</p>
            <ul className="space-y-3">
              {summary.switchToHS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-[9px] font-black text-emerald-300">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-8">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/40">Stay with {competitor.name} if…</p>
            <ul className="space-y-3">
              {summary.stayWith.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/60">
                  <span className="mt-1 shrink-0 text-[9px] text-white/28">◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="mb-6">
          <h2 className="mb-6 text-3xl font-black tracking-tight">Feature comparison</h2>
          <div className="overflow-x-auto rounded-[28px] border border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40 w-[38%]">Capability</th>
                  <th className="bg-cyan-300/[0.05] px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-cyan-300 w-[31%]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300 inline-block" />HookSignals</span>
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40 w-[31%]">{competitor.name}</th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={row.capability} className={`border-b border-white/[0.06] ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}>
                    <td className="px-5 py-4 font-medium text-white/80">{row.capability}</td>
                    <td className={`px-5 py-4 ${row.hsAdvantage ? "bg-cyan-300/[0.06]" : "bg-cyan-300/[0.02]"}`}>
                      <span className={`font-medium ${row.hsAdvantage ? "text-cyan-200" : "text-white/65"}`}>{row.hooksignals}</span>
                    </td>
                    <td className="px-5 py-4 text-white/45">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <CTAStrip />

        {/* Workflow */}
        <section className="mb-12">
          <h2 className="mb-2 text-3xl font-black tracking-tight">Workflow comparison</h2>
          <p className="mb-7 text-base leading-7 text-white/50">Where each tool fits in the publish cycle — from idea to upload.</p>
          <div className="overflow-x-auto rounded-[28px] border border-white/10">
            <table className="w-full min-w-[540px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40 w-[22%]">Stage</th>
                  <th className="bg-cyan-300/[0.05] px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-cyan-300 w-[39%]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300 inline-block" />HookSignals</span>
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40 w-[39%]">{competitor.name}</th>
                </tr>
              </thead>
              <tbody>
                {workflow.map((row, i) => (
                  <tr key={row.step} className={`border-b border-white/[0.06] ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}>
                    <td className="px-5 py-4 font-black text-white/80">{row.step}</td>
                    <td className="bg-cyan-300/[0.025] px-5 py-4 text-white/70">{row.hs}</td>
                    <td className="px-5 py-4 text-white/45">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="mb-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] border border-emerald-300/18 bg-emerald-300/[0.04] p-6">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-emerald-300">What {competitor.name} does well</p>
            <ul className="space-y-3">
              {pros.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-6 text-white/68">
                  <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-[9px] font-black text-emerald-300">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-red-300/15 bg-red-300/[0.04] p-6">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-red-300">Where creators feel the gaps</p>
            <ul className="space-y-3">
              {cons.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm leading-6 text-white/68">
                  <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-400/12 text-[9px] font-black text-red-300">!</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who should switch */}
        <section className="mb-12 rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Who should switch</p>
          <h2 className="mb-5 text-2xl font-black tracking-tight">HookSignals fits your workflow if you…</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {whoShouldSwitch.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-white/70">
                <span className="mt-0.5 shrink-0 text-[10px] text-cyan-300">◆</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Why creators switch */}
        <section className="mb-12 rounded-[32px] border border-white/10 bg-white/[0.02] p-7 md:p-10">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Why creators switch to HookSignals</p>
          <h2 className="mb-7 text-3xl font-black tracking-tight">Pre-publish analysis built for the packaging decision.</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {switchReasons.map((r) => (
              <div key={r.title} className="rounded-[22px] border border-white/10 bg-black/24 p-5">
                <p className="font-black text-white">{r.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/hook-analyzer" className="rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.06] px-5 py-2.5 text-sm font-black text-cyan-200 transition hover:bg-cyan-300/[0.12]">Hook Analyzer</a>
            <a href="/youtube-title-analyzer" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/65 transition hover:bg-white/[0.08]">Title Analyzer</a>
            <a href="/youtube-video-analyzer" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/65 transition hover:bg-white/[0.08]">Video Analyzer</a>
            <a href="/how-scores-work" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/65 transition hover:bg-white/[0.08]">How Scores Work</a>
          </div>
        </section>

        <CTAStrip />

        {/* FAQ */}
        <section className="mb-12 rounded-[32px] border border-white/10 bg-white/[0.025] p-7 md:p-10">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-emerald-300">Common questions</p>
          <h2 className="mb-8 text-3xl font-black tracking-tight">{competitor.name} alternative — answered.</h2>
          <div className="space-y-6">
            {faq.map((item) => (
              <div key={item.question} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-black text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-[32px] border border-cyan-300/25 bg-[linear-gradient(135deg,rgba(34,211,238,.09),rgba(124,58,237,.07))] p-8 text-center md:p-12">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">Ready to try a different approach?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/55">
            HookSignals scores your hook, title and packaging before you publish. No browser extension. No YouTube login. Free to start.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/youtube-video-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-8 py-4 font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.22)] transition hover:scale-[1.01]">
              Try HookSignals Free →
            </a>
            <a href="/pricing" className="rounded-2xl border border-white/12 bg-white/[0.05] px-8 py-4 font-black text-white/70 transition hover:bg-white/[0.10]">
              See Plans
            </a>
          </div>
          <p className="mt-5 text-xs text-white/28">15 free credits on signup. No credit card required.</p>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
