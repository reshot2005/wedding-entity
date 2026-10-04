"use client";

import { useState, type FormEvent } from "react";
import { postJson } from "@frontend/lib/api";
import styles from "./interior.module.css";

type InquiryFields = "name" | "email" | "eventType" | "message";
type Errors = Partial<Record<InquiryFields, string>>;

export function InquiryForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      eventType: String(data.get("eventType") ?? "").trim(),
      eventDate: String(data.get("eventDate") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const nextErrors: Errors = {};

    if (!payload.name) nextErrors.name = "Please share your name.";
    if (!payload.email) {
      nextErrors.email = "Please share your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!payload.eventType) nextErrors.eventType = "Please choose an inquiry type.";
    if (!payload.message) {
      nextErrors.message = "Please tell us a little about your plans.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstError = Object.keys(nextErrors)[0] as InquiryFields;
      window.requestAnimationFrame(() => {
        const field = form.elements.namedItem(firstError);
        if (field instanceof HTMLElement) field.focus();
      });
      return;
    }

    setPending(true);
    const result = await postJson<{ ok: true }>("/api/inquiry", payload);
    setPending(false);

    if (!result.ok) {
      if (result.fieldErrors) {
        setErrors(result.fieldErrors as Errors);
      }
      setStatus(result.error);
      return;
    }

    form.reset();
    setStatus("Thank you. Your inquiry has been received.");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="inquiry-name">
          Name
        </label>
        <input
          className={styles.input}
          id="inquiry-name"
          name="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? (
          <span className={styles.error} id="name-error">
            {errors.name}
          </span>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="inquiry-email">
          Email
        </label>
        <input
          className={styles.input}
          id="inquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <span className={styles.error} id="email-error">
            {errors.email}
          </span>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="inquiry-type">
          Inquiry type
        </label>
        <select
          className={styles.select}
          id="inquiry-type"
          name="eventType"
          defaultValue=""
          aria-invalid={Boolean(errors.eventType)}
          aria-describedby={errors.eventType ? "type-error" : undefined}
        >
          <option value="" disabled>
            Select one
          </option>
          <option>Wedding photography</option>
          <option>Editorial or portrait commission</option>
          <option>Education</option>
          <option>Print or licensing</option>
          <option>Other</option>
        </select>
        {errors.eventType ? (
          <span className={styles.error} id="type-error">
            {errors.eventType}
          </span>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="inquiry-date">
          Event date
        </label>
        <input
          className={styles.input}
          id="inquiry-date"
          name="eventDate"
          type="date"
        />
      </div>

      <div className={styles.fieldWide}>
        <label className={styles.label} htmlFor="inquiry-location">
          Location
        </label>
        <input
          className={styles.input}
          id="inquiry-location"
          name="location"
          autoComplete="address-level2"
          placeholder="City, venue, or destination"
        />
      </div>

      <div className={styles.fieldWide}>
        <label className={styles.label} htmlFor="inquiry-message">
          Tell us about your plans
        </label>
        <textarea
          className={styles.textarea}
          id="inquiry-message"
          name="message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <span className={styles.error} id="message-error">
            {errors.message}
          </span>
        ) : null}
      </div>

      <p className={styles.formNote}>
        Your note is sent to the studio. We reply by email.
      </p>
      <button className={styles.button} type="submit" disabled={pending}>
        {pending ? "Sending" : "Send inquiry"}
      </button>

      {status ? (
        <p className={styles.status} role="status">
          {status}
        </p>
      ) : null}
    </form>
  );
}
