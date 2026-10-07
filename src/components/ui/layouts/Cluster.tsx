import { forwardRef } from "react";

import { Stack, type StackProps } from "./Stack";

export interface ClusterProps extends Omit<StackProps, "direction" | "wrap"> {}

/**
 * `Cluster` groups a variable number of same-ish-sized items — tags,
 * filter chips, action buttons — that should wrap onto multiple lines and
 * still read as one visual group. It differs from `Inline` only in intent:
 * reach for `Inline` for a simple horizontal row, and `Cluster` when you
 * specifically want to control how wrapped rows are distributed via
 * `justify`.
 *
 * @example
 * <Cluster gap="sm">
 *   {tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
 * </Cluster>
 *
 * @example
 * <Cluster justify="between" align="center">
 *   <Heading>Filters</Heading>
 *   <ClearFiltersButton />
 * </Cluster>
 */
export const Cluster = forwardRef<HTMLDivElement, ClusterProps>(
  ({ align = "center", justify = "start", ...props }, ref) => (
    <Stack
      ref={ref}
      direction="horizontal"
      wrap
      align={align}
      justify={justify}
      {...props}
    />
  ),
);

Cluster.displayName = "Cluster";
