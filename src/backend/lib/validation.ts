export function isPresent(value: string) {
  return value.trim().length > 0;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export type FieldErrors = Record<string, string>;

export function requireText(
  value: string,
  message: string,
  errors: FieldErrors,
  field: string,
) {
  if (!isPresent(value)) errors[field] = message;
}

export function requireEmail(
  value: string,
  errors: FieldErrors,
  field = "email",
) {
  if (!isPresent(value)) {
    errors[field] = "Please share your email address.";
    return;
  }

  if (!isValidEmail(value)) {
    errors[field] = "Please enter a valid email address.";
  }
}
