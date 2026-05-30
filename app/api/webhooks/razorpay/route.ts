import { verifyWebhookSignature } from "@/lib/razorpay/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { logger } from "@/lib/api/logger";

export const runtime = "nodejs";

/**
 * Razorpay webhook receiver.
 *
 * Configure in the Razorpay dashboard → Settings → Webhooks:
 *   URL:    https://<your-domain>/api/webhooks/razorpay
 *   Events: payment.captured, payment.failed
 *   Secret: same value as RAZORPAY_WEBHOOK_SECRET
 *
 * We verify the signature against the RAW body before trusting anything.
 */
export async function POST(req: Request): Promise<Response> {
  const signature = req.headers.get("x-razorpay-signature");
  const rawBody = await req.text();

  if (!signature || !verifyWebhookSignature(rawBody, signature)) {
    logger.warn("razorpay webhook signature invalid");
    return new Response("invalid signature", { status: 400 });
  }

  let event: { event?: string; payload?: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("invalid payload", { status: 400 });
  }

  const orderId = extractOrderId(event);
  const supabase = getSupabaseAdmin();

  if (orderId && supabase) {
    if (event.event === "payment.captured") {
      await supabase.from("orders").update({ status: "paid" }).eq("razorpay_order_id", orderId);
    } else if (event.event === "payment.failed") {
      await supabase.from("orders").update({ status: "failed" }).eq("razorpay_order_id", orderId);
    }
  }

  logger.info("razorpay webhook processed", { event: event.event, orderId });
  // Always 200 once verified so Razorpay stops retrying.
  return new Response("ok", { status: 200 });
}

function extractOrderId(event: {
  payload?: Record<string, unknown>;
}): string | null {
  const payment = event.payload?.payment as
    | { entity?: { order_id?: string } }
    | undefined;
  return payment?.entity?.order_id ?? null;
}
