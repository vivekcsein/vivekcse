import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/packages/utils/cn";
import {
  type Align,
  alignItemsClass,
  gapClass,
  type Justify,
  justifyContentClass,
  type Space,
} from "./tokens";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Flex direction. Defaults to `"vertical"`. */
  direction?: "vertical" | "horizontal";
  /** Space between children, from the shared spacing scale. Defaults to `"md"`. */
  gap?: Space;
  /** Cross-axis alignment (`align-items`). */
  align?: Align;
  /** Main-axis distribution (`justify-content`). */
  justify?: Justify;
  /** Allow children to wrap onto new lines. Defaults to `false`. */
  wrap?: boolean;
}

/**
 * `Stack` arranges children along a single axis (vertical by default) with
 * a consistent gap. It's the workhorse primitive for simple lists of
 * elements — form fields, card content, nav items.
 *
 * @example
 * <Stack gap="sm">
 *   <Field />
 *   <Field />
 * </Stack>
 *
 * @example
 * <Stack direction="horizontal" align="center" justify="between">
 *   <Logo />
 *   <Nav />
 * </Stack>
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = "vertical",
      gap = "md",
      align,
      justify,
      wrap = false,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        wrap && "flex-wrap",
        gapClass[gap],
        align && alignItemsClass[align],
        justify && justifyContentClass[justify],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

Stack.displayName = "Stack";
