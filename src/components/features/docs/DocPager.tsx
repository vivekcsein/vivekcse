import Link from "next/link";
import { Icon } from "@/components/ui";
import type { DocSummary } from "@/types/content";

type DocPagerProps = {
  previous?: DocSummary;
  next?: DocSummary;
};

export const DocPager = ({ previous, next }: DocPagerProps) => {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Previous and next guide"
      className="mt-12 grid gap-4 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          className="group rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-card"
          href={previous.href}
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="arrow-left" size={13} /> Previous
          </span>
          <span className="mt-1 block font-medium leading-snug group-hover:text-primary">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          className="group rounded-xl border border-border bg-card p-4 text-right transition hover:border-primary/40 hover:shadow-card sm:col-start-2"
          href={next.href}
        >
          <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
            Next <Icon name="arrow-right" size={13} />
          </span>
          <span className="mt-1 block font-medium leading-snug group-hover:text-primary">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
};
