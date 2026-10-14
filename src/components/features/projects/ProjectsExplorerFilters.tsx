"use client";

import { Icon, Select } from "@/components/ui";
import { SORTS, type SortKey } from "@/packages/utils/projects-explorer.utils";

type ProjectsExplorerFiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  tag: string;
  onTagChange: (value: string) => void;
  tags: { tag: string; count: number }[];
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
};

export const ProjectsExplorerFilters = ({
  query,
  onQueryChange,
  tag,
  onTagChange,
  tags,
  sort,
  onSortChange,
}: ProjectsExplorerFiltersProps) => {
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_13rem_12rem]">
      <label className="relative block">
        <span className="sr-only">Search projects</span>

        <Icon
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          name="search"
          size={16}
        />

        <input
          className="h-10 w-full rounded-lg border border-border bg-card/60 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground hover:border-primary/40 focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by name, technology or keyword…"
          type="search"
          value={query}
        />
      </label>

      <Select
        label="Technology"
        onChange={onTagChange}
        options={[
          { value: "all", label: "All technologies" },
          ...tags.slice(0, 30).map((entry) => ({
            value: entry.tag,
            label: `${entry.tag} · ${entry.count}`,
          })),
        ]}
        value={tag}
      />

      <Select
        label="Sort projects"
        onChange={(value) => {
          if (Object.hasOwn(SORTS, value)) {
            onSortChange(value as SortKey);
          }
        }}
        options={Object.entries(SORTS).map(([value, label]) => ({
          value,
          label,
        }))}
        value={sort}
      />
    </div>
  );
};
