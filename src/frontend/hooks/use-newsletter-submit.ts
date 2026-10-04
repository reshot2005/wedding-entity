import { useState, type FormEvent } from "react";
import { postJson } from "@frontend/lib/api";

export function useNewsletterSubmit() {
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    if (!email) {
      setStatus("Please enter your email address.");
      return;
    }

    setPending(true);
    const result = await postJson<{ ok: true }>("/api/newsletter", { email });
    setPending(false);

    if (!result.ok) {
      setStatus(result.error);
      return;
    }

    form.reset();
    setStatus("You are on the list. Thank you.");
  }

  return { submit, status, pending };
}
