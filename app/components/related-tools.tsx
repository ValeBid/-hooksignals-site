const related = [
  {
    name: "Hook Analyzer",
    href: "/hook-analyzer",
    desc: "Score your opening line for clarity, curiosity and retention risk.",
  },
  {
    name: "Hook Improver",
    href: "/hook-improver",
    desc: "Rewrite weak hooks into sharper and more retention-focused openings.",
  },
  {
    name: "Shorts Script Generator",
    href: "/shorts-script-generator",
    desc: "Build short-form scripts designed for pacing and retention.",
  },
  {
    name: "YouTube Title Generator",
    href: "/youtube-title-generator",
    desc: "Create clearer titles designed for stronger click intent.",
  },
  {
    name: "Thumbnail Text Checker",
    href: "/thumbnail-text-checker",
    desc: "Check whether thumbnail text is readable and clear.",
  },
  {
    name: "Viral Hook Examples",
    href: "/viral-hook-examples",
    desc: "Study reusable opening patterns and hook structures.",
  },
];

export default function RelatedTools() {
  return (
    <section className="mt-14">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7 md:p-10">
        <p className="mb-3 text-sm font-semibold text-emerald-300">
          Continue the workflow
        </p>

        <h2 className="text-3xl font-semibold tracking-tight">
          Improve the next layer of your creator workflow.
        </h2>

        <p className="mt-4 max-w-3xl leading-8 text-white/52">
          Strong creator performance usually comes from multiple systems working together.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {related.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.05]"
            >
              <p className="text-lg font-semibold">{tool.name}</p>

              <p className="mt-3 text-sm leading-6 text-white/45">
                {tool.desc}
              </p>

              <p className="mt-5 text-sm font-semibold text-emerald-300">
                Open tool
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
