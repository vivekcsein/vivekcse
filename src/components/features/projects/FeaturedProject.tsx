import Image from "next/image";
import { ArticleArt } from "@/components/features/docs/article/ArticleArt";
import { Icon, InteractiveCard, InteractiveCardContent } from "@/components/ui";
import { formatDate } from "@/packages/utils/date";
import { topicStyle } from "@/packages/utils/topic";
import type { ProjectListItem } from "@/types/projects";

type FeaturedProjectProps = { project: ProjectListItem };

/** The big card at the top of /projects. Opens the live site. */
export const FeaturedProject = ({ project }: FeaturedProjectProps) => (
  <InteractiveCard
    aria-label={project.title}
    className="min-h-51.25 border-primary/35 shadow-[0_0_44px_-18px_var(--primary)]"
    enableTilt={false}
    style={topicStyle(project.categoryColor)}
  >
    <div className="fade-left absolute inset-y-0 right-0 w-[62%]">
      {project.coverImage ? (
        <Image
          alt=""
          className="object-cover"
          data-card-image
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          src={project.coverImage}
        />
      ) : (
        <ArticleArt
          className="size-full"
          color={project.categoryColor}
          icon={project.categoryIcon}
        />
      )}
    </div>

    <InteractiveCardContent className="justify-between gap-5 p-6 sm:min-h-51.25">
      <div className="max-w-[54%] min-w-60">
        <span className="topic-badge inline-flex rounded-md px-2 py-0.5 text-[10px] font-medium">
          {project.categoryTitle}
        </span>
        <h3 className="mt-3.5 text-balance text-[1.5rem] font-semibold leading-[1.12] tracking-tight text-foreground">
          <a
            className="after:absolute after:inset-0 after:z-10"
            href={project.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {project.title}
            <span className="sr-only"> (opens the live site in a new tab)</span>
          </a>
        </h3>
        <p className="mt-2.5 line-clamp-3 max-w-md text-[13px] leading-5 text-muted-foreground">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="user" size={13} />
          {project.role}
        </span>
        {project.ongoing ? (
          <span className="inline-flex items-center gap-1.5 font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
            Ongoing
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5">
            <Icon name="calendar" size={13} />
            {formatDate(project.updatedAtISO)}
          </span>
        )}
        <span className="inline-flex items-center gap-2 rounded-full border border-foreground/40 bg-background/40 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground max-sm:hidden">
          Visit live site
          <span data-card-arrow>
            <Icon name="arrow-right" size={14} />
          </span>
        </span>
      </div>
    </InteractiveCardContent>

    {!project.coverImage && project.tags && project.tags.length > 2 && (
      <ul className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 border-l border-foreground/15 pl-5 text-[13px] text-foreground/80 lg:block">
        {project.tags.slice(0, 5).map((tag) => (
          <li className="py-1.25" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    )}
  </InteractiveCard>
);
