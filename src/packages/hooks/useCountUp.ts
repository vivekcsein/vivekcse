"use client";

import { useEffect, useState } from "react";

type UseCountUpOptions = {
  duration?: number;
  start?: number;
};

export function useCountUp(
  target: number,
  options: UseCountUpOptions = {},
): number {
  const { duration = 1200, start = 0 } = options;

  const [count, setCount] = useState(start);

  useEffect(() => {
    let animationFrame = 0;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easedProgress = 1 - (1 - progress) ** 3;

      const nextCount = Math.round(start + (target - start) * easedProgress);

      setCount(nextCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, start, target]);

  return count;
}
