"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface UseExperienceAnimationOptions {
  scope: RefObject<HTMLElement | null>;
}

export const useExperienceAnimation = ({
  scope,
}: UseExperienceAnimationOptions) => {
  useLayoutEffect(() => {
    const element = scope.current;

    if (!element) return;

    const items = gsap.utils.toArray<HTMLElement>(".experience-item", element);

    const cleanupHandlers: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // --------------------------------
      // Reveal animation
      // --------------------------------

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        },
      });

      revealTimeline.fromTo(
        items,
        {
          opacity: 0,
          y: 14,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
        },
      );

      // --------------------------------
      // Button animation
      // --------------------------------

      const button = element.querySelector<HTMLElement>(".experience-button");

      if (button) {
        revealTimeline.fromTo(
          button,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.25",
        );
      }

      // --------------------------------
      // Hover interactions
      // --------------------------------

      items.forEach((item) => {
        const icon = item.querySelector<HTMLElement>(".experience-icon");

        if (!icon) return;

        const handleMouseEnter = () => {
          gsap.to(item, {
            x: 3,
            duration: 0.2,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1.08,
            rotate: 3,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(item, {
            x: 0,
            duration: 0.25,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        item.addEventListener("mouseenter", handleMouseEnter);

        item.addEventListener("mouseleave", handleMouseLeave);

        cleanupHandlers.push(() => {
          item.removeEventListener("mouseenter", handleMouseEnter);

          item.removeEventListener("mouseleave", handleMouseLeave);
        });
      });
    }, element);

    return () => {
      // Remove native event listeners
      cleanupHandlers.forEach((handler) => {
        handler();
      });

      // Kill GSAP animations + ScrollTriggers
      ctx.revert();
    };
  }, [scope]);
};
