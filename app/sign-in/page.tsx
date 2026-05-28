export const metadata = {
  title: 'Sign in | HookSignals',
  description: 'Sign in to your HookSignals creator workspace.',
};

function getClerkHost() {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
  const host = key.split('$')[1];
  return host ? `https://${host}` : '/dashboard';
}

export default function SignInPage() {
  const clerkSignInUrl = `${getClerkHost()}/sign-in?redirect_url=https://hooksignals.com/dashboard`;

  return (
    <main className="min-h-screen bg-[#030507] px-5 py-16 text-white md:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">HookSignals login</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">Access your creator workspace.</h1>
        <p className="mt-5 text-lg leading-8 text-white/55">Use your HookSignals account to manage your plan, credits and saved creator workflows.</p>
        <a href={clerkSignInUrl} className="mt-8 rounded-2xl bg-white px-7 py-4 font-black text-black">Continue to sign in</a>
        <a href="/" className="mt-4 text-sm font-bold text-white/45">Back to homepage</a>
      </div>
    </main>
  );
}
