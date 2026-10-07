import type { NavigationKey, NavigationState } from "@/types/navigation";

type Listener = () => void;

type Updater<T> = T | ((prev: T) => T);

export type NavigationStore = {
  getSlice: <K extends NavigationKey>(key: K) => NavigationState[K];
  setSlice: <K extends NavigationKey>(
    key: K,
    value: Updater<NavigationState[K]>,
  ) => void;
  subscribe: (key: NavigationKey, listener: Listener) => () => void;
};

const initialState: NavigationState = {
  activeDropdown: null,
  activeMobileCategory: null,
  mobileMenuOpen: false,
};

/**
 * navigation.store.ts
 * --------------------------------------------------------------
 * Plain-object store, no React inside — deliberately its own store
 * rather than a shared/global one. Dropdown-hover and accordion-open
 * state is transient UI state scoped to a single Header instance, not
 * durable app-wide state; giving it its own store means a dropdown
 * hover never notifies unrelated subscribers, and nothing here needs
 * to survive a refresh.
 *
 * State is addressed by string key ("activeDropdown", "mobileMenuOpen",
 * ...) and listeners are registered per key, so a change to one slice
 * never notifies subscribers of an unrelated slice — see
 * components/providers/NavigationProvider.tsx, which wires this into
 * `useSyncExternalStore` per-key.
 */
export const createNavigationStore = (): NavigationStore => {
  let state: NavigationState = { ...initialState };
  const listenersByKey = new Map<NavigationKey, Set<Listener>>();

  const notify = (key: NavigationKey): void => {
    const listeners = listenersByKey.get(key);
    if (!listeners) return;
    listeners.forEach((listener) => {
      listener();
    });
  };

  const getSlice = <K extends NavigationKey>(key: K): NavigationState[K] =>
    state[key];

  const setSlice = <K extends NavigationKey>(
    key: K,
    value: Updater<NavigationState[K]>,
  ): void => {
    const nextValue =
      typeof value === "function"
        ? (value as (prev: NavigationState[K]) => NavigationState[K])(
            state[key],
          )
        : value;

    if (state[key] === nextValue) return;

    state = { ...state, [key]: nextValue };
    notify(key);
  };

  const subscribe = (key: NavigationKey, listener: Listener): (() => void) => {
    const existing = listenersByKey.get(key) ?? new Set<Listener>();
    existing.add(listener);
    listenersByKey.set(key, existing);

    return () => {
      existing.delete(listener);
    };
  };

  return { getSlice, setSlice, subscribe };
};
