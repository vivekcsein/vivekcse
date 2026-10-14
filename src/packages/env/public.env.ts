import { z } from "zod";
import { STYLES_THEME_NAMES } from "../configs/styles.config";
import { parseEnv } from "../utils/parse-env";

// Public Environment Schema
const parsedEnvSchema = z.object({
  // App
  NEXT_PUBLIC_APP_NAME: z.string().trim().min(1).default("@vivekcsein"),

  NEXT_PUBLIC_APP_VERSION: z.string().trim().min(1).default("2.0.0"),

  NEXT_PUBLIC_APP_DESCRIPTION: z
    .string()
    .trim()
    .min(1)
    .default(
      "A portfolio full stack developer with a passion for building scalable and high-performance web applications.",
    ),

  // Site
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),

  // Derived from next.config.ts (GitHub project-page sub-path). Never set by
  // hand: "" for a custom domain, "/<repo>" for username.github.io/<repo>.
  NEXT_PUBLIC_BASE_PATH: z
    .string()
    .trim()
    .regex(/^(\/[a-z0-9._-]+)*$/i)
    .default(""),

  NEXT_PUBLIC_SITE_TITLE: z
    .string()
    .trim()
    .min(1)
    .default("Top 1% Full stack developer with AI"),

  NEXT_PUBLIC_LOGO_URL: z.string().trim().min(1).default("/logo.png"),

  NEXT_PUBLIC_OG_IMAGE_URL: z.string().trim().optional(),

  // Theme
  NEXT_PUBLIC_ACTIVE_STYLE: z.enum(STYLES_THEME_NAMES).default("violet-theme"),

  // Theme
  NEXT_PUBLIC_ACTIVE_THEME: z
    .enum(["system", "light", "dark"])
    .default("system"),

  // Social
  NEXT_PUBLIC_TWITTER: z
    .string()
    .trim()
    .default("https://twitter.com/vivekcsein"),

  NEXT_PUBLIC_GITHUB: z
    .string()
    .trim()
    .default("https://github.com/vivekcsein"),

  NEXT_PUBLIC_LINKEDIN: z
    .string()
    .trim()
    .default("https://www.linkedin.com/showcase/vivekcsein"),

  // Author
  NEXT_PUBLIC_AUTHOR_NAME: z.string().trim().min(1).default("Vivek"),

  NEXT_PUBLIC_AUTHOR_HANDLE: z.string().trim().min(1).default("vivekcsein"),

  NEXT_PUBLIC_AUTHOR_EMAIL: z.email().default("ivivekcse@gmail.com"),

  NEXT_PUBLIC_AUTHOR_QUOTE: z
    .string()
    .trim()
    .min(1)
    .default("Discipline turns ideas into results."),

  // Google Verification
  // Blank (e.g. an unset CI variable) means "not configured".
  NEXT_PUBLIC_GOOGLE_VERIFICATION: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().trim().min(1).optional(),
  ),
});

// Validated Public Environment
// Every key is read as a literal `process.env.NEXT_PUBLIC_*` on purpose: Next.js
// only inlines those exact expressions. A bare `{ ...process.env }` is empty in
// the browser, so client components would silently get the schema defaults while
// the static HTML was built with the real values (hydration mismatch).
const source = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_LOGO_URL: process.env.NEXT_PUBLIC_LOGO_URL,
  NEXT_PUBLIC_OG_IMAGE_URL: process.env.NEXT_PUBLIC_OG_IMAGE_URL,
  NEXT_PUBLIC_ACTIVE_STYLE: process.env.NEXT_PUBLIC_ACTIVE_STYLE,
  NEXT_PUBLIC_ACTIVE_THEME: process.env.NEXT_PUBLIC_ACTIVE_THEME,
  NEXT_PUBLIC_TWITTER: process.env.NEXT_PUBLIC_TWITTER,
  NEXT_PUBLIC_GITHUB: process.env.NEXT_PUBLIC_GITHUB,
  NEXT_PUBLIC_LINKEDIN: process.env.NEXT_PUBLIC_LINKEDIN,
  NEXT_PUBLIC_AUTHOR_NAME: process.env.NEXT_PUBLIC_AUTHOR_NAME,
  NEXT_PUBLIC_AUTHOR_HANDLE: process.env.NEXT_PUBLIC_AUTHOR_HANDLE,
  NEXT_PUBLIC_AUTHOR_EMAIL: process.env.NEXT_PUBLIC_AUTHOR_EMAIL,
  NEXT_PUBLIC_AUTHOR_QUOTE: process.env.NEXT_PUBLIC_AUTHOR_QUOTE,
  NEXT_PUBLIC_GOOGLE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
};

const parsedEnv = parseEnv(parsedEnvSchema, "public", source);

// Public Application Config
export const envPublicConfig = Object.freeze({
  // App
  APP_NAME: parsedEnv.NEXT_PUBLIC_APP_NAME,
  APP_VERSION: parsedEnv.NEXT_PUBLIC_APP_VERSION,
  APP_DESCRIPTION: parsedEnv.NEXT_PUBLIC_APP_DESCRIPTION,

  // Site
  SITE_URL: parsedEnv.NEXT_PUBLIC_SITE_URL,
  BASE_PATH: parsedEnv.NEXT_PUBLIC_BASE_PATH,
  SITE_TITLE: parsedEnv.NEXT_PUBLIC_SITE_TITLE,
  LOGO_URL: parsedEnv.NEXT_PUBLIC_LOGO_URL,
  OG_IMAGE_URL: parsedEnv.NEXT_PUBLIC_OG_IMAGE_URL,

  // Theme
  ACTIVE_STYLE: parsedEnv.NEXT_PUBLIC_ACTIVE_STYLE,
  ACTIVE_THEME: parsedEnv.NEXT_PUBLIC_ACTIVE_THEME,

  // Social
  TWITTER: parsedEnv.NEXT_PUBLIC_TWITTER,
  LINKEDIN: parsedEnv.NEXT_PUBLIC_LINKEDIN,
  GITHUB: parsedEnv.NEXT_PUBLIC_GITHUB,

  // Author
  AUTHOR_NAME: parsedEnv.NEXT_PUBLIC_AUTHOR_NAME,
  AUTHOR_HANDLE: parsedEnv.NEXT_PUBLIC_AUTHOR_HANDLE,
  AUTHOR_EMAIL: parsedEnv.NEXT_PUBLIC_AUTHOR_EMAIL,
  AUTHOR_QUOTE: parsedEnv.NEXT_PUBLIC_AUTHOR_QUOTE,

  // Google Verification
  GOOGLE_VERIFICATION: parsedEnv.NEXT_PUBLIC_GOOGLE_VERIFICATION,
});

export type EnvPublicConfig = typeof envPublicConfig;
