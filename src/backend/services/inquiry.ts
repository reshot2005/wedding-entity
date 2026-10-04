import {
  requireEmail,
  requireText,
  type FieldErrors,
} from "@backend/lib/validation";

export type InquiryPayload = {
  name: string;
  email: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  message: string;
};

export type InquiryRecord = InquiryPayload & {
  id: string;
  receivedAt: string;
};

const inquiries: InquiryRecord[] = [];

export function validateInquiry(input: InquiryPayload) {
  const errors: FieldErrors = {};

  requireText(input.name, "Please share your name.", errors, "name");
  requireEmail(input.email, errors);
  requireText(input.eventType, "Please choose an inquiry type.", errors, "eventType");
  requireText(
    input.message,
    "Please tell us a little about your plans.",
    errors,
    "message",
  );

  return errors;
}

export function storeInquiry(input: InquiryPayload): InquiryRecord {
  const record: InquiryRecord = {
    ...input,
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
  };

  inquiries.unshift(record);
  return record;
}

export function listInquiries() {
  return inquiries;
}
