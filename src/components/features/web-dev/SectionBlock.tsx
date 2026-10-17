"use client";

import type {
  FieldDef,
  SectionDef,
  SectionLayout,
} from "@/packages/configs/dev-services.config";
import { cn } from "@/packages/utils/cn";
import { OptionButton } from "./OptionButton";
import type { WebDevForm } from "./useWebDevForm";

type SectionBlockProps = {
  section: SectionDef;
  /** 0-based position inside the step (shown as 1, 2, 3…). */
  index: number;
  form: WebDevForm;
};

/** Auto-fit grids: the same markup gives 4-up tiles on desktop and 1–2 columns on phones. */
const GRID: Record<SectionLayout, string> = {
  cards: "grid gap-3.5 sm:grid-cols-3",
  tiles:
    "grid gap-3 grid-cols-[repeat(auto-fit,minmax(min(100%,11.25rem),1fr))]",
  chips: "grid gap-3 grid-cols-[repeat(auto-fit,minmax(min(100%,9rem),1fr))]",
  radio: "grid gap-3 grid-cols-[repeat(auto-fit,minmax(min(100%,8rem),1fr))]",
};

const inputBase =
  "w-full rounded-lg border bg-card/60 px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-4 focus:ring-primary/10";

const Field = ({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldDef;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) => {
  const border = error ? "border-destructive" : "border-border";
  const id = `field-${field.id}`;
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        field.type === "textarea" && "sm:col-span-2",
      )}
    >
      <label className="text-xs font-medium text-muted-foreground" htmlFor={id}>
        {field.label}
        {field.required && <span className="text-destructive"> *</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea
          aria-invalid={Boolean(error)}
          className={cn(inputBase, border, "min-h-28 resize-y py-3")}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          value={value}
        />
      ) : (
        <input
          aria-invalid={Boolean(error)}
          className={cn(inputBase, border, "h-11")}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          type={field.type}
          value={value}
        />
      )}
      {error && (
        <span className="text-xs font-medium text-destructive" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

/** The options of a single/multi section. Explicit roles so assistive tech announces radio vs checkbox groups. */
const OptionGrid = ({
  section,
  form,
}: {
  section: SectionDef;
  form: WebDevForm;
}) => {
  const layout = section.layout ?? "tiles";
  const kind = section.kind === "single" ? "single" : "multi";
  const items = (section.options ?? []).map((option) => (
    <OptionButton
      key={option.id}
      kind={kind}
      layout={layout}
      onSelect={() => form.select(section, option.id)}
      option={option}
      selected={form.isSelected(section.id, option.id)}
    />
  ));
  const labelledBy = `${section.id}-title`;

  return kind === "single" ? (
    <div
      aria-labelledby={labelledBy}
      className={GRID[layout]}
      role="radiogroup"
    >
      {items}
    </div>
  ) : (
    <fieldset
      aria-labelledby={labelledBy}
      className={cn(GRID[layout], "m-0 min-w-0 border-0 p-0")}
    >
      {items}
    </fieldset>
  );
};

/** One numbered block: title, description and either its options or its text fields. */
export const SectionBlock = ({ section, index, form }: SectionBlockProps) => {
  const error = form.errors[section.id];
  const hasError =
    Boolean(error) || (section.fields ?? []).some((f) => form.errors[f.id]);

  return (
    <section
      aria-labelledby={`${section.id}-title`}
      className="scroll-mt-28"
      data-error={hasError ? "true" : undefined}
    >
      <header className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-base font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_var(--primary)]"
        >
          {index + 1}
        </span>
        <div className="min-w-0">
          <h2
            className="text-lg leading-tight font-semibold text-foreground"
            id={`${section.id}-title`}
          >
            {section.title}
            {section.optionalLabel && (
              <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                {section.optionalLabel}
              </span>
            )}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {section.description}
          </p>
          {error && (
            <p
              className="mt-1.5 text-xs font-medium text-destructive"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      </header>

      <div className="mt-4">
        {section.kind === "fields" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {(section.fields ?? []).map((field) => (
              <Field
                error={form.errors[field.id]}
                field={field}
                key={field.id}
                onChange={(value) => form.setField(field.id, value)}
                value={form.fields[field.id] ?? ""}
              />
            ))}
          </div>
        ) : (
          <OptionGrid form={form} section={section} />
        )}
      </div>
    </section>
  );
};
