import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/packages/utils/cn";

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Axis to center content on. Defaults to `"both"`.
   * - `"horizontal"` centers on the main axis only.
   * - `"vertical"` centers on the cross axis only.
   * - `"both"` centers on both axes.
   */
  direction?: "vertical" | "horizontal" | "both";
  /** Render as an inline-flex box instead of a block-level flex box. */
  inline?: boolean;
}

const directionClass: Record<NonNullable<CenterProps["direction"]>, string> = {
  horizontal: "justify-center",
  vertical: "items-center",
  both: "items-center justify-center",
};

/**
 * `Center` centers its children within itself. Reach for it instead of a
 * one-off `flex items-center justify-center` whenever the sole purpose of
 * an element is centering — empty states, loading spinners, modal content.
 *
 * @example
 * <Center className="min-h-screen">
 *   <Spinner />
 * </Center>
 *
 * @example
 * <Center direction="vertical" className="h-12">
 *   <span>Vertically centered label</span>
 * </Center>
 */
export const Center = forwardRef<HTMLDivElement, CenterProps>(
  (
    { direction = "both", inline = false, className, children, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        inline ? "inline-flex" : "flex",
        directionClass[direction],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

Center.displayName = "Center";
