import { notFound } from 'next/navigation';
import { getSupabaseClient } from '../../lib/supabase';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = getSupabaseClient();
  const { data } = await supabase
    .from('generations')
    .select('input, tool_name')
    .eq('id', params.id)
    .single();

  return {
    title: data?.input ? data.input : 'Creator Analysis',
    description: 'Public creator analysis generated with HookSignals.',
  };
}

export default async function SharePage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseClient();
  const { data } = await supabase
    .from('generations')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!data) {
    notFound();
  }

  let parsedOutput: any = null;

  try {
    parsedOutput = JSON.parse(data.output || '{}');
  } catch {
    parsedOutput = null;
  }

  return (
    <main className="min-h-screen bg-[#030507] px-5 py-16 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Public creator analysis</p>
          <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] md:text-7xl">
            {data.input || 'Creator analysis'}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
            This hook analysis page was generated with HookSignals creator intelligence tools.
          </p>
        </section>

        {parsedOutput && (
          <section className="mt-8 grid gap-5 md:grid-cols-4">
            <div className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-cyan-300">Hook score</p>
              <p className="mt-4 text-5xl font-black">{parsedOutput.hookScore}</p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-white/35">Clarity</p>
              <p className="mt-4 text-5xl font-black">{parsedOutput.clarityScore}</p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-white/35">Curiosity</p>
              <p className="mt-4 text-5xl font-black">{parsedOutput.curiosityScore}</p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-white/35">Retention risk</p>
              <p className="mt-4 text-5xl font-black">{parsedOutput.retentionRisk}</p>
            </div>
          </section>
        )}

        {parsedOutput && (
          <section className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-violet-300">Pattern detected</p>
              <h2 className="mt-4 text-3xl font-black">{parsedOutput.pattern}</h2>
              <p className="mt-5 leading-8 text-white/55">{parsedOutput.weakness}</p>
            </div>

            <div className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-cyan-300">Improved version</p>
              <p className="mt-5 text-2xl font-black leading-10 text-white/90">
                “{parsedOutput.improvedHook}”
              </p>
            </div>
          </section>
        )}

        <section className="mt-8 rounded-[30px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
          <h2 className="text-4xl font-black tracking-[-0.05em]">Analyze your own hook</h2>
          <p className="mt-5 max-w-3xl leading-8 text-white/55">
            Generate creator-focused hook analysis, retention insights and improved opening lines with HookSignals.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="/hook-analyzer" className="rounded-2xl bg-white px-7 py-4 text-center font-black text-black">
              Open Hook Analyzer
            </a>
            <a href="/pricing" className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-center font-black text-white">
              View pricing
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
