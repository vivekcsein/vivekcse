import {
  BRAND_FONTS,
  getStyleTheme,
  type StyleThemeName,
} from "@/packages/configs/styles.config";

/**
 * Returns the className string of every next/font variable that needs to be
 * mounted on <html>: the active theme's fonts (which the theme's own CSS in
 * styles/themes/<name>.css references directly, e.g.
 * `--font-sans: var(--font-oxanium), ui-serif, serif;`, so applying this
 * className is what makes the *actual* font show up instead of the
 * plain-text fallback stack) plus PERSONAL_FONTS, which are theme-independent
 * and always mounted (e.g. the `font-brilliant` utility).
 *
 * Note: theme CSS is imported statically once, in globals.css — every
 * theme's palette ships in the bundle and only the matching `data-theme`
 * attribute activates it. This function never imports CSS itself.
 */
export const getThemeFontClassName = (themeName: StyleThemeName): string => {
  const theme = getStyleTheme(themeName);
  return [...theme.fonts, ...BRAND_FONTS]
    .map((font) => font.variable)
    .join(" ");
};
