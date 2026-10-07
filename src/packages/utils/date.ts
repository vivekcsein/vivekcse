/**
 * date.ts
 * --------------------------------------------------------------
 * Date formatting helpers built on the native `Intl` API — no date
 * library dependency (date-fns, dayjs) added for this. Every function
 * takes `Date | string | number` since API responses usually hand back
 * ISO strings, not `Date` instances.
 */

type DateInput = Date | string | number;

const toDate = (input: DateInput): Date =>
  input instanceof Date ? input : new Date(input);

/** e.g. "Jul 13, 2026" */
export const formatDate = (input: DateInput, locale = "en-US"): string =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(toDate(input));

/** e.g. "Jul 13, 2026, 4:05 PM" */
export const formatDateTime = (input: DateInput, locale = "en-US"): string =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(toDate(input));

/** e.g. "4:05 PM" */
export const formatTime = (input: DateInput, locale = "en-US"): string =>
  new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
  }).format(toDate(input));

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
  ["second", 1],
];

/**
 * e.g. "3 hours ago", "in 2 days" — for timestamps (comments, activity
 * feeds, "last updated"). For anything older than a year, prefer
 * `formatDate` instead; a bare relative string stops being useful past
 * that point.
 */
export const formatRelativeTime = (
  input: DateInput,
  locale = "en-US",
): string => {
  const date = toDate(input);
  const diffSeconds = (date.getTime() - Date.now()) / 1000;
  const absSeconds = Math.abs(diffSeconds);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  for (const [unit, secondsInUnit] of RELATIVE_UNITS) {
    if (absSeconds >= secondsInUnit || unit === "second") {
      const value = Math.round(diffSeconds / secondsInUnit);
      return rtf.format(value, unit);
    }
  }

  return rtf.format(0, "second");
};

/** Type guard: `true` for a `Date` (or date-like string/number) that parses to a real date. */
export const isValidDate = (input: unknown): boolean => {
  if (input instanceof Date) return !Number.isNaN(input.getTime());
  if (typeof input === "string" || typeof input === "number") {
    return !Number.isNaN(new Date(input).getTime());
  }
  return false;
};

/** Whether `input` falls on today's calendar date, in the local timezone. */
export const isToday = (input: DateInput): boolean => {
  const date = toDate(input);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};
