import Image from "next/image";
import { ArticleArt } from "@/components/features/docs/article/ArticleArt";
import { Icon } from "@/components/ui";
import { formatDate } from "@/packages/utils/date";
import { topicStyle } from "@/packages/utils/topic";
import type { ProjectListItem } from "@/types/projects";

type ProjectCardProps = {
  project: ProjectListItem;
};

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <article
    className="group relative h-full rounded-2xl p-px transition-transform duration-300 ease-out hover:-translate-y-1.5 motion-reduce:transition-none"
    style={topicStyle(project.categoryColor)}
  >
    <div className="absolute inset-0 rounded-2xl bg-border transition-colors duration-300 group-hover:bg-primary/50" />

    <a
      aria-label={`${project.title} — opens the live site in a new tab`}
      className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-card text-card-foreground"
      href={project.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {/* Project cover */}
      <div className="relative aspect-16/10 shrink-0 overflow-hidden bg-muted">
        {project.coverImage ? (
          <Image
            alt={`${project.title} project preview`}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transform-none"
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 92vw"
            src={project.coverImage}
          />
        ) : (
          <div className="size-full transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transform-none">
            <ArticleArt
              className="size-full"
              color={project.categoryColor}
              icon={project.categoryIcon}
            />
          </div>
        )}

        {/* Image overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10 opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

        {/* Category badge */}
        <span className="topic-badge absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md">
          {project.categoryTitle}
        </span>

        {/* External link indicator */}
        <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:border-primary/60 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon name="external-link" size={14} />
        </span>

        {/* Hover indicator */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between px-4 pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-xs font-medium text-white">
            Explore project
          </span>
          <Icon name="arrow-right" size={16} />
        </div>
      </div>

      {/* Project details */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="space-y-1.5">
          <h3 className="text-balance text-base font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary">
            {project.title}
          </h3>

          <p className="line-clamp-3 text-[12.5px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <li
                className="rounded-md border border-border/70 bg-muted/50 px-2 py-1 text-[10.5px] text-muted-foreground transition-colors duration-200 group-hover:border-primary/20"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/60 pt-3">
          {project.ongoing ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Ongoing
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Icon name="calendar" size={12} />
              <time dateTime={project.updatedAtISO}>
                {formatDate(project.updatedAtISO)}
              </time>
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground/70 transition-all duration-300 group-hover:gap-2 group-hover:text-primary">
            Live preview
            <Icon name="arrow-right" size={12} />
          </span>
        </div>
      </div>
    </a>
  </article>
);
