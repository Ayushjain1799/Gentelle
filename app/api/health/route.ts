import { isSupabaseConfigured, isRazorpayConfigured } from "@/lib/env.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lightweight health/readiness probe for uptime monitoring.
 * Reports whether integrations are wired — never exposes secret values.
 */
export async function GET(): Promise<Response> {
  return Response.json(
    {
      ok: true,
      status: "healthy",
      time: new Date().toISOString(),
      integrations: {
        supabase: isSupabaseConfigured,
        razorpay: isRazorpayConfigured,
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
