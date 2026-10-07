/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

/** One floating icon. Only `src` is required; the rest is auto-placed. */
export type HeroItem = {
  src: string;
  alt?: string;
  /** resting position (top-left, % of stage). Used when rotation is off. */
  left?: string;
  top?: string;
  /** rendered width in px. Used when rotation is off (rotation = uniform size). */
  width?: number;
  /** translateZ in px (real 3D depth). Used when rotation is off. */
  z?: number;
  /** pointer parallax strength in px */
  px?: number;
  py?: number;
  /** resting rotation in deg. Used when rotation is off. */
  rz?: number;
  /** override the auto drift for this icon */
  drift?: { radius: number; duration: number };
};

export type ResolvedHeroItem = Required<
  Omit<HeroItem, "drift" | "rz" | "alt">
> &
  Pick<HeroItem, "drift" | "rz"> & { alt: string };

export type HeroMain = {
  src: string;
  alt: string;
  width: number;
  height: number;
  z: number;
  px: number;
  py: number;
  drift: { radius: number; duration: number };
};

/** rotation: icons revolve around the main image */
export type HeroOrbitConfig = {
  /** seconds for one full revolution (higher = slower) */
  duration: number;
  /** orbit radius as a fraction of stage width / height */
  radiusX: number;
  radiusY: number;
  /** how much icons grow/shrink with depth (0 = flat) */
  depthScale: number;
  /** start angle in deg (-90 = first icon at the top) */
  startAngle: number;
  /** 1 = clockwise, -1 = counter-clockwise */
  direction: 1 | -1;
};

/** parallax: pointer tilt + in-place drift */
export type HeroMotionConfig = {
  /** max stage tilt in deg at the pointer edge */
  tiltX: number;
  tiltY: number;
  /** seconds the pointer motion takes to settle (higher = softer) */
  follow: number;
  /** slow in-place drift: radius px, seconds per lap */
  drift: {
    minRadius: number;
    maxRadius: number;
    minDuration: number;
    maxDuration: number;
  };
};

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

export const heroMain: HeroMain = {
  src: "/images/hero-3d/hero-main.png",
  alt: "3D illustrated developer desk setup",
  width: 1600,
  height: 1200,
  z: 80,
  px: 10,
  py: 6,
  drift: { radius: 4, duration: 60 },
};

/**
 * Add a new icon = add one object here (just `src` is enough).
 * Rotation spaces icons evenly by itself; left/top/width/z/px/py are only
 * read when rotation is off (static layout + parallax).
 */
export const heroItems: HeroItem[] = [
  {
    src: "/images/hero-3d/hero-01.png",
    alt: "AI",
    left: "8%",
    top: "14%",
    width: 140,
    z: -40,
    px: -25,
    py: -10,
  },
  {
    src: "/images/hero-3d/hero-02.png",
    alt: "Code",
    left: "3%",
    top: "48%",
    width: 100,
    z: -20,
    px: -18,
    py: -12,
    rz: -2,
  },
  {
    src: "/images/hero-3d/hero-03.png",
    alt: "Config",
    left: "43%",
    top: "5%",
    width: 112,
    z: 140,
    px: 26,
    py: 20,
    rz: -6,
  },
  {
    src: "/images/hero-3d/hero-04.png",
    alt: "React",
    left: "80%",
    top: "11%",
    width: 82,
    z: 60,
    px: 35,
    py: 25,
    rz: 4,
  },
  {
    src: "/images/hero-3d/hero-05.png",
    alt: "Automation",
    left: "80%",
    top: "50%",
    width: 130,
    z: 50,
    px: 30,
    py: 20,
    rz: -3,
  },
  {
    src: "/images/hero-3d/hero-06.png",
    alt: "Database",
    left: "60%",
    top: "76%",
    width: 120,
    z: 110,
    px: 22,
    py: 14,
  },
  {
    src: "/images/hero-3d/hero-07.png",
    alt: "TypeScript",
    left: "20%",
    top: "74%",
    width: 105,
    z: 90,
    px: -22,
    py: 16,
    rz: 3,
  },
];

export const heroOrbit: HeroOrbitConfig = {
  duration: 120,
  radiusX: 0.42,
  radiusY: 0.38,
  depthScale: 0.1,
  startAngle: -90,
  direction: 1,
};

export const heroMotion: HeroMotionConfig = {
  tiltX: 4,
  tiltY: 7,
  follow: 0.9,
  drift: { minRadius: 8, maxRadius: 16, minDuration: 35, maxDuration: 55 },
};

export const heroDefaults = {
  /** distance multiplier from the centre image (1 = config values) */
  spread: { rotation: 1, static: 0.8 },
  /** main image width: any CSS length / % of the stage */
  mainSize: "clamp(480px, 60%, 540px)",
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/**
 * Fills in anything an item leaves out, so a bare `{ src }` still lands on
 * an even ellipse around the main image with sensible depth + parallax.
 */
export function resolveHeroItems(items: HeroItem[]): ResolvedHeroItem[] {
  const step = 360 / Math.max(items.length, 1);

  return items.map((item, i) => {
    const rad = ((-90 + i * step) * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    return {
      src: item.src,
      alt: item.alt ?? "",
      left: item.left ?? `${(50 + cos * 38 - 5.5).toFixed(1)}%`,
      top: item.top ?? `${(50 + sin * 34 - 7).toFixed(1)}%`,
      width: item.width ?? 110,
      z: item.z ?? Math.round(sin * 100),
      px: item.px ?? Math.round(cos * 30),
      py: item.py ?? Math.round(sin * 18),
      rz: item.rz,
      drift: item.drift,
    };
  });
}
