"use client";

import { useEffect, useState } from "react";

/** sRGB hex strings (what three.js wants), resolved from the active theme. */
export type ThemeColors = {
  primary: string;
  accent: string;
  foreground: string;
  background: string;
  card: string;
};

// Neutral greys, used only if the browser can't parse a theme colour.
const FALLBACK: ThemeColors = {
  primary: "#888888",
  accent: "#aaaaaa",
  foreground: "#eeeeee",
  background: "#111111",
  card: "#222222",
};

const VARIABLES = {
  primary: "--primary",
  accent: "--accent-foreground",
  foreground: "--foreground",
  background: "--background",
  card: "--card",
} as const satisfies Record<keyof ThemeColors, string>;

let context: CanvasRenderingContext2D | null | undefined;

const getContext = () => {
  if (context === undefined) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    context = canvas.getContext("2d", { willReadFrequently: true });
  }
  return context;
};

/**
 * Converts any CSS colour (oklch(), color-mix(), hsl()…) to `#rrggbb` by
 * letting the browser paint it onto a 1×1 canvas — three.js can't parse
 * oklch(), and this keeps the 3D scene on the exact theme colours.
 */
const toHex = (css: string, fallback: string): string => {
  const ctx = getContext();
  if (!ctx || !css) return fallback;

  ctx.fillStyle = "#010203";
  ctx.fillStyle = css;
  if (ctx.fillStyle === "#010203") return fallback; // value was rejected

  ctx.clearRect(0, 0, 1, 1);
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
};

const read = (): ThemeColors => {
  const style = getComputedStyle(document.documentElement);
  const entries = Object.entries(VARIABLES).map(([name, variable]) => [
    name,
    toHex(
      style.getPropertyValue(variable).trim(),
      FALLBACK[name as keyof ThemeColors],
    ),
  ]);
  return Object.fromEntries(entries) as ThemeColors;
};

/**
 * Theme colours for three.js materials/lights. Updates live when the colour
 * theme (`data-theme`) or light/dark (`.dark`) changes.
 */
export const useThemeColors = (): ThemeColors => {
  const [colors, setColors] = useState<ThemeColors>(FALLBACK);

  useEffect(() => {
    const update = () => setColors(read());
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
};
