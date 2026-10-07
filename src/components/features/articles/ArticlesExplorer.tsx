"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { DocCard } from "@/components/features/docs/DocCard";
import { useSearch } from "@/components/features/search/SearchProvider";
import { Card, Icon, Select } from "@/components/ui";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { shellConfig } from "@/packages/configs/shell.config";
import { cn } from "@/packages/utils/cn";
import { searchDocs } from "@/packages/utils/search";
import type { ArticleListItem } from "@/types/content";

type ArticlesExplorerProps = {
  items: ArticleListItem[];
  topics?: { id: string; title: string; count: number }[];
  collections?: { key: string; title: string; count: number }[];
  pageSize?: number;
};

const SORTS = {
  newest: "Newest first",
  oldest: "Oldest first",
  popular: "Most popular",
  az: "Title A → Z",
  short: "Shortest read",
  long: "Longest read",
} as const;
type SortKey = keyof typeof SORTS;

const READS = {
  any: "Any length",
  quick: "Quick · under 5 min",
  medium: "Medium · 5–20 min",
  deep: "Deep dive · 20+ min",
} as const;
type ReadKey = keyof typeof READS;

const matchesRead = (minutes: number, read: ReadKey) =>
  read === "any" ||
  (read === "quick" && minutes < 5) ||
  (read === "medium" && minutes >= 5 && minutes <= 20) ||
  (read === "deep" && minutes > 20);

const sorters: Record<
  SortKey,
  (a: ArticleListItem, b: ArticleListItem) => number
> = {
  newest: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
  oldest: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
  popular: (a, b) =>
    b.popularity - a.popularity || b.updatedAt.localeCompare(a.updatedAt),
  az: (a, b) => a.title.localeCompare(b.title),
  short: (a, b) => a.readingMinutes - b.readingMinutes,
  long: (a, b) => b.readingMinutes - a.readingMinutes,
};

const isSort = (value: string | null): value is SortKey =>
  value !== null && value in SORTS;
const isRead = (value: string | null): value is ReadKey =>
  value !== null && value in READS;

const chip = (active: boolean) =>
  cn(
    "h-[30px] shrink-0 rounded-full border px-3.5 text-xs font-medium transition-colors",
    active
      ? "border-primary bg-primary text-primary-foreground shadow-[0_6px_18px_-8px_var(--primary)]"
      : "border-border bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
  );

/**
 * Filter + sort + paginate a list of articles. State is mirrored into the URL
 * (?q=&topic=&collection=&sort=&read=&page=) so views can be shared, without
 * making the page dynamic.
 */
export const ArticlesExplorer = ({
  items,
  topics = [],
  collections = [],
  pageSize = shellConfig.pageSize,
}: ArticlesExplorerProps) => {
  const params = useSearchParams();
  const { index } = useSearch();
  const listRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    params.get("topic")?.split(",").filter(Boolean) ?? [],
  );
  const [collection, setCollection] = useState(
    params.get("collection") ?? "all",
  );
  const [sort, setSort] = useState<SortKey>(
    isSort(params.get("sort")) ? (params.get("sort") as SortKey) : "newest",
  );
  const [read, setRead] = useState<ReadKey>(
    isRead(params.get("read")) ? (params.get("read") as ReadKey) : "any",
  );
  const [page, setPage] = useState(Number(params.get("page")) || 1);

  const filtered = useMemo(() => {
    let list = items.filter(
      (item) =>
        (selectedTopics.length === 0 ||
          selectedTopics.includes(item.topicId)) &&
        (collection === "all" || item.collectionKey === collection) &&
        matchesRead(item.readingMinutes, read),
    );

    if (query.trim()) {
      const rank = new Map(
        searchDocs(index, query, 500).map((hit, position) => [
          hit.entry.id,
          position,
        ]),
      );
      list = list
        .filter((item) => rank.has(item.id))
        .sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));
      return sort === "newest" ? list : [...list].sort(sorters[sort]);
    }
    return [...list].sort(sorters[sort]);
  }, [items, index, query, selectedTopics, collection, read, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  const isFiltered =
    query.trim() !== "" ||
    selectedTopics.length > 0 ||
    collection !== "all" ||
    read !== "any" ||
    sort !== "newest";

  // Mirror state into the URL (no navigation, no scroll jump).
  useEffect(() => {
    const next = new URLSearchParams();
    if (query.trim()) next.set("q", query.trim());
    if (selectedTopics.length) next.set("topic", selectedTopics.join(","));
    if (collection !== "all") next.set("collection", collection);
    if (sort !== "newest") next.set("sort", sort);
    if (read !== "any") next.set("read", read);
    if (current > 1) next.set("page", String(current));
    const qs = next.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname,
    );
  }, [query, selectedTopics, collection, sort, read, current]);

  const changePage = (next: number) => {
    setPage(next);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Any filter change goes back to page 1.
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset only when a filter changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setPage(1);
  }, [query, selectedTopics, collection, read, sort]);

  const clear = () => {
    setQuery("");
    setSelectedTopics([]);
    setCollection("all");
    setRead("any");
    setSort("newest");
  };

  const toggleTopic = (id: string) =>
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );

  return (
    <div>
      <div className="panel space-y-4 p-4">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_12rem_13rem]">
          <label className="relative block">
            <span className="sr-only">Search articles</span>
            <Icon
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              name="search"
              size={16}
            />
            <input
              className="h-10 w-full rounded-lg border border-border bg-card/60 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground hover:border-primary/40 focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter by title, topic or keyword…"
              type="search"
              value={query}
            />
          </label>

          <Select
            label="Sort articles"
            onChange={(next) => setSort(next as SortKey)}
            options={Object.entries(SORTS).map(([key, label]) => ({
              value: key,
              label,
            }))}
            value={sort}
          />

          <Select
            label="Reading time"
            onChange={(next) => setRead(next as ReadKey)}
            options={Object.entries(READS).map(([key, label]) => ({
              value: key,
              label,
            }))}
            value={read}
          />
        </div>

        {topics.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Icon name="sliders" size={14} /> Topics
            </span>
            {topics.map((topic) => (
              <button
                aria-pressed={selectedTopics.includes(topic.id)}
                className={chip(selectedTopics.includes(topic.id))}
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                type="button"
              >
                {topic.title}{" "}
                <span className="ml-0.5 opacity-70">{topic.count}</span>
              </button>
            ))}
          </div>
        )}

        {collections.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Icon name="folder" size={14} /> Collection
            </span>
            {[
              { key: "all", title: "All", count: items.length },
              ...collections,
            ].map((entry) => (
              <button
                aria-pressed={collection === entry.key}
                className={chip(collection === entry.key)}
                key={entry.key}
                onClick={() => setCollection(entry.key)}
                type="button"
              >
                {entry.title}{" "}
                <span className="ml-0.5 opacity-70">{entry.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="mb-3 mt-5 flex min-h-8 scroll-mt-24 items-center justify-between gap-4"
        ref={listRef}
      >
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {filtered.length === 0
            ? "No articles found"
            : `Showing ${start + 1}–${start + visible.length} of ${filtered.length} ${filtered.length === 1 ? "article" : "articles"}`}
        </p>
        {isFiltered && (
          <button
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
            onClick={clear}
            type="button"
          >
            <Icon name="close" size={13} /> Clear filters
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          Nothing matches those filters.{" "}
          <button
            className="font-medium text-primary hover:underline"
            onClick={clear}
            type="button"
          >
            Reset and show everything
          </button>
        </div>
      ) : (
        <ul className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <li key={item.id}>
              <Card variant="interactive-glow">
                <DocCard
                  categoryTitle={item.topicTitle}
                  color={item.color}
                  doc={item}
                />
              </Card>
            </li>
          ))}
        </ul>
      )}

      <Pagination
        className="mt-8"
        onChange={changePage}
        page={current}
        pageCount={pageCount}
      />
    </div>
  );
};
