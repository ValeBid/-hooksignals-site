export const metadata = {
  title: "Payment Successful",
  description: "HookSignals payment completed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#030507] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-cyan-300/20 bg-cyan-300/[0.05] p-8 md:p-12 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Payment successful</p>
        <h1 className="mt-5 text-5xl font-black tracking-[-0.05em]">Welcome to HookSignals.</h1>
        <p className="mt-6 text-lg leading-8 text-white/60">
          Your creator access is being prepared. Premium workflows, credits and onboarding systems will be connected to your account shortly.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="/tools" className="rounded-2xl bg-white px-6 py-4 font-black text-black">
            Open creator tools
          </a>

          <a href="/billing" className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-black text-white">
            Manage billing
          </a>
        </div>
      </div>
    </main>
  );
}
