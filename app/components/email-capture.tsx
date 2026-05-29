"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  }

  return (
    <section className="mt-16 rounded-[38px] border border-cyan-300/20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.02))] p-8 shadow-[0_40px_120px_rgba(34,211,238,.1)] md:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Creator lead funnel</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.05em] md:text-6xl">Get sharper creator decisions before you publish.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/58">
            Join the HookSignals creator list for new AI tools, example analyses, retention notes and launch discounts.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-black/28 p-5 md:p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="grid gap-3">
              <label className="text-sm font-semibold text-white/62">Email address</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="creator@email.com"
                className="rounded-2xl border border-white/10 bg-[#050914] px-4 py-4 text-white outline-none placeholder:text-white/24 focus:border-cyan-300/45"
              />
              <button type="submit" className="rounded-2xl bg-cyan-300 px-5 py-4 font-black text-black transition hover:bg-cyan-200">
                Join free
              </button>
              <p className="text-xs leading-5 text-white/35">No spam. Product updates, creator workflow examples and discounts only.</p>
            </form>
          ) : (
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] p-5">
              <p className="text-xl font-black text-emerald-200">You are on the list.</p>
              <p className="mt-3 leading-7 text-white/55">Next step: analyze a real hook and save the result to your workspace.</p>
              <a href="/hook-analyzer" className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">Analyze a hook</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
