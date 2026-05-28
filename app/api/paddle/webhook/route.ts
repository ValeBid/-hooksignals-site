import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { verifyPaddleSignature } from '../../../lib/paddle';

const creditsByPlan: Record<string, number> = {
  starter: 250,
  pro: 2000,
  elite: 10000,
};

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get('paddle-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing Paddle signature' },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook secret missing' },
        { status: 500 }
      );
    }

    if (!verifyPaddleSignature({ rawBody: body, signatureHeader: signature, webhookSecret })) {
      return NextResponse.json(
        { error: 'Invalid Paddle signature' },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);
    const eventType = payload?.event_type;
    const data = payload?.data;

    switch (eventType) {
      case 'transaction.completed':
      case 'transaction.paid':
      case 'subscription.created':
      case 'subscription.updated': {
        const customerId = data?.customer_id || null;
        const subscriptionId = data?.id || null;
        const status = data?.status || 'active';

        const customData = data?.custom_data || {};
        const clerkUserId = customData.clerk_user_id;

        if (!clerkUserId) {
          return NextResponse.json(
            { error: 'Missing Clerk user mapping' },
            { status: 400 }
          );
        }

        const priceId = data?.items?.[0]?.price?.id || '';

        let plan = 'starter';

        if (priceId === 'pri_01ksnn757pd4582jcvn8g0g165') {
          plan = 'elite';
        } else if (priceId === 'pri_01ksnnbh8fc2452se12nr37tmz') {
          plan = 'pro';
        } else if (priceId !== 'pri_01ksqr6vp07e48ktwm6x5jzw1y') {
          return NextResponse.json(
            { error: 'Unknown Paddle price id' },
            { status: 400 }
          );
        }

        await supabase.from('subscriptions').upsert(
          {
            clerk_user_id: clerkUserId,
            paddle_customer_id: customerId,
            paddle_subscription_id: subscriptionId,
            plan,
            status,
          },
          {
            onConflict: 'clerk_user_id',
          }
        );

        await supabase.from('credits').upsert(
          {
            clerk_user_id: clerkUserId,
            plan,
            credits_total: creditsByPlan[plan],
            credits_used: 0,
            credits_remaining: creditsByPlan[plan],
          },
          {
            onConflict: 'clerk_user_id',
          }
        );

        break;
      }

      case 'subscription.canceled': {
        const customData = data?.custom_data || {};
        const clerkUserId = customData.clerk_user_id;

        if (!clerkUserId) {
          return NextResponse.json(
            { error: 'Missing Clerk user mapping' },
            { status: 400 }
          );
        }

        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
          })
          .eq('clerk_user_id', clerkUserId);

        break;
      }

      default:
        console.log('Unhandled Paddle event:', eventType);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Paddle webhook error:', error);

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
