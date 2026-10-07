"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui";
import { SIDEBAR_EVENT, SIDEBAR_STORAGE_KEY } from "./sidebar-state";

const subscribe = (callback: () => void) => {
  window.addEventListener(SIDEBAR_EVENT, callback);
  return () => window.removeEventListener(SIDEBAR_EVENT, callback);
};
const isCollapsed = () =>
  document.documentElement.dataset.sidebar === "collapsed";

/**
 * Collapses the sidebar to an icon rail. State lives on <html data-sidebar>
 * (set before first paint by /public/init.js),
 * so there is no layout flash and the choice is remembered.
 */
export const SidebarToggle = () => {
  const collapsed = useSyncExternalStore(subscribe, isCollapsed, () => false);

  const toggle = () => {
    const next = collapsed ? "open" : "collapsed";
    document.documentElement.dataset.sidebar = next;
    try {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, next);
    } catch {
      // Storage blocked — still works for this session.
    }
    window.dispatchEvent(new Event(SIDEBAR_EVENT));
  };

  return (
    <button
      aria-expanded={!collapsed}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      onClick={toggle}
      title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      type="button"
    >
      <Icon name="panel-left" size={18} />
    </button>
  );
};
