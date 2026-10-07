"use client";
import "@/styles/features/interactive-glow-card.css";
import { useInteractiveGlow } from "@/packages/gsap/useInteractiveGlow";
import { cn } from "@/packages/utils/cn";

interface InteractiveGlowCardProps {
  children: React.ReactNode;
  className?: string;
  key?: string;
}

const InteractiveGlowCard = ({
  key,
  children,
  className,
}: InteractiveGlowCardProps) => {
  const { cardRef, glareRef } = useInteractiveGlow({
    tilt: 12,
    perspective: 1000,
    glare: true,
    float: true,
    floatDistance: 5,
    floatDuration: 2.8,
  });

  return (
    <div
      key={key}
      ref={cardRef}
      className={cn(
        "relative z-10 w-full overflow-hidden rounded-2xl border border-foreground/10 bg-card/95 p-6 shadow-2xl backdrop-blur-sm transform-3d",
        "glow-card",
        className,
      )}
    >
      <div
        ref={glareRef}
        className="pointer-events-none absolute z-20 h-32 w-32 rounded-full bg-brand-400/15 opacity-0 blur-2xl"
      />

      <div className="relative z-10 transform-[translateZ(30px)]">
        {children}
      </div>
    </div>
  );
};

export default InteractiveGlowCard;
