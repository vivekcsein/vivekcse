import type { ComponentProps } from "react";
import { cn } from "@/packages/utils/cn";

type HamburgerProps = Omit<ComponentProps<"button">, "children" | "onClick"> & {
  isOpen: boolean;
  onToggle: () => void;
  /** id of the element this button opens (drawer panel) — wires up aria-controls. */
  controls?: string;
};

/**
 * Hamburger.tsx
 * --------------------------------------------------------------
 * One button that is both the "open" and the "close" control: the three
 * bars morph into an X in place, so the open and cancel states occupy the
 * exact same spot (no second close button to hunt for).
 *
 * All styling lives in styles/ui/hamburger.css and is driven by CSS
 * custom properties (--hamburger-size, --hamburger-color, ...), so
 * restyling never touches this file.
 */
const Hamburger = ({
  isOpen,
  onToggle,
  controls,
  className,
  ...props
}: HamburgerProps) => (
  <button
    type="button"
    className={cn("hamburger", className)}
    data-open={isOpen}
    onClick={onToggle}
    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    aria-expanded={isOpen}
    aria-controls={controls}
    {...props}
  >
    <span className="hamburger-bars" aria-hidden="true">
      <span className="hamburger-bar" />
      <span className="hamburger-bar" />
      <span className="hamburger-bar" />
    </span>
  </button>
);

export default Hamburger;
