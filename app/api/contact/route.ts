import { contactSchema, firstError } from "@/lib/validation/schemas";
import { cleanText, cleanEmail, isHoneypotTripped } from "@/lib/security/sanitize";
import { rateLimit, clientIp } from "@/lib/security/rate-limit";
import { ok, fail, tooMany, withErrorHandling } from "@/lib/api/response";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { logger, redactEmail } from "@/lib/api/logger";

export const runtime = "nodejs";

export const POST = withErrorHandling(async (req: Request) => {
  const ip = clientIp(req);
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.success) return tooMany(limit.retryAfter);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body");
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return fail(firstError(parsed.error), 422);

  // Bot honeypot.
  if (isHoneypotTripped(parsed.data.company)) {
    return ok({ message: "Thanks for reaching out." });
  }

  const record = {
    name: cleanText(parsed.data.name, 80),
    email: cleanEmail(parsed.data.email),
    subject: cleanText(parsed.data.subject, 120) || null,
    message: cleanText(parsed.data.message, 2000),
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert(record);
    if (error) {
      logger.error("contact insert failed", { error: error.message });
      return fail("Could not send your message. Please try again.", 500);
    }
  } else {
    // Graceful degradation when DB is not configured.
    logger.info("contact submission (no DB configured)", {
      email: redactEmail(record.email),
    });
  }

  return ok({ message: "Thanks for reaching out. We'll be in touch soon." });
});
