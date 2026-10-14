import type { ProjectListItem } from "@/types/projects";

// Kept apart from utils/projects.ts on purpose: client components import this,
// and utils/projects.ts pulls in the whole projects config (large).

/** "Newest" order: projects still in progress first, then by last update. */
export const compareNewest = (a: ProjectListItem, b: ProjectListItem) =>
  Number(b.ongoing) - Number(a.ongoing) ||
  b.updatedAtISO.localeCompare(a.updatedAtISO);
