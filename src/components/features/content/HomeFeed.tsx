"use client";

import Link from "next/link";
import { type ReactNode, useState } from "react";
import { DocCard } from "@/components/features/docs/DocCard";
import { SearchTrigger } from "@/components/features/search/SearchTrigger";
import { Card, Icon } from "@/components/ui";
import type { TopicColor } from "@/packages/configs/content.config";
import { cn } from "@/packages/utils/cn";
import { SectionHeading } from "./SectionHeading";

export type FeedItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  readingMinutes: number;
  updatedAt: string;
  /** `<collection>/<category>` */
  topicId: string;
  topicTitle: string;
  color: TopicColor;
};

type HomeFeedProps = {
  items: FeedItem[];
  topics: { id: string; title: string; count: number }[];
  total: number;
  viewAllHref: string;
  /** Server-rendered sections that sit between the chips and "Latest". */
  children: ReactNode;
};

/** Search bar + topic chips (filter "Latest Articles") + the sections between. */
export const HomeFeed = ({
  items,
  topics,
  total,
  viewAllHref,
  children,
}: HomeFeedProps) => {
  const [topic, setTopic] = useState("all");
  const visible = (
    topic === "all" ? items : items.filter((item) => item.topicId === topic)
  ).slice(0, 6);

  const chips = [{ id: "all", title: "All", count: total }, ...topics];

  return (
    <>
      <SearchTrigger className="mt-1" variant="bar" />

      <nav
        aria-label="Filter latest articles by topic"
        className="no-scrollbar -mx-1 mt-3.5 flex gap-2.5 overflow-x-auto px-1 pb-1"
      >
        {chips.map((chip) => (
          <button
            aria-pressed={topic === chip.id}
            className={cn(
              "h-7.5 shrink-0 rounded-full border px-3.5 text-xs font-medium transition-colors",
              topic === chip.id
                ? "border-primary bg-primary text-primary-foreground shadow-[0_6px_18px_-8px_var(--primary)]"
                : "border-border bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
            key={chip.id}
            onClick={() => setTopic(chip.id)}
            type="button"
          >
            {chip.title}{" "}
            <span
              className={cn(
                "ml-0.5",
                topic === chip.id ? "opacity-90" : "opacity-60",
              )}
            >
              {chip.count}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-4 space-y-5">
        {children}

        <section aria-labelledby="latest-heading" id="latest">
          <SectionHeading
            action={{ label: "View all articles", href: viewAllHref }}
            icon={<Icon className="text-primary" name="file-text" size={18} />}
            id="latest-heading"
            title="Latest Articles"
          />
          {visible.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Nothing here yet.{" "}
              <Link className="text-primary hover:underline" href={viewAllHref}>
                Browse everything
              </Link>
            </p>
          ) : (
            <ul className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((item) => (
                <li key={item.id}>
                  <Card variant="interactive-glow">
                    <DocCard
                      categoryTitle={item.topicTitle}
                      color={item.color}
                      doc={item}
                    />
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};
