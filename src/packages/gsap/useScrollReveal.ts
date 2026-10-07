"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollRevealDirection = "up" | "down" | "left" | "right" | "none";

interface UseScrollRevealOptions {
  direction?: ScrollRevealDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  scrub?: boolean;
  start?: string;
  once?: boolean;
}

const offsetFor = (direction: ScrollRevealDirection, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance, x: 0 };
    case "down":
      return { y: -distance, x: 0 };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

/**
 * Reveals the target element (and optionally its direct children) on scroll
 * using GSAP + ScrollTrigger. Attach the returned ref to the container.
 */
export const useScrollReveal = <T extends HTMLElement>(
  options: UseScrollRevealOptions = {},
) => {
  const {
    direction = "up",
    distance = 48,
    duration = 0.9,
    delay = 0,
    stagger = 0.12,
    scrub = false,
    start = "top 82%",
    once = true,
  } = options;

  const ref = useRef<T | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional mount-only setup — options are captured via closure so the GSAP context is (re)built once per mount, not on every prop change
  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const targets = el.hasAttribute("data-reveal-group")
      ? Array.from(el.children)
      : [el];

    const offset = offsetFor(direction, distance);

    const ctx = gsap.context(() => {
      gsap.set(targets, { autoAlpha: 0, ...offset });

      gsap.to(targets, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          scrub,
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
};

export default useScrollReveal;
