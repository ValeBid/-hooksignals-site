import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout | HookSignals Creator Pro",
  description: "Start your HookSignals Creator Pro subscription.",
};

export default function CreatorProCheckoutPage() {
  const url = process.env.NEXT_PUBLIC_PADDLE_CREATOR_PRO_CHECKOUT_URL;

  if (url) {
    redirect(url);
  }

  return (
    <main className="min-h-screen bg-[#030507] px-5 py-20 text-white md:px-8">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/[0.03] p-8 md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Checkout setup</p>
        <h1 className="mt-5 text-5xl font-black tracking-tight">Creator Pro payment is not connected on this deployment.</h1>
        <p className="mt-6 leading-8 text-white/60">The site needs the live Paddle payment URL in the production environment and then a new deploy.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/pricing" className="rounded-2xl bg-white px-6 py-4 text-center font-black text-black">Back to pricing</a>
          <a href="mailto:support@hooksignals.com" className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-center font-bold text-white">Contact support</a>
        </div>
      </div>
    </main>
  );
}
