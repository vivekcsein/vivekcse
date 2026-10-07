// Animation Types
export const ANIMATION_TYPE = {
  FADE: "fade",
  SLIDE: "slide",
  ZOOM: "zoom",
  SCALE: "scale",
  ROTATE: "rotate",
  FLIP: "flip",
  BOUNCE: "bounce",
  BLUR: "blur",
  SKEW: "skew",
} as const;

export type AnimationType =
  (typeof ANIMATION_TYPE)[keyof typeof ANIMATION_TYPE];

// Direction
export const ANIMATION_DIRECTION = {
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
  CENTER: "center",
  NONE: "none",
} as const;

export type AnimationDirection =
  (typeof ANIMATION_DIRECTION)[keyof typeof ANIMATION_DIRECTION];

export const ANIMATION_NAME = {
  // Fade
  FADE_IN: "fadeIn",
  FADE_OUT: "fadeOut",

  // Slide
  SLIDE_IN_LEFT: "slideInLeft",
  SLIDE_IN_RIGHT: "slideInRight",
  SLIDE_IN_TOP: "slideInTop",
  SLIDE_IN_BOTTOM: "slideInBottom",

  SLIDE_OUT_LEFT: "slideOutLeft",
  SLIDE_OUT_RIGHT: "slideOutRight",
  SLIDE_OUT_TOP: "slideOutTop",
  SLIDE_OUT_BOTTOM: "slideOutBottom",

  // Zoom
  ZOOM_IN: "zoomIn",
  ZOOM_OUT: "zoomOut",

  // Scale
  SCALE_IN: "scaleIn",
  SCALE_OUT: "scaleOut",

  // Rotate
  ROTATE_IN: "rotateIn",
  ROTATE_OUT: "rotateOut",

  // Flip
  FLIP_X: "flipX",
  FLIP_Y: "flipY",

  // Bounce
  BOUNCE_IN: "bounceIn",
  BOUNCE_OUT: "bounceOut",

  // Blur
  BLUR_IN: "blurIn",
  BLUR_OUT: "blurOut",

  // Attention
  SHAKE: "shake",
  PULSE: "pulse",
  WOBBLE: "wobble",
  SWING: "swing",
  JELLY: "jelly",

  // Utility
  NONE: "none",
} as const;

export type AnimationName =
  (typeof ANIMATION_NAME)[keyof typeof ANIMATION_NAME];
