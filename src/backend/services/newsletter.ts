import { requireEmail, type FieldErrors } from "@backend/lib/validation";

export type NewsletterPayload = {
  email: string;
};

export type NewsletterRecord = NewsletterPayload & {
  id: string;
  subscribedAt: string;
};

const subscribers: NewsletterRecord[] = [];

export function validateNewsletter(input: NewsletterPayload) {
  const errors: FieldErrors = {};
  requireEmail(input.email, errors);
  return errors;
}

export function storeSubscriber(input: NewsletterPayload): NewsletterRecord {
  const existing = subscribers.find(
    (entry) => entry.email.toLowerCase() === input.email.trim().toLowerCase(),
  );

  if (existing) return existing;

  const record: NewsletterRecord = {
    email: input.email.trim(),
    id: crypto.randomUUID(),
    subscribedAt: new Date().toISOString(),
  };

  subscribers.unshift(record);
  return record;
}

export function listSubscribers() {
  return subscribers;
}
