import { AdsEnv as env } from "../env/ads.env";

export type AdSlotDefinition = {
  id: string;
  /** Unit id from AdSense. Slot renders nothing (prod) until this is set. */
  networkSlotId?: string;
  format: "auto" | "rectangle" | "horizontal" | "vertical";
  /** Reserved height (px) so the page doesn't jump when the ad loads. */
  minHeight: number;
};

/**
 * Single source of truth for ad placements. Turn ads on by setting
 * NEXT_PUBLIC_ADSENSE_CLIENT (+ slot ids) — no code change needed.
 *
 * rail        → sticky right rail on wide screens (next to the table of contents)
 * inArticle   → inside the article body and after it (works on mobile too)
 */
export const adsConfig = Object.freeze({
  enabled: Boolean(env.NEXT_PUBLIC_ADSENSE_CLIENT),
  client: env.NEXT_PUBLIC_ADSENSE_CLIENT,
  slots: {
    rail: {
      id: "rail",
      networkSlotId: env.NEXT_PUBLIC_ADSENSE_SLOT_RAIL,
      format: "rectangle",
      minHeight: 250,
    },
    inArticle: {
      id: "in-article",
      networkSlotId: env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE,
      format: "auto",
      minHeight: 100,
    },
  } satisfies Record<string, AdSlotDefinition>,
});

export type AdSlotName = keyof typeof adsConfig.slots;

export const adScriptSrc = adsConfig.client
  ? `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.client}`
  : undefined;
