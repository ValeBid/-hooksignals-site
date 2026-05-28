const personas = [
  ["Solo creators", "Move from idea to publish-ready hook, title, script and thumbnail checks without a full content team."],
  ["Creator agencies", "Standardize packaging quality across client videos and short-form publishing workflows."],
  ["Brands", "Turn product messages into platform-native short-form hooks and clearer content angles."],
];

export default function CreatorPaths() {
  return (
    <section className="mt-16 rounded-[34px] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-2xl md:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Conversion paths</p>
      <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.05em] md:text-5xl">One platform, multiple creator workflows.</h2>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {personas.map(([title, desc]) => (
          <article key={title} className="rounded-[24px] border border-white/10 bg-black/25 p-5">
            <h3 className="text-2xl font-black tracking-tight">{title}</h3>
            <p className="mt-3 leading-7 text-white/55">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
