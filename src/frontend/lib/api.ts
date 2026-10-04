export type ApiResult<T> = {
  ok: true;
  data: T;
} | {
  ok: false;
  error: string;
  fieldErrors?: Record<string, string>;
};

export async function postJson<T>(
  url: string,
  body: unknown,
): Promise<ApiResult<T>> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    error?: string;
    fieldErrors?: Record<string, string>;
  } & T;

  if (!response.ok) {
    return {
      ok: false,
      error: payload.error ?? "Request failed.",
      fieldErrors: payload.fieldErrors,
    };
  }

  return { ok: true, data: payload };
}
