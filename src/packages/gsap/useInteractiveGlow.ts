"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface UseCardInteractiveOptions {
  tilt?: number;
  perspective?: number;
  glare?: boolean;
  float?: boolean;
  floatDistance?: number;
  floatDuration?: number;
  entrance?: boolean;
}

const defaultOptions: Required<UseCardInteractiveOptions> = {
  tilt: 14,
  perspective: 1000,
  glare: true,
  float: true,
  floatDistance: 5,
  floatDuration: 2.8,
  entrance: true,
};

export const useInteractiveGlow = (options: UseCardInteractiveOptions = {}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const config = {
    ...defaultOptions,
    ...options,
  };

  useGSAP(
    () => {
      const card = cardRef.current;
      const glare = glareRef.current;

      if (!card) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(card, {
        transformPerspective: config.perspective,
        transformOrigin: "center center",
      });

      if (reduceMotion) return;

      const quickRotateX = gsap.quickTo(card, "rotationX", {
        duration: 0.45,
        ease: "power3.out",
      });

      const quickRotateY = gsap.quickTo(card, "rotationY", {
        duration: 0.45,
        ease: "power3.out",
      });

      const quickGlareX = glare
        ? gsap.quickTo(glare, "x", {
            duration: 0.4,
            ease: "power2.out",
          })
        : null;

      const quickGlareY = glare
        ? gsap.quickTo(glare, "y", {
            duration: 0.4,
            ease: "power2.out",
          })
        : null;

      const handlePointerMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const percentX = x / rect.width;
        const percentY = y / rect.height;

        const rotateY = (percentX - 0.5) * config.tilt;
        const rotateX = (0.5 - percentY) * config.tilt;

        quickRotateX(rotateX);
        quickRotateY(rotateY);

        // Drives the cursor-tracked border shine (`.glow-card::after` in
        // app.css, applied to every Card instance) — purely
        // presentational, reuses the pointer position already computed
        // above for the tilt effect.
        card.style.setProperty("--shine-x", `${percentX * 100}%`);
        card.style.setProperty("--shine-y", `${percentY * 100}%`);

        if (glare && quickGlareX && quickGlareY) {
          quickGlareX(x - glare.offsetWidth / 2);
          quickGlareY(y - glare.offsetHeight / 2);
        }
      };

      const handlePointerEnter = () => {
        if (!glare) return;

        gsap.to(glare, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handlePointerLeave = () => {
        quickRotateX(0);
        quickRotateY(0);

        if (!glare) return;

        gsap.to(glare, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });
      };

      card.addEventListener("pointermove", handlePointerMove);
      card.addEventListener("pointerenter", handlePointerEnter);
      card.addEventListener("pointerleave", handlePointerLeave);

      let floatAnimation: gsap.core.Tween | undefined;

      if (config.entrance) {
        gsap.fromTo(
          card,
          {
            y: 20,
            opacity: 0,
            rotationX: 5,
            rotationY: -5,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
          },
        );
      }

      if (config.float) {
        floatAnimation = gsap.to(card, {
          y: -config.floatDistance,
          duration: config.floatDuration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: config.entrance ? 1 : 0,
        });
      }

      return () => {
        card.removeEventListener("pointermove", handlePointerMove);
        card.removeEventListener("pointerenter", handlePointerEnter);
        card.removeEventListener("pointerleave", handlePointerLeave);

        floatAnimation?.kill();
      };
    },
    {
      scope: cardRef,
      dependencies: [
        config.tilt,
        config.perspective,
        config.glare,
        config.float,
        config.floatDistance,
        config.floatDuration,
        config.entrance,
      ],
    },
  );

  return {
    cardRef,
    glareRef,
  };
};
