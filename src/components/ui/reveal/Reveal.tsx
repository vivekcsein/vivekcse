"use client";

import {
  type ScrollRevealDirection,
  useScrollReveal,
} from "@/packages/gsap/useScrollReveal";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  direction?: ScrollRevealDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  /** Reveal each direct child individually (staggered) instead of the whole block. */
  group?: boolean;
}

/**
 * Declarative wrapper around useScrollReveal — animates in on scroll with GSAP.
 */
const Reveal = ({
  children,
  className = "",
  as = "div",
  direction = "up",
  distance,
  duration,
  delay,
  stagger,
  group = false,
}: RevealProps) => {
  const ref = useScrollReveal<HTMLDivElement>({
    direction,
    distance,
    duration,
    delay,
    stagger,
  });

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={className}
      data-reveal-group={group ? "" : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
