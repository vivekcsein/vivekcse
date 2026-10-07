import { forwardRef } from "react";

import { Stack, type StackProps } from "./Stack";

export interface InlineProps extends Omit<StackProps, "direction"> {
  /** Allow children to wrap onto new lines. Defaults to `true` (unlike `Stack`). */
  wrap?: boolean;
}

/**
 * `Inline` is a horizontal `Stack` that wraps by default — the natural
 * choice for rows of same-height items (tags, buttons, avatars) that should
 * reflow on narrow viewports instead of overflowing.
 *
 * @example
 * <Inline gap="sm">
 *   <Badge>New</Badge>
 *   <Badge>Beta</Badge>
 * </Inline>
 *
 * @example
 * <Inline gap="md" align="center" wrap={false}>
 *   <Avatar />
 *   <span>Jane Doe</span>
 * </Inline>
 */
export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  ({ wrap = true, align = "center", ...props }, ref) => (
    <Stack
      ref={ref}
      direction="horizontal"
      wrap={wrap}
      align={align}
      {...props}
    />
  ),
);

Inline.displayName = "Inline";
