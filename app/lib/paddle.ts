import crypto from "crypto";

// Reject webhooks older than 5 minutes to prevent replay attacks.
const MAX_WEBHOOK_AGE_MS = 5 * 60 * 1000;

export function verifyPaddleSignature({
  rawBody,
  signatureHeader,
  webhookSecret,
}: {
  rawBody: string;
  signatureHeader: string;
  webhookSecret: string;
}): boolean {
  const parts = Object.fromEntries(
    signatureHeader.split(";").map((part) => {
      const eqIdx = part.indexOf("=");
      return eqIdx === -1 ? [part, ""] : [part.slice(0, eqIdx), part.slice(eqIdx + 1)];
    })
  );

  const timestamp = parts.ts;
  const receivedSignature = parts.h1;

  if (!timestamp || !receivedSignature) return false;

  // Timestamp replay protection.
  const tsSeconds = parseInt(timestamp, 10);
  if (!Number.isFinite(tsSeconds)) return false;
  const ageMs = Date.now() - tsSeconds * 1000;
  if (ageMs > MAX_WEBHOOK_AGE_MS || ageMs < -30_000) {
    console.warn(`[paddle] Rejecting webhook: timestamp age ${ageMs}ms exceeds window`);
    return false;
  }

  const signedPayload = `${timestamp}:${rawBody}`;
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(signedPayload)
    .digest("hex");

  try {
    // timingSafeEqual requires equal-length buffers — hex strings are always the same length for the same HMAC.
    return crypto.timingSafeEqual(
      Buffer.from(receivedSignature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

export function normalizePaddleEvent(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return { eventType: undefined, data: undefined };
  }
  const event = payload as { event_type?: string; data?: unknown };
  return { eventType: event.event_type, data: event.data };
}
