const workspaceItems = [
  ["Saved analyses", "Keep stronger hooks and compare versions before publishing."],
  ["Project memory", "Organize ideas by channel, campaign or content format."],
  ["Workflow history", "Move from hook to title to script without losing context."],
];

export default function WorkspacePreview() {
  return (
    <section className="mt-14">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#05070b] p-7 shadow-2xl shadow-black/25 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.12),transparent_26%),radial-gradient(circle_at_90%_20%,rgba(124,58,237,0.12),transparent_28%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
              Workspace ready
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-5xl">
              A future home for serious creator systems.
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/55">
              HookSignals is being structured around saved workflows, project memory and creator operating loops before billing is connected.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-emerald-300">Creator workspace</p>
                <p className="mt-1 text-2xl font-black tracking-tight">Publishing System</p>
              </div>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1 text-xs font-bold text-emerald-300">
                Pro layer
              </span>
            </div>

            <div className="space-y-3">
              {workspaceItems.map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="font-bold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/45">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
