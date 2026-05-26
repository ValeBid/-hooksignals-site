const related = [
  {
    name: "Hook Analyzer",
    href: "/hook-analyzer",
  },
  {
    name: "Hook Improver",
    href: "/hook-improver",
  },
  {
    name: "Shorts Script Generator",
    href: "/shorts-script-generator",
  },
  {
    name: "Thumbnail Text Checker",
    href: "/thumbnail-text-checker",
  },
];

export default function RelatedTools() {
  return (
    <section className="mt-14">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7 md:p-10">
        <p className="mb-3 text-sm font-semibold text-emerald-300">
          Related workflow tools
        </p>

        <h2 className="text-3xl font-semibold tracking-tight">
          Continue improving the rest of your content workflow.
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {related.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-emerald-300/30"
            >
              <p className="text-lg font-semibold">{tool.name}</p>
              <p className="mt-2 text-sm text-white/45">
                Open tool →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}