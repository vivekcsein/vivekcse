import Image from "next/image";
import Link from "next/link";
import {
  Icon,
  type IconName,
  InteractiveCard,
  InteractiveCardContent,
} from "@/components/ui";
import type { TopicColor } from "@/packages/configs/content.config";
import { formatDate } from "@/packages/utils/date";
import { formatReadingTime } from "@/packages/utils/format";
import { topicStyle } from "@/packages/utils/topic";
import type { DocSummary } from "@/types/content";
import { ArticleArt } from "./ArticleArt";

type FeaturedArticleProps = {
  doc: DocSummary;
  category: { title: string; color: TopicColor; icon: IconName };
};

export const FeaturedArticle = ({ doc, category }: FeaturedArticleProps) => (
  <InteractiveCard
    aria-label={doc.title}
    className="min-h-[205px] border-primary/35 shadow-[0_0_44px_-18px_var(--primary)]"
    enableTilt={false}
    style={topicStyle(category.color)}
  >
    {/* Cover: real image if the doc sets `image`, generated art otherwise */}
    <div className="fade-left absolute inset-y-0 right-0 w-[62%]">
      {doc.image ? (
        <Image
          alt=""
          className="object-cover"
          data-card-image
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          src={doc.image}
        />
      ) : (
        <ArticleArt
          className="size-full"
          color={category.color}
          icon={category.icon}
        />
      )}
    </div>

    <InteractiveCardContent className="justify-between gap-5 p-6 sm:min-h-[205px]">
      <div className="max-w-[54%] min-w-[15rem]">
        <span className="topic-badge inline-flex rounded-md px-2 py-0.5 text-[10px] font-medium">
          {category.title}
        </span>
        <h3 className="mt-3.5 text-balance text-[1.5rem] font-semibold leading-[1.12] tracking-tight text-foreground">
          <Link
            className="after:absolute after:inset-0 after:z-10"
            href={doc.href}
          >
            {doc.title}
          </Link>
        </h3>
        <p className="mt-2.5 line-clamp-2 max-w-md text-[13px] leading-5 text-muted-foreground">
          {doc.description}
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="clock" size={13} />
          {formatReadingTime(doc.readingMinutes)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="calendar" size={13} />
          {formatDate(doc.updatedAt)}
        </span>
        <span className="ml-2 inline-flex items-center gap-2 rounded-full border border-foreground/40 bg-background/40 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground max-sm:hidden">
          Read Guide
          <span data-card-arrow>
            <Icon name="arrow-right" size={14} />
          </span>
        </span>
      </div>
    </InteractiveCardContent>

    {doc.keywords.length > 2 && (
      <ul className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 border-l border-foreground/15 pl-5 text-[13px] text-foreground/80 lg:block">
        {doc.keywords.slice(0, 5).map((keyword) => (
          <li className="py-1.25 capitalize" key={keyword}>
            {keyword}
          </li>
        ))}
      </ul>
    )}
  </InteractiveCard>
);
