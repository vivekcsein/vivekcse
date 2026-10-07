import { z } from "zod";
import { parseEnv } from "../utils/parse-env";

// Server Environment Schema
const parsedEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce
    .number()
    .int("PORT must be an integer")
    .min(1, "PORT must be greater than 0")
    .max(65535, "PORT must be less than or equal to 65535")
    .default(3000),
});

// Validated Server Environment
const parsedEnv = parseEnv(parsedEnvSchema, "server");

// Application Environment Config
export const envAppConfig = Object.freeze({
  NODE_ENV: parsedEnv.NODE_ENV,
  port: parsedEnv.PORT,

  isDevelopment: parsedEnv.NODE_ENV === "development",
  isProduction: parsedEnv.NODE_ENV === "production",
  isTest: parsedEnv.NODE_ENV === "test",
});

export type EnvAppConfig = typeof envAppConfig;
