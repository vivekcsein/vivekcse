import { z } from "zod";

/**
 * Parses environment input with a Zod schema and fails loudly with a readable list of
 * every problem, instead of a generic "validation failed" message.
 */
export const parseEnv = <TSchema extends z.ZodType>(
  schema: TSchema,
  label: string,
  source: Record<string, string | undefined> = process.env,
): z.output<TSchema> => {
  // A blank value means "not set": GitHub Actions passes "" for a repository
  // variable that was never defined, which must fall back to the schema default.
  const cleaned = Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== ""),
  );
  const result = schema.safeParse(cleaned);
  if (!result.success) {
    throw new Error(
      `${label} environment validation failed:\n${z.prettifyError(result.error)}`,
    );
  }

  return result.data;
};
