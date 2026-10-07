"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** Grow/shrink the viewport used for the test, e.g. "300px" to start early. */
  rootMargin?: string;
};

/**
 * `inView` is true while the element intersects the (margin-adjusted)
 * viewport. Attach `ref` to the element to observe.
 */
export const useInView = <T extends Element>({
  rootMargin = "0px",
}: UseInViewOptions = {}) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
};
