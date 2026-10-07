export const THEME_STORAGE_KEY = "current-theme";

export const themeConfig = {
  storageKey: THEME_STORAGE_KEY,
  defaultTheme: "system",
  enableSystem: true,
  disableTransitionOnChange: true,
} as const;
