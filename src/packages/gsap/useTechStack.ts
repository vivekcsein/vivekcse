"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  type RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { siteConfig } from "../configs/site.config";

gsap.registerPlugin(ScrollTrigger);

type TechStack = typeof siteConfig.techStack;
type TechCategory = TechStack["categories"][number];
type TechItem = TechStack["items"][number];

interface UseTechStackOptions {
  techStack: TechStack;
}

interface UseTechStackReturn {
  activeCategory: TechCategory;
  filteredItems: TechItem[];
  containerRef: RefObject<HTMLDivElement | null>;
  setActiveCategory: (category: TechCategory) => void;
}

export const useTechStack = ({
  techStack,
}: UseTechStackOptions): UseTechStackReturn => {
  const [activeCategory, setActiveCategory] = useState<TechCategory>("All");

  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return [...techStack.items];
    }

    return techStack.items.filter((item) => item.category === activeCategory);
  }, [activeCategory, techStack.items]);

  /*
   * Initial section reveal.
   */
  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const ctx = gsap.context(() => {
      const heading = container.querySelector(".tech-stack-heading");

      const filters = container.querySelector(".tech-stack-filters");

      const cards = container.querySelectorAll(".tech-stack-card");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 88%",
          once: true,
        },
      });

      timeline
        .fromTo(
          heading,
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
        )
        .fromTo(
          filters,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.25",
        )
        .fromTo(
          cards,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.035,
            ease: "power2.out",
          },
          "-=0.2",
        );
    }, container);

    return () => ctx.revert();
  }, []);

  /*
   * Animate cards whenever the active category changes.
   */
  // biome-ignore lint/correctness/useExhaustiveDependencies: activeCategory isn't read directly in the body, but it's what triggers filteredItems (and therefore the .tech-stack-card DOM this effect queries) to change — the dependency is intentional and necessary here.
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const cards = container.querySelectorAll(".tech-stack-card");

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 8,
        scale: 0.97,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.035,
        ease: "power2.out",
        overwrite: true,
      },
    );
  }, [activeCategory]);

  return {
    activeCategory,
    filteredItems,
    containerRef,
    setActiveCategory,
  };
};
