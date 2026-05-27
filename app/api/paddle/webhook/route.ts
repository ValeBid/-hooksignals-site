import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get("paddle-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Paddle signature" },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Webhook secret missing" },
        { status: 500 }
      );
    }

    const payload = JSON.parse(body);
    const eventType = payload?.event_type;

    switch (eventType) {
      case "transaction.completed":
      case "transaction.paid":
      case "subscription.created":
      case "subscription.updated":
      case "subscription.canceled":
      case "subscription.past_due":
        console.log("Paddle event received:", eventType);
        break;

      default:
        console.log("Unhandled Paddle event:", eventType);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Paddle webhook error:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
