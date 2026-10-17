"use client";

import { useCallback, useMemo, useState } from "react";
import {
  type DevServicesConfig,
  devServicesConfig,
  type SectionDef,
} from "@/packages/configs/dev-services.config";
import {
  buildSelections,
  estimateTimeline,
  type FieldValues,
  type FormErrors,
  type FormValues,
  getStepSections,
  initialValues,
  type Selection,
  toggleValue,
  validateStep,
} from "@/packages/utils/dev-services";

const without = (record: FormErrors, key: string): FormErrors => {
  if (!(key in record)) return record;
  const next = { ...record };
  delete next[key];
  return next;
};

/**
 * All state + logic of the web-dev builder, driven by dev-services.config.ts.
 * The UI only renders what this returns; `selections` is the final answer array
 * and `submit()` validates every step and hands it back.
 */
export const useWebDevForm = (
  config: DevServicesConfig = devServicesConfig,
) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [values, setValues] = useState<FormValues>(() => initialValues(config));
  const [fields, setFields] = useState<FieldValues>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const step = config.steps[stepIndex];
  const stepCount = config.steps.length;
  const sections = useMemo(
    () => getStepSections(config, step.id),
    [config, step.id],
  );
  const selections = useMemo(
    () => buildSelections(config, values, fields),
    [config, values, fields],
  );
  const timeline = useMemo(
    () => estimateTimeline(config, values),
    [config, values],
  );

  const isSelected = useCallback(
    (sectionId: string, optionId: string) =>
      values[sectionId]?.includes(optionId) ?? false,
    [values],
  );

  const select = useCallback((section: SectionDef, optionId: string) => {
    setValues((prev) => ({
      ...prev,
      [section.id]: toggleValue(section.kind, prev[section.id] ?? [], optionId),
    }));
    setErrors((prev) => without(prev, section.id));
  }, []);

  const setField = useCallback((fieldId: string, value: string) => {
    setFields((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => without(prev, fieldId));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= stepCount || index > maxStep) return;
      setErrors({});
      setStepIndex(index);
    },
    [stepCount, maxStep],
  );

  /** Validates the current step, then moves on. Returns false when blocked. */
  const next = useCallback((): boolean => {
    const found = validateStep(config, step.id, values, fields);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return false;
    }
    const target = Math.min(stepIndex + 1, stepCount - 1);
    setErrors({});
    setStepIndex(target);
    setMaxStep((current) => Math.max(current, target));
    return true;
  }, [config, step.id, values, fields, stepIndex, stepCount]);

  const back = useCallback(() => goTo(stepIndex - 1), [goTo, stepIndex]);

  /** Validates every step; returns the final answer array, or null (and jumps to the problem). */
  const submit = useCallback((): Selection[] | null => {
    for (const [index, current] of config.steps.entries()) {
      const found = validateStep(config, current.id, values, fields);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        setStepIndex(index);
        return null;
      }
    }
    return selections;
  }, [config, values, fields, selections]);

  /** "Get a recommendation": applies config.recommendation.preset. */
  const applyPreset = useCallback(() => {
    setValues((prev) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(config.recommendation.preset).map(([id, ids]) => [
          id,
          [...ids],
        ]),
      ),
    }));
    setErrors({});
  }, [config]);

  const reset = useCallback(() => {
    setValues(initialValues(config));
    setFields({});
    setErrors({});
  }, [config]);

  return {
    config,
    steps: config.steps,
    step,
    stepIndex,
    stepCount,
    maxStep,
    isFirst: stepIndex === 0,
    isLast: stepIndex === stepCount - 1,
    sections,
    values,
    fields,
    errors,
    selections,
    timeline,
    isSelected,
    select,
    setField,
    goTo,
    next,
    back,
    submit,
    applyPreset,
    reset,
  };
};

export type WebDevForm = ReturnType<typeof useWebDevForm>;
