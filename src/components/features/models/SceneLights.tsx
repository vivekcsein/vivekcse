"use client";

import { Environment, Lightformer } from "@react-three/drei";
import type { ThemeColors } from "@/packages/hooks";

type SceneLightsProps = { colors: ThemeColors };

/**
 * Key + rim lights tinted from the theme, plus a *procedural* environment
 * map (Lightformers) for glossy reflections.
 *
 * Do NOT use `<Environment preset="city">` here: presets download an HDR from
 * a third-party CDN at runtime, which the site's CSP blocks (and it would be
 * a network dependency for a static site anyway).
 */
export const SceneLights = ({ colors }: SceneLightsProps) => (
  <>
    <ambientLight intensity={0.45} />
    <directionalLight intensity={1.4} position={[4, 6, 5]} />
    <pointLight
      color={colors.primary}
      distance={14}
      intensity={30}
      position={[-4, 1.5, 2]}
    />
    <pointLight
      color={colors.accent}
      distance={14}
      intensity={18}
      position={[4, 0.5, -2]}
    />
    {/* key = re-bake the map when the theme colour changes */}
    <Environment key={colors.primary} frames={1} resolution={128}>
      <Lightformer
        color={colors.foreground}
        form="rect"
        intensity={1.4}
        position={[0, 5, -6]}
        scale={[10, 3, 1]}
      />
      <Lightformer
        color={colors.primary}
        form="ring"
        intensity={2.2}
        position={[-5, 1, 2]}
        scale={4}
      />
      <Lightformer
        color={colors.accent}
        form="rect"
        intensity={1.2}
        position={[5, 2, 3]}
        scale={[3, 6, 1]}
      />
    </Environment>
  </>
);
