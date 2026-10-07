"use client";

import Image from "next/image";
import { type CSSProperties, type ReactNode, useMemo, useRef } from "react";
import {
  type HeroItem,
  type HeroMotionConfig,
  type HeroOrbitConfig,
  heroDefaults,
  heroItems,
  heroMain,
  heroMotion,
  heroOrbit,
  type ResolvedHeroItem,
  resolveHeroItems,
} from "@/packages/configs/hero3d.config";
import { useHeroOrbit } from "@/packages/gsap/useHeroOrbit";
import { useHeroParallax } from "@/packages/gsap/useHeroParallax";
import { useReducedMotion } from "@/packages/hooks/useReducedMotion";
import "@/styles/features/hero/hero3d.css";

export type Hero3DProps = {
  /** icons revolve around the main image (default true) */
  rotation?: boolean;
  /** pointer tilt + depth shift (default true) */
  parallax?: boolean;
  /** slow in-place float of every icon (default: on when rotation is off) */
  drift?: boolean;
  /**
   * distance of icons from the centre image: 1 = config values,
   * <1 closer, >1 farther. Default: 1 with rotation, 0.8 without.
   */
  spread?: number;
  /** override spread on one axis only */
  spreadX?: number;
  spreadY?: number;
  /** seconds per full revolution (rotation only) */
  duration?: number;
  /** main image width: CSS length or % of the stage */
  mainSize?: string;
  /** icons to show (default: heroItems from hero.config) */
  items?: HeroItem[];
  /** advanced overrides, merged over the config defaults */
  orbit?: Partial<HeroOrbitConfig>;
  motion?: Partial<HeroMotionConfig>;
  className?: string;
};

// seeded PRNG: "random" but identical on server and client (no hydration mismatch)
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createDrift(
  override: { radius: number; duration: number } | undefined,
  index: number,
  motion: HeroMotionConfig,
) {
  const rand = mulberry32(index * 9973 + 17);
  const { minRadius, maxRadius, minDuration, maxDuration } = motion.drift;
  return {
    radius: override?.radius ?? minRadius + rand() * (maxRadius - minRadius),
    duration:
      override?.duration ?? minDuration + rand() * (maxDuration - minDuration),
    dir: rand() > 0.5 ? 1 : -1,
    phase: rand() * Math.PI * 2,
  };
}

type LayerProps = {
  z: number;
  px: number;
  py: number;
  rz?: number;
  /** undefined = no drift */
  drift?: ReturnType<typeof createDrift>;
  className?: string;
  children: ReactNode;
};

/** parallax layer (+ optional drift wrapper) around one image */
function Layer({ z, px, py, rz = 0, drift, className, children }: LayerProps) {
  return (
    <div
      className={className ? `hero-layer ${className}` : "hero-layer"}
      data-px-layer
      data-z={z}
      data-px={px}
      data-py={py}
      data-rz={rz}
    >
      {drift ? (
        <div
          className="hero-drift"
          data-px-drift
          data-r={drift.radius.toFixed(2)}
          data-d={drift.duration.toFixed(2)}
          data-dir={drift.dir}
          data-phase={drift.phase.toFixed(3)}
        >
          {children}
        </div>
      ) : (
        <div className="hero-drift">{children}</div>
      )}
    </div>
  );
}

function itemStyle(
  item: ResolvedHeroItem,
  rotation: boolean,
): CSSProperties | undefined {
  if (rotation) return undefined; // orbit hook places it
  return {
    // scale the distance from the stage centre (50% / 50%) by --spread-*
    left: `calc(50% + (${item.left} - 50%) * var(--spread-x))`,
    top: `calc(50% + (${item.top} - 50%) * var(--spread-y))`,
    width: item.width,
  };
}

export function Hero3D({
  rotation = true,
  parallax = true,
  drift,
  spread,
  spreadX,
  spreadY,
  duration,
  mainSize,
  items = heroItems,
  orbit,
  motion,
  className,
}: Hero3DProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const resolved = useMemo(() => resolveHeroItems(items), [items]);

  const baseSpread =
    spread ??
    (rotation ? heroDefaults.spread.rotation : heroDefaults.spread.static);
  const sx = spreadX ?? baseSpread;
  const sy = spreadY ?? baseSpread;
  const floating = drift ?? !rotation;

  const motionConfig: HeroMotionConfig = { ...heroMotion, ...motion };
  const orbitConfig: HeroOrbitConfig = {
    ...heroOrbit,
    ...orbit,
    duration: duration ?? orbit?.duration ?? heroOrbit.duration,
  };
  // spread also widens / tightens the orbit
  orbitConfig.radiusX *= sx;
  orbitConfig.radiusY *= sy;

  useHeroOrbit(stageRef, orbitConfig, reducedMotion, rotation);
  useHeroParallax(sceneRef, {
    tiltX: motionConfig.tiltX,
    tiltY: motionConfig.tiltY,
    follow: motionConfig.follow,
    pointer: parallax,
  });

  const sceneStyle = {
    "--spread-x": sx,
    "--spread-y": sy,
    "--main-size": mainSize ?? heroDefaults.mainSize,
  } as CSSProperties;

  const classes = ["hero-scene", rotation && "is-rotating", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} ref={sceneRef} style={sceneStyle}>
      <div className="hero-stage" data-px-stage ref={stageRef}>
        <div className="hero-shadow" aria-hidden="true" />

        {resolved.map((item, index) => (
          <div
            key={item.src}
            className="hero-item"
            data-orbit-item
            style={itemStyle(item, rotation)}
          >
            <Layer
              // rotation keeps every plane flat and upright; paint order sorts depth
              z={rotation ? 0 : item.z}
              px={item.px}
              py={item.py}
              rz={rotation ? 0 : item.rz}
              drift={
                floating
                  ? createDrift(item.drift, index + 1, motionConfig)
                  : undefined
              }
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={256}
                height={256}
                draggable={false}
                className="hero-img"
                loading="lazy"
              />
            </Layer>
          </div>
        ))}

        <Layer
          className="hero-main"
          z={rotation ? 0 : heroMain.z}
          px={heroMain.px}
          py={heroMain.py}
          drift={
            floating ? createDrift(heroMain.drift, 99, motionConfig) : undefined
          }
        >
          <Image
            src={heroMain.src}
            alt={heroMain.alt}
            width={heroMain.width}
            height={heroMain.height}
            loading="lazy"
            draggable={false}
            className="hero-img"
          />
        </Layer>
      </div>
    </div>
  );
}

export default Hero3D;
