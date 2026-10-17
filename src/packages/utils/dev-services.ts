import type {
  DevServicesConfig,
  SectionDef,
  SectionKind,
} from "@/packages/configs/dev-services.config";

/** sectionId → selected option ids (single sections hold at most one). */
export type FormValues = Record<string, string[]>;
/** fieldId → typed text. */
export type FieldValues = Record<string, string>;
/** sectionId | fieldId → message. */
export type FormErrors = Record<string, string>;

/** One answer in the final array. */
export type Selection = {
  step: string;
  id: string;
  label: string;
  kind: Exclude<SectionKind, "fields"> | "field";
  /** Option ids ([] for free-text fields). */
  ids: string[];
  /** Human-readable values (option titles, or the typed text). */
  values: string[];
};

export const getStepSections = (config: DevServicesConfig, stepId: string) =>
  config.sections.filter((section) => section.step === stepId);

export const initialValues = (config: DevServicesConfig): FormValues =>
  Object.fromEntries(
    config.sections
      .filter((section) => section.kind !== "fields")
      .map((section) => [section.id, [...(section.defaults ?? [])]]),
  );

/** single → replace · multi → add or remove. */
export const toggleValue = (
  kind: SectionKind,
  current: readonly string[],
  optionId: string,
): string[] => {
  if (kind === "single") return [optionId];
  return current.includes(optionId)
    ? current.filter((id) => id !== optionId)
    : [...current, optionId];
};

const optionTitle = (section: SectionDef, id: string) =>
  section.options?.find((option) => option.id === id)?.title ?? id;

/** The answers as a flat array, in step/section order. Empty answers are skipped. */
export const buildSelections = (
  config: DevServicesConfig,
  values: FormValues,
  fields: FieldValues,
): Selection[] =>
  config.steps.flatMap((step) =>
    getStepSections(config, step.id).flatMap((section): Selection[] => {
      if (section.kind === "fields") {
        return (section.fields ?? []).flatMap((field): Selection[] => {
          const value = fields[field.id]?.trim();
          return value
            ? [
                {
                  step: step.id,
                  id: field.id,
                  label: field.label.replace(/\s*\(optional\)/i, ""),
                  kind: "field",
                  ids: [],
                  values: [value],
                },
              ]
            : [];
        });
      }

      const ids = values[section.id] ?? [];
      if (ids.length === 0) return [];
      return [
        {
          step: step.id,
          id: section.id,
          label: section.summary?.label ?? section.title,
          kind: section.kind,
          ids,
          values: ids.map((id) => optionTitle(section, id)),
        },
      ];
    }),
  );

/** Adds up every selected option's `effort`. Null until something has an effort. */
export const estimateTimeline = (
  config: DevServicesConfig,
  values: FormValues,
): { min: number; max: number; label: string } | null => {
  let min = 0;
  let max = 0;
  let counted = false;

  for (const section of config.sections) {
    for (const id of values[section.id] ?? []) {
      const effort = section.options?.find(
        (option) => option.id === id,
      )?.effort;
      if (!effort) continue;
      min += effort.min;
      max += effort.max;
      counted = true;
    }
  }
  if (!counted) return null;

  const low = Math.max(config.timeline.minWeeks, Math.round(min));
  const high = Math.max(low, Math.round(max));
  const unit = config.timeline.unit;
  return {
    min: low,
    max: high,
    label: low === high ? `${low} ${unit}` : `${low} – ${high} ${unit}`,
  };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateStep = (
  config: DevServicesConfig,
  stepId: string,
  values: FormValues,
  fields: FieldValues,
): FormErrors => {
  const errors: FormErrors = {};

  for (const section of getStepSections(config, stepId)) {
    if (section.kind === "fields") {
      for (const field of section.fields ?? []) {
        const value = (fields[field.id] ?? "").trim();
        if (field.required && !value) {
          errors[field.id] = "This field is required.";
        } else if (field.type === "email" && value && !EMAIL.test(value)) {
          errors[field.id] = "Enter a valid email address.";
        }
      }
    } else if (section.required && !(values[section.id]?.length ?? 0)) {
      errors[section.id] =
        section.kind === "single"
          ? "Please choose one option."
          : "Select at least one option.";
    }
  }
  return errors;
};

/** A `mailto:` link whose body lists every answer (static site: no backend). */
export const buildMailto = (
  selections: readonly Selection[],
  { to, subject }: { to: string; subject: string },
): string => {
  const body = selections
    .map((selection) => `${selection.label}: ${selection.values.join(", ")}`)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
