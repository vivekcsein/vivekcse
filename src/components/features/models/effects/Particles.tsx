"use client";

import { Sparkles } from "@react-three/drei";
import type { EffectProps } from "./types";

type ParticlesProps = EffectProps & { count?: number };

/** Faint drifting dots (the speckle in the hero background). */
export const Particles = ({
  colors,
  size,
  motion,
  count = 24,
}: ParticlesProps) => (
  <Sparkles
    color={colors.accent}
    count={count}
    opacity={0.7}
    scale={[size * 1.8, size * 1.1, size * 1.2]}
    size={2.2}
    speed={motion ? 0.35 : 0}
  />
);
