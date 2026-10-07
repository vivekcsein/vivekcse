"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` OS/browser setting and
 * updates live if it changes mid-session. Scoped to Link's own tree —
 * not a shared/global hook — so Link stays independently shippable.
 */
export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
};
