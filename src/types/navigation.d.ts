/** A single entry in a nav menu (header, footer, sidebar, mobile drawer). */
export type NavItem = {
  label: string;
  href: string;
  /** Marks external links so consumers can add target="_blank" + rel="noopener noreferrer". */
  external?: boolean;
  /** Nested items — for dropdown/flyout menus. Only one level deep is expected. */
  children?: NavItem[];
};

/** A named group of nav items — e.g. footer columns ("Product", "Company", "Legal"). */
export type NavSection = {
  title: string;
  items: DropdownLink[];
};

/**
 * A link inside a desktop mega-dropdown column / mobile accordion sub-list.
 * Deliberately narrower than `NavItem` — no icon/external/children, these
 * are always one level deep and text-only.
 */
export type DropdownLink = {
  label: string;
  href: string;
};

/** One column inside a desktop mega-dropdown, or one collapsible group on the mobile accordion. */
export type DropdownCategory = {
  category: string;
  items: DropdownLink[];
};

/**
 * A top-level header nav entry — the unit `NavbarDesktop`/`NavbarMobile`
 * (components/layouts/navbar) render. Either a plain destination (`href`
 * set, `dropdown` omitted) or a hover/tap-triggered dropdown (`dropdown`
 * set) — a tab is never both at once, `dropdown` presence is what the
 * navbar components branch on.
 *
 * `id` exists purely for NavigationProvider's store to key the "which
 * dropdown/accordion is open" state by — it's never rendered.
 */
export type NavTab = {
  id: string;
  title: string;
  href?: string;
  dropdown?: DropdownCategory[];
};

/** Header UI state — which dropdown/accordion is open, mobile drawer open/closed. Owned by NavigationProvider (components/providers/NavigationProvider.tsx) — this is transient, per-Header-instance UI state, not durable app state. */
export type NavigationState = {
  activeDropdown: string | null;
  activeMobileCategory: string | null;
  mobileMenuOpen: boolean;
};

export type NavigationKey = keyof NavigationState;
