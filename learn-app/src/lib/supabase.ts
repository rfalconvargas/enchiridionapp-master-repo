import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Public Supabase config.
 *
 * The publishable (anon) key is SAFE to ship in the browser — it only grants
 * what row-level security allows. The `waitlist` table policy lets anon INSERT
 * but not SELECT, so signups work and email addresses can't be read back.
 *
 * Override per environment with NEXT_PUBLIC_SUPABASE_URL /
 * NEXT_PUBLIC_SUPABASE_ANON_KEY (e.g. in Vercel) to rotate keys without a
 * code change. The hardcoded values are a working fallback so the waitlist
 * functions out of the box.
 */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://opbsfqblkixfppninyrx.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_FoeFBr5KGnZJ-OTbaR96tw_loZi3d6F";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (!client) client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}

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

  const supabase = getSupabase();
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
