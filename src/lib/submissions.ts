import "server-only";

import { insertRow, isSupabaseConfigured } from "@/lib/supabase";
import { sanitize } from "@/lib/validation";
import type { SubmissionResult } from "@/types";

/**
 * Tables the future admin dashboard will read from.
 * Schema lives in `supabase/schema.sql`.
 */
export const TABLES = {
  inquiries: "contact_inquiries",
  consultations: "consultation_requests",
  trainingApplications: "training_applications",
  newsletter: "newsletter_subscribers",
} as const;

export type TableKey = keyof typeof TABLES;

/**
 * Development / unconfigured fallback store.
 * Deliberately in-memory: nothing sensitive is written to disk.
 */
const localStore = new Map<string, Array<Record<string, unknown>>>();

function storeLocally(table: string, row: Record<string, unknown>) {
  const id = crypto.randomUUID();
  const existing = localStore.get(table) ?? [];
  existing.push({ id, ...row });
  localStore.set(table, existing);
  return id;
}

export function readLocal(table: string) {
  return localStore.get(table) ?? [];
}

function scrub(row: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    out[key] = typeof value === "string" ? sanitize(value) : value;
  }
  return out;
}

/**
 * Single write path used by every form route handler.
 * Uses Supabase when configured, otherwise degrades to the local store so the
 * public site keeps working without credentials.
 */
export async function recordSubmission(
  key: TableKey,
  payload: Record<string, unknown>,
): Promise<SubmissionResult> {
  const table = TABLES[key];
  const row = {
    ...scrub(payload),
    created_at: new Date().toISOString(),
    source: "website",
  };

  if (!isSupabaseConfigured()) {
    return { ok: true, id: storeLocally(table, row), persisted: "local" };
  }

  try {
    const { id } = await insertRow(table, row);
    return { ok: true, id, persisted: "supabase" };
  } catch (error) {
    console.error(`[submissions] ${table} write failed`, error);
    // Do not lose the enquiry: keep it in the local store for this process.
    return { ok: true, id: storeLocally(table, row), persisted: "local" };
  }
}
