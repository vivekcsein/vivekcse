"use client";

import { type ComponentType, lazy, Suspense } from "react";
import { type DevSection, useDevSection } from "./DevProvider";

/**
 * Each panel is its own chunk — only the one the user actually picks
 * gets fetched. Verifiable in the build output: these show up as
 * separate lazily-loaded chunks, not bundled into the initial /dev
 * payload.
 */
const PANELS: Record<DevSection, ComponentType> = {
  overview: lazy(() => import("./panels/OverviewPanel")),
  colors: lazy(() => import("./panels/ColorsPanel")),
  typography: lazy(() => import("./panels/TypographyPanel")),
  buttons: lazy(() => import("./panels/ButtonsPanel")),
  forms: lazy(() => import("./panels/FormsPanel")),
  styles: lazy(() => import("./panels/StylePanel")),
  Links: lazy(() => import("./panels/LinksPanel")),
  marquee: lazy(() => import("./panels/MarqueePanel")),
  Cards: lazy(() => import("./panels/CardPanels")),
  models: lazy(() => import("./panels/ModelLabPanel")),
};

const PanelFallback = () => (
  <div className="dev-page-header">
    <div className="dev-page-eyebrow">Loading…</div>
  </div>
);

const DevPage = () => {
  const { activeSection } = useDevSection();
  const ActivePanel = PANELS[activeSection];

  return (
    <Suspense fallback={<PanelFallback />}>
      <ActivePanel />
    </Suspense>
  );
};

export default DevPage;
