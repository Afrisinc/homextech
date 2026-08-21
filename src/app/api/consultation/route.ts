import { NextResponse } from "next/server";

import { recordSubmission } from "@/lib/submissions";
import { consultationSchema, toFieldErrors } from "@/lib/validation";

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

  const parsed = consultationSchema.safeParse(body);

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

  if (parsed.data.website) {
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  const { website: _honeypot, ...payload } = parsed.data;
  void _honeypot;

  const result = await recordSubmission("consultations", payload);

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "We could not record your request. Please email us instead.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: result.id });
}
