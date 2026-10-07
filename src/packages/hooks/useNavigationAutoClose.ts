"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { DESKTOP_NAV_MEDIA_QUERY } from "@/packages/configs/navigation.config";

/**
 * useNavigationAutoClose.ts
 * --------------------------------------------------------------
 * Resets every open dropdown / accordion / drawer when:
 *  - the route changes (a link was followed), or
 *  - the viewport crosses into desktop width (otherwise a drawer left
 *    open on a rotated tablet keeps `body { overflow: hidden }` locked).
 *
 * `closeAll` is passed in (rather than imported) so this hook stays free
 * of any dependency on the navigation provider.
 */
export const useNavigationAutoClose = (closeAll: () => void): void => {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value read inside
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_NAV_MEDIA_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeAll();
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [closeAll]);
};
