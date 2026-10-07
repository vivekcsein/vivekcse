"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";
import type { HeroOrbitConfig } from "@/packages/configs/hero3d.config";

const ITEM = "[data-orbit-item]";
const FRONT_Z = 30; // above the main image
const BACK_Z = 10; // below the main image

/**
 * Revolves every `[data-orbit-item]` inside `scope` around the centre of
 * `scope` on an ellipse. Items are spaced evenly, so adding or removing
 * one needs no extra config. Icons stay upright; depth is faked with a
 * small scale change and a z-index swap (back half goes behind the main image).
 */
export function useHeroOrbit(
  scope: RefObject<HTMLElement | null>,
  config: HeroOrbitConfig,
  paused = false,
  enabled = true,
) {
  const { duration, radiusX, radiusY, depthScale, startAngle, direction } =
    config;

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !enabled) return;

      const items = gsap.utils.toArray<HTMLElement>(ITEM, root);
      if (!items.length) return;

      const step = 360 / items.length;
      const state = { angle: 0 };
      let rx = 0;
      let ry = 0;

      const measure = () => {
        rx = root.clientWidth * radiusX;
        ry = root.clientHeight * radiusY;
      };

      const render = () => {
        items.forEach((el, i) => {
          const rad =
            ((startAngle + direction * (state.angle + i * step)) * Math.PI) /
            180;
          const depth = Math.sin(rad); // -1 back ... 1 front
          gsap.set(el, {
            x: Math.cos(rad) * rx,
            y: depth * ry,
            scale: 1 + depth * depthScale,
            zIndex: depth > 0 ? FRONT_Z : BACK_Z,
          });
        });
      };

      measure();
      render();

      const observer = new ResizeObserver(() => {
        measure();
        render();
      });
      observer.observe(root);

      const tween = paused
        ? null
        : gsap.to(state, {
            angle: 360,
            duration,
            ease: "none",
            repeat: -1,
            onUpdate: render,
          });

      return () => {
        observer.disconnect();
        tween?.kill();
      };
    },
    {
      scope,
      revertOnUpdate: true,
      dependencies: [
        enabled,
        duration,
        radiusX,
        radiusY,
        depthScale,
        startAngle,
        direction,
        paused,
      ],
    },
  );
}
