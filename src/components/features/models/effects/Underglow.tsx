"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  CanvasTexture,
  type Mesh,
  type MeshBasicMaterial,
  SRGBColorSpace,
} from "three";
import type { EffectProps } from "./types";

/** Soft radial falloff, drawn once (white → transparent), tinted by the material colour. */
const makeGlowTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.45, "rgba(255,255,255,0.35)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
};

/** Neon glow + ring on the "floor" under the model (the purple base light in the design). */
export const Underglow = ({ colors, size, motion }: EffectProps) => {
  const texture = useMemo(makeGlowTexture, []);
  const glow = useRef<Mesh>(null);
  const ringMaterial = useRef<MeshBasicMaterial>(null);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(({ clock }) => {
    if (!motion) return;
    const pulse = 0.5 + 0.5 * Math.sin(clock.elapsedTime * 1.6);
    if (ringMaterial.current)
      ringMaterial.current.opacity = 0.55 + pulse * 0.35;
    if (glow.current) glow.current.scale.setScalar(1 + pulse * 0.04);
  });

  const radius = size * 0.62;
  const floor = -size * 0.36;

  return (
    <group position={[0, floor, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={glow}>
        <planeGeometry args={[radius * 3, radius * 3]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color={colors.primary}
          depthWrite={false}
          map={texture}
          opacity={0.55}
          toneMapped={false}
          transparent
        />
      </mesh>
      <mesh>
        <ringGeometry args={[radius * 0.96, radius, 96]} />
        <meshBasicMaterial
          ref={ringMaterial}
          blending={AdditiveBlending}
          color={colors.accent}
          depthWrite={false}
          opacity={0.8}
          toneMapped={false}
          transparent
        />
      </mesh>
    </group>
  );
};
