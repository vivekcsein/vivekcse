import { ClientModelViewer } from "@/components/features/models/ClientModelViewer";

/** Hero 3D scene — Figma "hero": desk setup with floating tech tiles. */
const HeroWorkStation = () => (
  <div
    className="
      mx-auto
      w-full
      max-w-7xl
      h-90
      sm:h-120
      md:h-140
      lg:h-160
      xl:h-175
      2xl:h-190
    "
  >
    <ClientModelViewer eager modelKey="hero-workstation" />
  </div>
);

export default HeroWorkStation;
