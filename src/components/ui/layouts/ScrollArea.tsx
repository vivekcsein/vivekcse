import type { CSSProperties, HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/packages/utils/cn";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Scroll axis. `"vertical"` and `"horizontal"` scroll on one axis and
   * clip the other; `"both"` allows scrolling on either. Defaults to
   * `"vertical"`.
   */
  axis?: "vertical" | "horizontal" | "both";
  /** Max height of the scroll container (any valid CSS length), e.g. `"24rem"`. */
  maxHeight?: string;
  /** Max width of the scroll container (any valid CSS length), e.g. `"100%"`. */
  maxWidth?: string;
}

const axisClass: Record<NonNullable<ScrollAreaProps["axis"]>, string> = {
  vertical: "overflow-x-hidden overflow-y-auto",
  horizontal: "overflow-x-auto overflow-y-hidden",
  both: "overflow-auto",
};

/**
 * `ScrollArea` is a plain, native-scrollbar scroll container. It
 * deliberately doesn't reimplement scrollbars with JavaScript — `overflow`
 * plus `overscroll-contain` covers the vast majority of scrollable panes
 * (sidebars, chat logs, dropdown lists, code blocks) without the
 * accessibility and performance cost of a custom scrollbar. Reach for a
 * dedicated scroll-area component only if the product genuinely needs
 * cross-browser custom scrollbar styling.
 *
 * @example
 * <ScrollArea maxHeight="20rem">
 *   <ChatMessages />
 * </ScrollArea>
 *
 * @example
 * <ScrollArea axis="horizontal">
 *   <Inline gap="sm">{tabs.map((tab) => <Tab key={tab.id} {...tab} />)}</Inline>
 * </ScrollArea>
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      axis = "vertical",
      maxHeight,
      maxWidth,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("overscroll-contain", axisClass[axis], className)}
      style={{ maxHeight, maxWidth, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  ),
);

ScrollArea.displayName = "ScrollArea";
