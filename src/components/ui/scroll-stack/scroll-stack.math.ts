/**
 * Pure maths for ScrollStack (no DOM) — kept separate so it can be reasoned
 * about and tested without a browser.
 *
 * Coordinates are document pixels. For card `i`:
 *   natural  where the card's top sits in normal flow
 *   top      the viewport offset it pins at (`position: sticky; top`)
 * It pins when `scrollTop = natural - top`, and finishes shrinking at
 * `scrollTop = natural - scaleEnd`.
 */

export type CardMetric = { natural: number; top: number };

export type StackConfig = {
  baseScale: number;
  itemScale: number;
  /** px from viewport top where the shrink animation ends. */
  scaleEnd: number;
  rotationAmount: number;
  blurAmount: number;
};

export type CardTransform = { scale: number; rotation: number; blur: number };

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** "20%" → 20% of `viewport`; "120" / 120 → px. */
export const toPx = (value: string | number, viewport: number): number =>
  typeof value === "string" && value.includes("%")
    ? (Number.parseFloat(value) / 100) * viewport
    : Number.parseFloat(String(value));

export const getTransforms = (
  scrollTop: number,
  metrics: readonly CardMetric[],
  config: StackConfig,
): CardTransform[] => {
  // The deepest card that has already pinned (drives the blur ramp).
  let topIndex = 0;
  metrics.forEach((metric, index) => {
    if (scrollTop >= metric.natural - metric.top) topIndex = index;
  });

  return metrics.map((metric, index) => {
    const start = metric.natural - metric.top;
    const end = metric.natural - config.scaleEnd;
    const progress =
      end > start
        ? clamp01((scrollTop - start) / (end - start))
        : scrollTop >= start
          ? 1
          : 0;

    const targetScale = config.baseScale + index * config.itemScale;
    const scale = 1 - progress * (1 - targetScale);
    const rotation = config.rotationAmount
      ? index * config.rotationAmount * progress
      : 0;
    const blur =
      config.blurAmount && index < topIndex
        ? (topIndex - index) * config.blurAmount
        : 0;

    return { scale, rotation, blur };
  });
};

/** Scroll range during which the last card is pinned. */
export const getPinnedRange = (
  metrics: readonly CardMetric[],
  releaseAt: number,
): readonly [number, number] => {
  const last = metrics.at(-1);
  return [last ? last.natural - last.top : 0, releaseAt];
};
