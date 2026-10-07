import * as React from "react";

import { cn } from "@/packages/utils/cn";

type PrimaryButtonProps = React.ComponentProps<"button">;

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, children, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          // Base
          "group relative isolate inline-flex h-11 items-center justify-center",
          "overflow-hidden whitespace-nowrap rounded-lg",
          "px-5 text-[0.9375rem] font-medium leading-none",
          "select-none",
          "cursor-pointer",

          // Gradient
          "bg-linear-to-br from-primary via-primary to-primary/75",
          // "gradient",
          "text-primary-foreground",

          // Minimal border
          "border border-primary/20",

          // Motion
          "transition-[transform,box-shadow,border-color,filter]",
          "duration-300 ease-out",

          // Hover
          "hover:-translate-y-0.5",
          "hover:border-transparent",
          "hover:brightness-[1.03]",
          "hover:shadow-[0_8px_24px_-12px_var(--primary)]",

          // Active
          "active:translate-y-0",
          "active:scale-[0.97]",
          "active:shadow-[0_4px_12px_-8px_var(--primary)]",

          // Focus
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-ring",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",

          // Disabled
          "disabled:pointer-events-none",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          "disabled:transform-none",
          "disabled:shadow-none",

          className,
        )}
        {...props}
      >
        {/* Glossy Shine */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 left-[-75%] z-0",
            "w-1/2",
            "skew-x-[-20deg]",
            "bg-linear-to-r",
            "from-transparent via-paper/35 to-transparent",
            "opacity-0",

            "transition-[left,opacity]",
            "duration-900 ease-out",

            "group-hover:left-[125%]",
            "group-hover:opacity-100",
          )}
        />

        {/* Content */}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  },
);

PrimaryButton.displayName = "PrimaryButton";

export { PrimaryButton };
export type { PrimaryButtonProps };
