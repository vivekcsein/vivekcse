/** Category slug — must match a `key` in projects.config.ts (`full-stack`, `web`, `backend`, `3d-ar`, `experiments`, `tools`). */
export type ProjectType = string;

export interface ProjectCategory {
  key: ProjectType;
  title: string;
  eyebrow: string;
  description: string;

  /**
   * Short positioning statement shown on the category header.
   */
  positioning: string;

  /**
   * What this category demonstrates.
   */
  capabilities: string[];

  /**
   * Technologies commonly used in this category.
   */
  stack: string[];

  /**
   * Visual identifier / icon used by the UI.
   */
  icon: string;

  /**
   * Optional category-level metrics.
   */
  stats?: {
    label: string;
    value: string;
  }[];

  cta: {
    label: string;
    href: string;
  };

  /**
   * Projects belonging to this category.
   */
  projectList: readonly Project[];
}

export interface Project {
  key: string;
  title: string;
  description: string;

  role: string;
  client: "self" | "client" | "open-source" | "team";

  problem?: string;
  solution?: string;

  features?: string[];

  tags?: string[];
  keywords?: string[];

  architecture?: string;
  technicalDecisions?: string[];
  challenges?: string[];

  performance?: {
    metrics?: {
      label: string;
      value: string;
    }[];
  };

  security?: string[];
  accessibility?: string[];
  testing?: string[];

  deployment?: {
    platform?: string;
    database?: string;
    ci?: string;
  };

  team?: string;
  duration?: string;
  status?: "prototype" | "development" | "production" | "archived";

  demoUrl?: string;
  repositoryUrl?: string;

  coverImage?: string;
  screenshots?: string[];
  videoUrl?: string;

  businessImpact?: string;
  learnings?: string[];

  createdAt: string;
  updatedAt: string;

  href: string;
}
