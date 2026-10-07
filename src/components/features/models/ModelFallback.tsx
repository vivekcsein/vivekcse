/**
 * Shown before the canvas mounts (off-screen / chunk loading) and when WebGL
 * is unavailable. Pure CSS, theme-coloured, no JS cost.
 */
export const ModelFallback = () => (
  <div aria-hidden="true" className="grid h-full w-full place-items-center">
    <div className="size-2/3 animate-pulse rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_28%,transparent),transparent)]" />
  </div>
);
