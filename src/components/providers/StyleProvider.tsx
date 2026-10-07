"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import appConfig from "@/packages/configs/app.config";
import {
  STYLE_THEMES,
  type StyleThemeName,
} from "@/packages/configs/styles.config";

const STORAGE_KEY = "style-theme";

type StyleContextValue = {
  /** The currently active theme name (matches a `data-theme` value). */
  currentTheme: StyleThemeName;
  /** Set a specific theme directly — what a <select> onChange should call. */
  setTheme: (theme: StyleThemeName) => void;
  /** Advance to the next theme in STYLE_THEMES, wrapping around — what a button click should call. */
  cycleTheme: () => void;
  /** The full theme registry, for rendering options (label/description) in a select or button. */
  themes: typeof STYLE_THEMES;
};

const StyleContext = createContext<StyleContextValue | null>(null);

const isValidTheme = (value: string | null): value is StyleThemeName =>
  value !== null && STYLE_THEMES.some((theme) => theme.name === value);

// Storage can throw (private mode, blocked cookies) — never let it break the app.
const readStored = (): string | null => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeStored = (value: string) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore
  }
};

export const StyleProvider = ({ children }: { children: ReactNode }) => {
  // Starts at the server-rendered THEME (matches layout.tsx's
  // data-theme attribute) so there's no hydration mismatch. Any stored
  // preference is applied after mount, client-side only.
  const THEME = appConfig.site.style as StyleThemeName;
  // Always start at the server value so hydration matches; the saved choice
  // is applied right after mount (/public/scripts/init.js already set data-theme before
  // first paint, so there is no visible flash).
  const [currentTheme, setCurrentTheme] = useState<StyleThemeName>(THEME);
  const isFirstRun = useRef(true);

  useEffect(() => {
    const stored = readStored();

    if (isValidTheme(stored)) {
      setCurrentTheme(stored);
    } else {
      // init.js may have applied an unknown/removed theme name — undo it.
      document.documentElement.setAttribute("data-theme", THEME);
    }
  }, [THEME]);

  useEffect(() => {
    // Skip the initial run: it would overwrite the pre-paint theme with THEME.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    document.documentElement.setAttribute("data-theme", currentTheme);
    writeStored(currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: StyleThemeName) => setCurrentTheme(theme);

  const cycleTheme = () => {
    const currentIndex = STYLE_THEMES.findIndex(
      (theme) => theme.name === currentTheme,
    );
    const nextIndex = (currentIndex + 1) % STYLE_THEMES.length;
    setCurrentTheme(STYLE_THEMES[nextIndex].name);
  };

  return (
    <StyleContext.Provider
      value={{ currentTheme, setTheme, cycleTheme, themes: STYLE_THEMES }}
    >
      {children}
    </StyleContext.Provider>
  );
};

export const useStyleTheme = (): StyleContextValue => {
  const context = useContext(StyleContext);

  if (!context) {
    throw new Error("useStyleTheme must be used within a <StyleProvider>.");
  }

  return context;
};
