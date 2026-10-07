/**
 * Shared design-token maps for the layout primitive system.
 *
 * Every layout component (`Stack`, `Inline`, `Grid`, `Cluster`, ...) pulls
 * its spacing/alignment classes from these maps instead of hardcoding
 * Tailwind classes inline. This keeps the whole layout vocabulary on one
 * consistent scale, and means the scale only has to be tuned in one place.
 *
 * The scale intentionally mirrors Tailwind's default spacing scale so it
 * stays familiar to anyone who already knows Tailwind, while giving layout
 * props a small, enterprise-friendly vocabulary (`"sm" | "md" | "lg"`)
 * instead of raw utility classes.
 */

/** Shared spacing scale used for gap, padding, and margin props. */
export type Space = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/** `gap-*` class for each step of the spacing scale. Used by flex/grid based primitives. */
export const gapClass: Record<Space, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
};

/** `p-*` class for each step of the spacing scale. Used by `Box`, `Container`. */
export const paddingClass: Record<Space, string> = {
  none: "p-0",
  xs: "p-1",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
  "2xl": "p-12",
};

/** Horizontal-only `px-*` class, used by `Container` for gutters. */
export const paddingXClass: Record<Space, string> = {
  none: "px-0",
  xs: "px-1",
  sm: "px-2",
  md: "px-4",
  lg: "px-6",
  xl: "px-8",
  "2xl": "px-12",
};

/** Cross-axis alignment, maps to `items-*`. */
export type Align = "start" | "center" | "end" | "stretch" | "baseline";

export const alignItemsClass: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

/** Main-axis distribution, maps to `justify-*`. */
export type Justify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

export const justifyContentClass: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};
