"use client";

import {
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";

const DEFAULT_CLOSE_DELAY_MS = 200;

type UseHoverDropdownOptions = {
  /** This item's own id. */
  id: string;
  /** The currently-active id, shared across every item in the group (one at a time). */
  activeId: string | null;
  onSelect: (id: string | null) => void;
  delayMs?: number;
};

/**
 * useHoverDropdown.ts
 * --------------------------------------------------------------
 * Open/close behavior for one item in a group of mutually-exclusive
 * dropdowns sharing a single `activeId` (NavigationProvider's
 * `activeDropdown`).
 *
 * - Hover: opens immediately, closes after `delayMs`. The delayed close
 *   only fires if THIS item is still the active one, so a fast A -> B
 *   hover isn't clobbered by A's leftover timer.
 * - Keyboard: Enter/Space on the trigger toggles; Escape closes and
 *   returns focus to the trigger; Tab out of the item closes it.
 * - Touch / click: a pointer click opens (never closes — the emulated
 *   mouseenter already opened it, a toggle would immediately undo that);
 *   a pointerdown outside the item closes.
 *
 * Usage: attach `itemRef` + `itemProps` to the wrapper <li>, `triggerRef`
 * + `onTriggerClick` to the trigger button.
 */
export const useHoverDropdown = ({
  id,
  activeId,
  onSelect,
  delayMs = DEFAULT_CLOSE_DELAY_MS,
}: UseHoverDropdownOptions) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  const isActive = activeId === id;

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current === null) return;
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }, []);

  const open = useCallback(() => {
    clearCloseTimeout();
    onSelect(id);
  }, [onSelect, id, clearCloseTimeout]);

  const close = useCallback(() => {
    clearCloseTimeout();
    if (activeIdRef.current === id) onSelect(null);
  }, [onSelect, id, clearCloseTimeout]);

  const onMouseLeave = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      if (activeIdRef.current === id) onSelect(null);
    }, delayMs);
  }, [onSelect, id, delayMs, clearCloseTimeout]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== "Escape" || activeIdRef.current !== id) return;
      close();
      triggerRef.current?.focus();
    },
    [close, id],
  );

  const onBlur = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) close();
    },
    [close],
  );

  const onTriggerClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      // detail === 0 -> keyboard-initiated click (Enter/Space): toggle.
      if (event.detail === 0 && activeIdRef.current === id) {
        close();
        return;
      }
      open();
    },
    [open, close, id],
  );

  // Close on a pointer press outside this item (touch users have no mouseleave).
  useEffect(() => {
    if (!isActive) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!itemRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isActive, close]);

  // Don't leave a pending close running after this item unmounts.
  useEffect(() => clearCloseTimeout, [clearCloseTimeout]);

  return {
    isActive,
    itemRef,
    triggerRef,
    onTriggerClick,
    itemProps: {
      onMouseEnter: open,
      onMouseLeave,
      onKeyDown,
      onBlur,
    },
  };
};
