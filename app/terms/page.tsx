export const metadata = {
  title: "Terms of Service | HookSignals",
  description: "Terms of service for HookSignals creator workflow platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#030507] px-5 py-20 text-white md:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/[0.03] p-8 md:p-12">
        <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>

        <div className="mt-8 space-y-8 text-white/65">
          <section>
            <h2 className="text-xl font-bold text-white">Platform Usage</h2>
            <p className="mt-3 leading-8">
              HookSignals provides creator workflow and content optimization tools for educational and productivity purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">Subscriptions</h2>
            <p className="mt-3 leading-8">
              Paid subscriptions may renew automatically unless cancelled before the next billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">Limitations</h2>
            <p className="mt-3 leading-8">
              HookSignals does not guarantee audience growth, platform performance, monetization results or publishing outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">Contact</h2>
            <p className="mt-3 leading-8">
              Questions regarding these terms can be sent to support@hooksignals.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
