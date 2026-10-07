/**
 * storage.ts
 * --------------------------------------------------------------
 * Safe, JSON-aware wrappers around `localStorage` / `sessionStorage`.
 *
 * Every function guards against SSR (where `window` doesn't exist) and
 * against the storage API throwing (Safari private mode, quota exceeded,
 * or the user disabling storage entirely) — callers get `undefined`/`false`
 * back instead of a crash either way.
 *
 * `useLocalStorage` (packages/hooks/useLocalStorage.ts) wraps these same
 * functions for component state that needs to re-render on change; use
 * these directly for one-off reads/writes outside of a component.
 */

type StorageArea = "local" | "session";

const getStorageArea = (area: StorageArea): Storage | undefined => {
  if (typeof window === "undefined") return undefined;
  return area === "local" ? window.localStorage : window.sessionStorage;
};

/** Read and JSON-parse a key. Returns `fallback` if missing, unparsable, or storage is unavailable. */
export const readStorage = <T>(
  key: string,
  fallback: T,
  area: StorageArea = "local",
): T => {
  const storage = getStorageArea(area);
  if (!storage) return fallback;

  try {
    const raw = storage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

/** JSON-stringify and write a key. Returns `true` on success, `false` otherwise (quota, SSR, disabled storage). */
export const writeStorage = <T>(
  key: string,
  value: T,
  area: StorageArea = "local",
): boolean => {
  const storage = getStorageArea(area);
  if (!storage) return false;

  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/** Remove a key. No-op (returns `false`) if storage is unavailable. */
export const removeStorage = (
  key: string,
  area: StorageArea = "local",
): boolean => {
  const storage = getStorageArea(area);
  if (!storage) return false;

  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

/** Clear every key in the given storage area. Use sparingly — this is destructive and app-wide. */
export const clearStorage = (area: StorageArea = "local"): boolean => {
  const storage = getStorageArea(area);
  if (!storage) return false;

  try {
    storage.clear();
    return true;
  } catch {
    return false;
  }
};
