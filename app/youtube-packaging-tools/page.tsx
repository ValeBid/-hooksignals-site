import type { Metadata } from "next";
import SimpleNav from "../components/simple-nav";
import SiteFooter from "../components/site-footer";
import FAQSchema from "../components/faq-schema";
import BreadcrumbSchema from "../components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "YouTube Packaging Tools — Analyze Hook, Title and Thumbnail Before Publishing",
  description:
    "YouTube packaging tools analyze hook strength, title clarity and thumbnail signals before you publish. Learn what packaging means, why it matters and how HookSignals scores your video.",
  alternates: { canonical: "https://hooksignals.com/youtube-packaging-tools" },
  openGraph: {
    title: "YouTube Packaging Tools — HookSignals",
    description: "Pre-publish packaging analysis for YouTube creators. Score your hook, title and thumbnail before the video goes live.",
    url: "https://hooksignals.com/youtube-packaging-tools",
    siteName: "HookSignals",
    type: "website",
  },
};

const faq = [
  { question: "What does 'packaging' mean for a YouTube video?", answer: "Packaging is the combination of elements that determine whether a viewer will click on a video and keep watching: the title, the opening hook, the thumbnail and how well those three signals work together to create curiosity and set clear expectations. A well-packaged video makes the value proposition clear before the viewer commits to watching." },
  { question: "Why do packaging tools matter for YouTube growth?", answer: "Most YouTube performance problems trace back to packaging. A video on a great topic with weak packaging will underperform against a similar video with strong packaging signals. Titles that are vague, hooks that are too slow and thumbnails with unreadable text all reduce click-through and early retention — the signals YouTube uses to decide how much to distribute a video." },
  { question: "What is the best pre-publish packaging tool for YouTube?", answer: "HookSignals is built specifically for pre-publish packaging analysis. It scores hook strength, title clarity, curiosity gap, CTR potential, outlier potential and retention risk before the video is published — when the creator can still act on the feedback. It also returns specific rewrites: better titles, hook alternatives and thumbnail text ideas." },
  { question: "Can I analyze packaging before I record?", answer: "Yes. HookSignals works on any planned hook or working title before you record. Paste the opening line into the Hook Analyzer and get scores and rewrites before filming. You do not need a finished or published video to start getting packaging feedback." },
  { question: "What is the difference between packaging analysis and SEO?", answer: "SEO tools optimize videos for YouTube search — keyword volume, tag recommendations and search ranking. Packaging analysis optimizes for click-through and retention — whether a viewer will click the title and stay for the first 30 seconds. Both matter, but they measure different things. A video can rank well and still have weak packaging, or have strong packaging and still be weak on keyword targeting." },
  { question: "What signals does HookSignals analyze?", answer: "HookSignals scores packaging across 9 dimensions: overall packaging strength, hook strength, title clarity, curiosity gap, CTR potential, outlier potential and retention risk. Each analysis also returns better title alternatives, hook rewrites, thumbnail text ideas and a description angle — all based on public YouTube metadata and AI packaging analysis." },
  { question: "Does packaging analysis guarantee better views?", answer: "No. Packaging affects whether viewers click and stay — but topic demand, thumbnail design, posting time, audience fit and existing subscriber base all contribute to performance. HookSignals improves the packaging signals you control before publishing, which reduces the chance that a weak opening or unclear title is the thing holding back a good video." },
  { question: "Do I need to connect my YouTube account?", answer: "No. HookSignals uses public YouTube Data API to analyze any public video URL. You can also analyze hooks and titles directly without any YouTube URL. No account connection or authorization required." },
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: "YouTube Packaging Tools", path: "/youtube-packaging-tools" },
];

const packagingElements = [
  { element: "Hook", what: "The opening line or first few seconds of the video", why: "Creates the reason to keep watching. Weak hooks lead to early drop-off before the content can deliver value." },
  { element: "Title", what: "The written headline that appears in the feed", why: "Sets expectations and creates curiosity. Vague titles reduce click-through; misleading titles increase early abandonment." },
  { element: "Thumbnail text", what: "Short text overlaid on the thumbnail image", why: "Works with the title to reinforce the value proposition. Text that is too long or too generic fails at feed size — especially on mobile." },
  { element: "Packaging score", what: "Combined signal strength across all three elements", why: "Measures how well the hook, title and thumbnail work together. Mismatched signals — strong title but weak hook — reduce the overall effectiveness." },
];

const toolCategories = [
  { category: "Pre-publish packaging", tools: "HookSignals", coverage: "Hook scoring, title diagnosis, thumbnail text, AI rewrites, 9-dimension analysis", timing: "Before publishing" },
  { category: "SEO and keyword research", tools: "VidIQ, TubeBuddy", coverage: "Keyword volume, search competition, tag optimization", timing: "Before publishing" },
  { category: "A/B thumbnail testing", tools: "TubeBuddy", coverage: "Live CTR split test on two thumbnail variants", timing: "After publishing" },
  { category: "Niche research", tools: "1of10, OutlierKit", coverage: "Outlier video discovery, proven format patterns", timing: "Before ideation" },
  { category: "Channel analytics", tools: "YouTube Studio, VidIQ", coverage: "Watch time, CTR, subscriber impact, revenue", timing: "After publishing" },
];

export default function YouTubePackagingToolsPage() {
  return (
    <div className="min-h-screen bg-[#030507] text-white">
      <FAQSchema items={faq} />
      <BreadcrumbSchema crumbs={crumbs} />
      <SimpleNav />

      <main className="mx-auto max-w-[1120px] px-5 pb-20 pt-12 md:px-8">

        <nav className="mb-8 flex items-center gap-2 text-xs text-white/35">
          <a href="/" className="transition hover:text-white">Home</a>
          <span>/</span>
          <span className="text-white/60">YouTube Packaging Tools</span>
        </nav>

        {/* Hero */}
        <div className="mb-14">
          <div className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
            Creator tools guide
          </div>
          <h1 className="text-5xl font-black tracking-[-0.05em] leading-tight md:text-6xl">
            YouTube packaging tools<br className="hidden md:block" /> for pre-publish creators.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
            Packaging is the combination of signals that determine whether a viewer clicks on a video and keeps watching: the hook, the title and the thumbnail text. This guide explains what packaging means, why it matters more than most creators realize, and which tools analyze it before a video goes live.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/youtube-video-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.20)] transition hover:scale-[1.01]">
              Analyze Your Packaging Free →
            </a>
            <a href="/hook-analyzer" className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 font-black text-white/70 transition hover:bg-white/[0.08]">
              Score a Hook
            </a>
          </div>
        </div>

        {/* What is packaging */}
        <section className="mb-12 rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-10">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-white/40">What is packaging</p>
          <h2 className="mb-5 text-3xl font-black tracking-tight">Every YouTube video has packaging. Most creators have never audited theirs.</h2>
          <div className="mb-7 grid gap-5 md:grid-cols-2">
            <p className="text-sm leading-7 text-white/65">Packaging is not about production quality, topic choice or how well the content is edited. It is the set of signals that exist before a viewer watches a single second: what the title promises, how the thumbnail creates curiosity, and how the opening line delivers on that promise fast enough to hold attention.</p>
            <p className="text-sm leading-7 text-white/65">Most YouTube underperformance traces back to weak packaging. A video with a great topic and strong execution will still underperform if the title is vague, the hook is slow or the thumbnail text is unreadable at feed size. These are fixable problems — but only before the video is published.</p>
          </div>
          <div className="overflow-x-auto rounded-[22px] border border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40">Element</th>
                  <th className="bg-cyan-300/[0.05] px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-cyan-300">What it is</th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {packagingElements.map((row, i) => (
                  <tr key={row.element} className={`border-b border-white/[0.06] ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}>
                    <td className="px-5 py-4 font-black text-white/85">{row.element}</td>
                    <td className="bg-cyan-300/[0.025] px-5 py-4 text-white/65">{row.what}</td>
                    <td className="px-5 py-4 text-white/50">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tool landscape */}
        <section className="mb-12">
          <h2 className="mb-2 text-3xl font-black tracking-tight">The YouTube tool landscape by category.</h2>
          <p className="mb-7 text-base leading-7 text-white/50">Different creator tools solve different problems at different stages of the workflow. Here is how the major categories fit together.</p>
          <div className="overflow-x-auto rounded-[28px] border border-white/10">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40 w-[22%]">Category</th>
                  <th className="bg-cyan-300/[0.05] px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-cyan-300 w-[20%]">Tools</th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40 w-[40%]">Coverage</th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.12em] text-white/40 w-[18%]">Timing</th>
                </tr>
              </thead>
              <tbody>
                {toolCategories.map((row, i) => (
                  <tr key={row.category} className={`border-b border-white/[0.06] ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}>
                    <td className="px-5 py-4 font-black text-white/85">{row.category}</td>
                    <td className={`px-5 py-4 font-medium ${row.tools === "HookSignals" ? "bg-cyan-300/[0.06] text-cyan-200" : "bg-cyan-300/[0.02] text-white/65"}`}>{row.tools}</td>
                    <td className="px-5 py-4 text-white/55">{row.coverage}</td>
                    <td className={`px-5 py-4 text-xs font-black uppercase tracking-[0.1em] ${row.timing === "Before publishing" ? "text-emerald-400" : "text-white/35"}`}>{row.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="my-10 rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.08),rgba(124,58,237,.06))] p-7 md:p-9">
          <h3 className="text-2xl font-black tracking-tight">Score your packaging before you publish.</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">Paste a YouTube URL or your opening hook. Get AI packaging scores across 9 dimensions with specific rewrites in seconds.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/youtube-video-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-6 py-3 text-sm font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.18)] transition hover:scale-[1.01]">Analyze Your Video Free →</a>
            <a href="/hook-analyzer" className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] px-6 py-3 text-sm font-black text-cyan-200 transition hover:bg-cyan-300/[0.12]">Score a Hook</a>
            <a href="/pricing" className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-black text-white/65 transition hover:bg-white/[0.08]">View Pricing</a>
          </div>
          <p className="mt-4 text-xs text-white/28">No YouTube login. Scores are directional — not guaranteed results. <a href="/how-scores-work" className="underline underline-offset-2 hover:text-white/50">How scores work →</a></p>
        </div>

        {/* HookSignals deep dive */}
        <section className="mb-12 rounded-[32px] border border-white/10 bg-white/[0.025] p-7 md:p-10">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">HookSignals — pre-publish packaging</p>
          <h2 className="mb-5 text-3xl font-black tracking-tight">Built specifically for the packaging decision before you upload.</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-4 text-sm leading-7 text-white/65">
              <p>HookSignals scores your video packaging across 9 dimensions before it goes live. Paste a YouTube URL and it fetches real public metadata via the YouTube Data API — title, views, duration, thumbnail — then runs AI packaging analysis against known patterns.</p>
              <p>You can also analyze any hook or title directly without a published video. Paste your planned opening line into the Hook Analyzer and get a score before you record. Paste a working title into the Title Analyzer and get clarity, curiosity gap and CTR potential scores before you upload.</p>
            </div>
            <div className="space-y-4 text-sm leading-7 text-white/65">
              <p>Every analysis returns specific output: 3 stronger title alternatives, 3 hook rewrite options, thumbnail text ideas and a description angle. These are not generic suggestions — they are built from the specific content of the video or hook you submitted.</p>
              <p>The tool does not access private analytics, YouTube Studio data or channel-level information. Everything is based on public metadata and packaging signal analysis. No YouTube account connection required.</p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/hook-analyzer" className="rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.06] px-5 py-2.5 text-sm font-black text-cyan-200 transition hover:bg-cyan-300/[0.12]">Hook Analyzer</a>
            <a href="/youtube-title-analyzer" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/65 transition hover:bg-white/[0.08]">Title Analyzer</a>
            <a href="/youtube-video-analyzer" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/65 transition hover:bg-white/[0.08]">Video Analyzer</a>
            <a href="/how-scores-work" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/65 transition hover:bg-white/[0.08]">How Scores Work</a>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 rounded-[32px] border border-white/10 bg-white/[0.025] p-7 md:p-10">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-emerald-300">Common questions</p>
          <h2 className="mb-8 text-3xl font-black tracking-tight">YouTube packaging tools — answered.</h2>
          <div className="space-y-6">
            {faq.map((item) => (
              <div key={item.question} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-black text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-cyan-300/25 bg-[linear-gradient(135deg,rgba(34,211,238,.09),rgba(124,58,237,.07))] p-8 text-center md:p-12">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">Start packaging your videos for stronger opens.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/55">HookSignals analyzes hook, title and thumbnail packaging before you publish. Free to start. No YouTube login required.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/youtube-video-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-8 py-4 font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.22)] transition hover:scale-[1.01]">Analyze Your Video Free →</a>
            <a href="/pricing" className="rounded-2xl border border-white/12 bg-white/[0.05] px-8 py-4 font-black text-white/70 transition hover:bg-white/[0.10]">See Plans</a>
          </div>
          <p className="mt-5 text-xs text-white/28">15 free credits on signup. No credit card required.</p>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
