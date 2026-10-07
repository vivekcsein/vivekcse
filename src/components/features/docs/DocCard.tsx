import Link from "next/link";
import { Icon } from "@/components/ui";
import type { TopicColor } from "@/packages/configs/content.config";
import { cn } from "@/packages/utils/cn";
import { formatDate } from "@/packages/utils/date";
import { formatReadingTime } from "@/packages/utils/format";
import { topicStyle } from "@/packages/utils/topic";
import type { DocSummary } from "@/types/content";

type DocCardProps = {
  doc: Pick<
    DocSummary,
    "href" | "title" | "description" | "readingMinutes" | "updatedAt"
  >;
  categoryTitle?: string;
  color?: TopicColor;
  className?: string;
};

export const DocCard = ({
  doc,
  categoryTitle,
  color = "violet",
  className,
}: DocCardProps) => (
  <Link
    className={cn("group", className)}
    href={doc.href}
    style={topicStyle(color)}
  >
    {categoryTitle && (
      <span className="topic-badge w-fit rounded-md px-2 py-0.5 text-[10px] font-medium">
        {categoryTitle}
      </span>
    )}

    <h3 className="text-balance text-base font-semibold leading-[1.3] tracking-tight text-card-foreground transition-colors group-hover:text-primary">
      {doc.title}
    </h3>

    <p className="line-clamp-2 text-[12.5px] leading-[1.45] text-muted-foreground">
      {doc.description}
    </p>

    <div className="mt-auto flex items-center gap-2 pt-3 text-[11px] text-muted-foreground">
      <Icon name="clock" size={12} />
      <span>{formatReadingTime(doc.readingMinutes)}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={doc.updatedAt}>{formatDate(doc.updatedAt)}</time>
    </div>
  </Link>
);
