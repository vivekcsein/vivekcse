import type { MarketplaceColor } from "@/packages/configs/marketplace.config";

export type MarketplaceTag = "HTML" | "Tailwind CSS" | "JavaScript";

export type MarketplaceProduct = {
  slug: string;
  title: string;
  category: string;
  color: MarketplaceColor;
  /** USD, whole dollars. */
  price: number;
  description: string;
  tags: MarketplaceTag[];
  /** Static file served from /public — opened as the live preview/demo. */
  previewHref: string;
  /** ISO 8601 — drives "Latest" sort. */
  addedAt: string;
  /** Mini "browser window" preview shown on the card — kept lightweight
   *  (no screenshots), described declaratively and rendered as CSS/SVG. */
  preview: {
    siteName: string;
    heading: string;
    /** Optional second line of the heading, in the accent color. */
    headingAccent?: string;
    cta: string;
    /** "dark" chrome (e.g. dashboard/SaaS) or "light" chrome (marketing page). */
    chrome: "dark" | "light";
  };
};
