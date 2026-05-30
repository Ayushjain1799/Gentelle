import { createOrderSchema, firstError } from "@/lib/validation/schemas";
import { cleanText, cleanEmail } from "@/lib/security/sanitize";
import { rateLimit, clientIp } from "@/lib/security/rate-limit";
import { ok, fail, tooMany, withErrorHandling } from "@/lib/api/response";
import { getProduct } from "@/lib/products";
import { createRazorpayOrder, isRazorpayConfigured } from "@/lib/razorpay/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { serverEnv } from "@/lib/env.server";
import { logger } from "@/lib/api/logger";

export const runtime = "nodejs";

export const POST = withErrorHandling(async (req: Request) => {
  const ip = clientIp(req);
  const limit = rateLimit(`order:${ip}`, 10, 60_000);
  if (!limit.success) return tooMany(limit.retryAfter);

  if (!isRazorpayConfigured) {
    return fail("Payments are not available yet. Please check back soon.", 503);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body");
  }

  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) return fail(firstError(parsed.error), 422);

  // Re-price everything on the server. Client-supplied prices are ignored.
  const lineItems = [];
  for (const item of parsed.data.items) {
    const product = getProduct(item.productId);
    if (!product) return fail(`Unknown product: ${item.productId}`, 404);
    if (product.status !== "available" || product.priceInPaise == null) {
      return fail(`${product.name} is not available for purchase yet.`, 409);
    }
    lineItems.push({
      productId: product.id,
      name: product.name,
      quantity: item.quantity,
      priceInPaise: product.priceInPaise,
    });
  }

  const amount = lineItems.reduce((sum, i) => sum + i.priceInPaise * i.quantity, 0);
  if (amount <= 0) return fail("Cart total is invalid", 422);

  const receipt = `gentelle_${Date.now().toString(36)}`;

  const rzpOrder = await createRazorpayOrder({
    amountInPaise: amount,
    receipt,
    notes: { email: cleanEmail(parsed.data.customer.email) },
  });

  // Persist a pending order (best-effort; payment still works without DB).
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("orders").insert({
      razorpay_order_id: rzpOrder.id,
      amount,
      currency: "INR",
      status: "created",
      items: lineItems,
      customer_name: cleanText(parsed.data.customer.name, 80),
      customer_email: cleanEmail(parsed.data.customer.email),
      customer_phone: cleanText(parsed.data.customer.phone, 15),
    });
    if (error) logger.error("order insert failed", { error: error.message });
  }

  return ok({
    orderId: rzpOrder.id,
    amount,
    currency: "INR",
    keyId: serverEnv.razorpayKeyId,
  });
});
