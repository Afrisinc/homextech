/**
 * Supabase access boundary.
 *
 * The public website does not require Supabase to run. When credentials are
 * present the REST endpoint is used directly (no extra client dependency);
 * when they are absent every writer degrades gracefully to a local, in-memory
 * store so forms still validate and respond correctly in development.
 *
 * Only the service-role key is used, and only inside server-side code paths.
 * It is never imported into a client component.
 */

import "server-only";

export interface SupabaseConfig {
  url: string;
  serviceKey: string;
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !serviceKey) return null;
  return { url: url.replace(/\/$/, ""), serviceKey };
}

export function isSupabaseConfigured() {
  return getSupabaseConfig() !== null;
}

/**
 * Insert a row through the Supabase REST API.
 * Returns the created row id, or throws with a redacted message.
 */
export async function insertRow<T extends Record<string, unknown>>(
  table: string,
  row: T,
): Promise<{ id: string }> {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase is not configured");

  const response = await fetch(
    `${config.url}/rest/v1/${encodeURIComponent(table)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: config.serviceKey,
        Authorization: `Bearer ${config.serviceKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(row),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    // Never surface provider internals to the client.
    throw new Error(`Storage rejected the record (${response.status})`);
  }

  const data = (await response.json()) as Array<{ id?: string }>;
  return { id: data?.[0]?.id ?? crypto.randomUUID() };
}
