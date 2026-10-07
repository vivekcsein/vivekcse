"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui";
import { cn } from "@/packages/utils/cn";
import { useSearch } from "./SearchProvider";

const subscribe = () => () => {};
const getIsApple = () => /Mac|iPhone|iPad/.test(navigator.platform);

type SearchTriggerProps = {
  variant?: "header" | "hero" | "bar";
  className?: string;
};

export const SearchTrigger = ({
  variant = "header",
  className,
}: SearchTriggerProps) => {
  const { open } = useSearch();
  const isApple = useSyncExternalStore(subscribe, getIsApple, () => false);
  const shortcut = isApple ? "⌘ K" : "Ctrl K";

  if (variant === "bar") {
    return (
      <button
        aria-label="Search articles, topics or keywords"
        className={cn(
          "group flex h-11 w-full items-center gap-3 rounded-xl border border-border bg-card/60 px-4 text-left text-sm text-muted-foreground transition-colors hover:border-primary/40",
          className,
        )}
        onClick={open}
        type="button"
      >
        <Icon name="search" size={17} />
        <span className="flex-1 truncate">
          Search articles, topics, or keywords…
        </span>
        <kbd className="hidden rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-medium sm:block">
          {shortcut}
        </kbd>
      </button>
    );
  }

  const hero = variant === "hero";

  return (
    <button
      aria-label="Search documentation"
      className={cn(
        "group flex items-center gap-3 border border-border bg-card text-left text-muted-foreground transition hover:border-primary/40 hover:text-foreground",
        hero
          ? "h-14 w-full max-w-xl rounded-2xl px-5 text-base shadow-card"
          : "h-9 rounded-lg px-3 text-sm sm:w-64",
        className,
      )}
      onClick={open}
      type="button"
    >
      <Icon name="search" size={hero ? 20 : 16} />
      <span className={cn("flex-1", !hero && "hidden sm:block")}>
        Search docs…
      </span>
      <kbd
        className={cn(
          "hidden rounded-md border border-border bg-muted px-1.5 py-0.5 text-[0.7rem] font-medium sm:block",
          hero && "text-xs",
        )}
      >
        {shortcut}
      </kbd>
    </button>
  );
};
