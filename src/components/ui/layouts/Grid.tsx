import type { CSSProperties, HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/packages/utils/cn";
import { gapClass, type Space } from "./tokens";

/**
 * Supported fixed column counts. Kept to a small, deliberate set instead of
 * 1–12 so every value maps to a literal Tailwind class Tailwind can see at
 * build time (dynamically built class names like `grid-cols-${n}` are not
 * detected by Tailwind's scanner).
 */
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;

const colsClass: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const smColsClass: Record<GridColumns, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  12: "sm:grid-cols-12",
};

const mdColsClass: Record<GridColumns, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const lgColsClass: Record<GridColumns, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  12: "lg:grid-cols-12",
};

const xlColsClass: Record<GridColumns, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
  6: "xl:grid-cols-6",
  12: "xl:grid-cols-12",
};

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Column count at the base breakpoint. Defaults to `1`. Ignored when `minItemWidth` is set. */
  columns?: GridColumns;
  /** Column count overrides at Tailwind's `sm`/`md`/`lg`/`xl` breakpoints. */
  responsive?: Partial<Record<"sm" | "md" | "lg" | "xl", GridColumns>>;
  /**
   * Switches to an auto-fit grid: columns are as many as fit, each at least
   * this wide (e.g. `"240px"`). This is the simplest way to get a
   * responsive card grid without declaring breakpoints at all, and takes
   * priority over `columns`/`responsive` when set.
   */
  minItemWidth?: string;
  /** Gap between cells, from the shared spacing scale. Defaults to `"md"`. */
  gap?: Space;
}

/**
 * `Grid` is a CSS grid primitive with two ways to control columns: a fixed
 * column count (optionally responsive per breakpoint), or an auto-fit mode
 * driven by a minimum item width for card-style grids that don't need
 * explicit breakpoints.
 *
 * @example
 * <Grid columns={1} responsive={{ md: 2, lg: 3 }} gap="lg">
 *   <Card />
 *   <Card />
 *   <Card />
 * </Grid>
 *
 * @example
 * // Auto-fit card grid: as many 220px+ columns as fit the container.
 * <Grid minItemWidth="220px" gap="md">
 *   {items.map((item) => <Card key={item.id} {...item} />)}
 * </Grid>
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = 1,
      responsive,
      minItemWidth,
      gap = "md",
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const autoFit = Boolean(minItemWidth);

    const gridStyle: CSSProperties | undefined = autoFit
      ? {
          gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
          ...style,
        }
      : style;

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          gapClass[gap],
          !autoFit && colsClass[columns],
          !autoFit && responsive?.sm && smColsClass[responsive.sm],
          !autoFit && responsive?.md && mdColsClass[responsive.md],
          !autoFit && responsive?.lg && lgColsClass[responsive.lg],
          !autoFit && responsive?.xl && xlColsClass[responsive.xl],
          className,
        )}
        style={gridStyle}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = "Grid";
