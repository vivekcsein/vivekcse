import type { CSSProperties } from "react";
import {
  ANIMATION_NAME,
  ANIMATION_TYPE,
  type AnimationDirection,
  type AnimationName,
  type AnimationType,
} from "../configs/animation.config";

export const FindAnimation = (
  type: AnimationType,
  direction: AnimationDirection = "none",
): AnimationName => {
  switch (type) {
    case ANIMATION_TYPE.FADE:
      return ANIMATION_NAME.FADE_IN;

    case ANIMATION_TYPE.SCALE:
      return ANIMATION_NAME.SCALE_IN;

    case ANIMATION_TYPE.ZOOM:
      return ANIMATION_NAME.ZOOM_IN;

    case ANIMATION_TYPE.ROTATE:
      return ANIMATION_NAME.ROTATE_IN;

    case ANIMATION_TYPE.FLIP:
      return ANIMATION_NAME.FLIP_X;

    case ANIMATION_TYPE.BOUNCE:
      return ANIMATION_NAME.BOUNCE_IN;

    case ANIMATION_TYPE.BLUR:
      return ANIMATION_NAME.BLUR_IN;

    case ANIMATION_TYPE.SLIDE:
      switch (direction) {
        case "left":
          return ANIMATION_NAME.SLIDE_IN_LEFT;

        case "right":
          return ANIMATION_NAME.SLIDE_IN_RIGHT;

        case "top":
          return ANIMATION_NAME.SLIDE_IN_TOP;

        case "bottom":
          return ANIMATION_NAME.SLIDE_IN_BOTTOM;

        default:
          return ANIMATION_NAME.NONE;
      }

    default:
      return ANIMATION_NAME.NONE;
  }
};

type AnimationStyle = Pick<
  CSSProperties,
  | "animationName"
  | "animationDuration"
  | "animationTimingFunction"
  | "animationFillMode"
>;

type AnimationStyleOptions = {
  durationMs?: number;
  easing?: string;
  fillMode?: CSSProperties["animationFillMode"];
};

const DEFAULT_DURATION_MS = 300;
const DEFAULT_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * The full animation CSSProperties (name + duration + timing + fill),
 * not just the bare keyframe name `FindAnimation` returns. Spread this
 * into `style` instead of `{ animation: FindAnimation(...) }` — the
 * shorthand form sets only `animation-name`, and with no explicit
 * duration the browser defaults to 0s, so the animation never visibly
 * plays.
 */
export const getAnimationStyle = (
  type: AnimationType,
  direction: AnimationDirection = "none",
  options?: AnimationStyleOptions,
): AnimationStyle => ({
  animationName: FindAnimation(type, direction),
  animationDuration: `${options?.durationMs ?? DEFAULT_DURATION_MS}ms`,
  animationTimingFunction: options?.easing ?? DEFAULT_EASING,
  animationFillMode: options?.fillMode ?? "both",
});
