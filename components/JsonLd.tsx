/**
 * Renders a JSON-LD structured data script.
 * Escapes `<` to its unicode form to prevent XSS via injected strings,
 * per the Next.js JSON-LD guidance.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
