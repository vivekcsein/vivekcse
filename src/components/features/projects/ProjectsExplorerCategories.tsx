"use client";

import { Icon } from "@/components/ui";
import { projectChip } from "@/packages/utils/projects-explorer.utils";

type ProjectsExplorerCategoriesProps = {
  categories: { key: string; title: string; count: number }[];
  selected: string[];
  onToggle: (key: string) => void;
};

export const ProjectsExplorerCategories = ({
  categories,
  selected,
  onToggle,
}: ProjectsExplorerCategoriesProps) => {
  if (categories.length <= 1) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon name="sliders" size={14} />
        Categories
      </span>

      {categories.map((category) => {
        const active = selected.includes(category.key);

        return (
          <button
            aria-pressed={active}
            className={projectChip(active)}
            key={category.key}
            onClick={() => onToggle(category.key)}
            type="button"
          >
            {category.title}
            <span className="ml-0.5 opacity-70">{category.count}</span>
          </button>
        );
      })}
    </div>
  );
};
