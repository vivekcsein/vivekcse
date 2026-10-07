/**
 * validators.ts
 * --------------------------------------------------------------
 * Lightweight runtime type guards for general-purpose value checking —
 * NOT business validation rules (email format, password strength, etc.).
 * Those live in packages/configs/schema.config.ts and packages/schemas as
 * Zod schemas, which is the single source of truth for anything user
 * input needs to satisfy. Reach for a guard here when you need a quick
 * `unknown`-narrowing check in a utility function or conditional, not a
 * form field.
 */

/** `true` for `null` or `undefined` specifically — not `0`, `""`, or `false`. */
export const isNil = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

/** `true` for a non-array, non-null object — the shape `Record<string, unknown>` describes. */
export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * `true` for `null`/`undefined`, an empty string, an empty array, or an
 * object with no own enumerable keys. `0` and `false` are NOT empty —
 * this checks "nothing here", not "falsy".
 */
export const isEmpty = (value: unknown): boolean => {
  if (isNil(value)) return true;
  if (typeof value === "string" || Array.isArray(value))
    return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
};

/** Structural check for a well-formed URL string (uses the native `URL` constructor). */
export const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/** `true` if `value` is a finite number — excludes `NaN` and `Infinity`, unlike `typeof value === "number"`. */
export const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

/** `true` for a string that is non-empty after trimming (rejects `"   "`). */
export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

/** Narrow a value that's `string | null | undefined` down to a real string, or fall back. */
export const withDefault = <T>(value: T | null | undefined, fallback: T): T =>
  isNil(value) ? fallback : value;
