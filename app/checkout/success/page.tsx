import { redirect } from 'next/navigation';

// The Paddle inline checkout already redirects to /dashboard?checkout=success.
// This page handles the rare case where Paddle sends the user here directly
// (e.g., overlay checkout success URL configured to /checkout/success).
export default function CheckoutSuccessPage() {
  redirect('/dashboard?checkout=success');
}
