import { describe, expect, it } from "vitest";
import { isValidEmail, requireEmail } from "@backend/lib/validation";
import { storeInquiry, validateInquiry } from "@backend/services/inquiry";
import { storeSubscriber, validateNewsletter } from "@backend/services/newsletter";

describe("validation", () => {
  it("accepts a well-formed email", () => {
    expect(isValidEmail("studio@example.com")).toBe(true);
  });

  it("rejects an incomplete email", () => {
    const errors: Record<string, string> = {};
    requireEmail("not-an-email", errors);
    expect(errors.email).toBe("Please enter a valid email address.");
  });
});

describe("inquiry service", () => {
  it("requires name, email, event type, and message", () => {
    const errors = validateInquiry({
      name: "",
      email: "",
      eventType: "",
      message: "",
    });

    expect(Object.keys(errors).sort()).toEqual([
      "email",
      "eventType",
      "message",
      "name",
    ]);
  });

  it("stores a valid inquiry with an id", () => {
    const record = storeInquiry({
      name: "Ada",
      email: "ada@example.com",
      eventType: "Wedding",
      message: "We are planning a celebration in Goa.",
    });

    expect(record.id).toBeTruthy();
    expect(record.receivedAt).toBeTruthy();
  });
});

describe("newsletter service", () => {
  it("rejects a missing email", () => {
    expect(validateNewsletter({ email: "" }).email).toBeTruthy();
  });

  it("deduplicates the same address", () => {
    const first = storeSubscriber({ email: "repeat@example.com" });
    const second = storeSubscriber({ email: "repeat@example.com" });
    expect(second.id).toBe(first.id);
  });
});
