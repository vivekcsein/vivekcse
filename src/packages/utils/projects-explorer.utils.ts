import { cn } from "@/packages/utils/cn";
import { compareNewest } from "@/packages/utils/project-sort";
import type { ProjectListItem } from "@/types/projects";

export const SORTS = {
  newest: "Newest first",
  oldest: "Oldest first",
  az: "Title A → Z",
} as const;

export type SortKey = keyof typeof SORTS;

export const sorters: Record<
  SortKey,
  (a: ProjectListItem, b: ProjectListItem) => number
> = {
  newest: compareNewest,
  oldest: (a, b) => a.createdAtISO.localeCompare(b.createdAtISO),
  az: (a, b) => a.title.localeCompare(b.title),
};

export const isSort = (value: string | null): value is SortKey =>
  value !== null && Object.hasOwn(SORTS, value);

export const projectSearchText = (item: ProjectListItem) =>
  [
    item.title,
    item.description,
    item.role,
    item.categoryTitle,
    ...(item.tags ?? []),
    ...(item.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase();

export const projectChip = (active: boolean) =>
  cn(
    "h-[30px] shrink-0 rounded-full border px-3.5 text-xs font-medium transition-colors",
    active
      ? "border-primary bg-primary text-primary-foreground shadow-[0_6px_18px_-8px_var(--primary)]"
      : "border-border bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
  );
