import type { CSSProperties, HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/packages/utils/cn";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Width-to-height ratio, e.g. `16 / 9`, `1`, `4 / 3`. Defaults to `16 / 9`.
   */
  ratio?: number;
}

/**
 * `AspectRatio` locks its content — an image, video, embed, map — to a
 * fixed width-to-height ratio using the native CSS `aspect-ratio`
 * property, and clips overflow so a child with intrinsic dimensions (e.g.
 * `<img>`, `<iframe>`) fills the box via `object-cover`/absolute sizing on
 * the child itself.
 *
 * @example
 * <AspectRatio ratio={16 / 9}>
 *   <img src="/cover.jpg" alt="" className="h-full w-full object-cover" />
 * </AspectRatio>
 *
 * @example
 * <AspectRatio ratio={1} className="w-32 rounded-full">
 *   <Avatar className="h-full w-full object-cover" />
 * </AspectRatio>
 */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: ratio, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  ),
);

AspectRatio.displayName = "AspectRatio";
