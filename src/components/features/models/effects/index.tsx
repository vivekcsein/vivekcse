"use client";

import type { ModelEffect } from "@/packages/configs/model3d.config";
import { FloatingTiles } from "./FloatingTiles";
import { OrbitRings } from "./OrbitRings";
import { Particles } from "./Particles";
import type { EffectProps } from "./types";
import { Underglow } from "./Underglow";

type EffectComponentProps = EffectProps & { effect: ModelEffect };

/**
 * Maps an entry of `effects` in model3d.config.ts to its component.
 * (`pointer-parallax` wraps the scene instead — see ModelViewer.)
 */
export const Effect = ({ effect, ...props }: EffectComponentProps) => {
  switch (effect.type) {
    case "underglow":
      return <Underglow {...props} />;
    case "orbit-rings":
      return <OrbitRings {...props} count={effect.count} />;
    case "tiles":
      return <FloatingTiles {...props} items={effect.items} />;
    case "sparkles":
      return <Particles {...props} count={effect.count} />;
    case "pointer-parallax":
      return null;
  }
};
