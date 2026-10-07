"use client";

import dynamic from "next/dynamic";
import { type CSSProperties, useEffect, useState } from "react";
import type { ModelKey } from "@/packages/configs/model3d.config";
import { useInView } from "@/packages/hooks";
import { cn } from "@/packages/utils/cn";
import { ModelFallback } from "./ModelFallback";
import type { ModelOverrides } from "./ModelViewer";

// three.js + R3F + drei live in their own chunk, loaded only when a viewer mounts.
const ModelViewer = dynamic(
  () => import("./ModelViewer").then((m) => m.ModelViewer),
  { ssr: false, loading: () => <ModelFallback /> },
);

type ClientModelViewerProps = {
  modelKey: ModelKey;
  /** The viewer fills its box — give it (or its parent) an explicit height. */
  className?: string;
  interactive?: boolean;
  overrides?: ModelOverrides;
  /** Mount immediately (above-the-fold hero) instead of when scrolled near. */
  eager?: boolean;
  showStats?: boolean;
  /** Fade all four edges to transparent so the canvas blends into the page. */
  fadeEdges?: boolean;
};

const FADE_X =
  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)";
const FADE_Y =
  "linear-gradient(to bottom, transparent, black 10%, black 88%, transparent)";

const FADE_STYLE: CSSProperties = {
  maskImage: `${FADE_X}, ${FADE_Y}`,
  maskComposite: "intersect",
  WebkitMaskImage: `${FADE_X}, ${FADE_Y}`,
  WebkitMaskComposite: "source-in",
};

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

/**
 * The component to use in pages. SSR-safe, lazy, and cheap:
 *  - nothing from three.js downloads until the viewer is near the viewport
 *  - rendering pauses while it is scrolled out of view
 *  - falls back to a CSS glow when WebGL is unavailable
 */
export const ClientModelViewer = ({
  modelKey,
  className,
  interactive,
  overrides,
  eager = false,
  showStats,
  fadeEdges = false,
}: ClientModelViewerProps) => {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "300px" });
  const [armed, setArmed] = useState(eager);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  useEffect(() => {
    if (inView) setArmed(true);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={cn("relative h-full w-full", className)}
      style={fadeEdges ? FADE_STYLE : undefined}
    >
      {armed && webgl ? (
        <ModelViewer
          active={eager ? true : inView}
          interactive={interactive}
          modelKey={modelKey}
          overrides={overrides}
          showStats={showStats}
        />
      ) : (
        <ModelFallback />
      )}
    </div>
  );
};
