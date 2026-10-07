import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import { cn } from "@/packages/utils/cn";
import { gapClass, type Space } from "./tokens";

type Breakpoint = "sm" | "md" | "lg";

/**
 * Static per-breakpoint class bundles. Written out in full (rather than
 * built with a template literal) so Tailwind's build-time scanner can see
 * every class it needs to generate.
 */
const breakpointClass: Record<
  Breakpoint,
  { row: string; width: string; sticky: string }
> = {
  sm: {
    row: "sm:flex-row",
    width: "sm:w-[var(--sidebar-width)]",
    sticky:
      "sm:sticky sm:top-0 sm:self-start sm:max-h-screen sm:overflow-y-auto",
  },
  md: {
    row: "md:flex-row",
    width: "md:w-[var(--sidebar-width)]",
    sticky:
      "md:sticky md:top-0 md:self-start md:max-h-screen md:overflow-y-auto",
  },
  lg: {
    row: "lg:flex-row",
    width: "lg:w-[var(--sidebar-width)]",
    sticky:
      "lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-y-auto",
  },
};

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  /** Content rendered in the sidebar pane. */
  sidebar: ReactNode;
  /** Main content, passed as `children`. */
  children: ReactNode;
  /** Which side the sidebar sits on at the wide breakpoint. Defaults to `"left"`. */
  side?: "left" | "right";
  /** CSS width of the sidebar at the wide breakpoint (any valid CSS length). Defaults to `"16rem"`. */
  width?: string;
  /**
   * Collapse the sidebar down to `collapsedWidth`. This is a purely
   * presentational prop — the parent owns and toggles the collapsed state.
   */
  collapsed?: boolean;
  /** CSS width when `collapsed` is true. Defaults to `"4rem"`. */
  collapsedWidth?: string;
  /** Breakpoint at which the layout switches from stacked to side-by-side. Defaults to `"md"`. */
  breakpoint?: Breakpoint;
  /** Make the sidebar stick to the viewport and scroll independently at the wide breakpoint. */
  sticky?: boolean;
  /** Gap between sidebar and main content, from the shared spacing scale. Defaults to `"lg"`. */
  gap?: Space;
}

/**
 * `Sidebar` lays out a sidebar pane alongside main content, stacking them
 * on narrow viewports and switching to a side-by-side row at `breakpoint`.
 * Collapse/expand state is intentionally left to the parent — this
 * component only renders the widths it's told to.
 *
 * @example
 * <Sidebar sidebar={<Nav />} width="18rem" sticky>
 *   <PageContent />
 * </Sidebar>
 *
 * @example
 * // Parent owns the collapsed state.
 * const [collapsed, setCollapsed] = useState(false);
 * <Sidebar sidebar={<Nav collapsed={collapsed} />} collapsed={collapsed}>
 *   <PageContent />
 * </Sidebar>
 */
export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      sidebar,
      children,
      side = "left",
      width = "16rem",
      collapsed = false,
      collapsedWidth = "4rem",
      breakpoint = "md",
      sticky = false,
      gap = "lg",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const {
      row,
      width: widthClass,
      sticky: stickyClass,
    } = breakpointClass[breakpoint];
    const sidebarWidth = collapsed ? collapsedWidth : width;

    const sidebarPane = (
      <div
        className={cn(
          "w-full shrink-0 transition-[width] duration-200",
          widthClass,
          sticky && stickyClass,
        )}
        style={{ "--sidebar-width": sidebarWidth } as CSSProperties}
      >
        {sidebar}
      </div>
    );

    const mainPane = <div className="min-w-0 flex-1">{children}</div>;

    return (
      <div
        ref={ref}
        className={cn("flex flex-col", row, gapClass[gap], className)}
        style={style}
        {...props}
      >
        {side === "left" ? (
          <>
            {sidebarPane}
            {mainPane}
          </>
        ) : (
          <>
            {mainPane}
            {sidebarPane}
          </>
        )}
      </div>
    );
  },
);

Sidebar.displayName = "Sidebar";
