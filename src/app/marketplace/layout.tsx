import type { ReactNode } from "react";
import "@/styles/features/content/marketplace.css";

interface MarketplaceLayoutProps {
  children: ReactNode;
}

/**
 * /marketplace gets its own shell — no knowledge-base header/sidebar/footer
 * (see the root layout + the (docs) route group). This layout only adds the
 * marketplace-scoped background class and stylesheet.
 */
const MarketplaceLayout = ({ children }: MarketplaceLayoutProps) => (
  <div className="mkt-shell flex min-h-svh flex-1 flex-col">{children}</div>
);

export default MarketplaceLayout;
