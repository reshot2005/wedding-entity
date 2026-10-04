type JsonLd = Record<string, unknown> | Record<string, unknown>[];

export function StructuredData({ value }: { value: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(value).replace(/</g, "\\u003c"),
      }}
    />
  );
}
