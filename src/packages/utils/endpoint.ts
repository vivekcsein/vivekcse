export const createRoutes = <T extends Record<string, string>>(
  base: string,
  routes: T,
): T & { base: string } =>
  ({
    base,
    ...Object.fromEntries(
      Object.entries(routes).map(([key, path]) => [key, `${base}${path}`]),
    ),
  }) as T & { base: string };
