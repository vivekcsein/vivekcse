"use client";

import { useEffect, useState } from "react";
import { cn } from "@/packages/utils/cn";
import type { TocItem } from "@/types/content";

type DocTocProps = {
  items: TocItem[];
  className?: string;
};

/** "On this page" with scroll-spy: highlights the section being read. */
export const DocToc = ({ items, className }: DocTocProps) => {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className={className}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              className={cn(
                "-ml-px block break-words border-l-2 py-1 text-[0.8125rem] leading-snug transition-colors [overflow-wrap:anywhere]",
                item.level === 3 ? "pl-7" : "pl-4",
                activeId === item.id
                  ? "border-primary font-medium text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
              href={`#${item.id}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
