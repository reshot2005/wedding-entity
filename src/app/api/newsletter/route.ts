import { NextResponse } from "next/server";
import {
  storeSubscriber,
  validateNewsletter,
} from "@backend/services/newsletter";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { email?: unknown };
  const email = typeof body.email === "string" ? body.email : "";
  const fieldErrors = validateNewsletter({ email });

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Please enter a valid email address.", fieldErrors },
      { status: 400 },
    );
  }

  const record = storeSubscriber({ email });
  return NextResponse.json({ ok: true, id: record.id });
}
