import crypto from "crypto";

export function verifyPaddleSignature({
  rawBody,
  signatureHeader,
  webhookSecret,
}: {
  rawBody: string;
  signatureHeader: string;
  webhookSecret: string;
}) {
  const parts = Object.fromEntries(
    signatureHeader.split(";").map((part) => {
      const [key, value] = part.split("=");
      return [key, value];
    })
  );

  const timestamp = parts.ts;
  const receivedSignature = parts.h1;

  if (!timestamp || !receivedSignature) {
    return false;
  }

  const signedPayload = `${timestamp}:${rawBody}`;
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(signedPayload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(receivedSignature, "hex"),
    Buffer.from(expectedSignature, "hex")
  );
}

export function normalizePaddleEvent(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return { eventType: undefined, data: undefined };
  }

  const event = payload as { event_type?: string; data?: unknown };

  return {
    eventType: event.event_type,
    data: event.data,
  };
}
