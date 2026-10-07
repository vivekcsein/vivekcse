"use client";

import { type ReactNode, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useMounted } from "@/packages/hooks/useMounted";
import { cn } from "@/packages/utils/cn";
import "@/styles/ui/drawer.css";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Which edge the panel slides in from. Defaults to "right". */
  origin?: "left" | "right";
  title?: ReactNode;
  /**
   * Pinned below the scrollable content — for a persistent CTA (a
   * "Sign In" button, a checkout summary) that shouldn't scroll away
   * with the rest of the drawer's content. Omit if the drawer doesn't
   * need one.
   */
  footer?: ReactNode;
  className?: string;
  /** Extra class on the fixed root — lets a caller offset/restyle the whole layer (e.g. start below a sticky header). */
  rootClassName?: string;
  /** id for the panel, so an external toggle can point `aria-controls` at it. */
  id?: string;
  /** Accessible name when there's no visible `title`. */
  ariaLabel?: string;
  /** Drop the built-in X when an external control (the header hamburger) already closes the drawer. */
  hideCloseButton?: boolean;
};

/**
 * Drawer.tsx
 * --------------------------------------------------------------
 * Controlled slide-in panel. Mobile-first: a full-height overlay, not a
 * desktop persistent-sidebar variant — reach for something else if you
 * need the panel to sit inline in the layout at wider viewports.
 *
 * Renders through a portal to <body> so it isn't clipped by an
 * ancestor's overflow:hidden and sits above everything (see drawer.css
 * for the z-index, layered above the header's).
 *
 * This does a light-touch accessibility pass — initial focus, Escape to
 * close, backdrop click to close — not a full Tab-cycle focus trap.
 * That's a bigger piece of work better done once shadcn's Dialog/Sheet
 * land (Stage 9) rather than hand-rolled here.
 */
const Drawer = ({
  isOpen,
  onClose,
  children,
  origin = "right",
  title,
  footer,
  className,
  rootClassName,
  id,
  ariaLabel,
  hideCloseButton = false,
}: DrawerProps) => {
  const mounted = useMounted();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // Lock body scroll + move focus into the panel while open; restore
  // both on close.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Portals need `document` — unavailable during SSR / the first client
  // render before hydration. See useMounted.ts for why this guard exists.
  if (!mounted) return null;

  return createPortal(
    <div className={cn("drawer-root", isOpen && "is-open", rootClassName)}>
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close drawer"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        id={id}
        className={cn("drawer-panel", `drawer-panel-${origin}`, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        tabIndex={-1}
      >
        {(title || !hideCloseButton) && (
          <DrawerHeader
            title={title}
            titleId={titleId}
            onClose={hideCloseButton ? undefined : onClose}
          />
        )}
        <div className="drawer-content">{children}</div>
        {footer && <div className="drawer-footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};

export default Drawer;

type DrawerHeaderProps = {
  title?: ReactNode;
  titleId: string;
  onClose?: () => void;
};

const DrawerHeader = ({ title, titleId, onClose }: DrawerHeaderProps) => (
  <div className="drawer-header">
    {title ? (
      <h2 id={titleId} className="drawer-title">
        {title}
      </h2>
    ) : (
      <span />
    )}

    {onClose && (
      <button
        type="button"
        className="drawer-close-btn"
        aria-label="Close"
        onClick={onClose}
      >
        <span />
        <span />
      </button>
    )}
  </div>
);
