import { NextResponse } from "next/server";

import { recordSubmission } from "@/lib/submissions";
import { inquirySchema, toFieldErrors } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please correct the highlighted fields.",
        fieldErrors: toFieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  // Honeypot filled — accept silently so bots learn nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  const { website: _honeypot, ...payload } = parsed.data;
  void _honeypot;

  const result = await recordSubmission("inquiries", payload);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "We could not record your message. Please email us." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: result.id });
}
