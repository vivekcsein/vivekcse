"use client";

import { Icon } from "@/components/ui";
import { cn } from "@/packages/utils/cn";
import type { WebDevForm } from "./useWebDevForm";

type StepperProps = Pick<
  WebDevForm,
  "steps" | "stepIndex" | "maxStep" | "goTo"
>;

/** 1 ── 2 ── 3 ── 4 progress row. Visited steps can be clicked to go back. */
export const Stepper = ({ steps, stepIndex, maxStep, goTo }: StepperProps) => (
  <ol aria-label="Progress" className="flex w-full items-start">
    {steps.map((step, index) => {
      const done = index < stepIndex;
      const current = index === stepIndex;

      return (
        <li
          className="relative flex flex-1 flex-col items-center text-center"
          key={step.id}
        >
          {index > 0 && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-4 right-1/2 -left-1/2 h-px -translate-y-1/2",
                index <= stepIndex ? "bg-primary/70" : "bg-border",
              )}
            />
          )}
          <button
            aria-current={current ? "step" : undefined}
            className={cn(
              "relative z-10 grid size-8 place-items-center rounded-full border text-sm font-semibold outline-none transition-[background-color,border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-default",
              current
                ? "border-primary bg-primary text-primary-foreground shadow-[0_0_0_5px_color-mix(in_oklab,var(--primary)_22%,transparent)]"
                : done
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-border bg-card text-muted-foreground",
            )}
            disabled={index > maxStep}
            onClick={() => goTo(index)}
            type="button"
          >
            {done ? <Icon name="check" size={14} strokeWidth={3} /> : index + 1}
          </button>
          <span
            className={cn(
              "mt-2 text-[13px] font-semibold",
              current ? "text-foreground" : "text-foreground/80",
            )}
          >
            {step.title}
          </span>
          <span className="hidden text-[11px] text-muted-foreground sm:block">
            {step.subtitle}
          </span>
        </li>
      );
    })}
  </ol>
);
