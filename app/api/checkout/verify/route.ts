import { verifyPaymentSchema, firstError } from "@/lib/validation/schemas";
import { rateLimit, clientIp } from "@/lib/security/rate-limit";
import { ok, fail, tooMany, withErrorHandling } from "@/lib/api/response";
import { verifyPaymentSignature, isRazorpayConfigured } from "@/lib/razorpay/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { logger } from "@/lib/api/logger";

export const runtime = "nodejs";

export const POST = withErrorHandling(async (req: Request) => {
  const ip = clientIp(req);
  const limit = rateLimit(`verify:${ip}`, 15, 60_000);
  if (!limit.success) return tooMany(limit.retryAfter);

  if (!isRazorpayConfigured) return fail("Payments are not available.", 503);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body");
  }

  const parsed = verifyPaymentSchema.safeParse(body);
  if (!parsed.success) return fail(firstError(parsed.error), 422);

  const valid = verifyPaymentSignature({
    orderId: parsed.data.razorpay_order_id,
    paymentId: parsed.data.razorpay_payment_id,
    signature: parsed.data.razorpay_signature,
  });

  if (!valid) {
    logger.warn("payment signature mismatch", {
      orderId: parsed.data.razorpay_order_id,
    });
    return fail("Payment verification failed", 400);
  }

  // Mark the order paid (best-effort; signature is the source of truth).
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase
      .from("orders")
      .update({
        status: "paid",
        razorpay_payment_id: parsed.data.razorpay_payment_id,
      })
      .eq("razorpay_order_id", parsed.data.razorpay_order_id);
    if (error) logger.error("order update failed", { error: error.message });
  }

  logger.info("payment verified", { orderId: parsed.data.razorpay_order_id });
  return ok({ message: "Payment verified" });
});
