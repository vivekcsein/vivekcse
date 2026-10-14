import type { HeroStatItem } from "@/components/features/docs/hero/DocsHero";
import type { ProjectsHeroStats } from "@/types/projects";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "UTC",
});

/** The four tiles under the /projects hero. */
export const projectsHeroStats = (stats: ProjectsHeroStats): HeroStatItem[] => [
  {
    label: "Projects",
    color: "sky",
    icon: "folder",
    value: stats.projects,
    duration: 1000,
  },
  {
    label: "Categories",
    color: "teal",
    icon: "layers",
    value: stats.categories,
    duration: 1100,
  },
  {
    label: "Technologies",
    color: "green",
    icon: "code",
    value: stats.technologies,
    duration: 1300,
  },
  ...(stats.lastUpdated
    ? [
        {
          label: dateFormatter.format(new Date(stats.lastUpdated)),
          color: "rose" as const,
          icon: "calendar" as const,
          value: "Last Updated",
          labelFirst: true,
        },
      ]
    : []),
];
