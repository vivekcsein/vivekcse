// src/packages/hooks/useAccordion.ts
"use client";

import { useCallback, useState } from "react";

/**
 * useAccordion.ts
 * --------------------------------------------------------------
 * Single-open accordion state. Tapping the open item closes it.
 * For accordions that need to share state elsewhere (the mobile nav
 * drawer uses NavigationProvider's store instead), skip this hook and
 * drive <AccordionItem> from your own state.
 */
export const useAccordion = (initialId: string | null = null) => {
  const [openId, setOpenId] = useState<string | null>(initialId);

  const toggle = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? null : id)),
    [],
  );

  return { openId, toggle, isOpen: (id: string) => openId === id };
};
