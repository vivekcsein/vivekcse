"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";

type UseGsapHoverCardOptions = {
  tilt?: boolean;
  tiltStrength?: number;
  imageScale?: number;
  imageX?: number;
  imageY?: number;
  contentY?: number;
  duration?: number;
};

const SELECTORS = {
  image: "[data-card-image]",
  content: "[data-card-content]",
  glow: "[data-card-glow]",
  border: "[data-card-border]",
  arrow: "[data-card-arrow]",
} as const;

export function useInteractiveCard(
  scope: RefObject<HTMLElement | null>,
  options: UseGsapHoverCardOptions = {},
) {
  const {
    tilt = true,
    tiltStrength = 5,
    imageScale = 1.06,
    imageX = 8,
    imageY = -4,
    contentY = -4,
    duration = 0.45,
  } = options;

  useGSAP(
    () => {
      const root = scope.current;

      if (!root) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      const image = root.querySelector<HTMLElement>(SELECTORS.image);
      const content = root.querySelector<HTMLElement>(SELECTORS.content);
      const glow = root.querySelector<HTMLElement>(SELECTORS.glow);
      const border = root.querySelector<HTMLElement>(SELECTORS.border);
      const arrow = root.querySelector<HTMLElement>(SELECTORS.arrow);

      const elements = [image, content, glow, border, arrow].filter(Boolean);

      const handlePointerEnter = () => {
        gsap.killTweensOf(elements);

        if (image) {
          gsap.to(image, {
            scale: imageScale,
            x: imageX,
            y: imageY,
            duration,
            ease: "power3.out",
          });
        }

        if (content) {
          gsap.to(content, {
            y: contentY,
            duration: duration + 0.05,
            ease: "power3.out",
          });
        }

        if (glow) {
          gsap.to(glow, {
            opacity: 1,
            scale: 1.08,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        if (border) {
          gsap.to(border, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (arrow) {
          gsap.to(arrow, {
            x: 4,
            duration: 0.35,
            ease: "power3.out",
          });
        }
      };

      const handlePointerLeave = () => {
        gsap.killTweensOf(elements);

        if (image) {
          gsap.to(image, {
            scale: 1,
            x: 0,
            y: 0,
            duration: duration + 0.1,
            ease: "power3.out",
          });
        }

        if (content) {
          gsap.to(content, {
            y: 0,
            duration: duration + 0.1,
            ease: "power3.out",
          });
        }

        if (glow) {
          gsap.to(glow, {
            opacity: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        if (border) {
          gsap.to(border, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (arrow) {
          gsap.to(arrow, {
            x: 0,
            duration: 0.3,
            ease: "power3.out",
          });
        }

        gsap.to(root, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (!tilt || event.pointerType !== "mouse") {
          return;
        }

        const rect = root.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * tiltStrength;
        const rotateX = (0.5 - y) * tiltStrength;

        gsap.to(root, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      };

      root.addEventListener("pointerenter", handlePointerEnter);
      root.addEventListener("pointerleave", handlePointerLeave);
      root.addEventListener("pointermove", handlePointerMove);

      return () => {
        root.removeEventListener("pointerenter", handlePointerEnter);
        root.removeEventListener("pointerleave", handlePointerLeave);
        root.removeEventListener("pointermove", handlePointerMove);

        gsap.killTweensOf([root, ...elements]);
      };
    },
    {
      scope,
      dependencies: [
        tilt,
        tiltStrength,
        imageScale,
        imageX,
        imageY,
        contentY,
        duration,
      ],
    },
  );
}
