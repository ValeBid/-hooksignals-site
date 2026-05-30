import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign up | HookSignals",
  description: "Create your HookSignals creator workspace.",
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#030507] px-5 py-16 text-white">
      <div className="mx-auto flex max-w-lg flex-col items-center">
        <a href="/" className="mb-8 flex items-center gap-3" aria-label="HookSignals home">
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <rect x="6" y="44" width="14" height="14" rx="4" fill="#22d3ee"/>
            <rect x="25" y="28" width="14" height="30" rx="4" fill="#22d3ee"/>
            <rect x="44" y="8" width="14" height="50" rx="4" fill="#22d3ee"/>
          </svg>
          <div>
            <span className="block text-xl font-black tracking-tight">HookSignals</span>
            <span className="block text-xs uppercase tracking-[0.16em] text-cyan-300">Creator Intelligence</span>
          </div>
        </a>

        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Get started free</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Create your workspace.</h1>
          <p className="mt-3 text-base leading-7 text-white/52">
            Free account. Analyze hooks, improve titles and track your workflow.
          </p>
        </div>

        <div className="flex w-full justify-center">
          <SignUp fallbackRedirectUrl="/dashboard" signInUrl="/sign-in" />
        </div>

        <p className="mt-8 text-sm text-white/40">
          Already have an account?{" "}
          <a href="/sign-in" className="font-bold text-cyan-300 transition hover:text-cyan-200">
            Sign in →
          </a>
        </p>
        <a href="/" className="mt-3 text-sm text-white/30 transition hover:text-white/60">
          ← Back to homepage
        </a>
      </div>
    </main>
  );
}
