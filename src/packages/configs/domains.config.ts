/**
 * domains.config.ts
 * ------------------------------------------------------------------
 * Single source of truth for email domain policy.
 * Copy this file next to `schema.rules.ts` into any project — frontend
 * or backend — that needs consistent email validation.
 *
 * Three lists, three jobs:
 *   - allowedMailDomains     -> used ONLY by the whitelist-enforced
 *                               schema (`emailRestrictedRules`), for
 *                               projects that must gate signups to a
 *                               known set of providers/company domains
 *   - blacklistedMailDomains -> disposable/throwaway providers,
 *                               blocked in BOTH email schemas
 *   - blacklistedEmails      -> specific banned addresses (abuse,
 *                               chargebacks, manual flags), blocked
 *                               in BOTH email schemas
 * ------------------------------------------------------------------
 */

// Domains allowed when a project needs to RESTRICT signups to a known
// set of providers or a company domain (internal tools, gated beta,
// enterprise clients). Edit per project — this is intentionally not
// exhaustive.
export const allowedMailDomains: string[] = [
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "hotmail.com",
  "icloud.com",
  "proton.me",
];

// Disposable / temp-mail providers. Blocked everywhere, regardless of
// which email schema a project uses. Extend as new providers surface —
// this list can never be fully exhaustive, treat it as a first line
// of defense, not the only one.
export const blacklistedMailDomains: string[] = [
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "yopmail.com",
  "tempmail.com",
  "temp-mail.org",
  "trashmail.com",
  "getnada.com",
  "sharklasers.com",
  "dispostable.com",
  "maildrop.cc",
  "fakeinbox.com",
  "throwawaymail.com",
  "discard.email",
  "mintemail.com",
  "moakt.com",
];

// Specific addresses banned regardless of domain — populate from your
// own abuse reports, chargebacks, or manually flagged accounts.
// Comparisons are case-insensitive, so store lowercase for clarity.
export const blacklistedEmails: string[] = [
  // "known-abuser@gmail.com",
];

// ---- Helpers ----

const normalize = (value: string): string => value.trim().toLowerCase();

export const getEmailDomain = (email: string): string =>
  normalize(email).split("@")[1] ?? "";

export const isDomainAllowed = (domain: string): boolean =>
  allowedMailDomains.includes(normalize(domain));

export const isDomainBlacklisted = (domain: string): boolean =>
  blacklistedMailDomains.includes(normalize(domain));

export const isEmailBlacklisted = (email: string): boolean =>
  blacklistedEmails.includes(normalize(email));
