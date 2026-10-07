"use client";

import {
  Children,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { useReducedMotion } from "@/packages/hooks";
import { cn } from "@/packages/utils/cn";
import {
  type CardMetric,
  getPinnedRange,
  getTransforms,
  type StackConfig,
  toPx,
} from "./scroll-stack.math";

export type ScrollStackProps = {
  /** `<ScrollStackItem>`s (any element works — each child becomes one card). */
  children: ReactNode;
  className?: string;
  /** Gap between cards in normal flow, px. Default 24 (<md) / 80 (md+). */
  itemDistance?: number;
  /** Offset between pinned cards, px. Default 14 (<md) / 30 (md+). */
  itemStackDistance?: number;
  /** Where the first card pins: "20%" of viewport height, or px. Default: below the header. */
  stackPosition?: string;
  /** Where the shrink animation ends ("10%" / px). Default "10%" (md+) / "0%". */
  scaleEndPosition?: string;
  /** Scale of the first card once stacked. Default 0.85 (md+) / 0.92 (<md). */
  baseScale?: number;
  /** Extra scale per card after the first. Default 0.03 (md+) / 0.02 (<md). */
  itemScale?: number;
  /** Degrees of tilt added per card. */
  rotationAmount?: number;
  /** Blur (px) added per card buried in the stack. */
  blurAmount?: number;
  /** Fires once when the last card is pinned (and again after leaving and re-entering). */
  onStackComplete?: () => void;
};

type CssVars = CSSProperties & Record<`--${string}`, string>;

/** JS-side defaults (layout defaults live in the CSS variables below). */
const WIDE = { baseScale: 0.85, itemScale: 0.03, scaleEnd: "10%" } as const;
const COMPACT = { baseScale: 0.92, itemScale: 0.02, scaleEnd: "0%" } as const;

const toLength = (value: string): string =>
  value.includes("%")
    ? `${Number.parseFloat(value)}svh`
    : `${Number.parseFloat(value)}px`;

/** A card. Style it with `className`; ScrollStack animates its transform. */
export const ScrollStackItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "origin-top will-change-transform [backface-visibility:hidden]",
      className,
    )}
    data-scroll-stack-card
  >
    {children}
  </div>
);

/**
 * Cards pin one after another near the top of the viewport and shrink into a
 * stack as you scroll (port of React Bits "ScrollStack").
 *
 * Differences from the original, on purpose:
 *  - Pinning is native `position: sticky` (no JS translateY → no jitter), and
 *    the page keeps its normal scrolling: no Lenis, so anchor links, keyboard
 *    scrolling, `scroll-padding` and touch scrolling are untouched.
 *  - Everything is scoped to this component (no global querySelectorAll).
 *  - Spacing is CSS variables with a breakpoint, so it is responsive with no
 *    JS re-render; JS only does the scale/blur maths while the stack is on screen.
 *  - `prefers-reduced-motion`: plain stacked list, no pinning or scaling.
 *
 * Needs an ancestor chain without `overflow: hidden/auto` (it breaks sticky).
 */
export const ScrollStack = ({
  children,
  className,
  itemDistance,
  itemStackDistance,
  stackPosition,
  scaleEndPosition,
  baseScale,
  itemScale,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}: ScrollStackProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onStackComplete);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    completeRef.current = onStackComplete;
  }, [onStackComplete]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>(":scope > [data-scroll-stack-item]"),
    );
    const cards = items.map((item) =>
      item.querySelector<HTMLElement>("[data-scroll-stack-card]"),
    );
    if (items.length === 0) return;

    let metrics: CardMetric[] = [];
    let releaseAt = 0;
    let config: StackConfig = {
      baseScale: WIDE.baseScale,
      itemScale: WIDE.itemScale,
      scaleEnd: 0,
      rotationAmount,
      blurAmount,
    };
    let completed = false;
    let frame = 0;
    const last = new Map<number, string>();

    /** Reads layout (sticky `top`, gaps, heights). Run on mount/resize only. */
    const measure = () => {
      const viewport = window.innerHeight;
      const defaults = window.matchMedia("(max-width: 767px)").matches
        ? COMPACT
        : WIDE;

      config = {
        baseScale: baseScale ?? defaults.baseScale,
        itemScale: itemScale ?? defaults.itemScale,
        scaleEnd: toPx(scaleEndPosition ?? defaults.scaleEnd, viewport),
        rotationAmount,
        blurAmount,
      };

      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      let offset = 0;
      metrics = items.map((item) => {
        const style = getComputedStyle(item);
        const metric = {
          natural: rootTop + offset,
          top: Number.parseFloat(style.top) || 0,
        };
        offset +=
          item.offsetHeight + (Number.parseFloat(style.marginBottom) || 0);
        return metric;
      });

      const tail = items[items.length - 1];
      const tailTop = metrics[metrics.length - 1]?.top ?? 0;
      // The last card un-pins when its bottom meets the stack's bottom edge.
      releaseAt = rootTop + root.offsetHeight - tail.offsetHeight - tailTop;
    };

    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const transforms = getTransforms(scrollTop, metrics, config);

      transforms.forEach((t, index) => {
        const card = cards[index];
        if (!card) return;
        const value = `${t.scale.toFixed(3)}|${t.rotation.toFixed(2)}|${t.blur.toFixed(1)}`;
        if (last.get(index) === value) return;
        last.set(index, value);
        card.style.transform = `translate3d(0,0,0) scale(${t.scale.toFixed(3)}) rotate(${t.rotation.toFixed(2)}deg)`;
        card.style.filter = t.blur > 0 ? `blur(${t.blur.toFixed(1)}px)` : "";
      });

      const [from, to] = getPinnedRange(metrics, releaseAt);
      const pinned = scrollTop >= from && scrollTop <= to;
      if (pinned && !completed) {
        completed = true;
        completeRef.current?.();
      } else if (!pinned && completed) {
        completed = false;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const remeasure = () => {
      measure();
      schedule();
    };

    // Only listen to scroll while the stack is near the viewport.
    const onScroll = () => schedule();
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          remeasure();
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "100% 0px" },
    );
    visibility.observe(root);

    const resize = new ResizeObserver(remeasure);
    resize.observe(root);
    for (const item of items) resize.observe(item);
    window.addEventListener("resize", remeasure);

    measure();
    update();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      visibility.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      for (const card of cards) {
        if (card) {
          card.style.transform = "";
          card.style.filter = "";
        }
      }
    };
  }, [
    reducedMotion,
    baseScale,
    itemScale,
    scaleEndPosition,
    rotationAmount,
    blurAmount,
  ]);

  // Spacing overrides win over the responsive defaults on the class below.
  const vars: CssVars = {};
  if (itemDistance !== undefined) vars["--ss-gap"] = `${itemDistance}px`;
  if (itemStackDistance !== undefined)
    vars["--ss-step"] = `${itemStackDistance}px`;
  if (stackPosition !== undefined) vars["--ss-top"] = toLength(stackPosition);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative",
        // <md: tight spacing, pins just under the sticky header
        "[--ss-gap:1.5rem] [--ss-step:0.875rem] [--ss-top:calc(var(--header-h)_+_1rem)]",
        // md+: roomy, pins at 20% of the viewport (never under the header)
        "md:[--ss-gap:5rem] md:[--ss-step:1.875rem] md:[--ss-top:max(20svh,calc(var(--header-h)_+_1.5rem))]",
        className,
      )}
      style={vars}
    >
      {Children.map(children, (child, index) => (
        <div
          className="sticky mb-(--ss-gap) motion-reduce:static"
          data-scroll-stack-item
          style={{ top: `calc(var(--ss-top) + ${index} * var(--ss-step))` }}
        >
          {child}
        </div>
      ))}
      {/* Room for the last card to stay pinned a little before the stack releases */}
      <div aria-hidden="true" className="h-[20svh] md:h-[30svh]" />
    </div>
  );
};
