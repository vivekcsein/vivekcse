"use client";

import { useState } from "react";
import {
  type FaqConfig,
  type FaqItem,
  siteConfig,
} from "@/packages/configs/site.config";
import { cn } from "@/packages/utils/cn";

type FaqRowProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
};

const FaqRow = ({ item, isOpen, onToggle }: FaqRowProps) => {
  const triggerId = `faq-trigger-${item.id}`;
  const panelId = `faq-panel-${item.id}`;

  return (
    <div>
      <h4>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(item.id)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium hover:bg-current/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-current"
        >
          <span>{item.question}</span>
          <span
            aria-hidden
            className={cn(
              "size-2 shrink-0 rotate-45 border-r-2 border-b-2 border-current transition-transform duration-300 motion-reduce:transition-none",
              isOpen && "rotate-225",
            )}
          />
        </button>
      </h4>
      {/** biome-ignore lint/a11y/useSemanticElements: <explanation> */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        inert={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 px-5 pb-5 opacity-80">
            <p>{item.answer}</p>
            {item.points && (
              <ul className="space-y-2">
                {item.points.map((point) => (
                  <li key={point.label}>
                    <strong className="font-semibold">{point.label}</strong>
                    {" — "}
                    {point.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type FaqAccordionProps = {
  config?: FaqConfig;
  className?: string;
};

export const FaqAccordion = ({
  config = siteConfig.faqs,
  className,
}: FaqAccordionProps) => {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(
    () => new Set<string>(config.defaultOpenId ? [config.defaultOpenId] : []),
  );

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set<string>(config.allowMultiple ? prev : []);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section
      aria-labelledby="faq-heading"
      className={cn("mx-auto w-full max-w-3xl", className)}
    >
      <h2 id="faq-heading" className="text-3xl font-semibold tracking-tight">
        {config.heading}
      </h2>
      <p className="mt-2 opacity-70">{config.description}</p>

      {config.groups.map((group) => (
        <div key={group.id} className="mt-10">
          <h3 className="text-sm font-medium tracking-wide uppercase opacity-60">
            {group.title}
          </h3>
          <div className="mt-3 divide-y divide-current/10 rounded-xl border border-current/10">
            {group.items.map((item) => (
              <FaqRow
                key={item.id}
                item={item}
                isOpen={openIds.has(item.id)}
                onToggle={toggle}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
