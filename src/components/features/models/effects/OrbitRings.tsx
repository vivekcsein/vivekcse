"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, type Group } from "three";
import type { EffectProps } from "./types";

type OrbitRingsProps = EffectProps & { count?: number };

/** Thin glowing rings, tilted and slowly turning, circling the model. */
export const OrbitRings = ({
  colors,
  size,
  motion,
  count = 2,
}: OrbitRingsProps) => {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!motion || !group.current) return;
    group.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }, (_, index) => (
        <mesh
          // biome-ignore lint/suspicious/noArrayIndexKey: static list, never reordered
          key={index}
          rotation={[Math.PI / 2 + 0.35 * (index + 1), 0.4 * index, 0]}
        >
          <torusGeometry
            args={[size * (0.62 + index * 0.12), 0.006 * size, 8, 120]}
          />
          <meshBasicMaterial
            blending={AdditiveBlending}
            color={index % 2 === 0 ? colors.primary : colors.accent}
            opacity={0.8 - index * 0.2}
            toneMapped={false}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
};
