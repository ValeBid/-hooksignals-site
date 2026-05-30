import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../../lib/supabase';
import { verifyPaddleSignature } from '../../../lib/paddle';

// Canonical credit allocation by plan name.
const CREDITS_BY_PLAN: Record<string, number> = {
  starter: 250,
  pro: 2000,
  elite: 10000,
};

// Maps Paddle price IDs → internal plan names.  Must match lib/plans.ts.
const PLAN_BY_PRICE_ID: Record<string, string> = {
  pri_01ksqr6vp07e48ktwm6x5jzw1y: 'starter',
  pri_01ksnnbh8fc2452se12nr37tmz: 'pro',
  pri_01ksnn757pd4582jcvn8g0g165: 'elite',
};

function resolvePlan(items: unknown[] = []): string | null {
  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    const obj = item as Record<string, unknown>;
    const priceId =
      (obj.price as Record<string, unknown> | undefined)?.id as string | undefined ||
      obj.price_id as string | undefined ||
      '';
    if (typeof priceId === 'string' && PLAN_BY_PRICE_ID[priceId]) {
      return PLAN_BY_PRICE_ID[priceId];
    }
  }
  return null;
}

// Resolve clerk_user_id from event data, with fallback to subscription lookup.
async function resolveClerkUserId(
  data: Record<string, unknown>,
  supabase: ReturnType<typeof getSupabaseAdminClient>
): Promise<string | null> {
  // Primary: custom_data (set at checkout time).
  const customData = (data.custom_data || {}) as Record<string, unknown>;
  const fromCustomData = typeof customData.clerk_user_id === 'string' ? customData.clerk_user_id : null;
  if (fromCustomData) return fromCustomData;

  // Fallback: look up by paddle_subscription_id in our subscriptions table.
  const subscriptionId =
    typeof data.id === 'string' ? data.id :
    typeof data.subscription_id === 'string' ? data.subscription_id : null;

  if (subscriptionId) {
    const { data: row } = await supabase
      .from('subscriptions')
      .select('clerk_user_id')
      .eq('paddle_subscription_id', subscriptionId)
      .maybeSingle();
    if (row?.clerk_user_id) return row.clerk_user_id;
  }

  // Second fallback: look up by paddle_customer_id.
  const customerId =
    typeof data.customer_id === 'string' ? data.customer_id :
    typeof (data.customer as Record<string, unknown> | undefined)?.id === 'string'
      ? (data.customer as Record<string, unknown>).id as string
      : null;

  if (customerId) {
    const { data: row } = await supabase
      .from('subscriptions')
      .select('clerk_user_id')
      .eq('paddle_customer_id', customerId)
      .maybeSingle();
    if (row?.clerk_user_id) return row.clerk_user_id;
  }

  return null;
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('paddle-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Paddle signature' }, { status: 400 });
  }

  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[paddle-webhook] PADDLE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  if (!verifyPaddleSignature({ rawBody: body, signatureHeader: signature, webhookSecret })) {
    console.warn('[paddle-webhook] Signature verification failed');
    return NextResponse.json({ error: 'Invalid Paddle signature' }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const eventType = typeof payload.event_type === 'string' ? payload.event_type : '';
  const eventId = typeof payload.notification_id === 'string' ? payload.notification_id : null;
  const data = (payload.data || {}) as Record<string, unknown>;

  // ─── Idempotency: skip already-processed events ──────────────────────────
  // We log event IDs to prevent duplicate credit grants from webhook retries.
  const supabase = getSupabaseAdminClient();

  if (eventId) {
    const { data: existing } = await supabase
      .from('webhook_events')
      .select('id')
      .eq('event_id', eventId)
      .maybeSingle();

    if (existing) {
      console.log(`[paddle-webhook] Duplicate event skipped: ${eventId}`);
      return NextResponse.json({ success: true, duplicate: true });
    }

    // Record event ID before processing to prevent concurrent duplicates.
    await supabase.from('webhook_events').insert({ event_id: eventId, event_type: eventType });
  }

  console.log(`[paddle-webhook] Processing: ${eventType} (${eventId ?? 'no-id'})`);

  try {
    switch (eventType) {
      // ─── Successful payment / subscription activation ───────────────────
      case 'transaction.completed':
      case 'transaction.paid':
      case 'subscription.created':
      case 'subscription.updated': {
        const customerId =
          typeof data.customer_id === 'string' ? data.customer_id :
          typeof (data.customer as Record<string, unknown> | undefined)?.id === 'string'
            ? (data.customer as Record<string, unknown>).id as string
            : null;

        const subscriptionId =
          eventType.startsWith('transaction.')
            ? typeof data.subscription_id === 'string' ? data.subscription_id : null
            : typeof data.id === 'string' ? data.id : null;

        const status = typeof data.status === 'string' ? data.status : 'active';
        const clerkUserId = await resolveClerkUserId(data, supabase);

        if (!clerkUserId) {
          console.error(`[paddle-webhook] Could not resolve clerk_user_id for ${eventType}`);
          return NextResponse.json({ error: 'Missing Clerk user mapping' }, { status: 400 });
        }

        const plan = resolvePlan((data.items as unknown[]) || []);
        if (!plan) {
          console.error(`[paddle-webhook] Unknown price ID in event ${eventType}`);
          return NextResponse.json({ error: 'Unknown Paddle price id' }, { status: 400 });
        }

        const { error: subError } = await supabase.from('subscriptions').upsert(
          { clerk_user_id: clerkUserId, paddle_customer_id: customerId, paddle_subscription_id: subscriptionId, plan, status },
          { onConflict: 'clerk_user_id' }
        );
        if (subError) {
          console.error('[paddle-webhook] Subscription upsert failed:', subError);
          return NextResponse.json({ error: 'Subscription sync failed' }, { status: 500 });
        }

        // On subscription.updated (renewal or plan change), reset monthly credits.
        // On transaction.paid for one-time starter pack, activate credits.
        const { error: creditError } = await supabase.from('credits').upsert(
          { clerk_user_id: clerkUserId, plan, credits_total: CREDITS_BY_PLAN[plan], credits_used: 0, credits_remaining: CREDITS_BY_PLAN[plan] },
          { onConflict: 'clerk_user_id' }
        );
        if (creditError) {
          console.error('[paddle-webhook] Credits upsert failed:', creditError);
          return NextResponse.json({ error: 'Credit sync failed' }, { status: 500 });
        }

        console.log(`[paddle-webhook] Activated plan=${plan} credits=${CREDITS_BY_PLAN[plan]} for user=${clerkUserId}`);
        break;
      }

      // ─── Subscription cancellation ──────────────────────────────────────
      case 'subscription.canceled': {
        const clerkUserId = await resolveClerkUserId(data, supabase);

        if (!clerkUserId) {
          console.error('[paddle-webhook] Could not resolve clerk_user_id for cancellation');
          return NextResponse.json({ error: 'Missing Clerk user mapping' }, { status: 400 });
        }

        await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('clerk_user_id', clerkUserId);

        await supabase
          .from('credits')
          .update({ plan: 'free', credits_total: 5, credits_used: 0, credits_remaining: 5 })
          .eq('clerk_user_id', clerkUserId);

        console.log(`[paddle-webhook] Canceled subscription for user=${clerkUserId}`);
        break;
      }

      // ─── Payment failure — mark subscription past_due, preserve access ──
      case 'transaction.payment_failed':
      case 'subscription.payment_failed': {
        const clerkUserId = await resolveClerkUserId(data, supabase);

        if (!clerkUserId) {
          console.warn('[paddle-webhook] Could not resolve user for payment failure');
          break; // Paddle will retry; log but don't block
        }

        await supabase
          .from('subscriptions')
          .update({ status: 'past_due' })
          .eq('clerk_user_id', clerkUserId);

        console.warn(`[paddle-webhook] Payment failed for user=${clerkUserId} — subscription marked past_due`);
        break;
      }

      // ─── Refund — restore to free tier ──────────────────────────────────
      case 'transaction.refunded': {
        const clerkUserId = await resolveClerkUserId(data, supabase);

        if (!clerkUserId) {
          console.warn('[paddle-webhook] Could not resolve user for refund');
          break;
        }

        await supabase
          .from('subscriptions')
          .update({ status: 'refunded' })
          .eq('clerk_user_id', clerkUserId);

        await supabase
          .from('credits')
          .update({ plan: 'free', credits_total: 5, credits_used: 0, credits_remaining: 5 })
          .eq('clerk_user_id', clerkUserId);

        console.log(`[paddle-webhook] Refund processed for user=${clerkUserId}`);
        break;
      }

      default:
        console.log(`[paddle-webhook] Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[paddle-webhook] Unhandled error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
