import { Icon } from "@/components/ui";
import { cn } from "@/packages/utils/cn";

type PaginationProps = {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  className?: string;
};

/** 1 … 4 5 6 … 12 — always keeps first, last and the current neighbours. */
const pageWindow = (
  page: number,
  count: number,
): (number | `gap-${number}`)[] => {
  const wanted = new Set([1, count, page - 1, page, page + 1]);
  if (page <= 3) for (const n of [2, 3, 4]) wanted.add(n);
  if (page >= count - 2)
    for (const n of [count - 1, count - 2, count - 3]) wanted.add(n);

  const sorted = [...wanted]
    .filter((n) => n >= 1 && n <= count)
    .sort((a, b) => a - b);

  return sorted.flatMap((n, i) =>
    i > 0 && n - sorted[i - 1] > 1 ? ([`gap-${n}`, n] as const) : [n],
  );
};

const item =
  "grid h-9 min-w-9 place-items-center rounded-lg border px-2 text-sm font-medium transition-colors";

export const Pagination = ({
  page,
  pageCount,
  onChange,
  className,
}: PaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-center gap-1.5",
        className,
      )}
    >
      <button
        aria-label="Previous page"
        className={cn(
          item,
          "border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
        )}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        type="button"
      >
        <Icon name="chevron-left" size={16} />
      </button>

      {pageWindow(page, pageCount).map((entry) =>
        typeof entry === "string" ? (
          <span
            aria-hidden="true"
            className="px-1 text-muted-foreground"
            key={entry}
          >
            …
          </span>
        ) : (
          <button
            aria-current={entry === page ? "page" : undefined}
            aria-label={`Page ${entry}`}
            className={cn(
              item,
              entry === page
                ? "border-primary bg-primary text-primary-foreground shadow-[0_6px_18px_-8px_var(--primary)]"
                : "border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
            key={entry}
            onClick={() => onChange(entry)}
            type="button"
          >
            {entry}
          </button>
        ),
      )}

      <button
        aria-label="Next page"
        className={cn(
          item,
          "border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
        )}
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        type="button"
      >
        <Icon name="chevron-right" size={16} />
      </button>
    </nav>
  );
};
