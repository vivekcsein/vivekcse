"use client";

import Link from "next/link";
import { AccordionItem } from "@/components/ui";
import { useAccordion } from "@/packages/hooks/useAccordion";
import type { NavSection } from "@/types/navigation";

type FooterAccordionProps = {
  sections: NavSection[];
};

/** Mobile-only footer navigation (shown below 768px, see navigation.css). */
const FooterAccordion = ({ sections }: FooterAccordionProps) => {
  const { toggle, isOpen } = useAccordion();

  return (
    <div className="site-footer-accordion">
      {sections.map((section) => (
        <AccordionItem
          key={section.title}
          title={section.title}
          isOpen={isOpen(section.title)}
          onToggle={() => toggle(section.title)}
        >
          <ul className="site-footer-links">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="site-footer-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionItem>
      ))}
    </div>
  );
};

export default FooterAccordion;
