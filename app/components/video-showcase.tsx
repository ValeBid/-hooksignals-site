export default function VideoShowcase() {
  return (
    <section className="mt-16 grid gap-5 lg:grid-cols-3">
      <article className="rounded-3xl border border-white/10 bg-black/25 p-6">
        <p className="text-sm uppercase text-cyan-300">Opening</p>
        <h3 className="mt-4 text-2xl font-black">Hook review</h3>
        <p className="mt-3 text-white/55">
          Check the opening promise before publishing.
        </p>
      </article>

      <article className="rounded-3xl border border-white/10 bg-black/25 p-6">
        <p className="text-sm uppercase text-cyan-300">Pacing</p>
        <h3 className="mt-4 text-2xl font-black">Script flow</h3>
        <p className="mt-3 text-white/55">
          Shape the idea into a tighter short-form structure.
        </p>
      </article>

      <article className="rounded-3xl border border-white/10 bg-black/25 p-6">
        <p className="text-sm uppercase text-cyan-300">CTR</p>
        <h3 className="mt-4 text-2xl font-black">Package check</h3>
        <p className="mt-3 text-white/55">
          Align the hook with title and thumbnail clarity.
        </p>
      </article>
    </section>
  );
}