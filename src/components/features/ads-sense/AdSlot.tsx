import { type AdSlotName, adsConfig } from "@/packages/configs/ads.config";
import { cn } from "@/packages/utils/cn";
import { AdUnit } from "./AdUnit";

type AdSlotProps = {
  slot: AdSlotName;
  className?: string;
};

/**
 * One ad placement, configured in ads.config.ts.
 *  - ads configured  → real AdSense unit
 *  - not configured  → nothing in production, a dashed placeholder in dev
 *    so you can see where ads will land.
 */
export const AdSlot = ({ slot, className }: AdSlotProps) => {
  const definition = adsConfig.slots[slot];
  const wrapper = cn("ad-slot w-full", className);
  const box = { minHeight: definition.minHeight };

  if (adsConfig.client && definition.networkSlotId) {
    return (
      <aside aria-label="Advertisement" className={wrapper} style={box}>
        <p className="mb-1 text-center text-[0.65rem] uppercase tracking-widest text-muted-foreground/70">
          Advertisement
        </p>
        <AdUnit
          client={adsConfig.client}
          format={definition.format}
          slot={definition.networkSlotId}
        />
      </aside>
    );
  }

  if (process.env.NODE_ENV === "production") return null;

  return (
    <aside
      aria-label="Advertisement placeholder"
      className={cn(
        wrapper,
        "flex items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted-foreground",
      )}
      style={box}
    >
      Ad slot “{definition.id}” — set NEXT_PUBLIC_ADSENSE_* to enable
    </aside>
  );
};
