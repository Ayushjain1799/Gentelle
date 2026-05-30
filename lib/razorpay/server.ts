import "server-only";
import crypto from "node:crypto";
import { serverEnv, isRazorpayConfigured } from "@/lib/env.server";

/**
 * Razorpay server integration via the REST API (no SDK dependency).
 *
 * - Orders are created server-side with secret Basic auth.
 * - Payment signatures are verified with HMAC-SHA256.
 * - Webhook payloads are verified against the webhook secret.
 *
 * The KEY_SECRET and WEBHOOK_SECRET never leave the server.
 */

const ORDERS_ENDPOINT = "https://api.razorpay.com/v1/orders";

export { isRazorpayConfigured };

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
};

/** Create a Razorpay order for the given amount (in paise). */
export async function createRazorpayOrder(params: {
  amountInPaise: number;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<RazorpayOrder> {
  if (!isRazorpayConfigured) {
    throw new Error("Razorpay is not configured");
  }

  const auth = Buffer.from(
    `${serverEnv.razorpayKeyId}:${serverEnv.razorpayKeySecret}`,
  ).toString("base64");

  const res = await fetch(ORDERS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amountInPaise,
      currency: "INR",
      receipt: params.receipt,
      notes: params.notes ?? {},
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Razorpay order creation failed (${res.status}): ${detail}`);
  }

  return (await res.json()) as RazorpayOrder;
}

/**
 * Verify a checkout payment signature.
 * Razorpay signs `${order_id}|${payment_id}` with the key secret.
 * Uses a timing-safe comparison.
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!isRazorpayConfigured) return false;

  const expected = crypto
    .createHmac("sha256", serverEnv.razorpayKeySecret)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");

  return timingSafeEqual(expected, params.signature);
}

/** Verify a Razorpay webhook signature against the raw request body. */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  if (!serverEnv.razorpayWebhookSecret) return false;

  const expected = crypto
    .createHmac("sha256", serverEnv.razorpayWebhookSecret)
    .update(rawBody)
    .digest("hex");

  return timingSafeEqual(expected, signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}
