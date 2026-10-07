"use client";

import { useState } from "react";
import { Button, Drawer, Link } from "@/components/ui";
import { cn } from "@/packages/utils/cn";
import { type DevSection, useDevSection } from "./DevProvider";

const NAV_SECTIONS: {
  label: string;
  items: { label: string; id: DevSection }[];
}[] = [
  {
    label: "Reference",
    items: [{ label: "Overview", id: "overview" }],
  },
  {
    label: "Foundations",
    items: [
      { label: "Colors & tokens", id: "colors" },
      { label: "Styles", id: "styles" },
      { label: "Typography", id: "typography" },
    ],
  },
  {
    label: "Components",
    items: [
      { label: "Links", id: "Links" },
      { label: "Buttons", id: "buttons" },
      { label: "Form controls", id: "forms" },
      { label: "Marquee", id: "marquee" },
      { label: "Cards", id: "Cards" },
    ],
  },
  {
    label: "3D",
    items: [{ label: "Model lab", id: "models" }],
  },
];

/**
 * DevSidebarNav.tsx
 * --------------------------------------------------------------
 * Desktop (>900px) keeps the original persistent sidebar untouched —
 * same markup, same `--sidebar-*` tokens, same layout.
 *
 * Below 900px, instead of the old CSS-only trick of letting the
 * sidebar collapse into a static block that stacks above the content,
 * this now reuses the shared `<Drawer>` (components/ui/drawer) behind
 * a toggle button — same nav items, same dark-navy sidebar tokens
 * (see the `.dev-mobile-nav-root` overrides in dev.css), just opened
 * on demand like every other slide-in panel in the app.
 */
const DevSidebarNav = () => {
  const { activeSection, setActiveSection } = useDevSection();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const selectSection = (id: DevSection) => {
    setActiveSection(id);
    setMobileNavOpen(false);
  };

  const navGroups = (
    <>
      {NAV_SECTIONS.map((section) => (
        <div className="dev-nav-group" key={section.label}>
          <div className="dev-nav-label">{section.label}</div>

          {section.items.map((item) => (
            <Button
              key={item.id}
              type="button"
              variant="primary"
              onClick={() => selectSection(item.id)}
              className={cn(
                "dev-nav-link",
                activeSection === item.id && "active",
              )}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <span className="dev-nav-dot" />
              {item.label}
            </Button>
          ))}
        </div>
      ))}
    </>
  );

  const backLink = (
    <Link href="/" variant="primary">
      ← Back to site
    </Link>
  );

  return (
    <>
      {/* Desktop — unchanged persistent sidebar */}
      <nav
        className="dev-sidebar dev-sidebar-desktop"
        aria-label="Design system reference"
      >
        <div className="dev-sidebar-brand">
          <span className="dev-sidebar-eyebrow">Internal Reference</span>
        </div>

        {navGroups}

        <div className="dev-sidebar-footer">{backLink}</div>
      </nav>

      {/* Mobile — toggle button + Drawer, same content/tokens as desktop */}
      <button
        type="button"
        className="dev-mobile-nav-toggle"
        onClick={() => setMobileNavOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={mobileNavOpen}
        aria-controls="dev-mobile-nav"
      >
        <span className="dev-sidebar-eyebrow">Internal Reference</span>
      </button>

      <Drawer
        id="dev-mobile-nav"
        title="Internal Reference"
        origin="left"
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        rootClassName="dev-mobile-nav-root"
        footer={backLink}
      >
        <div className="dev-nav-groups">{navGroups}</div>
      </Drawer>
    </>
  );
};

export default DevSidebarNav;
