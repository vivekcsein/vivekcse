import Link from "next/link";
import { Icon } from "@/components/ui";
import { formatReadingTime } from "@/packages/utils/format";
import type { DocSummary } from "@/types/content";

type PopularListProps = {
  docs: DocSummary[];
  viewAllHref: string;
};

export const PopularList = ({ docs, viewAllHref }: PopularListProps) => {
  if (docs.length === 0) return null;

  return (
    <section
      aria-labelledby="popular-heading"
      className="panel p-4 pb-2"
      id="popular"
    >
      <div className="flex items-center justify-between">
        <h2
          className="flex items-center gap-2.5 text-sm font-semibold"
          id="popular-heading"
        >
          <Icon className="text-topic-orange" name="flame" size={19} />
          Popular This Month
        </h2>
        <Link
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          href={viewAllHref}
        >
          View all <Icon name="arrow-right" size={13} />
        </Link>
      </div>

      <ol className="mt-3">
        {docs.map((doc, index) => (
          <li className="border-b border-border/60 last:border-0" key={doc.id}>
            <Link
              className="group flex items-center gap-3.5 py-3.5"
              href={doc.href}
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-full border border-border bg-muted/60 text-base font-semibold ${index === 1 ? "text-topic-amber" : ""}`}
              >
                {index + 1}
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 text-[13.5px] font-semibold leading-[1.3] transition-colors group-hover:text-primary">
                  {doc.title}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {formatReadingTime(doc.readingMinutes)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
};
