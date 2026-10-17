"use client";

import { Button, Icon } from "@/components/ui";
import { useCopyToClipboard } from "@/packages/hooks";
import type { WebDevForm } from "./useWebDevForm";

type ReviewPanelProps = { form: WebDevForm };

/** Last step: everything the visitor picked, plus the raw answer array. */
export const ReviewPanel = ({ form }: ReviewPanelProps) => {
  const { review, actions } = form.config;
  const { copy, copied } = useCopyToClipboard();
  const json = JSON.stringify(form.selections, null, 2);

  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground">{review.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{review.description}</p>

      <dl className="mt-5 divide-y divide-border/50 rounded-xl border border-border bg-card/40">
        {form.selections.map((selection) => (
          <div
            className="grid gap-1.5 px-4 py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4"
            key={selection.id}
          >
            <dt className="text-xs font-medium text-muted-foreground sm:pt-1">
              {selection.label}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {selection.values.map((value) => (
                <span
                  className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-foreground"
                  key={value}
                >
                  {value}
                </span>
              ))}
            </dd>
          </div>
        ))}
        {form.timeline && (
          <div className="grid gap-1.5 px-4 py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
            <dt className="text-xs font-medium text-muted-foreground">
              {form.config.timeline.title}
            </dt>
            <dd className="text-sm font-semibold text-foreground">
              {form.timeline.label}
            </dd>
          </div>
        )}
      </dl>

      <details className="group mt-5 rounded-xl border border-border bg-card/40">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-foreground">
          Answers as an array
          <Icon
            className="text-muted-foreground transition-transform group-open:rotate-90"
            name="chevron-right"
            size={16}
          />
        </summary>
        <pre className="max-h-72 overflow-auto border-t border-border px-4 py-3 text-xs leading-5 text-muted-foreground">
          {json}
        </pre>
      </details>

      <Button
        className="mt-4 gap-2"
        onClick={() => copy(json)}
        size="md"
        variant="secondary"
      >
        <Icon name={copied ? "check" : "copy"} size={16} />
        {copied ? "Copied" : actions.copy}
      </Button>
    </div>
  );
};
