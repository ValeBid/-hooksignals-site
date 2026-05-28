const links = [
  ["AI Hook Analyzer", "/hook-analyzer"],
  ["YouTube Shorts SEO", "/seo"],
  ["TikTok SEO Strategy", "/blog/tiktok-seo-first-three-seconds"],
  ["Thumbnail Optimization", "/thumbnail-text-checker"],
  ["Shorts Script Generator", "/shorts-script-generator"],
  ["Creator Retention", "/seo"],
];

export default function InternalLinkMesh() {
  return (
    <section className="mt-16 rounded-[34px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl md:p-8">
      <div className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Internal authority mesh</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-5xl">Connected creator SEO topic clusters.</h2>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="rounded-full border border-white/10 bg-black/25 px-5 py-3 text-sm font-bold text-white/78 transition hover:border-cyan-300/30 hover:text-cyan-200"
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
