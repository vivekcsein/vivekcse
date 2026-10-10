import projectsConfig from "@/packages/configs/projects.config";
import type { Project } from "@/types/projects";

export type ProjectCategory = (typeof projectsConfig.projects)[number];

/**
 * Get every project category.
 */
export const getAllProjectCategories = (): readonly ProjectCategory[] => {
  return projectsConfig.projects;
};

/**
 * Get a single project category by key.
 */
export const getProjectCategory = (
  category: string,
): ProjectCategory | undefined => {
  return projectsConfig.projects.find(
    (projectCategory) => projectCategory.key === category,
  );
};

/**
 * Get multiple project categories by their keys.
 */
export const getProjectCategories = (
  categories: readonly string[],
): readonly ProjectCategory[] => {
  return projectsConfig.projects.filter((projectCategory) =>
    categories.includes(projectCategory.key),
  );
};

/**
 * Flatten all category project lists into one project collection.
 */
export const getAllProjects = (): Project[] => {
  return projectsConfig.projects.flatMap(
    (projectCategory) => projectCategory.projectList as Project[],
  ) as Project[];
};

/**
 * Get projects from a specific category.
 */
export const getProjectsByCategory = (category: string): Project[] => {
  const projectCategory = getProjectCategory(category);

  if (!projectCategory) {
    return [];
  }

  return [...projectCategory.projectList] as Project[];
};

/**
 * Get a single project by its key/title.
 *
 * Uses common project identifiers when available.
 */
export const getProjectByKey = (key: string): Project | undefined => {
  return getAllProjects().find(
    (project) => "key" in project && project.key === key,
  );
};

/**
 * Get the first N projects.
 *
 * Useful for homepage sections.
 */
export const getTopProjects = (limit = 3): Project[] => {
  return getAllProjects().slice(0, limit);
};

/**
 * Alias specifically for homepage usage.
 */
export const getFeaturedProjects = (limit = 3): Project[] => {
  return getTopProjects(limit);
};

/**
 * Get the total number of projects.
 */
export const getProjectCount = (): number => {
  return getAllProjects().length;
};

/**
 * Get the number of projects in a category.
 */
export const getCategoryProjectCount = (category: string): number => {
  return getProjectsByCategory(category).length;
};

/**
 * Get all unique project tags.
 */
export const getProjectTags = (): string[] => {
  const tags = getAllProjects().flatMap((project) =>
    "tags" in project && Array.isArray(project.tags) ? project.tags : [],
  );

  return [...new Set(tags)];
};

/**
 * Get all unique technologies used across projects.
 */
export const getProjectStack = (): string[] => {
  return getProjectTags();
};

/**
 * Find projects containing a specific tag.
 */
export const getProjectsByTag = (tag: string): Project[] => {
  const normalizedTag = tag.toLowerCase();

  return getAllProjects().filter((project) => {
    if (!("tags" in project) || !Array.isArray(project.tags)) {
      return false;
    }

    return project.tags.some(
      (projectTag) => projectTag.toLowerCase() === normalizedTag,
    );
  });
};

/**
 * Find projects containing a specific keyword.
 */
export const getProjectsByKeyword = (keyword: string): Project[] => {
  const normalizedKeyword = keyword.toLowerCase();

  return getAllProjects().filter((project) => {
    if (!("keywords" in project) || !Array.isArray(project.keywords)) {
      return false;
    }

    return project.keywords.some(
      (projectKeyword) => projectKeyword.toLowerCase() === normalizedKeyword,
    );
  });
};

/**
 * Search projects by title, description, tags, or keywords.
 */
export const searchProjects = (query: string): Project[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return getAllProjects();
  }

  return getAllProjects().filter((project) => {
    const title = "title" in project ? String(project.title).toLowerCase() : "";

    const description =
      "description" in project ? String(project.description).toLowerCase() : "";

    const tags =
      "tags" in project && Array.isArray(project.tags)
        ? project.tags.join(" ").toLowerCase()
        : "";

    const keywords =
      "keywords" in project && Array.isArray(project.keywords)
        ? project.keywords.join(" ").toLowerCase()
        : "";

    return (
      title.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      tags.includes(normalizedQuery) ||
      keywords.includes(normalizedQuery)
    );
  });
};

/**
 * Get basic project statistics.
 */
export const getProjectStats = () => {
  const categories = getAllProjectCategories();
  const projects = getAllProjects();

  return {
    totalProjects: projects.length,
    totalCategories: categories.length,
    totalTags: getProjectTags().length,
    categories: categories.map((category) => ({
      key: category.key,
      title: category.title,
      count: category.projectList.length,
    })),
  };
};

export const getProjectKeys = (): string[] => {
  return [
    ...new Set(
      projectsConfig.projects.flatMap((category) =>
        category.projectList.map((project) => project.key),
      ),
    ),
  ];
};

// ---------------------------------------------------------------------------
// Dates, list items, featured project and hero stats (used by /projects)
// ---------------------------------------------------------------------------

import type { ProjectListItem, ProjectsHeroStats } from "@/types/projects";
import { compareNewest } from "./project-sort";

/**
 * Project dates in the config are written dd/mm/yyyy. Returns an ISO string
 * (UTC midnight); ISO input passes through; anything unparseable → epoch.
 */
export const toProjectISODate = (value: string): string => {
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim());
  const date = match
    ? new Date(
        Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1])),
      )
    : new Date(value);

  return Number.isNaN(date.getTime())
    ? new Date(0).toISOString()
    : date.toISOString();
};

const isOngoing = (value: string) => value.trim().toLowerCase() === "ongoing";

/** Every project flattened with its category, newest first. */
export const getProjectListItems = (): ProjectListItem[] =>
  projectsConfig.projects
    .flatMap((category) =>
      (category.projectList as readonly Project[]).map(
        (project): ProjectListItem => {
          const ongoing = isOngoing(project.updatedAt);
          return {
            ...project,
            categoryKey: category.key,
            categoryTitle: category.title,
            categoryColor: category.color,
            categoryIcon: category.icon,
            ongoing,
            createdAtISO: toProjectISODate(project.createdAt),
            // "ongoing" has no date: fall back to when it started
            updatedAtISO: toProjectISODate(
              ongoing ? project.createdAt : project.updatedAt,
            ),
          };
        },
      ),
    )
    .sort(compareNewest);

export const getProjectListItemsByCategory = (
  category: string,
): ProjectListItem[] =>
  getProjectListItems().filter((item) => item.categoryKey === category);

/**
 * The featured project on /projects: the Nth full-stack project, where N is
 * `featuredFullStackProject` in projects.config.ts (1 = first).
 */
export const getFeaturedProject = (): ProjectListItem | undefined => {
  const fullStack = projectsConfig.projects.find((c) => c.key === "full-stack");
  const list = (fullStack?.projectList ?? []) as readonly Project[];
  const picked = list[projectsConfig.featuredFullStackProject - 1] ?? list[0];

  return getProjectListItems().find((item) => item.key === picked?.key);
};

/** Tags with how many projects use each, most used first. */
export const getProjectTagCounts = (
  items: readonly ProjectListItem[] = getProjectListItems(),
): { tag: string; count: number }[] => {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const tag of item.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
};

export const getProjectsHeroStats = (
  items: readonly ProjectListItem[] = getProjectListItems(),
  categories = projectsConfig.projects.length,
): ProjectsHeroStats => ({
  projects: items.length,
  categories,
  technologies: getProjectTagCounts(items).length,
  // Only real dates: "ongoing" projects do not count as an update date.
  lastUpdated: items
    .filter((item) => !item.ongoing)
    .map((item) => item.updatedAtISO)
    .sort()
    .at(-1),
});
