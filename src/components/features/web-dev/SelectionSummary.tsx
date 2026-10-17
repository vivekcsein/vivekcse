"use client";

import { Icon } from "@/components/ui";
import type { SectionDef } from "@/packages/configs/dev-services.config";
import { cn } from "@/packages/utils/cn";
import { panel } from "./panel";
import type { WebDevForm } from "./useWebDevForm";

type SelectionSummaryProps = { form: WebDevForm };

const Value = ({
  section,
  values,
}: {
  section: SectionDef;
  values: string[];
}) => {
  const tone = section.summary?.tone ?? "text";

  if (tone === "chips") {
    return (
      <ul className="flex flex-wrap gap-2">
        {values.map((value) => (
          <li
            className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-foreground/90"
            key={value}
          >
            {value}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <span
      className={cn(
        "text-sm",
        tone === "highlight" ? "text-primary" : "font-medium text-foreground",
      )}
    >
      {values.join(", ")}
    </span>
  );
};

/** "Your Selection": one row per config section that has a `summary`. */
export const SelectionSummary = ({ form }: SelectionSummaryProps) => {
  const { summary, actions } = form.config;
  const rows = form.config.sections.filter((section) => section.summary);

  return (
    <section aria-label={summary.title} className={cn(panel, "p-5")}>
      <header className="flex items-start gap-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
          <Icon name="clipboard-list" size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-foreground">
            {summary.title}
          </h2>
          <p className="text-xs text-muted-foreground">{summary.subtitle}</p>
        </div>
        <button
          aria-label={actions.reset}
          className="grid size-7 place-items-center rounded-md bg-muted/60 text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/70"
          onClick={form.reset}
          title={actions.reset}
          type="button"
        >
          <Icon name="ellipsis" size={16} />
        </button>
      </header>

      <dl className="mt-4 divide-y divide-border/50 border-t border-border/50">
        {rows.map((section) => {
          const values =
            form.selections.find((selection) => selection.id === section.id)
              ?.values ?? [];
          return (
            <div
              className="grid grid-cols-[1.25rem_5.5rem_minmax(0,1fr)] items-start gap-x-3 py-3"
              key={section.id}
            >
              <dt className="contents">
                <span className="mt-0.5 text-muted-foreground">
                  {section.summary && (
                    <Icon name={section.summary.icon} size={16} />
                  )}
                </span>
                <span className="text-xs leading-5 text-muted-foreground">
                  {section.summary?.label}
                </span>
              </dt>
              <dd>
                {values.length > 0 ? (
                  <Value section={section} values={values} />
                ) : (
                  <span className="text-sm text-muted-foreground/70">
                    {summary.empty}
                  </span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
};
