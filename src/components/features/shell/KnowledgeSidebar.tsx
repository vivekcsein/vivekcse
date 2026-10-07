"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useSearch } from "@/components/features/search/SearchProvider";
import { Icon, type IconName } from "@/components/ui";
import appConfig from "@/packages/configs/app.config";
import { topicPalette } from "@/packages/configs/content.config";
import { shellConfig } from "@/packages/configs/shell.config";
import { cn } from "@/packages/utils/cn";
import { topicStyle } from "@/packages/utils/topic";
import type { SidebarData } from "@/types/content";
import { SidebarToggle } from "./SidebarToggle";

const rowBase =
  "sb-row flex min-h-9 w-full items-center gap-3 rounded-lg px-3 py-1.5 text-[13px] font-medium leading-snug transition-colors";
const rowIdle = "text-muted-foreground hover:bg-muted/60 hover:text-foreground";
const rowActive = "border border-primary/40 bg-primary/15 text-foreground";

type NavRowProps = {
  icon: IconName;
  label: string;
  href?: string;
  active?: boolean;
  badge?: ReactNode;
  hide: string;
  onClick?: () => void;
};

const NavRow = ({
  icon,
  label,
  href,
  active,
  badge,
  hide,
  onClick,
}: NavRowProps) => {
  const content = (
    <>
      <Icon className="shrink-0" name={icon} size={16} />
      <span
        className={cn(
          "flex-1 text-left min-w-0 break-words [overflow-wrap:anywhere]",
          hide,
        )}
      >
        {label}
      </span>
      {badge !== undefined && (
        <span
          className={cn(
            "shrink-0 rounded-md px-2 py-0.5 text-[11px] tabular-nums",
            hide,
            active ? "bg-primary/30 text-foreground" : "text-muted-foreground",
          )}
        >
          {badge}
        </span>
      )}
    </>
  );
  const className = cn(rowBase, active ? rowActive : rowIdle);

  return href ? (
    <Link
      aria-current={active ? "page" : undefined}
      className={className}
      href={href}
      title={label}
    >
      {content}
    </Link>
  ) : (
    <button className={className} onClick={onClick} title={label} type="button">
      {content}
    </button>
  );
};

type GroupLabelProps = { children: string; hide: string; action?: ReactNode };

const GroupLabel = ({ children, hide, action }: GroupLabelProps) => (
  <>
    <div
      className={cn(
        "mb-1.5 flex items-center justify-between px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
        hide,
      )}
    >
      {children}
      {action}
    </div>
    {/* Shown instead of the label when the sidebar is collapsed */}
    <div className="sb-divider mx-2 mb-2 hidden h-px bg-border" />
  </>
);

type KnowledgeSidebarProps = {
  data: SidebarData;
  /** Desktop rail (can collapse) vs. drawer (always expanded). */
  compactable?: boolean;
};

export const KnowledgeSidebar = ({
  data,
  compactable = true,
}: KnowledgeSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { index } = useSearch();
  const hide = compactable ? "sb-hide" : "";

  const goRandom = () => {
    const pick = index[Math.floor(Math.random() * index.length)];
    if (pick) router.push(pick.href);
  };

  const isHome = pathname === "/" || pathname === shellConfig.homeHref;

  return (
    <nav aria-label="Knowledge base" className="flex h-full flex-col">
      <div className="sb-top flex shrink-0 items-center justify-between gap-2 px-4 pb-3 pt-4">
        <div className={cn("flex min-w-0 items-center gap-3 px-1", hide)}>
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-card">
            <Icon name="book-open" size={19} />
          </span>
          <div className="min-w-0 leading-tight">
            {/* <p className="min-w-0 break-words [overflow-wrap:anywhere] text-sm font-semibold">
              {shellConfig.sidebar.title}
            </p>
            <p className="mt-0.5 min-w-0 break-words [overflow-wrap:anywhere] text-[11px] text-muted-foreground">
              {shellConfig.sidebar.subtitle}
            </p> */}
          </div>
        </div>
        {compactable && <SidebarToggle />}
      </div>

      <div className="sb-scroll min-h-0 flex-1 space-y-5 overflow-y-auto overflow-x-hidden px-4 py-1">
        <ul className="space-y-0.5">
          <li>
            <NavRow
              active={isHome}
              hide={hide}
              href="/"
              icon="home"
              label="Home"
            />
          </li>
          <li>
            <NavRow
              active={pathname === shellConfig.aggregateHref}
              badge={data.total}
              hide={hide}
              href={shellConfig.aggregateHref}
              icon="file-text"
              label="All Articles"
            />
          </li>
          <li>
            <NavRow
              hide={hide}
              href="/#featured"
              icon="star"
              label="Featured"
            />
          </li>
          <li>
            <NavRow
              hide={hide}
              href="/#latest"
              icon="clock"
              label="Recently Added"
            />
          </li>
          <li>
            <NavRow
              hide={hide}
              href="/#popular"
              icon="book-open"
              label="Most Read"
            />
          </li>
          <li>
            <NavRow
              active={pathname === shellConfig.bookmarksHref}
              hide={hide}
              href={shellConfig.bookmarksHref}
              icon="bookmark"
              label="Bookmarks"
            />
          </li>
          <li>
            <NavRow
              hide={hide}
              icon="shuffle"
              label="Random"
              onClick={goRandom}
            />
          </li>
        </ul>

        <section aria-label="Topics">
          <GroupLabel
            action={
              <Link
                aria-label="Browse all topics"
                className="text-muted-foreground hover:text-foreground"
                href={shellConfig.aggregateHref}
              >
                <Icon name="arrow-right" size={15} />
              </Link>
            }
            hide={hide}
          >
            Topics
          </GroupLabel>
          <ul className="space-y-0.5">
            {data.topics.map((topic) => {
              const isActive =
                pathname === topic.href ||
                pathname.startsWith(`${topic.href}/`);

              return (
                <li key={topic.id}>
                  <Link
                    aria-current={pathname === topic.href ? "page" : undefined}
                    className={cn(
                      "sb-row flex min-h-9 items-center gap-3 rounded-lg px-3 py-1.5 text-[13px] leading-snug transition-colors",
                      isActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                    href={topic.href}
                    style={topicStyle(topic.color)}
                    title={`${topic.title} (${topic.count})`}
                  >
                    <span className="topic-dot size-2 shrink-0 rounded-full" />
                    <span
                      className={cn(
                        "flex-1 min-w-0 break-words [overflow-wrap:anywhere]",
                        hide,
                      )}
                    >
                      {topic.title}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 text-xs tabular-nums text-muted-foreground",
                        hide,
                      )}
                    >
                      {topic.count}
                    </span>
                  </Link>

                  {isActive && (
                    <ul
                      className={cn(
                        "my-1 ml-[1.15rem] min-w-0 space-y-0.5 border-l pl-3",
                        hide,
                      )}
                      style={{
                        borderColor: `color-mix(in oklab, ${topicPalette[topic.color]} 33%, transparent)`,
                      }}
                    >
                      {topic.docs.map((doc) => (
                        <li key={doc.id}>
                          <Link
                            aria-current={
                              pathname === doc.href ? "page" : undefined
                            }
                            className={cn(
                              "block rounded-md px-2 py-1 text-xs leading-snug transition-colors min-w-0 break-words [overflow-wrap:anywhere]",
                              pathname === doc.href
                                ? "bg-primary/15 font-medium text-foreground"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                            href={doc.href}
                          >
                            {doc.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-label="Collections">
          <GroupLabel hide={hide}>Collections</GroupLabel>
          <ul className="space-y-0.5">
            {data.collections.map((collection) => (
              <li key={collection.key}>
                <NavRow
                  active={
                    pathname === collection.href ||
                    pathname.startsWith(`${collection.href}/`)
                  }
                  hide={hide}
                  href={collection.href}
                  icon="folder"
                  label={collection.title}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="sb-footer shrink-0 px-4 pb-4 pt-3">
        <figure
          className={cn(
            "rounded-xl border border-topic-teal/25 bg-linear-to-br from-topic-teal/10 to-primary/10 p-4 break-words [overflow-wrap:anywhere]",
            hide,
          )}
        >
          <blockquote className="text-[13px] italic leading-snug text-foreground/90">
            “{shellConfig.sidebar.quote}”
          </blockquote>
          <figcaption className="mt-3 text-right text-xs text-muted-foreground">
            — {appConfig.author.name}
          </figcaption>
        </figure>
      </div>
    </nav>
  );
};
