"use client";

import { type ReactNode, useId } from "react";
import { cn } from "@/packages/utils/cn";

type AccordionItemProps = {
  title: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
};

/**
 * AccordionItem.tsx
 * --------------------------------------------------------------
 * Controlled disclosure row: the caller owns open/closed state (see
 * `useAccordion` for the single-open case), so the same primitive backs
 * the mobile nav drawer and the mobile footer. Styling: styles/ui/accordion.css.
 *
 * Collapsed content is `inert`, so its links leave the tab order and the
 * accessibility tree while hidden.
 */
const AccordionItem = ({
  title,
  isOpen,
  onToggle,
  children,
  className,
}: AccordionItemProps) => {
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  return (
    <div className={cn("accordion-item", className)} data-open={isOpen}>
      <button
        type="button"
        id={triggerId}
        className="accordion-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-chevron" aria-hidden="true" />
      </button>

      <section
        id={panelId}
        aria-labelledby={triggerId}
        className="accordion-panel"
        inert={!isOpen}
      >
        <div className="accordion-panel-inner">
          <div className="accordion-panel-content">{children}</div>
        </div>
      </section>
    </div>
  );
};

export default AccordionItem;
