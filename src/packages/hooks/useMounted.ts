"use client";

import { useEffect, useState } from "react";

/**
 * useMounted.ts
 * --------------------------------------------------------------
 * `true` once the component has mounted on the client, `false` during
 * server rendering and the first client render (before hydration).
 *
 * The classic use case: anything that reads `window`, `localStorage`, or
 * the current theme class needs to render identically on the server and
 * the client's first pass, or React throws a hydration mismatch. Gate
 * that content behind `if (!mounted) return null` (or a skeleton) until
 * this flips to `true`.
 */
export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
