"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useId } from "react";
import {
  useNavigationActions,
  useNavigationState,
} from "@/components/providers/NavigationProvider";
import { mainNav } from "@/packages/configs/navigation.config";
import { useHoverDropdown } from "@/packages/hooks/useHoverDropdown";
import { getAnimationStyle } from "@/packages/utils/animation";
import { cn } from "@/packages/utils/cn";
import type { DropdownCategory, NavTab } from "@/types/navigation";

type NavItemProps = {
  tab: NavTab;
  activeId: string | null;
  onSelect: (id: string | null) => void;
};

/** Both the plain link and the dropdown trigger render their text in this
 *  span, so the underline (navigation.css) is exactly as wide as the text. */
const NavLabel = ({ children }: { children: string }) => (
  <span className="nav-label">{children}</span>
);

const NavItem = memo(({ tab, activeId, onSelect }: NavItemProps) => {
  const pathname = usePathname();
  const panelId = useId();
  const hasDropdown = Boolean(tab.dropdown?.length);
  const { isActive, itemRef, triggerRef, itemProps, onTriggerClick } =
    useHoverDropdown({ id: tab.id, activeId, onSelect });

  // Plain destination: no dropdown markup, no hover handlers.
  if (!hasDropdown) {
    const isCurrentRoute = tab.href !== undefined && pathname === tab.href;

    return (
      <li className="nav-item">
        <Link
          href={tab.href ?? "#"}
          className={cn("nav-btn", isCurrentRoute && "active")}
          aria-current={isCurrentRoute ? "page" : undefined}
        >
          <NavLabel>{tab.title}</NavLabel>
        </Link>
      </li>
    );
  }

  const isCurrentSection = Boolean(
    tab.dropdown?.some((category) =>
      category.items.some((item) => item.href === pathname),
    ),
  );

  return (
    <li className="nav-item" ref={itemRef} {...itemProps}>
      <button
        ref={triggerRef}
        type="button"
        className={cn("nav-btn", (isActive || isCurrentSection) && "active")}
        aria-haspopup="true"
        aria-expanded={isActive}
        aria-controls={panelId}
        onClick={onTriggerClick}
      >
        <NavLabel>{tab.title}</NavLabel>
        <span className="chevron-arrow" aria-hidden="true" />
      </button>

      {/* Wrapper handles show/hide (opacity/visibility) and bridges the hover
          gap to the trigger; the inner panel plays the entrance animation. */}
      <div
        id={panelId}
        className={cn("mega-dropdown", isActive && "is-visible")}
      >
        <div
          className="mega-dropdown-inner"
          // Only set while open, so the animation replays on every open.
          // (Set unconditionally it ran once on page load, while the panel
          // was still hidden, and never again.)
          // direction "top" -> slideInTop: panel drops in from just above
          // the trigger instead of popping in place. ("none" resolves to
          // no-op for slide, so the entrance never actually played before.)
          style={
            isActive
              ? getAnimationStyle("slide", "top", { durationMs: 380 })
              : undefined
          }
        >
          {tab.dropdown?.map((subCat: DropdownCategory, _index) => (
            <div
              key={subCat.category}
              className="dropdown-column"
              style={
                isActive
                  ? getAnimationStyle("fade", "none", {
                      durationMs: 320,
                      // delayMs: 70 + index * 60,
                    })
                  : undefined
              }
            >
              <h4 className="column-heading">{subCat.category}</h4>
              <ul className="column-links">
                {subCat.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="dropdown-link-item"
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
});

NavItem.displayName = "NavItem";

const NavbarDesktop = () => {
  const activeDropdown = useNavigationState("activeDropdown");
  const { setActiveDropdown } = useNavigationActions();

  return (
    <nav className="desktop-nav" aria-label="Main">
      <ul className="nav-links-list">
        {mainNav.map((tab: NavTab) => (
          <NavItem
            key={tab.id}
            tab={tab}
            activeId={activeDropdown}
            onSelect={setActiveDropdown}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavbarDesktop;
