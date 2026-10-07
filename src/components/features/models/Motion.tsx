"use client";

import { Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { type ReactNode, useEffect, useRef } from "react";
import type { Group } from "three";
import type { ModelAnimation } from "@/packages/configs/model3d.config";

type MotionProps = {
  preset: ModelAnimation;
  /** false = reduced motion: render statically. */
  enabled: boolean;
  children: ReactNode;
};

const Spin = ({ children }: { children: ReactNode }) => {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35;
  });
  return <group ref={ref}>{children}</group>;
};

const Entrance = ({ children }: { children: ReactNode }) => {
  const ref = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const group = ref.current;
    if (!group) return;
    const tween = gsap.fromTo(
      group.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.9,
        ease: "back.out(1.7)",
        onUpdate: invalidate,
      },
    );
    return () => {
      tween.kill();
    };
  }, [invalidate]);

  return <group ref={ref}>{children}</group>;
};

const Bob = ({ children }: { children: ReactNode }) => (
  <Float
    floatIntensity={0.6}
    floatingRange={[-0.08, 0.08]}
    rotationIntensity={0.25}
    speed={1.4}
  >
    {children}
  </Float>
);

/** Applies one of the `animation` presets from model3d.config.ts. */
export const Motion = ({ preset, enabled, children }: MotionProps) => {
  if (!enabled || preset === "none") return <>{children}</>;

  switch (preset) {
    case "float":
      return <Bob>{children}</Bob>;
    case "spin":
      return <Spin>{children}</Spin>;
    case "float-spin":
      return (
        <Bob>
          <Spin>{children}</Spin>
        </Bob>
      );
    case "entrance":
      return <Entrance>{children}</Entrance>;
  }
};
