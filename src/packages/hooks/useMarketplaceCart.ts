"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const CART_KEY = "mkt:cart";
const CHANGE_EVENT = "mkt:cart-change";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
};

const readRaw = () => {
  try {
    return window.localStorage.getItem(CART_KEY) ?? "";
  } catch {
    return "";
  }
};

const parse = (raw: string): string[] => {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const writeRaw = (slugs: string[]) => {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(slugs));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Storage blocked (private mode) — cart just won't persist this session.
  }
};

/** Product slugs in the cart, this browser only. No checkout — demo only. */
export const useMarketplaceCart = () => {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "");
  const slugs = useMemo(() => parse(raw), [raw]);

  const add = useCallback((slug: string) => {
    const current = parse(readRaw());
    if (current.includes(slug)) return;
    writeRaw([...current, slug]);
  }, []);

  const remove = useCallback((slug: string) => {
    writeRaw(parse(readRaw()).filter((item) => item !== slug));
  }, []);

  const toggle = useCallback((slug: string) => {
    const current = parse(readRaw());
    writeRaw(
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  }, []);

  return { slugs, count: slugs.length, add, remove, toggle };
};
