import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui";

type SectionHeadingProps = {
  id?: string;
  icon: ReactNode;
  title: string;
  action?: { label: string; href: string };
};

export const SectionHeading = ({
  id,
  icon,
  title,
  action,
}: SectionHeadingProps) => (
  <div className="mb-2.5 flex items-center justify-between gap-4">
    <h2
      className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight"
      id={id}
    >
      {icon}
      {title}
    </h2>
    {action && (
      <Link
        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        href={action.href}
      >
        {action.label} <Icon name="arrow-right" size={13} />
      </Link>
    )}
  </div>
);
