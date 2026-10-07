"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback } from "react";
import {
  useNavigationActions,
  useNavigationState,
} from "@/components/providers/NavigationProvider";
import { AccordionItem } from "@/components/ui";
import { mainNav } from "@/packages/configs/navigation.config";
import { cn } from "@/packages/utils/cn";
import type { NavTab } from "@/types/navigation";

type MobileNavSectionProps = {
  tab: NavTab;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onLinkClick: () => void;
};

const MobileNavSection = memo(
  ({ tab, isExpanded, onToggle, onLinkClick }: MobileNavSectionProps) => {
    const pathname = usePathname();
    const handleToggle = useCallback(
      () => onToggle(tab.id),
      [onToggle, tab.id],
    );

    // Plain destination — same row height/typography as an accordion trigger.
    if (!tab.dropdown?.length) {
      const isCurrentRoute = tab.href !== undefined && pathname === tab.href;

      return (
        <div className="accordion-item">
          <Link
            href={tab.href ?? "#"}
            className={cn("mobile-nav-link", isCurrentRoute && "active")}
            aria-current={isCurrentRoute ? "page" : undefined}
            onClick={onLinkClick}
          >
            <span className="accordion-title">{tab.title}</span>
          </Link>
        </div>
      );
    }

    return (
      <AccordionItem
        title={tab.title}
        isOpen={isExpanded}
        onToggle={handleToggle}
      >
        {tab.dropdown.map((category) => (
          <div key={category.category} className="mobile-subcat">
            <div className="mobile-subcat-title">{category.category}</div>
            <ul className="mobile-subcat-links">
              {category.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="mobile-sublink"
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={onLinkClick}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </AccordionItem>
    );
  },
);

MobileNavSection.displayName = "MobileNavSection";

const NavbarMobile = () => {
  const activeMobileCategory = useNavigationState("activeMobileCategory");
  const { toggleMobileCategory, setMobileMenuOpen } = useNavigationActions();

  const handleLinkClick = useCallback(
    () => setMobileMenuOpen(false),
    [setMobileMenuOpen],
  );

  return (
    <nav className="mobile-nav" aria-label="Mobile">
      {mainNav.map((tab: NavTab) => (
        <MobileNavSection
          key={tab.id}
          tab={tab}
          isExpanded={activeMobileCategory === tab.id}
          onToggle={toggleMobileCategory}
          onLinkClick={handleLinkClick}
        />
      ))}
    </nav>
  );
};

export default NavbarMobile;
