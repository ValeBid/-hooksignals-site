import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoutes = createRouteMatcher([
  '/dashboard(.*)',
  '/workspace(.*)',
  '/billing(.*)',
  '/api/credits(.*)',
  '/api/ai/:path*',
  '/api/bootstrap(.*)',
]);

// Checkout pages require auth so clerk_user_id is available for customData.
// If unauthenticated, Clerk redirects to /sign-in which then redirects back.
const checkoutRoutes = createRouteMatcher(['/checkout/(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req) || checkoutRoutes(req)) {
    await auth.protect();
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
