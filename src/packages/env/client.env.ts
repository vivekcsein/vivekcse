import { z } from "zod";
import { parseEnv } from "../utils/parse-env";

// Client Environment Schema
const parsedEnvSchema = z.object({
  NEXT_PUBLIC_CLIENT_ORIGIN: z.url().trim().default("http://localhost:7164"),

  NEXT_PUBLIC_CLIENT_PREFIX: z.string().trim().default("/app"),
});

// Validated Client Environment
// Literal references so Next inlines them into client bundles.
const parsedEnv = parseEnv(parsedEnvSchema, "client", {
  NEXT_PUBLIC_CLIENT_ORIGIN: process.env.NEXT_PUBLIC_CLIENT_ORIGIN,
  NEXT_PUBLIC_CLIENT_PREFIX: process.env.NEXT_PUBLIC_CLIENT_PREFIX,
});

// Application Client Config
export const envClientConfig = Object.freeze({
  clientOrigin: parsedEnv.NEXT_PUBLIC_CLIENT_ORIGIN,
  clientPrefix: parsedEnv.NEXT_PUBLIC_CLIENT_PREFIX,
});

export type EnvClientConfig = typeof envClientConfig;
