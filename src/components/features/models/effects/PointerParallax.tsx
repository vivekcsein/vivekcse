"use client";

import { useFrame } from "@react-three/fiber";
import { type ReactNode, useEffect, useRef } from "react";
import { type Group, MathUtils } from "three";

type PointerParallaxProps = {
  /** 0–1. How far the scene turns toward the cursor. */
  strength?: number;
  enabled: boolean;
  children: ReactNode;
};

/**
 * Eases the whole scene toward the cursor. Listens to the window, not the
 * canvas, so the hero reacts anywhere on the page.
 */
export const PointerParallax = ({
  strength = 0.3,
  enabled,
  children,
}: PointerParallaxProps) => {
  const group = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  useFrame((_, delta) => {
    const target = group.current;
    if (!enabled || !target) return;
    target.rotation.y = MathUtils.damp(
      target.rotation.y,
      pointer.current.x * strength,
      4,
      delta,
    );
    target.rotation.x = MathUtils.damp(
      target.rotation.x,
      pointer.current.y * strength * 0.5,
      4,
      delta,
    );
  });

  return <group ref={group}>{children}</group>;
};
