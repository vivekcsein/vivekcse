"use client";

import Image from "next/image";
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef, useRef } from "react";
import { useInteractiveCard } from "@/packages/gsap/useInteractiveCard";
import { cn } from "@/packages/utils/cn";

type InteractiveCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  enableTilt?: boolean;
  tiltStrength?: number;
};

const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  (
    { children, className, enableTilt = true, tiltStrength = 5, ...props },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);

    useInteractiveCard(internalRef, {
      tilt: enableTilt,
      tiltStrength,
    });

    return (
      <div
        ref={(node) => {
          internalRef.current = node;

          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        className={cn(
          "group relative isolate overflow-hidden rounded-lg",
          "border border-border/70 bg-card",
          "transform-gpu will-change-transform",
          "transition-box-shadow",
          "duration-300",
          "hover:shadow-pop",
          "focus-within:shadow-pop",
          "motion-reduce:transform-none",
          className,
        )}
        {...props}
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          data-card-glow
          className="pointer-events-none absolute -inset-20 -z-10 rounded-full bg-primary/15 opacity-0 blur-3xl"
        />

        {/* Animated border */}
        <div
          aria-hidden="true"
          data-card-border
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border border-primary/50 opacity-0"
        />

        {children}
      </div>
    );
  },
);

InteractiveCard.displayName = "InteractiveCard";

type InteractiveCardImageProps = {
  src: string;
  alt: string;
  className?: string;
};

function InteractiveCardImage({
  src,
  alt,
  className,
}: InteractiveCardImageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        data-card-image
        className={cn(
          "size-full object-cover",
          "transform-gpu will-change-transform",
          className,
        )}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-background/95 via-background/65 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent"
      />
    </div>
  );
}

type InteractiveCardContentProps = {
  children: ReactNode;
  className?: string;
};

function InteractiveCardContent({
  children,
  className,
}: InteractiveCardContentProps) {
  return (
    <div
      data-card-content
      className={cn(
        "relative z-10 flex h-full flex-col",
        "transform-gpu will-change-transform",
        className,
      )}
    >
      {children}
    </div>
  );
}

type InteractiveCardArrowProps = {
  children: ReactNode;
  className?: string;
};

function InteractiveCardArrow({
  children,
  className,
}: InteractiveCardArrowProps) {
  return (
    <span
      data-card-arrow
      className={cn(
        "inline-flex transform-gpu will-change-transform",
        className,
      )}
    >
      {children}
    </span>
  );
}

export {
  InteractiveCard,
  InteractiveCardArrow,
  InteractiveCardContent,
  InteractiveCardImage,
};
