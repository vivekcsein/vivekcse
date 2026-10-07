"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Per-browser reading progress (no account needed):
 *   { [docId]: { p: 0-100, t: last-read timestamp } }
 */
const PROGRESS_KEY = "kb:progress";
const BOOKMARKS_KEY = "kb:bookmarks";
const CHANGE_EVENT = "kb:change";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
};

const readRaw = (key: string = PROGRESS_KEY) => {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
};

const parse = <T>(raw: string, fallback: T): T => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export type ReadingProgress = Record<string, { p: number; t: number }>;

export const useReadingProgress = (): ReadingProgress => {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(),
    () => "",
  );
  return useMemo(() => parse<ReadingProgress>(raw, {}), [raw]);
};

/** Keeps the furthest point reached; called from the doc page. */
export const saveReadingProgress = (id: string, percent: number) => {
  const current = parse<ReadingProgress>(readRaw(), {});
  const p = Math.max(current[id]?.p ?? 0, Math.min(100, Math.round(percent)));
  try {
    window.localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify({ ...current, [id]: { p, t: Date.now() } }),
    );
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Storage blocked — feature degrades silently.
  }
};

/** Bookmarked doc ids (newest first), stored in this browser only. */
export const useBookmarks = () => {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(BOOKMARKS_KEY),
    () => "",
  );
  const ids = useMemo(() => parse<string[]>(raw, []), [raw]);

  const toggle = useCallback((id: string) => {
    const current = parse<string[]>(readRaw(BOOKMARKS_KEY), []);
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [id, ...current];
    try {
      window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // Storage blocked — feature degrades silently.
    }
  }, []);

  return { ids, toggle };
};
