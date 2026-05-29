import SiteFooter from "./components/site-footer";
import StructuredData from "./components/structured-data";
import StickyCTA from "./components/sticky-cta";
import "./components/premium-motion.css";
import "./components/mobile-cinematic.css";

export const metadata = {
  title: "HookSignals Video Performance Predictor | Predict Before You Publish",
  description:
    "Predict video performance before publishing. Analyze your title, hook, thumbnail text and niche to find retention risks, CTR potential and outlier signals.",
  alternates: { canonical: "https://hooksignals.com" },
  openGraph: {
    title: "HookSignals Video Performance Predictor",
    description:
      "Analyze your title, hook and thumbnail text before publishing. Detect weak packaging, retention risks and outlier potential in seconds.",
    url: "https://hooksignals.com",
    siteName: "HookSignals",
    type: "website",
  },
};

const scores = [
  ["Win Score", "87/100", "w-[87%]"],
  ["Hook Strength", "85/100", "w-[85%]"],
  ["Retention Potential", "82/100", "w-[82%]"],
  ["CTR Potential", "90/100", "w-[90%]"],
];

const fields = ["Title", "Hook", "Thumbnail Text", "Niche"];

const featureCards = [
  {
    title: "Pre-publish prediction",
    body: "Preview whether your idea has enough curiosity, clarity and packaging strength before it goes live.",
    label: "Demo scoring",
  },
  {
    title: "Retention risk detection",
    body: "Spot vague openings, slow setup and weak payoff signals that can reduce early watch time.",
    label: "Example checks",
  },
  {
    title: "Thumbnail-text clarity",
    body: "Test whether the thumbnail promise is simple, specific and strong enough for mobile discovery.",
    label: "Sample review",
  },
  {
    title: "Outlier pattern extraction",
    body: "Study videos that beat their expected performance and turn their patterns into repeatable angles.",
    label: "Preview workflow",
  },
];

function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-300/20 via-sky-400/10 to-violet-400/20 shadow-lg shadow-cyan-500/10">
      <div className="absolute inset-1 rounded-xl border border-white/10" />
      <span className="text-lg font-black tracking-[-0.08em] text-cyan-100">HS</span>
    </div>
  );
}

function Header() {
  return (
    <header className="relative z-40 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-8">
      <a href="/" className="flex items-center gap-3" aria-label="HookSignals home">
        <LogoMark />
        <div>
          <span className="block text-lg font-black tracking-tight text-white">HookSignals</span>
          <span className="hidden text-xs uppercase tracking-[0.16em] text-cyan-300 sm:block">Video Predictor</span>
        </div>
      </a>
      <nav className="hidden items-center gap-7 text-sm text-white/58 lg:flex">
        <a className="transition hover:text-white" href="/tools">Tools</a>
        <a className="transition hover:text-white" href="/hook-analyzer">Analyzer</a>
        <a className="transition hover:text-white" href="/pricing">Pricing</a>
        <a className="transition hover:text-white" href="/blog">Resources</a>
      </nav>
      <div className="flex items-center gap-2">
        <a href="/hook-analyzer" className="hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-black text-white transition hover:bg-white/10 sm:inline-flex">
          View Example
        </a>
        <a href="/hook-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-4 py-2.5 text-sm font-black text-black shadow-[0_16px_34px_rgba(34,211,238,.18)] transition hover:scale-[1.01] md:px-5">
          Analyze Video
        </a>
      </div>
    </header>
  );
}

function PredictorDashboard() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-[48px] bg-gradient-to-br from-cyan-400/16 via-transparent to-violet-500/16 blur-3xl" />
      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#050816]/88 p-5 shadow-[0_34px_110px_rgba(0,0,0,.55)] backdrop-blur-2xl">
        <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,.16),transparent_30%),radial-gradient(circle_at_82%_10%,rgba(168,85,247,.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.018))] p-5 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Example Prediction</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-white">Creator idea preview</h2>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-right">
              <p className="text-xs text-white/48">Outlier Potential</p>
              <p className="text-xl font-black text-cyan-200">8.7x</p>
            </div>
          </div>

          <div className="mt-7 grid gap-4">
            {scores.map(([label, value, width]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/24 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">{label}</span>
                  <span className="font-black text-white">{value}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 ${width}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-violet-300/14 bg-violet-300/[0.055] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-200">Sample insight</p>
            <p className="mt-3 text-sm leading-6 text-white/62">
              Strong clickable promise. Improve the first 3 seconds by making the hook more specific and showing the payoff earlier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PredictorForm() {
  return (
    <section className="relative mx-auto -mt-8 max-w-[1320px] px-5 md:px-8">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_22px_80px_rgba(0,0,0,.42)] backdrop-blur-2xl md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_.7fr_auto] lg:items-end">
          {fields.map((field) => (
            <label key={field} className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-white/42">{field}</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-black/28 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40"
                placeholder={`Enter ${field.toLowerCase()}`}
              />
            </label>
          ))}
          <a href="/hook-analyzer" className="inline-flex h-[46px] items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-6 text-sm font-black text-black shadow-[0_18px_42px_rgba(34,211,238,.16)] transition hover:scale-[1.01]">
            Analyze
          </a>
        </div>
        <p className="mt-4 text-xs leading-5 text-white/38">Demo form preview. Full analysis continues in the Hook Analyzer workflow.</p>
      </div>
    </section>
  );
}

function OutlierSection() {
  return (
    <section className="mx-auto mt-20 max-w-[1320px] px-5 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[.88fr_1.12fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Outlier discovery</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">Discover Outliers. Learn What Works.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/58">
            Find videos that outperformed the norm and extract repeatable hook, title, and thumbnail patterns.
          </p>
          <a href="/tools" className="mt-8 inline-flex rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.08] px-6 py-3 text-sm font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]">
            Explore sample tools
          </a>
        </div>
        <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {["Title angle", "Hook pattern", "Thumbnail promise"].map((item, index) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-black/24 p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/35">Sample {index + 1}</p>
                <p className="mt-4 text-lg font-black text-white">{item}</p>
                <p className="mt-3 text-sm leading-6 text-white/50">Preview how a winning video frames curiosity, speed and payoff.</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.06] p-5">
            <p className="text-sm font-black text-cyan-100">Example pattern</p>
            <p className="mt-2 text-sm leading-6 text-white/56">Clear promise + visible tension + fast payoff tends to create stronger packaging than broad educational titles.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section className="mx-auto mt-20 max-w-[1320px] px-5 md:px-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureCards.map((card) => (
          <div key={card.title} className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.06]">
            <span className="inline-flex rounded-full border border-cyan-300/18 bg-cyan-300/[0.08] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">{card.label}</span>
            <h3 className="mt-5 text-xl font-black tracking-tight text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/52">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto mt-20 max-w-[1320px] px-5 pb-20 md:px-8">
      <div className="overflow-hidden rounded-[40px] border border-cyan-300/20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.16),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.025))] p-8 text-center shadow-[0_30px_100px_rgba(34,211,238,.10)] md:p-14">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Creator-focused preview</p>
        <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">Make the video stronger before the audience decides.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/58">Use HookSignals to preview title strength, hook clarity, thumbnail promise and outlier potential before publishing.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/hook-analyzer" className="inline-flex justify-center rounded-2xl bg-white px-8 py-4 font-black text-black transition hover:scale-[1.02]">Analyze Your Video</a>
          <a href="/hook-analyzer" className="inline-flex justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.08] px-8 py-4 font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]">View Example Analysis</a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen overflow-hidden bg-[#020408] text-white hs-mobile-safe">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(6,182,212,0.14),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.13),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(14,165,233,0.08),transparent_34%),linear-gradient(180deg,#020408_0%,#05070d_55%,#020408_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
          <Header />

          <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 pb-24 pt-12 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:pb-32 lg:pt-20">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/24 bg-cyan-300/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100 shadow-lg shadow-cyan-500/5">
                <span className="text-cyan-300">✦</span> HookSignals Video Performance Predictor
              </div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200/90">Predict Video Performance Before You Publish</p>
              <h1 className="mt-5 max-w-5xl text-6xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl xl:text-[96px]">
                Predict.<br />
                Perfect.<br />
                <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">Perform.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/62 md:text-xl">
                Analyze your title, hook, and thumbnail text before publishing. Detect retention risks, weak packaging, and outlier potential in seconds.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="/hook-analyzer" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-8 py-4 text-base font-black text-black shadow-[0_20px_48px_rgba(34,211,238,.18)] transition hover:scale-[1.01]">
                  Analyze Your Video <span className="transition group-hover:translate-x-1">→</span>
                </a>
                <a href="/hook-analyzer" className="inline-flex items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.08] px-8 py-4 text-base font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]">
                  View Example Analysis
                </a>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-6 text-white/42">All scores shown here are labeled example, demo, sample or preview metrics. No fake live creator data.</p>
            </div>

            <PredictorDashboard />
          </div>
        </section>

        <PredictorForm />
        <OutlierSection />
        <FeatureGrid />
        <FinalCTA />
        <SiteFooter />
        <StickyCTA />
      </main>
    </>
  );
}
