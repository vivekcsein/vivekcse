import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/packages/utils/cn";

type PrimaryLinkProps = ComponentProps<typeof Link>;

type PrimaryLinkUnderline = "center" | "left" | "right";

interface PrimaryLinkExtendedProps extends PrimaryLinkProps {
  underline?: PrimaryLinkUnderline;
}

const underlineVariants: Record<PrimaryLinkUnderline, string> = {
  center: ["origin-center", "scale-x-0", "group-hover:scale-x-100"].join(" "),

  left: ["origin-left", "scale-x-0", "group-hover:scale-x-100"].join(" "),

  right: ["origin-right", "scale-x-0", "group-hover:scale-x-100"].join(" "),
};

const PrimaryLink = ({
  href,
  className,
  children,
  underline = "center",
  ...props
}: PrimaryLinkExtendedProps) => {
  return (
    <Link
      href={href}
      className={cn(
        // Base
        "group relative inline-block",
        "font-medium text-[0.95rem] leading-normal",
        "text-primary no-underline",

        // Spacing for underline
        "pb-0.5",

        // Interaction
        "transition-[color,opacity] duration-250 ease-out",
        "hover:text-primary hover:opacity-90",
        "active:opacity-70",

        // Focus
        "focus-visible:rounded-sm",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background",

        className,
      )}
      {...props}
    >
      {children}

      {/* Animated underline */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0",
          "h-0.5 rounded-full",
          "bg-primary",
          "transition-transform duration-300 ease-out",
          underlineVariants[underline],
        )}
      />
    </Link>
  );
};

export default PrimaryLink;

export type {
  PrimaryLinkProps,
  PrimaryLinkUnderline,
  PrimaryLinkExtendedProps,
};
