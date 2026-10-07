import { z } from "zod";
import { emailRules, fullnameRules } from "@/packages/configs/schema.config";
import { UserRoles, UserRolesValues } from "../configs/roles.config";
import { parseEnv } from "../utils/parse-env";

// ✅ Schema uses the actual env var names (with NEXT_PUBLIC_ prefix)
//
// SECURITY: never add a password (or any other secret) to this schema.
// Anything prefixed NEXT_PUBLIC_ is inlined into the client JS bundle by
// Next.js at build time — it ships to every visitor's browser in every
// environment, including production. There used to be a
// NEXT_PUBLIC_DEFAULT_USER_PASSWORD here for autofilling auth forms
// during local dev; it's been removed. `formsConfig.defaultValues` no
// longer prefills password fields at all (see forms.config.ts).
const parsedEnvSchema = z.object({
  NEXT_PUBLIC_DEFAULT_USER_ID: z.string().default("default-user-1"),
  NEXT_PUBLIC_DEFAULT_USER_FULLNAME: fullnameRules.default("John Doe"),
  NEXT_PUBLIC_DEFAULT_USER_EMAIL: emailRules.default("johndoe@gmail.com"),
  NEXT_PUBLIC_DEFAULT_USER_AVATAR_URL: z.string().default(""),
  NEXT_PUBLIC_DEFAULT_USER_ROLE: z
    .enum(UserRolesValues)
    .default(UserRoles.USER),
  NEXT_PUBLIC_DEFAULT_USER_STATUS: z
    .enum(["ACTIVE", "INACTIVE"])
    .default("INACTIVE"),
});

// ✅ Validate process.env
// Validated Public Environment
// Literal references so Next inlines them into client bundles.
const parsedEnv = parseEnv(parsedEnvSchema, "user", {
  NEXT_PUBLIC_DEFAULT_USER_ID: process.env.NEXT_PUBLIC_DEFAULT_USER_ID,
  NEXT_PUBLIC_DEFAULT_USER_FULLNAME:
    process.env.NEXT_PUBLIC_DEFAULT_USER_FULLNAME,
  NEXT_PUBLIC_DEFAULT_USER_EMAIL: process.env.NEXT_PUBLIC_DEFAULT_USER_EMAIL,
  NEXT_PUBLIC_DEFAULT_USER_AVATAR_URL:
    process.env.NEXT_PUBLIC_DEFAULT_USER_AVATAR_URL,
  NEXT_PUBLIC_DEFAULT_USER_ROLE: process.env.NEXT_PUBLIC_DEFAULT_USER_ROLE,
  NEXT_PUBLIC_DEFAULT_USER_STATUS: process.env.NEXT_PUBLIC_DEFAULT_USER_STATUS,
});

// ✅ Map validated vars to clean keys
export const envDefaultUserConfig = Object.freeze({
  DEFAULT_USER_ID: parsedEnv.NEXT_PUBLIC_DEFAULT_USER_ID,
  DEFAULT_USER_FULLNAME: parsedEnv.NEXT_PUBLIC_DEFAULT_USER_FULLNAME,
  DEFAULT_USER_EMAIL: parsedEnv.NEXT_PUBLIC_DEFAULT_USER_EMAIL,
  DEFAULT_USER_AVATAR_URL: parsedEnv.NEXT_PUBLIC_DEFAULT_USER_AVATAR_URL,
  DEFAULT_USER_ROLE: parsedEnv.NEXT_PUBLIC_DEFAULT_USER_ROLE,
  DEFAULT_USER_STATUS: parsedEnv.NEXT_PUBLIC_DEFAULT_USER_STATUS,
});

// ✅ Optional: Type-safe config
export type EnvDefaultUserConfig = typeof envDefaultUserConfig;
