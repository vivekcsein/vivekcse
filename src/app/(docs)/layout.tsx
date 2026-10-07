import type { ReactNode } from "react";
import { KnowledgeSidebar } from "@/components/features/shell/KnowledgeSidebar";
import { MobileSidebar } from "@/components/features/shell/MobileSidebar";
import { getSidebarData } from "@/packages/utils/loader";

type DocsGroupLayoutProps = { children: ReactNode };

/**
 * Chrome for the knowledge-base side of the app (home, docs, tutorials,
 * resources, articles, bookmarks): header + collapsible left sidebar +
 * footer. Kept out of the root layout so other sections — /marketplace —
 * can render with their own, completely different shell.
 */
const DocsGroupLayout = ({ children }: DocsGroupLayoutProps) => (
  <>
    <div className="flex flex-1">
      <aside className="app-sidebar sticky top-(--header-h) hidden h-[calc(100svh-var(--header-h))] shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        <KnowledgeSidebar data={getSidebarData()} />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
    <MobileSidebar data={getSidebarData()} />
  </>
);

export default DocsGroupLayout;
