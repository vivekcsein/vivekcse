import { z } from "zod";
import { parseEnv } from "../utils/parse-env";

/** Treat empty strings (e.g. `KEY=` in .env) as "not set". */
const blankToUndefined = (value: unknown) => (value === "" ? undefined : value);

const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess(blankToUndefined, schema.optional());

const parsedEnvSchema = z.object({
  /** AdSense publisher id, e.g. `ca-pub-1234567890123456`. Ads stay off when unset. */
  NEXT_PUBLIC_ADSENSE_CLIENT: optional(
    z.string().regex(/^ca-pub-\d{10,}$/, "Expected ca-pub-XXXXXXXXXXXXXXXX"),
  ),
  /** Ad unit ids (AdSense → Ads → By ad unit). */
  NEXT_PUBLIC_ADSENSE_SLOT_RAIL: optional(z.string().regex(/^\d+$/)),
  NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE: optional(z.string().regex(/^\d+$/)),
});

// NEXT_PUBLIC_* must be referenced literally so Next.js can inline them.
// Validated Server Environment
// Literal references so Next inlines them into client bundles.
const parsedEnv = parseEnv(parsedEnvSchema, "ads", {
  NEXT_PUBLIC_ADSENSE_CLIENT: process.env.NEXT_PUBLIC_ADSENSE_CLIENT,
  NEXT_PUBLIC_ADSENSE_SLOT_RAIL: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RAIL,
  NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE:
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE,
});

export const AdsEnv = Object.freeze(parsedEnv);
