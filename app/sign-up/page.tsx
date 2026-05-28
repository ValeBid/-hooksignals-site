export const metadata = {
  title: 'Sign up | HookSignals',
  description: 'Create your HookSignals creator workspace.',
};

const clerkSignUpUrl = 'https://accounts.hooksignals.com/sign-up';

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#030507] px-5 py-16 text-white md:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Create account</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">Start your HookSignals workspace.</h1>
        <p className="mt-5 text-lg leading-8 text-white/55">Create an account to manage creator workflows, plan access and credits.</p>
        <a href={clerkSignUpUrl} className="mt-8 rounded-2xl bg-white px-7 py-4 font-black text-black">Continue to sign up</a>
        <a href="/sign-in" className="mt-4 text-sm font-bold text-white/45">Already have an account?</a>
      </div>
    </main>
  );
}
