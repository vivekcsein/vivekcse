import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/packages/utils/cn";
import type { Space } from "./tokens";

// Written out as literal classes (not built from a template string) so
// Tailwind's build-time scanner can see every class it needs to generate.
const heightClass: Record<Space, string> = {
  none: "h-0",
  xs: "h-1",
  sm: "h-2",
  md: "h-4",
  lg: "h-6",
  xl: "h-8",
  "2xl": "h-12",
};

const widthClass: Record<Space, string> = {
  none: "w-0",
  xs: "w-1",
  sm: "w-2",
  md: "w-4",
  lg: "w-6",
  xl: "w-8",
  "2xl": "w-12",
};

export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Fixed size from the shared spacing scale. When omitted (the default),
   * `Spacer` is flexible — it grows with `flex: 1` to push its siblings
   * apart, which is the common case inside a `Stack`/`Inline`/`Split`.
   */
  size?: Space;
  /** Which dimension `size` applies to. Only relevant when `size` is set. Defaults to `"vertical"`. */
  axis?: "vertical" | "horizontal";
}

/**
 * `Spacer` is an empty, decorative element used purely to create space
 * inside a flex layout — either flexible (fills remaining space) or a
 * fixed size from the shared scale.
 *
 * @example
 * // Flexible: pushes the button to the far end without using Split.
 * <Stack direction="horizontal">
 *   <Logo />
 *   <Spacer />
 *   <Button>Sign out</Button>
 * </Stack>
 *
 * @example
 * // Fixed: an explicit vertical gap outside of a Stack's uniform gap.
 * <Spacer size="xl" />
 */
export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  ({ size, axis = "vertical", className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        size === undefined
          ? "flex-1"
          : axis === "vertical"
            ? cn(heightClass[size], "w-full shrink-0")
            : cn(widthClass[size], "h-full shrink-0"),
        className,
      )}
      {...props}
    />
  ),
);

Spacer.displayName = "Spacer";
