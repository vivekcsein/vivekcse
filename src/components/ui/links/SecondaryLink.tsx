import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/packages/utils/cn";

type SecondaryLinkProps = ComponentProps<typeof Link>;

const SecondaryLink = ({
  className,
  children,
  ...props
}: SecondaryLinkProps) => {
  return (
    <Link
      className={cn(
        // Base
        "group relative inline-flex items-center",
        "rounded-md px-2 py-1",
        "text-[0.95rem] font-medium leading-normal",
        "text-foreground no-underline",

        // Smooth fade
        "bg-transparent",
        "transition-[background-color,color,opacity]",
        "duration-300 ease-out",

        // Hover
        "hover:bg-primary/10",
        "hover:text-primary",

        // Touch / active
        "active:bg-primary/15",
        "active:text-primary",
        "active:opacity-80",

        // Focus
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background",

        // Mobile-friendly tap target
        "min-h-9",
        "touch-manipulation",

        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

export default SecondaryLink;

export type { SecondaryLinkProps };
