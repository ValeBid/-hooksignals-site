import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const protectedRoutes = createRouteMatcher([
  '/dashboard(.*)',
  '/workspace(.*)',
  '/billing(.*)',
  '/api/credits(.*)',
  '/api/ai/:path*',
  '/api/bootstrap(.*)',
]);

// Checkout pages require auth so clerk_user_id is available for customData.
const checkoutRoutes = createRouteMatcher(['/checkout/(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req) || checkoutRoutes(req)) {
    const { userId } = await auth();
    if (!userId) {
      // Explicitly redirect to the branded /sign-in page, preserving the
      // intended destination so Clerk can redirect back after sign-in.
      // Using auth.protect() delegates to Clerk's internal redirect which
      // points at the raw Clerk domain (accounts.dev on dev instances).
      // Build the absolute redirect URL. Using req.url as base ensures the
      // correct origin (localhost in dev, hooksignals.com in production).
      const origin = new URL(req.url).origin;
      const destination = req.nextUrl.pathname + req.nextUrl.search;
      const target = `${origin}/sign-in?redirect_url=${encodeURIComponent(destination)}`;
      return NextResponse.redirect(target);
    }
  }
});

export const config = {
  matcher: [
    '/dashboard(.*)',
    '/workspace(.*)',
    '/billing(.*)',
    '/checkout(.*)',
    '/api/credits(.*)',
    '/api/ai/:path*',
    '/api/bootstrap(.*)',
    // Required by Clerk to handle auth routes.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
