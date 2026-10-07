import type { Metadata } from "next";
import MarketplaceApp from "@/components/features/marketplace/MarketplaceApp";
import { marketplaceConfig } from "@/packages/configs/marketplace.config";

export const metadata: Metadata = {
  title: `${marketplaceConfig.name} — ${marketplaceConfig.hero.title} ${marketplaceConfig.hero.highlight}`,
  description: marketplaceConfig.hero.subtitle,
  alternates: { canonical: "/marketplace" },
};

const MarketplacePage = () => (
  <>
    <MarketplaceApp />
  </>
);

export default MarketplacePage;
