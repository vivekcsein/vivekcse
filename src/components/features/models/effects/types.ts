import type { ThemeColors } from "@/packages/hooks";

/** Props every effect receives from <ModelViewer>. */
export type EffectProps = {
  colors: ThemeColors;
  /** The model's `size` — effects scale relative to it. */
  size: number;
  /** false when the visitor prefers reduced motion: render static. */
  motion: boolean;
};
