"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  createNavigationStore,
  type NavigationStore,
} from "@/packages/store/navigation.store";
import type { NavigationKey, NavigationState } from "@/types/navigation";

const NavigationStoreContext = createContext<NavigationStore | null>(null);

type NavigationProviderProps = {
  children: ReactNode;
};

/**
 * NavigationProvider.tsx
 * --------------------------------------------------------------
 * Wrap Header (or anything rendering NavbarDesktop/NavbarMobile) in this
 * once. Each `<NavigationProvider>` creates its own store instance — a
 * second Header (e.g. a docs-site sub-header) gets independent
 * dropdown/drawer state, not a shared one.
 */
const NavigationProvider = ({ children }: NavigationProviderProps) => {
  // Lazily created once per mount, one store per <Header /> instance.
  const store = useMemo(() => createNavigationStore(), []);

  return (
    <NavigationStoreContext.Provider value={store}>
      {children}
    </NavigationStoreContext.Provider>
  );
};

const useNavigationStore = (): NavigationStore => {
  const store = useContext(NavigationStoreContext);
  if (store === null) {
    throw new Error(
      "useNavigationState/useNavigationActions must be used within a NavigationProvider",
    );
  }
  return store;
};

/**
 * Reads a single key out of navigation state.
 * Unlike a plain Context value, this only re-renders the calling component
 * when THAT key changes — a dropdown hover never re-renders the mobile drawer.
 */
export const useNavigationState = <K extends NavigationKey>(
  key: K,
): NavigationState[K] => {
  const store = useNavigationStore();

  const subscribe = useCallback(
    (onStoreChange: () => void) => store.subscribe(key, onStoreChange),
    [store, key],
  );

  const getSnapshot = useCallback(() => store.getSlice(key), [store, key]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

type NavigationActions = {
  setActiveDropdown: (id: string | null) => void;
  setActiveMobileCategory: (id: string | null) => void;
  toggleMobileCategory: (id: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  closeAll: () => void;
};

/**
 * Dispatchers with a stable identity across every render (useCallback + [store]).
 * Pass these straight down as props without breaking React.memo on children.
 */
export const useNavigationActions = (): NavigationActions => {
  const store = useNavigationStore();

  const setActiveDropdown = useCallback(
    (id: string | null) => store.setSlice("activeDropdown", id),
    [store],
  );

  const setActiveMobileCategory = useCallback(
    (id: string | null) => store.setSlice("activeMobileCategory", id),
    [store],
  );

  const toggleMobileCategory = useCallback(
    (id: string) =>
      store.setSlice("activeMobileCategory", (prev) =>
        prev === id ? null : id,
      ),
    [store],
  );

  const setMobileMenuOpen = useCallback(
    (open: boolean) => store.setSlice("mobileMenuOpen", open),
    [store],
  );

  const toggleMobileMenu = useCallback(
    () => store.setSlice("mobileMenuOpen", (prev) => !prev),
    [store],
  );

  const closeAll = useCallback(() => {
    store.setSlice("activeDropdown", null);
    store.setSlice("activeMobileCategory", null);
    store.setSlice("mobileMenuOpen", false);
  }, [store]);

  return {
    setActiveDropdown,
    setActiveMobileCategory,
    toggleMobileCategory,
    setMobileMenuOpen,
    toggleMobileMenu,
    closeAll,
  };
};

export default NavigationProvider;
