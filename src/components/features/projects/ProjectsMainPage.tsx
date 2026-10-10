import { Suspense } from "react";
import { SectionHeading } from "@/components/features/content/SectionHeading";
import { CategoryCard } from "@/components/features/docs/CategoryCard";
import { PageHero } from "@/components/features/docs/hero/DocsHero";
import { Icon } from "@/components/ui";
import projectsConfig from "@/packages/configs/projects.config";
import {
  getFeaturedProject,
  getProjectListItems,
  getProjectsHeroStats,
  getProjectTagCounts,
} from "@/packages/utils/projects";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectsExplorer } from "./ProjectsExplorer";
import { projectsHeroStats } from "./projects-hero-stats";

const UNIT = { singular: "project", plural: "projects" } as const;

/** /projects — same structure as the Knowledge Base home: hero, featured, categories, list. */
const ProjectsMainPage = () => {
  const items = getProjectListItems();
  const stats = getProjectsHeroStats(items);
  const featured = getFeaturedProject();
  const categories = projectsConfig.projects.map((category) => ({
    key: category.key,
    title: category.title,
    icon: category.icon,
    color: category.color,
    count: category.projectList.length,
    href: `/projects/${category.key}`,
  }));

  return (
    <div className="container-page pb-16">
      <PageHero copy={projectsConfig.hero} stats={projectsHeroStats(stats)} />

      {featured && (
        <section aria-labelledby="featured-project-heading" id="featured">
          <SectionHeading
            icon={
              <Icon
                className="fill-topic-amber text-topic-amber"
                name="star"
                size={18}
              />
            }
            id="featured-project-heading"
            title="Featured Project"
          />
          <FeaturedProject project={featured} />
        </section>
      )}

      <section
        aria-labelledby="project-categories-heading"
        className="mt-9"
        id="categories"
      >
        <SectionHeading
          icon={<Icon className="text-primary" name="layout-grid" size={18} />}
          id="project-categories-heading"
          title="Browse by Category"
        />
        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <li key={category.key}>
              <CategoryCard
                color={category.color}
                count={category.count}
                href={category.href}
                icon={category.icon}
                title={category.title}
                unit={UNIT}
              />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="all-projects-heading"
        className="mt-9 scroll-mt-24"
        id="all-projects"
      >
        <SectionHeading
          icon={<Icon className="text-primary" name="folder" size={18} />}
          id="all-projects-heading"
          title="All Projects"
        />
        <Suspense fallback={null}>
          <ProjectsExplorer
            categories={categories}
            items={items}
            tags={getProjectTagCounts(items)}
          />
        </Suspense>
      </section>
    </div>
  );
};

export default ProjectsMainPage;
