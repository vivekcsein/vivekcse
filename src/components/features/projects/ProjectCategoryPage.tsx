import Link from "next/link";
import type { CSSProperties } from "react";
import { Suspense } from "react";
import { Icon } from "@/components/ui";
import { topicPalette } from "@/packages/configs/content.config";
import {
  getProjectListItemsByCategory,
  getProjectTagCounts,
  type ProjectCategory,
} from "@/packages/utils/projects";
import { ProjectsExplorer } from "./ProjectsExplorer";

type ProjectCategoryPageProps = { category: ProjectCategory };

const mix = (tone: string, pct: number) =>
  `color-mix(in oklab, ${tone} ${pct}%, transparent)`;

const Pills = ({
  label,
  values,
}: {
  label: string;
  values: readonly string[];
}) => (
  <div className="flex flex-wrap items-center gap-2">
    <span className="mr-1 text-xs font-medium text-muted-foreground">
      {label}
    </span>
    {values.map((value) => (
      <span
        className="rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted-foreground"
        key={value}
      >
        {value}
      </span>
    ))}
  </div>
);

/** /projects/[category] — category header + the filterable list for that category. */
export const ProjectCategoryPage = ({ category }: ProjectCategoryPageProps) => {
  const items = getProjectListItemsByCategory(category.key);
  const tone = topicPalette[category.color];
  const tile: CSSProperties = {
    color: tone,
    background: mix(tone, 16),
    border: `1px solid ${mix(tone, 30)}`,
  };

  return (
    <div className="container-page animate-fade-up py-8 pb-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-5 text-xs text-muted-foreground"
      >
        <Link className="hover:text-foreground" href="/projects">
          Projects
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-foreground/80">{category.title}</span>
      </nav>

      <header className="mb-6 flex items-start gap-4">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-xl"
          style={tile}
        >
          <Icon name={category.icon} size={24} />
        </span>
        <div className="min-w-0">
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: tone }}
          >
            {category.eyebrow}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            {category.title}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {category.positioning}
          </p>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground/90">
            {category.description}
          </p>
        </div>
      </header>

      <div className="mb-6 space-y-3 rounded-xl border border-border bg-card/40 p-4">
        <Pills label="Capabilities" values={category.capabilities} />
        <Pills label="Stack" values={category.stack} />
        {category.stats && (
          <dl className="flex flex-wrap gap-x-8 gap-y-2 pt-1 text-xs">
            <div>
              <dt className="text-muted-foreground">Projects</dt>
              <dd className="mt-0.5 text-sm font-semibold">{items.length}</dd>
            </div>
            {category.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-muted-foreground">{stat.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <Suspense fallback={null}>
        <ProjectsExplorer items={items} tags={getProjectTagCounts(items)} />
      </Suspense>
    </div>
  );
};
