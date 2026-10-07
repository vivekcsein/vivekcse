"use client";

import { useEffect } from "react";
import { saveReadingProgress } from "@/packages/hooks";

/** Invisible: remembers how far you got so the home page can "Continue Reading". */
export const ReadingTracker = ({ docId }: { docId: string }) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const save = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      saveReadingProgress(docId, max > 0 ? (root.scrollTop / max) * 100 : 100);
    };
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(save, 350);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      save();
    };
  }, [docId]);

  return null;
};
