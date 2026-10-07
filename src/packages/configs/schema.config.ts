import { z } from "zod";
import {
  allowedMailDomains,
  getEmailDomain,
  isDomainAllowed,
  isDomainBlacklisted,
  isEmailBlacklisted,
} from "./domains.config";

/**
 * schema.rules.ts
 * ------------------------------------------------------------------
 * Single source of truth for Zod validation rules — framework
 * agnostic, safe to import from a Next.js form, a Hono route, or
 * anywhere else Zod runs. Copy this file (and domains.config.ts)
 * into any project.
 *
 * Convention: every export is a field-level schema named `xRules`,
 * or a factory named `createXRules(...)` when the rule needs a
 * parameter (min age, max file size, etc). Compose them into request
 * schemas with z.object({ ... }) per endpoint — see USAGE EXAMPLES
 * at the bottom of this file.
 * ------------------------------------------------------------------
 */

//  SHARED MESSAGES
export const schemaMessages = {
  required: "This field is required",
  invalid: "Invalid value provided",

  // EMAIL
  emailRequired: "Email is required",
  emailInvalid: "Invalid email format",
  emailDomain: "Email domain is not supported",
  emailTooLong: "Email must not exceed 255 characters",
  emailBlacklisted: "This email address is not allowed",
  emailDomainBlacklisted:
    "Disposable or temporary email addresses are not allowed",

  // FULL NAME
  fullnameRequired: "Full name is required",
  fullnameTooShort: "Full name must be at least 5 characters",
  fullnameTooLong: "Full name must not exceed 100 characters",
  fullnameInvalid: "Full name contains invalid characters",

  // USERNAME
  usernameTooShort: "Username must be at least 5 characters",
  usernameTooLong: "Username must not exceed 30 characters",
  usernameInvalid: "Username may only contain letters, numbers and underscores",

  // PASSWORD
  passwordRequired: "Password is required",
  passwordTooShort: "Password must be at least 8 characters long",
  passwordTooLong: "Password must not exceed 32 characters",
  passwordUpper: "Password must contain at least one uppercase letter",
  passwordLower: "Password must contain at least one lowercase letter",
  passwordNumber: "Password must contain at least one number",
  passwordSpecial: "Password must contain at least one special character",
  passwordNoSpaces: "Password must not contain spaces",
  passwordMismatch: "Passwords do not match",
  weakPassword: "Password is too weak",

  // OTP
  otpRequired: "OTP is required",
  otpInvalid: "OTP must contain exactly 6 digits",
  otpNumeric: "OTP must contain only numbers",

  // TERMS and conditions
  termsRequired: "You must accept the terms and conditions",

  // MESSAGE
  messageRequired: "Message is required",
  messageTooShort: "Message is too short",
  messageTooLong: "Message is too long",
  subjectTooShort: "Subject is too short",
  subjectTooLong: "Subject must not exceed 150 characters",

  // URL
  urlInvalid: "Invalid URL",

  // PHONE
  phoneInvalid: "Invalid phone number format",

  // IDENTIFIERS
  uuidInvalid: "Invalid UUID",
  cuidInvalid: "Invalid identifier",
  mongoIdInvalid: "Invalid identifier",
  slugInvalid: "Slug may only contain lowercase letters, numbers and hyphens",

  // DATE / TIME
  dateInvalid: "Invalid date",
  dateStringInvalid: "Date must be in YYYY-MM-DD format",
  birthdateFuture: "Birthdate cannot be in the future",
  dateRangeInvalid: "End date must be on or after the start date",
  timezoneInvalid: "Invalid IANA timezone identifier",
  localeInvalid: "Invalid locale/language code",

  // NUMBERS
  percentageInvalid: "Value must be between 0 and 100",
  ratingInvalid: "Rating must be a whole number between 1 and 5",
  currencyNegative: "Amount cannot be negative",
  currencyDecimalPlaces: "Amount must not have more than 2 decimal places",
  portInvalid: "Port must be a whole number between 1 and 65535",

  // LOCATION
  countryCodeInvalid: "Country code must be a 2-letter ISO 3166-1 code",
  postalCodeInvalid: "Invalid postal/zip code",
  latitudeInvalid: "Latitude must be between -90 and 90",
  longitudeInvalid: "Longitude must be between -180 and 180",

  // WEB / TECH FORMATS
  hexColorInvalid: "Invalid hex color (e.g. #1A2B3C)",
  ipAddressInvalid: "Invalid IPv4 or IPv6 address",
  jwtInvalid: "Invalid JWT format",
  semverInvalid: "Invalid semantic version (e.g. 1.4.2)",

  // FILES
  filenameRequired: "Filename is required",
  filenameTooLong: "Filename must not exceed 255 characters",
  filenameInvalid: "Filename contains invalid or unsafe characters",
  mimeTypeInvalid: "Invalid MIME type",
  fileTooLarge: "File exceeds the maximum allowed size",

  // MISC / QUERY
  tagRequired: "At least one tag is required",
  tagTooLong: "Each tag must not exceed 30 characters",
  tagsDuplicate: "Duplicate tags are not allowed",
  hashtagInvalid: "Invalid hashtag",
  socialHandleInvalid: "Invalid social handle",
  searchQueryInvalid: "Search query cannot be empty",
};

//    COMMON HELPERS
const trimString = () => z.string().trim();

const minAgeMessage = (age: number) => `You must be at least ${age} years old`;

const calculateAge = (birthdate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() &&
      today.getDate() >= birthdate.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
};

// ============================================================
// IDENTITY
// ============================================================

// FULL NAME rules
export const fullnameRules = trimString()
  .min(5, schemaMessages.fullnameTooShort)
  .max(100, schemaMessages.fullnameTooLong)
  .regex(/^[A-Za-z\s'-]+$/, schemaMessages.fullnameInvalid)
  .describe("Full name");

// USERNAME rules
export const usernameRules = trimString()
  .min(5, schemaMessages.usernameTooShort)
  .max(30, schemaMessages.usernameTooLong)
  .regex(/^[a-zA-Z0-9_]+$/, schemaMessages.usernameInvalid)
  .describe("Username");

// PASSWORD rules
export const passwordRules = trimString()
  .min(8, schemaMessages.passwordTooShort)
  .max(32, schemaMessages.passwordTooLong)
  .regex(/[A-Z]/, schemaMessages.passwordUpper)
  .regex(/[a-z]/, schemaMessages.passwordLower)
  .regex(/[0-9]/, schemaMessages.passwordNumber)
  .regex(/[^A-Za-z0-9]/, schemaMessages.passwordSpecial)
  .refine((value) => !/\s/.test(value), {
    message: schemaMessages.passwordNoSpaces,
  })
  .describe(
    "Secure password with uppercase, lowercase, number and special character",
  );

export const confirmPasswordRules = trimString().describe("Confirm password");

/**
 * Wraps an object schema with a password === confirmPassword check.
 * Cross-field checks can only happen at the object level in Zod, so
 * this is applied after building the full signup/reset schema:
 *
 *   const signupSchema = withPasswordConfirmation(
 *     z.object({ password: passwordRules, confirmPassword: confirmPasswordRules, ... })
 *   );
 */
export const withPasswordConfirmation = <
  T extends { password: string; confirmPassword: string },
>(
  schema: z.ZodType<T>,
) =>
  schema.refine((data) => data.password === data.confirmPassword, {
    message: schemaMessages.passwordMismatch,
    path: ["confirmPassword"],
  });

// TERMS and conditions rules
export const termsAcceptedRules = z
  .boolean()
  .refine((value) => value === true, {
    message: schemaMessages.termsRequired,
  });

// OTP rules
export const otpRules = trimString()
  .length(6, { message: schemaMessages.otpInvalid })
  .regex(/^\d+$/, { message: schemaMessages.otpNumeric })
  .describe("One-time password");

// ============================================================
// EMAIL — two schemas, pick per use case
// ============================================================

/**
 * Default email schema for most projects (signup, contact forms,
 * newsletters). Accepts ANY domain, but rejects disposable/blacklisted
 * domains and explicitly blacklisted addresses.
 */
export const emailRules = z
  .email(schemaMessages.emailInvalid)
  .trim()
  .toLowerCase()
  .min(1, schemaMessages.emailRequired)
  .max(255, schemaMessages.emailTooLong)
  .refine((email) => !isDomainBlacklisted(getEmailDomain(email)), {
    message: schemaMessages.emailDomainBlacklisted,
  })
  .refine((email) => !isEmailBlacklisted(email), {
    message: schemaMessages.emailBlacklisted,
  })
  .describe("Email (any domain, blacklist enforced)");

/**
 * Restricted email schema for projects that must gate signups to a
 * known set of providers/company domains (internal tools, enterprise
 * clients, gated betas). Domain must appear in `allowedMailDomains`
 * from domains.config.ts, PLUS the same blacklist checks as above
 * for defense in depth.
 */
export const emailRestrictedRules = z
  .email(schemaMessages.emailInvalid)
  .trim()
  .toLowerCase()
  .min(1, schemaMessages.emailRequired)
  .max(255, schemaMessages.emailTooLong)
  .refine((email) => isDomainAllowed(getEmailDomain(email)), {
    message: schemaMessages.emailDomain,
  })
  .refine((email) => !isEmailBlacklisted(email), {
    message: schemaMessages.emailBlacklisted,
  })
  .describe(`Email restricted to: ${allowedMailDomains.join(", ")}`);

// ============================================================
// CONTACT
// ============================================================

// International phone number rules
export const phoneRules = trimString()
  .regex(/^\+?[1-9]\d{7,14}$/, schemaMessages.phoneInvalid)
  .describe("International phone number");

// URL rules
export const urlRules = z.url(schemaMessages.urlInvalid).describe("URL");

// MESSAGE rules
export const messageRules = trimString()
  .min(5, schemaMessages.messageTooShort)
  .max(5000, schemaMessages.messageTooLong)
  .describe("Message");

// SUBJECT LINE rules
export const subjectRules = trimString()
  .min(3, schemaMessages.subjectTooShort)
  .max(150, schemaMessages.subjectTooLong)
  .describe("Subject line");

// ============================================================
// IDENTIFIERS
// ============================================================

// UUID rules
export const uuidRules = z.uuid(schemaMessages.uuidInvalid).describe("UUID");

// CUID2 rules (common as a default ID format in Drizzle setups)
export const cuid2Rules = z.cuid2(schemaMessages.cuidInvalid).describe("CUID2");

// MongoDB ObjectId rules
export const mongoIdRules = trimString()
  .regex(/^[a-f\d]{24}$/i, schemaMessages.mongoIdInvalid)
  .describe("MongoDB ObjectId");

// SLUG rules (URL-safe identifier, e.g. blog-post-title)
export const slugRules = trimString()
  .min(1, schemaMessages.slugInvalid)
  .max(200, schemaMessages.slugInvalid)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, schemaMessages.slugInvalid)
  .describe("URL-safe slug");

// ============================================================
// DATE / TIME
// ============================================================

// DATE rules (coerces strings/numbers into a Date instance)
export const dateRules = z.coerce
  .date(schemaMessages.dateInvalid)
  .describe("Date");

// ISO date-only string, e.g. "2026-08-04"
export const dateStringRules = z.iso
  .date(schemaMessages.dateStringInvalid)
  .describe("ISO date (YYYY-MM-DD)");

/**
 * Birthdate schema factory — rejects future dates and enforces a
 * minimum age. Defaults to 13 (COPPA-style baseline); pass 18 for
 * adult-only flows.
 */
export const createBirthdateRules = (minimumAge = 13) =>
  z.coerce
    .date(schemaMessages.dateInvalid)
    .max(new Date(), { message: schemaMessages.birthdateFuture })
    .refine((date) => calculateAge(date) >= minimumAge, {
      message: minAgeMessage(minimumAge),
    })
    .describe(`Birthdate (minimum age ${minimumAge})`);

/**
 * Date range object schema factory — ensures endDate is on/after
 * startDate. Field names are fixed (startDate/endDate) so the error
 * path lands on the right field.
 */
export const createDateRangeSchema = () =>
  z
    .object({
      startDate: dateRules,
      endDate: dateRules,
    })
    .refine((data) => data.startDate <= data.endDate, {
      message: schemaMessages.dateRangeInvalid,
      path: ["endDate"],
    });

// IANA timezone rules, e.g. "Asia/Kolkata"
export const timezoneRules = trimString()
  .refine(
    (value) => {
      try {
        Intl.DateTimeFormat(undefined, { timeZone: value });
        return true;
      } catch {
        return false;
      }
    },
    { message: schemaMessages.timezoneInvalid },
  )
  .describe("IANA timezone identifier");

// BCP-47-style locale/language code, e.g. "en", "en-US", "hi-IN"
export const localeRules = trimString()
  .regex(/^[a-z]{2,3}(-[A-Z]{2})?$/, schemaMessages.localeInvalid)
  .describe("Locale/language code");

// ============================================================
// NUMBERS & PAGINATION
// ============================================================

// PAGINATION rules
export const pageRules = z.coerce.number().min(1).default(1);
export const limitRules = z.coerce.number().min(1).max(100).default(10);

// PERCENTAGE rules (0–100)
export const percentageRules = z.coerce
  .number()
  .min(0, schemaMessages.percentageInvalid)
  .max(100, schemaMessages.percentageInvalid);

// RATING rules (1–5 stars)
export const ratingRules = z.coerce
  .number()
  .int(schemaMessages.ratingInvalid)
  .min(1, schemaMessages.ratingInvalid)
  .max(5, schemaMessages.ratingInvalid);

// CURRENCY AMOUNT rules (non-negative, max 2 decimal places)
export const currencyAmountRules = z.coerce
  .number()
  .nonnegative(schemaMessages.currencyNegative)
  .refine(
    (value) => {
      const decimals = value.toString().split(".")[1]?.length ?? 0;
      return decimals <= 2;
    },
    { message: schemaMessages.currencyDecimalPlaces },
  )
  .describe("Monetary amount, up to 2 decimal places");

// PORT NUMBER rules
export const portRules = z.coerce
  .number()
  .int(schemaMessages.portInvalid)
  .min(1, schemaMessages.portInvalid)
  .max(65535, schemaMessages.portInvalid);

// ============================================================
// LOCATION
// ============================================================

// COUNTRY CODE rules (ISO 3166-1 alpha-2, normalized to uppercase)
export const countryCodeRules = trimString()
  .length(2, schemaMessages.countryCodeInvalid)
  .regex(/^[A-Za-z]{2}$/, schemaMessages.countryCodeInvalid)
  .transform((value) => value.toUpperCase())
  .describe("ISO 3166-1 alpha-2 country code");

// POSTAL / ZIP CODE rules (kept permissive — formats vary by country)
export const postalCodeRules = trimString()
  .min(3, schemaMessages.postalCodeInvalid)
  .max(10, schemaMessages.postalCodeInvalid)
  .regex(/^[A-Za-z0-9\s-]+$/, schemaMessages.postalCodeInvalid)
  .describe("Postal/zip code");

// COORDINATES rules
export const coordinatesRules = z.object({
  lat: z.coerce
    .number()
    .min(-90, schemaMessages.latitudeInvalid)
    .max(90, schemaMessages.latitudeInvalid),
  lng: z.coerce
    .number()
    .min(-180, schemaMessages.longitudeInvalid)
    .max(180, schemaMessages.longitudeInvalid),
});

// ============================================================
// WEB / TECH FORMATS
// ============================================================

// HEX COLOR rules, e.g. "#1A2B3C" or "#fff"
export const hexColorRules = trimString()
  .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, schemaMessages.hexColorInvalid)
  .describe("Hex color code");

// IP ADDRESS rules (v4 or v6)
export const ipAddressRules = z
  .union([z.ipv4(), z.ipv6()], {
    message: schemaMessages.ipAddressInvalid,
  })
  .describe("IPv4 or IPv6 address");

// BASE64 rules
export const base64Rules = z.base64().describe("Base64-encoded string");

// JWT-shape rules (structural check only — does not verify signature)
export const jwtRules = trimString()
  .regex(
    /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
    schemaMessages.jwtInvalid,
  )
  .describe("JWT (structural check only, not signature-verified)");

// SEMVER rules, e.g. "1.4.2", "2.0.0-beta.1"
export const semverRules = trimString()
  .regex(
    /^\d+\.\d+\.\d+(?:-[0-9A-Za-z-.]+)?(?:\+[0-9A-Za-z-.]+)?$/,
    schemaMessages.semverInvalid,
  )
  .describe("Semantic version string");

// ============================================================
// FILES
// ============================================================

// FILENAME rules — blocks path traversal and filesystem-reserved characters
export const filenameRules = trimString()
  .min(1, schemaMessages.filenameRequired)
  .max(255, schemaMessages.filenameTooLong)
  // biome-ignore lint/suspicious/noControlCharactersInRegex: <!-- Control characters are intentionally blocked in filenames -->
  .regex(/^[^<>:"/\\|?*\x00-\x1F]+$/, schemaMessages.filenameInvalid)
  .refine((value) => !value.includes(".."), {
    message: schemaMessages.filenameInvalid,
  })
  .describe("Safe filename");

// MIME TYPE rules, e.g. "image/png"
export const mimeTypeRules = trimString()
  .regex(/^[-\w.]+\/[-\w.+]+$/, schemaMessages.mimeTypeInvalid)
  .describe("MIME type");

/**
 * File size schema factory — bytes, capped at maxBytes.
 *   const avatarSizeRules = createFileSizeRules(2 * 1024 * 1024); // 2MB
 */
export const createFileSizeRules = (maxBytes: number) =>
  z.coerce
    .number()
    .int()
    .positive()
    .max(maxBytes, { message: schemaMessages.fileTooLarge })
    .describe(`File size in bytes, max ${maxBytes}`);

// ============================================================
// MISC / QUERY PARAMS
// ============================================================

/**
 * Boolean coercion for query params/form fields. Plain `z.coerce.boolean()`
 * treats the STRING "false" as truthy (JS `Boolean("false") === true`),
 * which silently breaks "?active=false" style query params. This fixes it.
 */
export const booleanQueryRules = z.preprocess((value) => {
  if (typeof value === "string") return value.toLowerCase() === "true";
  return value;
}, z.boolean());

// TAGS rules — array of short strings, no duplicates
export const tagsRules = z
  .array(
    trimString()
      .min(1, schemaMessages.tagRequired)
      .max(30, schemaMessages.tagTooLong),
  )
  .min(1, schemaMessages.tagRequired)
  .max(20)
  .refine(
    (tags) => new Set(tags.map((t) => t.toLowerCase())).size === tags.length,
    {
      message: schemaMessages.tagsDuplicate,
    },
  )
  .describe("Tag list");

// HASHTAG rules, e.g. "#nextjs" or "nextjs"
export const hashtagRules = trimString()
  .regex(/^#?[A-Za-z0-9_]{1,50}$/, schemaMessages.hashtagInvalid)
  .describe("Hashtag");

export const socialHandleRules = trimString()
  .regex(/^@?[A-Za-z0-9_]{1,30}$/, schemaMessages.socialHandleInvalid)
  .describe("Social media handle");

// SEARCH QUERY rules
export const searchQueryRules = trimString()
  .min(1, schemaMessages.searchQueryInvalid)
  .max(200)
  .describe("Search query");

// SORT ORDER rules
export const sortOrderRules = z.enum(["asc", "desc"]).default("asc");
