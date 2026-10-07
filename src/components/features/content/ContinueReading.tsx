"use client";

import Link from "next/link";
import { ArticleArt } from "@/components/features/docs/article/ArticleArt";
import { Icon, type IconName } from "@/components/ui";
import type { TopicColor } from "@/packages/configs/content.config";
import { useReadingProgress } from "@/packages/hooks";
import { topicStyle } from "@/packages/utils/topic";

export type ContinueItem = {
  id: string;
  href: string;
  title: string;
  minutes: number;
  topicTitle: string;
  color: TopicColor;
  icon: IconName;
};

type ContinueReadingProps = {
  items: ContinueItem[];
  /** Shown before anything has been read. */
  fallbackId: string;
};

export const ContinueReading = ({
  items,
  fallbackId,
}: ContinueReadingProps) => {
  const progress = useReadingProgress();

  const inProgress = items
    .filter((item) => {
      const p = progress[item.id]?.p ?? 0;
      return p >= 1 && p < 97;
    })
    .sort((a, b) => (progress[b.id]?.t ?? 0) - (progress[a.id]?.t ?? 0))[0];

  const item = inProgress ?? items.find((i) => i.id === fallbackId) ?? items[0];
  if (!item) return null;

  const percent = inProgress ? (progress[item.id]?.p ?? 0) : 0;
  const minutesLeft = Math.max(
    1,
    Math.round((item.minutes * (100 - percent)) / 100),
  );

  return (
    <section
      aria-labelledby="continue-heading"
      className="panel p-4"
      style={topicStyle(item.color)}
    >
      <h2
        className="flex items-center gap-2.5 text-sm font-semibold"
        id="continue-heading"
      >
        <span className="grid size-6 place-items-center rounded-full bg-primary/20 text-primary">
          <Icon name="clock" size={13} />
        </span>
        {inProgress ? "Continue Reading" : "Start Reading"}
      </h2>

      <div className="mt-4 flex gap-3.5">
        <ArticleArt
          className="h-[7.1rem] w-[4.6rem] shrink-0 rounded-lg border border-border"
          color={item.color}
          compact
          icon={item.icon}
        />
        <div className="min-w-0 flex-1">
          <span className="topic-badge inline-flex rounded-md px-2 py-0.5 text-[10px] font-medium">
            {item.topicTitle}
          </span>
          <p className="mt-2 line-clamp-2 text-base font-bold leading-tight tracking-tight">
            {item.title}
          </p>

          <div
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={percent}
            className="mt-3.5 h-1.25 overflow-hidden rounded-full bg-muted"
            role="progressbar"
          >
            <div
              className="h-full rounded-full bg-linear-to-r from-primary to-brand-to"
              style={{ width: `${Math.max(percent, 3)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {inProgress
              ? `${percent}% read · ${minutesLeft} min left`
              : `${item.minutes} min read`}
          </p>
        </div>
      </div>

      <Link
        className="mt-4 flex h-8.75 items-center justify-center gap-2 rounded-lg bg-primary text-[13px] font-medium text-primary-foreground shadow-[0_8px_20px_-8px_var(--primary)] transition-colors hover:bg-primary/90"
        href={item.href}
      >
        {inProgress ? "Continue Reading" : "Start Reading"}
        <Icon name="arrow-right" size={15} />
      </Link>
    </section>
  );
};
