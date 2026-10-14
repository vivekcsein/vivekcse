"use client";

import { Icon } from "@/components/ui";
import { Pagination } from "@/components/ui/pagination/Pagination";
import type { ProjectListItem } from "@/types/projects";
import { ProjectCard } from "./ProjectCard";

type ProjectsExplorerResultsProps = {
  projects: ProjectListItem[];
  total: number;
  startIndex: number;
  page: number;
  pageCount: number;
  isFiltered: boolean;
  onClear: () => void;
  onPageChange: (page: number) => void;
};

export const ProjectsExplorerResults = ({
  projects,
  total,
  startIndex,
  page,
  pageCount,
  isFiltered,
  onClear,
  onPageChange,
}: ProjectsExplorerResultsProps) => {
  return (
    <>
      <div
        className="mb-3 mt-5 flex min-h-8 scroll-mt-24 items-center justify-between gap-4"
        id="projects-results"
      >
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {total === 0
            ? "No projects found"
            : `Showing ${startIndex + 1}–${startIndex + projects.length} of ${total} ${
                total === 1 ? "project" : "projects"
              }`}
        </p>

        {isFiltered && (
          <button
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
            onClick={onClear}
            type="button"
          >
            <Icon name="close" size={13} />
            Clear filters
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          Nothing matches those filters.{" "}
          <button
            className="font-medium text-primary hover:underline"
            onClick={onClear}
            type="button"
          >
            Reset and show everything
          </button>
        </div>
      ) : (
        <ul className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <li key={project.key}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}

      <Pagination
        className="mt-8"
        onChange={onPageChange}
        page={page}
        pageCount={pageCount}
      />
    </>
  );
};
