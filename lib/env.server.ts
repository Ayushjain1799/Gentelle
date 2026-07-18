import "server-only";

/**
 * Server-only secret access. Importing this module from a Client Component
 * will throw at build time, preventing secrets from leaking to the browser.
 */

function read(name: string): string {
  return process.env[name] ?? "";
}

export const serverEnv = {
  supabaseUrl: read("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseServiceKey: read("SUPABASE_SERVICE_ROLE_KEY"),
  razorpayKeyId: read("NEXT_PUBLIC_RAZORPAY_KEY_ID"),
  razorpayKeySecret: read("RAZORPAY_KEY_SECRET"),
  razorpayWebhookSecret: read("RAZORPAY_WEBHOOK_SECRET"),
  contactNotifyEmail: read("CONTACT_NOTIFY_EMAIL") || "support@gentelleskincare.com",
} as const;

/** Whether Supabase persistence is wired up. */
export const isSupabaseConfigured = Boolean(
  serverEnv.supabaseUrl && serverEnv.supabaseServiceKey,
);

/** Whether Razorpay server-side processing is wired up. */
export const isRazorpayConfigured = Boolean(
  serverEnv.razorpayKeyId && serverEnv.razorpayKeySecret,
);
