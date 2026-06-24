/**
 * Supabase client for Enchiridion Learn.
 *
 * Uses @supabase/ssr's `createBrowserClient` and reads configuration from
 * environment variables ONLY — no hardcoded URLs or keys. Provide:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 * (see .env.local). The publishable/anon key is safe to ship to the browser;
 * what it can do is bounded by row-level security.
 *
 * When the env vars are absent the client factory returns `null` so the app
 * (which is a static export) still builds and runs — auth/waitlist features
 * simply no-op with a clear "not configured" result until the keys are set.
 */

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient, Session } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

/**
 * Returns the browser Supabase client (singleton), or `null` when the
 * environment is not configured.
 */
export function createClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (!client) client = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}

/** Returns the current auth session, or `null` (unauthenticated/unconfigured). */
export async function getSession(): Promise<Session | null> {
  const supabase = createClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}

// ---------------------------------------------------------------------------
// Waitlist / lead capture — preserved API.
//
// These remain part of the public surface because the landing + app already
// import them (WaitlistButton, MoreTab, validation forms). They now ride on
// the env-configured client above instead of a hardcoded fallback.
// ---------------------------------------------------------------------------

export type WaitlistResult =
  | { ok: true; duplicate?: boolean }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Insert an email into the public `waitlist` table. */
export async function joinWaitlist(
  email: string,
  source = "landing"
): Promise<WaitlistResult> {
  const trimmed = email.trim();
  if (!EMAIL_RE.test(trimmed)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const supabase = createClient();
  if (!supabase) return { ok: false, error: "Waitlist isn't configured yet." };

  const { error } = await supabase
    .from("waitlist")
    .insert({ email: trimmed, source });

  if (error) {
    // 23505 = unique violation → already on the list (treat as success).
    if (error.code === "23505") return { ok: true, duplicate: true };
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/**
 * Submit a richer validation lead (Early Access / Request an Expedition / beta).
 * Encodes structured answers into the `source` string so demand signal is
 * captured without a schema change.
 */
export async function submitLead(
  email: string,
  kind: string,
  meta: Record<string, string | undefined> = {}
): Promise<WaitlistResult> {
  const tags = Object.entries(meta)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}=${v!.trim().replace(/[·\n]/g, " ").slice(0, 80)}`);
  const source = [kind, ...tags].join(" · ").slice(0, 480);
  return joinWaitlist(email, source);
}
