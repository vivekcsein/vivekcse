/**
 * cookies.ts
 * --------------------------------------------------------------
 * Client-side cookie helpers (parses/writes `document.cookie`).
 *
 * These are for browser-readable cookies only — theme preference,
 * consent banners, feature flags, anything non-sensitive. Session/auth
 * cookies (httpOnly, server-set) are Stage 11's job and are read via
 * `next/headers` on the server, never through this file — an httpOnly
 * cookie is invisible to `document.cookie` by design.
 *
 * Every function guards against SSR (`document` doesn't exist yet during
 * server rendering) by returning a safe default instead of throwing.
 */

type CookieOptions = {
  /** Days until expiry. Omit for a session cookie (cleared when the browser closes). */
  days?: number;
  path?: string;
  sameSite?: "Strict" | "Lax" | "None";
  /** Defaults to true outside localhost — set explicitly to override. */
  secure?: boolean;
};

/** Read a single cookie by name. Returns `null` if missing or during SSR. */
export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${encodeURIComponent(name)}=`));

  if (!match) return null;

  const [, ...rest] = match.split("=");
  const value = rest.join("=");
  return value ? decodeURIComponent(value) : null;
};

/** Write a cookie. No-op during SSR. */
export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {},
): void => {
  if (typeof document === "undefined") return;

  const { days, path = "/", sameSite = "Lax", secure } = options;

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}; SameSite=${sameSite}`;

  if (days) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    cookie += `; expires=${expires.toUTCString()}`;
  }

  const isSecure =
    secure ??
    (typeof location !== "undefined" && location.protocol === "https:");
  if (isSecure) cookie += "; Secure";

  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API isn't supported in Safari yet; document.cookie is the cross-browser choice for a general-purpose utility
  document.cookie = cookie;
};

/** Remove a cookie by name (sets it expired in the past). No-op during SSR. */
export const removeCookie = (name: string, path = "/"): void => {
  if (typeof document === "undefined") return;
  // biome-ignore lint/suspicious/noDocumentCookie: same reasoning as setCookie above
  document.cookie = `${encodeURIComponent(name)}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

/** Whether a cookie exists. */
export const hasCookie = (name: string): boolean => getCookie(name) !== null;
