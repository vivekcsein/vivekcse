"use client";

import {
  OrbitControls,
  PerformanceMonitor,
  PerspectiveCamera,
  Stats,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import {
  MathUtils,
  type PerspectiveCamera as ThreePerspectiveCamera,
} from "three";
import {
  getModel,
  type Model3D,
  type ModelKey,
} from "@/packages/configs/model3d.config";
import { useReducedMotion, useThemeColors } from "@/packages/hooks";
import { cn } from "@/packages/utils/cn";
import { resolveModelSrc } from "@/packages/utils/model3d";
import { Effect } from "./effects";
import { PointerParallax } from "./effects/PointerParallax";
import { GlbModel } from "./GlbModel";
import { ModelErrorBoundary } from "./ModelErrorBoundary";
import { PlaceholderModel } from "./PlaceholderModel";
import { SceneLights } from "./SceneLights";

/** Anything in the registry entry except its identity can be overridden (used by the dev lab). */
export type ModelOverrides = Partial<Omit<Model3D, "key" | "file">>;

type ModelViewerProps = {
  modelKey: ModelKey;
  className?: string;
  /** Let visitors drag-orbit the model. Keep off for decorative tiles. */
  interactive?: boolean;
  overrides?: ModelOverrides;
  /** false pauses rendering (section scrolled out of view). */
  active?: boolean;
  /** FPS / frame-time overlay (dev lab). */
  showStats?: boolean;
};

const MAX_DPR = 1.75;

/**
 * Half-width of the scene (tiles, rings) as a multiple of `model.size`.
 * The camera is pulled back just enough that this always fits horizontally,
 * so tall/narrow boxes (phones) never crop the scene. Wide boxes are unaffected.
 */
const SCENE_HALF_WIDTH = 0.76;

type FitCameraProps = {
  position: readonly [number, number, number];
  size: number;
};

const FitCamera = ({ position, size }: FitCameraProps) => {
  const camera = useThree((state) => state.camera) as ThreePerspectiveCamera;
  const aspect = useThree((state) => state.size.width / state.size.height);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const halfFov = MathUtils.degToRad(camera.fov / 2);
    const needed = (size * SCENE_HALF_WIDTH) / (Math.tan(halfFov) * aspect);
    camera.position.set(
      position[0],
      position[1],
      Math.max(position[2], needed),
    );
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, aspect, position, size, invalidate]);

  return null;
};

export const ModelViewer = ({
  modelKey,
  className,
  interactive = false,
  overrides,
  active = true,
  showStats = false,
}: ModelViewerProps) => {
  const model: Model3D = { ...getModel(modelKey), ...overrides };
  const colors = useThemeColors();
  const reducedMotion = useReducedMotion();
  const [maxDpr, setMaxDpr] = useState(MAX_DPR);

  const motion = !reducedMotion;
  const src = resolveModelSrc(model);
  const parallax = model.effects.find((e) => e.type === "pointer-parallax");

  const placeholder = (
    <PlaceholderModel colors={colors} model={model} motion={motion} />
  );

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Canvas
        dpr={[1, maxDpr]}
        frameloop={active && motion ? "always" : "demand"}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        // Non-interactive scenes must not swallow clicks or touch-scrolling.
        style={{ pointerEvents: interactive ? "auto" : "none" }}
      >
        <PerspectiveCamera
          fov={model.camera.fov}
          makeDefault
          position={[...model.camera.position]}
        />
        <FitCamera position={model.camera.position} size={model.size} />
        <PerformanceMonitor
          onDecline={() => setMaxDpr(1)}
          onIncline={() => setMaxDpr(MAX_DPR)}
        />
        <SceneLights colors={colors} />

        <PointerParallax
          enabled={motion && parallax !== undefined}
          strength={
            parallax?.type === "pointer-parallax"
              ? parallax.strength
              : undefined
          }
        >
          <ModelErrorBoundary fallback={placeholder}>
            <Suspense fallback={null}>
              {src ? (
                <GlbModel model={model} motion={motion} src={src} />
              ) : (
                placeholder
              )}
            </Suspense>
          </ModelErrorBoundary>

          {model.effects.map((effect) => (
            <Effect
              key={effect.type}
              colors={colors}
              effect={effect}
              motion={motion}
              size={model.size}
            />
          ))}
        </PointerParallax>

        {interactive && <OrbitControls enablePan={false} enableZoom={false} />}
        {showStats && <Stats />}
      </Canvas>
    </div>
  );
};
