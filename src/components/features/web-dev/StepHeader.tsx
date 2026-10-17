"use client";

import { Icon, Link } from "@/components/ui";
import { Stepper } from "./Stepper";
import type { WebDevForm } from "./useWebDevForm";

type StepHeaderProps = { form: WebDevForm };

/** Breadcrumb, "Step 1 of 4", headline, subtitle, hand-written note and the stepper. */
export const StepHeader = ({ form }: StepHeaderProps) => {
  const { page } = form.config;

  return (
    <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:items-start">
      <div>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li aria-hidden="true">
              <Icon name="arrow-right" size={14} />
            </li>
            {page.breadcrumb.map((crumb, index) => (
              <li className="flex items-center gap-2" key={crumb.label}>
                {index > 0 && <Icon name="chevron-right" size={13} />}
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <p className="mt-4 inline-flex rounded-md border border-border bg-card/60 px-2.5 py-1 text-xs text-muted-foreground">
          Step {form.stepIndex + 1} of {form.stepCount}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {page.title}{" "}
          <span className="bg-linear-to-r from-brand-from via-brand-via to-brand-to bg-clip-text text-transparent">
            {page.highlight}
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{page.subtitle}</p>
      </div>

      <div className="relative">
        {/* hand-written note + arrow (wide screens only) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1 right-full mr-6 hidden w-44 -rotate-6 text-primary xl:block"
        >
          <p className="font-serif text-lg leading-6 italic">
            {page.note.map((line, index) => (
              <span className="block" key={line}>
                {line}
                {index === page.note.length - 1 && (
                  <Icon
                    className="ml-1 inline-block translate-y-1"
                    name="arrow-down-right"
                    size={18}
                  />
                )}
              </span>
            ))}
          </p>
        </div>

        <Stepper
          goTo={form.goTo}
          maxStep={form.maxStep}
          stepIndex={form.stepIndex}
          steps={form.steps}
        />
      </div>
    </header>
  );
};
