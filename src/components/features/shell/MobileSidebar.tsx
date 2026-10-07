"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui";
import type { SidebarData } from "@/types/content";
import { KnowledgeSidebar } from "./KnowledgeSidebar";

/** < lg: floating button that opens the sidebar as a drawer. */
export const MobileSidebar = ({ data }: { data: SidebarData }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close the drawer whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={open}
        aria-label="Open knowledge menu"
        className="fixed bottom-4 left-4 z-40 grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-8px_var(--primary)] transition-transform active:scale-95"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Icon name="panel-left" size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            type="button"
          />
          <div
            aria-label="Knowledge menu"
            aria-modal="true"
            role="dialog"
            className="animate-fade-up absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-sidebar-border bg-sidebar shadow-pop"
          >
            <div className="flex shrink-0 justify-end px-3 pt-3">
              <button
                aria-label="Close menu"
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
                onClick={() => setOpen(false)}
                type="button"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <KnowledgeSidebar compactable={false} data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
