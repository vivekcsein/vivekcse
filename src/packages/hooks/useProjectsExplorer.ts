"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isSort,
  projectSearchText,
  type SortKey,
  sorters,
} from "@/packages/utils/projects-explorer.utils";
import type { ProjectListItem } from "@/types/projects";

type UseProjectsExplorerOptions = {
  items: ProjectListItem[];
  pageSize?: number;
};

export const useProjectsExplorer = ({
  items,
  pageSize = 9,
}: UseProjectsExplorerOptions) => {
  const params = useSearchParams();
  const initialized = useRef(false);

  const [query, setQuery] = useState(() => params.get("q") ?? "");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    () => params.get("category")?.split(",").filter(Boolean) ?? [],
  );

  const [tag, setTag] = useState(() => params.get("tag") ?? "all");

  const [sort, setSort] = useState<SortKey>(() => {
    const value = params.get("sort");
    return isSort(value) ? value : "newest";
  });

  const [page, setPage] = useState(() => {
    const value = Number(params.get("page"));
    return Number.isSafeInteger(value) && value > 0 ? value : 1;
  });

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return items
      .filter((item) => {
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(item.categoryKey);

        const matchesTag = tag === "all" || (item.tags ?? []).includes(tag);

        const searchableText = projectSearchText(item);

        const matchesQuery = terms.every((term) =>
          searchableText.includes(term),
        );

        return matchesCategory && matchesTag && matchesQuery;
      })
      .sort(sorters[sort]);
  }, [items, query, selectedCategories, tag, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * pageSize;

  const visibleProjects = useMemo(
    () => filtered.slice(startIndex, startIndex + pageSize),
    [filtered, startIndex, pageSize],
  );

  const isFiltered =
    query.trim() !== "" ||
    selectedCategories.length > 0 ||
    tag !== "all" ||
    sort !== "newest";

  // Reset pagination whenever the search, filters, or sorting changes.
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    setPage(1);
  }, []);

  // Keep the current view shareable through URL query parameters.
  useEffect(() => {
    const next = new URLSearchParams();

    if (query.trim()) next.set("q", query.trim());

    if (selectedCategories.length) {
      next.set("category", selectedCategories.join(","));
    }

    if (tag !== "all") next.set("tag", tag);

    if (sort !== "newest") next.set("sort", sort);

    if (currentPage > 1) next.set("page", String(currentPage));

    const search = next.toString();
    const pathname = window.location.pathname;
    const hash = window.location.hash;

    const nextUrl = search
      ? `${pathname}?${search}${hash}`
      : `${pathname}${hash}`;

    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [query, selectedCategories, tag, sort, currentPage]);

  const toggleCategory = useCallback((key: string) => {
    setSelectedCategories((previous) =>
      previous.includes(key)
        ? previous.filter((category) => category !== key)
        : [...previous, key],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setSelectedCategories([]);
    setTag("all");
    setSort("newest");
    setPage(1);
  }, []);

  const changePage = useCallback(
    (nextPage: number) => {
      setPage(Math.max(1, Math.min(nextPage, pageCount)));
    },
    [pageCount],
  );

  return {
    query,
    setQuery,

    selectedCategories,
    toggleCategory,

    tag,
    setTag,

    sort,
    setSort,

    page: currentPage,
    pageCount,
    changePage,

    filteredProjects: filtered,
    visibleProjects,

    startIndex,
    isFiltered,
    clearFilters,
  };
};
