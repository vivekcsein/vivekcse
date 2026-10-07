import { marketplaceProducts } from "@/packages/configs/marketplace.config";
import { ProductGrid } from "../products/ProductGrid";
import { MarketplaceHero } from "./MarketplaceHero";

const MarketplaceApp = () => (
  <>
    <div>
      <MarketplaceHero />
      <ProductGrid products={marketplaceProducts} />
    </div>
  </>
);

export default MarketplaceApp;
