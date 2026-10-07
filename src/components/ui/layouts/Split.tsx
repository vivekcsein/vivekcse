import { forwardRef } from "react";

import { Stack, type StackProps } from "./Stack";

export interface SplitProps extends Omit<StackProps, "direction" | "justify"> {}

/**
 * `Split` pushes its children to opposite ends of the row — the classic
 * "title on the left, actions on the right" pattern. With more than two
 * children, they're distributed evenly via `justify-between`, same as a
 * toolbar.
 *
 * @example
 * <Split align="center">
 *   <Heading>Team members</Heading>
 *   <Button>Invite</Button>
 * </Split>
 */
export const Split = forwardRef<HTMLDivElement, SplitProps>(
  ({ align = "center", wrap = false, ...props }, ref) => (
    <Stack
      ref={ref}
      direction="horizontal"
      justify="between"
      align={align}
      wrap={wrap}
      {...props}
    />
  ),
);

Split.displayName = "Split";
