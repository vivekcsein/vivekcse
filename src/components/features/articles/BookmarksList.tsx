"use client";

import Link from "next/link";
import { useSearch } from "@/components/features/search/SearchProvider";
import { Icon } from "@/components/ui";
import { shellConfig } from "@/packages/configs/shell.config";
import { useBookmarks } from "@/packages/hooks";

export const BookmarksList = () => {
  const { index } = useSearch();
  const { ids, toggle } = useBookmarks();
  const saved = ids.flatMap((id) => index.filter((entry) => entry.id === id));

  if (saved.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center">
        <Icon
          className="mx-auto text-muted-foreground"
          name="bookmark"
          size={28}
        />
        <p className="mt-3 font-medium">No bookmarks yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tap “Save” on any article to keep it here. Saved in this browser only.
        </p>
        <Link
          className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
          href={shellConfig.aggregateHref}
        >
          Browse articles
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {saved.map((entry) => (
        <li
          className="group flex items-start gap-4 rounded-xl border border-border/80 bg-card/70 p-4 transition-colors hover:border-primary/40"
          key={entry.id}
        >
          <div className="min-w-0 flex-1">
            <span className="text-[11px] text-muted-foreground">
              {entry.categoryTitle}
            </span>
            <h2 className="mt-1 text-base font-semibold leading-snug">
              <Link
                className="transition-colors hover:text-primary"
                href={entry.href}
              >
                {entry.title}
              </Link>
            </h2>
            <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground">
              {entry.description}
            </p>
          </div>
          <button
            aria-label={`Remove ${entry.title} from bookmarks`}
            className="grid size-8 shrink-0 place-items-center rounded-lg text-primary hover:bg-muted"
            onClick={() => toggle(entry.id)}
            type="button"
          >
            <Icon className="fill-current" name="bookmark" size={16} />
          </button>
        </li>
      ))}
    </ul>
  );
};
