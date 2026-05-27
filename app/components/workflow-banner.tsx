const workflow = [
  {
    step: "01",
    title: "Hook",
    desc: "Test clarity and retention before publishing.",
  },
  {
    step: "02",
    title: "Title",
    desc: "Improve click intent without sounding generic.",
  },
  {
    step: "03",
    title: "Script",
    desc: "Structure pacing for stronger viewer retention.",
  },
  {
    step: "04",
    title: "Packaging",
    desc: "Refine thumbnails and first impressions.",
  },
];

export default function WorkflowBanner() {
  return (
    <section className="relative mt-12 overflow-hidden rounded-[32px] border border-white/10 bg-[#040507] p-6 shadow-2xl shadow-black/30 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,197,94,0.1),transparent_24%),radial-gradient(circle_at_85%_10%,rgba(168,85,247,0.08),transparent_26%)]" />

      <div className="relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
              Creator workflow system
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Build stronger creator packaging layer by layer.
            </h2>
          </div>

          <p className="max-w-lg text-base leading-8 text-white/52">
            High-performing videos usually come from multiple systems working together instead of a single viral trick.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {workflow.map((item) => (
            <div
              key={item.step}
              className="group rounded-[28px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.04]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-[0.18em] text-white/35">
                  {item.step}
                </span>

                <div className="h-2 w-2 rounded-full bg-emerald-300 opacity-70 transition group-hover:scale-125" />
              </div>

              <h3 className="mt-6 text-2xl font-black tracking-tight text-white">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-white/48">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
