"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { themeConfig } from "@/packages/configs/theme.config";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      storageKey={themeConfig.storageKey}
      defaultTheme={themeConfig.defaultTheme}
      enableSystem={themeConfig.enableSystem}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
