import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { serverEnv, isSupabaseConfigured } from "@/lib/env.server";

/**
 * Server-side Supabase client using the service role key.
 * NEVER import this in a Client Component — the service key bypasses RLS.
 *
 * Returns null when Supabase is not configured, so the app degrades
 * gracefully (e.g. logs the submission) instead of crashing.
 */

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (cached) return cached;

  cached = createClient(serverEnv.supabaseUrl, serverEnv.supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export { isSupabaseConfigured };
