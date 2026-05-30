import { waitlistSchema, firstError } from "@/lib/validation/schemas";
import { cleanEmail, isHoneypotTripped } from "@/lib/security/sanitize";
import { rateLimit, clientIp } from "@/lib/security/rate-limit";
import { ok, fail, tooMany, withErrorHandling } from "@/lib/api/response";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getProduct } from "@/lib/products";
import { logger, redactEmail } from "@/lib/api/logger";

export const runtime = "nodejs";

export const POST = withErrorHandling(async (req: Request) => {
  const ip = clientIp(req);
  const limit = rateLimit(`waitlist:${ip}`, 8, 60_000);
  if (!limit.success) return tooMany(limit.retryAfter);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body");
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) return fail(firstError(parsed.error), 422);

  if (isHoneypotTripped(parsed.data.company)) {
    return ok({ message: "You're on the list." });
  }

  // Accept the general newsletter key, or any real product id.
  const isNewsletter = parsed.data.productId === "newsletter";
  const product = isNewsletter ? null : getProduct(parsed.data.productId);
  if (!isNewsletter && !product) return fail("Unknown product", 404);

  const productId = isNewsletter ? "newsletter" : product!.id;
  const successName = isNewsletter ? "Gentelle" : product!.name;

  const record = {
    email: cleanEmail(parsed.data.email),
    product_id: productId,
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    // upsert-on-conflict so re-submitting the same email is idempotent.
    const { error } = await supabase
      .from("waitlist")
      .upsert(record, { onConflict: "email,product_id", ignoreDuplicates: true });
    if (error) {
      logger.error("waitlist insert failed", { error: error.message });
      return fail("Could not add you to the list. Please try again.", 500);
    }
  } else {
    logger.info("waitlist signup (no DB configured)", {
      email: redactEmail(record.email),
      productId: record.product_id,
    });
  }

  return ok({ message: `You're on the list for ${successName}.` });
});
