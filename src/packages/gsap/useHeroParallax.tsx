"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";

const STAGE = "[data-px-stage]";
const LAYER = "[data-px-layer]";
const DRIFT = "[data-px-drift]";

type Options = {
  tiltX: number;
  tiltY: number;
  follow: number;
  /** false = no tilt / pointer shift (depth + drift still apply) */
  pointer?: boolean;
};

const num = (value: string | undefined, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

/**
 * Pointer parallax + slow in-place drift.
 *
 * - `[data-px-stage]`  tilts in 3D toward the pointer.
 * - `[data-px-layer]`  shifts by its own data-px / data-py strength (depth feel).
 * - `[data-px-drift]`  circles slowly around its resting point (data-r px, data-d s).
 *
 * Pointer effects run only on fine-pointer devices. Everything is off under
 * prefers-reduced-motion. Cleanup is automatic.
 */
export function useHeroParallax(
  scope: RefObject<HTMLElement | null>,
  { tiltX, tiltY, follow, pointer: usePointer = true }: Options,
) {
  useGSAP(
    () => {
      const root = scope.current;
      const stage = root?.querySelector<HTMLElement>(STAGE);
      if (!root || !stage) return;

      const layers = gsap.utils.toArray<HTMLElement>(LAYER, root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          pointer: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { motion, pointer } = context.conditions as {
            motion: boolean;
            pointer: boolean;
          };
          if (!motion) return;

          // depth + resting rotation
          layers.forEach((layer) => {
            gsap.set(layer, {
              z: num(layer.dataset.z),
              rotation: num(layer.dataset.rz),
            });
          });

          // slow circular drift, each layer on its own lap and start angle
          layers.forEach((layer) => {
            const drift = layer.querySelector<HTMLElement>(DRIFT);
            if (!drift) return;

            const radius = num(drift.dataset.r, 10);
            const dir = drift.dataset.dir === "-1" ? -1 : 1;
            const phase = num(drift.dataset.phase);
            const setX = gsap.quickSetter(drift, "x", "px");
            const setY = gsap.quickSetter(drift, "y", "px");
            const state = { a: phase };

            const render = () => {
              setX(Math.cos(state.a) * radius);
              setY(Math.sin(state.a) * radius);
            };
            render();

            gsap.to(state, {
              a: phase + dir * Math.PI * 2,
              duration: num(drift.dataset.d, 40),
              ease: "none",
              repeat: -1,
              onUpdate: render,
            });
          });

          if (!pointer || !usePointer) return;

          // pointer parallax
          const quick = { duration: follow, ease: "power3.out" };
          const tiltToX = gsap.quickTo(stage, "rotationX", quick);
          const tiltToY = gsap.quickTo(stage, "rotationY", quick);
          const shifts = layers.map((layer) => ({
            x: gsap.quickTo(layer, "x", quick),
            y: gsap.quickTo(layer, "y", quick),
            px: num(layer.dataset.px),
            py: num(layer.dataset.py),
          }));

          const apply = (nx: number, ny: number) => {
            tiltToY(nx * tiltY);
            tiltToX(-ny * tiltX);
            shifts.forEach((s) => {
              s.x(nx * s.px);
              s.y(ny * s.py);
            });
          };

          const onMove = (event: PointerEvent) => {
            const rect = root.getBoundingClientRect();
            const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
            const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
            apply(gsap.utils.clamp(-1, 1, nx), gsap.utils.clamp(-1, 1, ny));
          };
          const onLeave = () => apply(0, 0);

          root.addEventListener("pointermove", onMove);
          root.addEventListener("pointerleave", onLeave);

          return () => {
            root.removeEventListener("pointermove", onMove);
            root.removeEventListener("pointerleave", onLeave);
          };
        },
      );

      return () => mm.revert();
    },
    {
      scope,
      revertOnUpdate: true,
      dependencies: [tiltX, tiltY, follow, usePointer],
    },
  );
}
