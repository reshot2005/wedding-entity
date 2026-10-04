import { NextResponse } from "next/server";
import {
  storeInquiry,
  validateInquiry,
  type InquiryPayload,
} from "@backend/services/inquiry";

function readText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<InquiryPayload>;
  const payload: InquiryPayload = {
    name: readText(body.name),
    email: readText(body.email),
    eventType: readText(body.eventType),
    eventDate: readText(body.eventDate),
    location: readText(body.location),
    message: readText(body.message),
  };

  const fieldErrors = validateInquiry(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Please complete the required fields.", fieldErrors },
      { status: 400 },
    );
  }

  const record = storeInquiry(payload);
  return NextResponse.json({ ok: true, id: record.id });
}
