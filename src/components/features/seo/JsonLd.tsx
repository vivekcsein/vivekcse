type JsonLdProps = {
  /** Any JSON-serialisable schema.org object. */
  data: Record<string, unknown>;
};

/**
 * Renders structured data as `<script type="application/ld+json">` without
 * React's raw-HTML escape hatch: the JSON goes in as the script's text child.
 *
 * `<` is escaped to `\u003c` so a value containing "</script>" can never
 * close the tag early (still valid JSON, identical when parsed). The block is
 * data, not code, so a script-src CSP does not apply to it.
 */
export const JsonLd = ({ data }: JsonLdProps) => (
  <script type="application/ld+json">
    {JSON.stringify(data).replace(/</g, "\\u003c")}
  </script>
);
