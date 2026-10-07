import type { CSSProperties } from "react";
import {
  type MarketplaceColor,
  marketplaceColors,
} from "@/packages/configs/marketplace.config";

/** Inline `--mkt-color` custom property consumed by .mkt-* classes. */
export const marketplaceColorStyle = (color: MarketplaceColor): CSSProperties =>
  ({ "--mkt-color": marketplaceColors[color] }) as CSSProperties;
