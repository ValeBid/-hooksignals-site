const workspaceItems = [
  ["Saved analyses", "Keep stronger hooks and compare versions before publishing."],
  ["Project memory", "Organize ideas by channel, campaign or content format."],
  ["Workflow history", "Move from hook to title to script without losing context."],
];

export default function WorkspacePreview() {
  return (
    <section className="mt-14">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#05070b] p-7 shadow-2xl shadow-black/25 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.12),transparent_26%),radial-gradient(circle_at_90%_20%,rgba(124,58,237,0.12),transparent_28%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Workspace roadmap</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-5xl">A practical workflow layer for serious creators.</h2>
            <p className="mt-5 text-lg leading-8 text-white/55">HookSignals is focused on useful pre-publish tools first: analyze a hook, improve the opening, draft the script and check packaging before you post.</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div><p className="text-sm text-cyan-300">Creator workflow</p><p className="mt-1 text-2xl font-black tracking-tight">Publishing System</p></div>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-bold text-cyan-300">Beta roadmap</span>
            </div>
            <div className="space-y-3">{workspaceItems.map(([title, desc]) => <div key={title} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="font-bold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-white/45">{desc}</p></div>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
