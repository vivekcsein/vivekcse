import { Cousine, Inika, Oxanium } from "next/font/google";
import localFont from "next/font/local";

export const oxanium = Oxanium({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const inika = Inika({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const cousine = Cousine({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

/**
 * Personal/brand font — not tied to any theme's --font-sans/--font-serif/
 * --font-mono slots. Mounted globally (see styles.config.ts's
 * PERSONAL_FONTS) and exposed as the `font-brilliant` utility class via
 * StyleTheme.css, so it's usable anywhere regardless of the active theme.
 * File: src/assets/fonts/brilliant-performer.otf ("Brilliant Performer",
 * Regular, single static weight).
 */

// custom fonts
// src: "../../assets/fonts/georgia.ttf",
// src: "../../assets/fonts/consolas-ligaturized-v2.ttf",
// src: "../../assets/fonts/brilliant-performer.otf",
const CustomFont = localFont({
  src: "../../assets/fonts/custom.ttf",
  variable: "--font-custom",
  weight: "400",
  style: "normal",
  display: "swap",
});

export default {
  sans: oxanium,
  serif: inika,
  mono: cousine,
  custom: CustomFont,
};
