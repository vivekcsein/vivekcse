import type { MarketplaceProduct } from "@/types/marketplace";

/** Accent colors for category badges and card chrome. */
export const marketplaceColors = {
  violet: "var(--mkt-violet)",
  teal: "var(--mkt-teal)",
  indigo: "var(--mkt-indigo)",
  pink: "var(--mkt-pink)",
  blue: "var(--mkt-blue)",
} as const;

export type MarketplaceColor = keyof typeof marketplaceColors;

export const marketplaceConfig = Object.freeze({
  name: "DevKit",
  hero: {
    eyebrow: "Templates",
    title: "Beautiful HTML Templates",
    highlight: "for Modern Ideas.",
    subtitle:
      "Launch faster with professionally designed HTML landing page templates. Clean code, modern design, and ready to customize.",
    note: "Launch your next big idea.",
    features: [
      { icon: "zap", label: "Production ready" },
      { icon: "monitor", label: "Fully responsive" },
      { icon: "sliders", label: "Easy to customize" },
      { icon: "shield", label: "One-time payment" },
    ] as const,
  },
  comingSoon: {
    title: "More Templates\nComing Soon",
    subtitle: "We're working on new, amazing templates.\nStay tuned!",
  },
  searchPlaceholder: "Search templates...",
  cart: {
    href: "/marketplace/cart",
    /**
     * Business WhatsApp number, digits only, country code first, no "+" or
     * spaces (E.164 without the plus) — e.g. "555xyz" for a US number.
     * REPLACE with a real number before going live.
     */
    whatsappNumber: "555xyz",
  },
});

/**
 * The catalog. Each product's `previewHref` points at a self-contained HTML
 * file under /public/templates — "Preview" opens it directly, no build step.
 */
export const marketplaceProducts: MarketplaceProduct[] = [
  {
    slug: "bill-buddy",
    title: "Bill Buddy",
    category: "SaaS",
    color: "violet",
    price: 29,
    description:
      "A modern billing and subscription management landing page for SaaS businesses.",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    previewHref: "/templates/bill-buddy/index.html",
    addedAt: "2026-09-20",
    preview: {
      siteName: "Bill Buddy",
      heading: "Smarter Billing",
      headingAccent: "for Growing Businesses",
      cta: "Get Started",
      chrome: "dark",
    },
  },
  {
    slug: "the-tax-guru",
    title: "The Tax Guru",
    category: "Finance",
    color: "teal",
    price: 24,
    description:
      "A clean and professional landing page for tax filing services and consultants.",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    previewHref: "/templates/the-tax-guru/index.html",
    addedAt: "2026-09-19",
    preview: {
      siteName: "The Tax Guru",
      heading: "Stress-Free",
      headingAccent: "Tax Filing Made Simple",
      cta: "File Your Taxes",
      chrome: "light",
    },
  },
];
