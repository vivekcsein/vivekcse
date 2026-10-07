"use client";

import { useEffect, useRef } from "react";

type AdUnitProps = {
  client: string;
  slot: string;
  format: string;
};

/** Mounts one AdSense unit. Pushed once per mount (guards Strict Mode double effects). */
export const AdUnit = ({ client, slot, format }: AdUnitProps) => {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // Blocked by an ad blocker or script not loaded — the reserved box stays empty.
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block"
      data-ad-client={client}
      data-ad-format={format}
      data-ad-slot={slot}
      data-full-width-responsive="true"
      style={{ display: "block" }}
    />
  );
};
