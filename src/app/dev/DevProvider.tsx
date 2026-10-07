"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

export type DevSection =
  | "overview"
  | "colors"
  | "typography"
  | "buttons"
  | "forms"
  | "styles"
  | "Links"
  | "Cards"
  | "marquee"
  | "models";

type DevContextValue = {
  activeSection: DevSection;
  setActiveSection: (section: DevSection) => void;
};

const DevContext = createContext<DevContextValue | null>(null);

/**
 * DevProvider.tsx
 * --------------------------------------------------------------
 * Everything under /dev lives on one route now — switching between
 * Overview/Colors/Typography/Buttons/Forms/Surfaces is a state change,
 * not a navigation. Wraps the sidebar + content together in
 * layout.tsx, so both read/write the same `activeSection`.
 */
export const DevProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<DevSection>("overview");

  return (
    <DevContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </DevContext.Provider>
  );
};

export const useDevSection = (): DevContextValue => {
  const context = useContext(DevContext);

  if (!context) {
    throw new Error("useDevSection must be used within a DevProvider");
  }

  return context;
};
