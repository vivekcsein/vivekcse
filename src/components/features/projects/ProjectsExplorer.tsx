"use client";

import { useRef } from "react";
import { useProjectsExplorer } from "@/packages/hooks/useProjectsExplorer";
import type { ProjectListItem } from "@/types/projects";
import { ProjectsExplorerCategories } from "./ProjectsExplorerCategories";
import { ProjectsExplorerFilters } from "./ProjectsExplorerFilters";
import { ProjectsExplorerResults } from "./ProjectsExplorerResults";

type ProjectsExplorerProps = {
  items: ProjectListItem[];
  categories?: { key: string; title: string; count: number }[];
  tags?: { tag: string; count: number }[];
  pageSize?: number;
};

export const ProjectsExplorer = ({
  items,
  categories = [],
  tags = [],
  pageSize = 9,
}: ProjectsExplorerProps) => {
  const resultsRef = useRef<HTMLDivElement>(null);

  const explorer = useProjectsExplorer({ items, pageSize });

  const handlePageChange = (page: number) => {
    explorer.changePage(page);

    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <div className="panel space-y-4 p-4">
        <ProjectsExplorerFilters
          onQueryChange={explorer.setQuery}
          onSortChange={explorer.setSort}
          onTagChange={explorer.setTag}
          query={explorer.query}
          sort={explorer.sort}
          tag={explorer.tag}
          tags={tags}
        />

        <ProjectsExplorerCategories
          categories={categories}
          onToggle={explorer.toggleCategory}
          selected={explorer.selectedCategories}
        />
      </div>

      <div ref={resultsRef}>
        <ProjectsExplorerResults
          isFiltered={explorer.isFiltered}
          onClear={explorer.clearFilters}
          onPageChange={handlePageChange}
          page={explorer.page}
          pageCount={explorer.pageCount}
          projects={explorer.visibleProjects}
          startIndex={explorer.startIndex}
          total={explorer.filteredProjects.length}
        />
      </div>
    </div>
  );
};
