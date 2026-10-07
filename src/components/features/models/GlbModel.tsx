"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Box3, type Group, Vector3 } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { Model3D } from "@/packages/configs/model3d.config";
import { Motion } from "./Motion";

type GlbModelProps = {
  model: Model3D;
  src: string;
  motion: boolean;
};

/** Start downloading a GLB before it is needed (e.g. on hover / route change). */
export const preloadModel = (src: string) => useGLTF.preload(src, false, false);

/**
 * Loads one GLB, auto-fits it (largest axis = `model.size`), centres it, then
 * applies the config's position / rotation / animation preset / clip.
 */
export const GlbModel = ({ model, src, motion }: GlbModelProps) => {
  // No Draco/Meshopt: the optimize script writes plain glTF (see models-optimize.ts)
  const { scene, animations } = useGLTF(src, false, false);
  const root = useMemo(() => clone(scene), [scene]);
  const holder = useRef<Group>(null);
  const { actions, names } = useAnimations(animations, holder);

  const fit = useMemo(() => {
    root.updateMatrixWorld(true);
    const box = new Box3().setFromObject(root);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const largest = Math.max(size.x, size.y, size.z) || 1;
    return {
      scale: model.size / largest,
      offset: [-center.x, -center.y, -center.z] as const,
    };
  }, [root, model.size]);

  useEffect(() => {
    if (!model.clip) return;
    const action = actions[model.clip];
    if (!action) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[3d] ${model.key}: clip "${model.clip}" not found. Available: ${names.join(", ") || "(none)"}`,
        );
      }
      return;
    }
    action.reset().fadeIn(0.3).play();
    return () => {
      action.fadeOut(0.2);
    };
  }, [actions, names, model.clip, model.key]);

  return (
    <group position={[...model.position]} rotation={[...model.rotation]}>
      <Motion enabled={motion} preset={model.animation}>
        <group ref={holder} scale={fit.scale}>
          <primitive object={root} position={[...fit.offset]} />
        </group>
      </Motion>
    </group>
  );
};
