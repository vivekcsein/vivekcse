/**
 * format.ts
 * --------------------------------------------------------------
 * Display-formatting helpers for numbers, currency, and text — the
 * "make raw data presentable in JSX" layer. Validation (is this a valid
 * email?) belongs in validators.ts / packages/schemas instead; this file
 * only ever transforms already-valid data for display.
 */

/** e.g. formatNumber(12345.6) -> "12,345.6" */
export const formatNumber = (value: number, locale = "en-US"): string =>
  new Intl.NumberFormat(locale).format(value);

/** e.g. formatCurrency(49.9, "USD") -> "$49.90" */
export const formatCurrency = (
  value: number,
  currency = "USD",
  locale = "en-US",
): string =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

/** e.g. formatPercent(0.42) -> "42%" */
export const formatPercent = (value: number, locale = "en-US"): string =>
  new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value);

/** e.g. formatCompactNumber(1250) -> "1.3K" */
export const formatCompactNumber = (value: number, locale = "en-US"): string =>
  new Intl.NumberFormat(locale, { notation: "compact" }).format(value);

const FILE_SIZE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

/** e.g. formatFileSize(1536000) -> "1.5 MB" */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    FILE_SIZE_UNITS.length - 1,
  );

  const value = bytes / 1024 ** exponent;

  return `${exponent === 0 ? value : value.toFixed(1)} ${FILE_SIZE_UNITS[exponent]}`;
};

/** Truncate to `maxLength` characters, appending an ellipsis only if truncation actually happened. */
export const truncateText = (text: string, maxLength: number): string =>
  text.length <= maxLength ? text : `${text.slice(0, maxLength).trimEnd()}…`;

/** e.g. toTitleCase("hello world") -> "Hello World" */
export const toTitleCase = (text: string): string =>
  text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );

/** e.g. getInitials("") -> "VK" (first letter of the first two words) */
export const getInitials = (fullName: string, maxInitials = 2): string =>
  fullName
    .trim()
    .split(/\s+/)
    .slice(0, maxInitials)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

export const formatReadingTime = (minutes: number): string =>
  `${minutes} min read`;
