"use client";

import { useEffect, useRef } from "react";
import { Button, Icon } from "@/components/ui";
import { cn } from "@/packages/utils/cn";
import { buildMailto, type Selection } from "@/packages/utils/dev-services";
import { panel } from "./panel";
import { ReviewPanel } from "./ReviewPanel";
import { SectionBlock } from "./SectionBlock";
import { SelectionSummary } from "./SelectionSummary";
import { RecommendCard, TalkCard, TimelineCard } from "./SidebarCards";
import { StepHeader } from "./StepHeader";
import { useWebDevForm } from "./useWebDevForm";

export type WebDevBuilderProps = {
  /** Where "Send my request" emails the answers (static site → mailto). */
  contactEmail: string;
  /** Receive the final answer array instead of opening the email client. */
  onSubmit?: (selections: Selection[]) => void;
};

const scrollToFirstError = () =>
  requestAnimationFrame(() =>
    document
      .querySelector<HTMLElement>("[data-error='true']")
      ?.scrollIntoView({ behavior: "smooth", block: "center" }),
  );

/** /services/web-development — the project builder (layout only; logic lives in useWebDevForm). */
export const WebDevBuilder = ({
  contactEmail,
  onSubmit,
}: WebDevBuilderProps) => {
  const form = useWebDevForm();
  const { actions } = form.config;
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Bring the new step into view (not on first paint).
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs when the step changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [form.stepIndex]);

  const handleNext = () => {
    if (!form.next()) scrollToFirstError();
  };

  const handleSubmit = () => {
    const result = form.submit();
    if (!result) {
      scrollToFirstError();
      return;
    }
    if (onSubmit) {
      onSubmit(result);
      return;
    }
    window.location.href = buildMailto(result, {
      to: contactEmail,
      subject: form.config.review.emailSubject,
    });
  };

  const primary = form.isLast ? handleSubmit : handleNext;

  return (
    <div className="container-page animate-fade-up pt-6 pb-16">
      <StepHeader form={form} />

      <div
        className="mt-8 grid scroll-mt-24 gap-6 lg:grid-cols-[minmax(0,1fr)_23rem] xl:grid-cols-[minmax(0,1fr)_24.5rem]"
        ref={topRef}
      >
        <section
          aria-label={form.step.title}
          className={cn(panel, "p-5 sm:p-7")}
        >
          {form.step.kind === "review" ? (
            <ReviewPanel form={form} />
          ) : (
            <div className="space-y-8">
              {form.sections.map((section, index) => (
                <SectionBlock
                  form={form}
                  index={index}
                  key={section.id}
                  section={section}
                />
              ))}
            </div>
          )}

          <footer className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {!form.isFirst && (
                <Button onClick={form.back} size="lg" variant="secondary">
                  {actions.back}
                </Button>
              )}
              <Button className="min-w-60 gap-2" onClick={primary} size="lg">
                {form.isLast ? actions.submit : actions.next}
                <Icon name="arrow-right" size={18} />
              </Button>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>
                Step {form.stepIndex + 1} of {form.stepCount}
              </span>
              <Button
                aria-label={form.isLast ? actions.submit : actions.next}
                className="rounded-full"
                onClick={primary}
                size="icon"
                variant="secondary"
              >
                <Icon name="arrow-right" size={18} />
              </Button>
            </div>
          </footer>
        </section>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:self-start">
          <SelectionSummary form={form} />
          <TimelineCard form={form} />
          <RecommendCard form={form} />
          <TalkCard form={form} />
        </aside>
      </div>
    </div>
  );
};
