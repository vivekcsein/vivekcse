import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import { cn } from "@/packages/utils/cn";

type PrimaryCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  interactive?: boolean;
};

const PrimaryCard = forwardRef<HTMLDivElement, PrimaryCardProps>(
  ({ children, className, interactive = true, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={cn(
          "group relative isolate overflow-hidden",
          "rounded-lg",
          "border border-border/70",
          "bg-card",
          "text-card-foreground",
          "shadow-xs",

          interactive && [
            "transition-[border-color,box-shadow,transform]",
            "duration-300 ease-out",
            "hover:-translate-y-0.5",
            "hover:border-primary/30",
            "hover:shadow-card",
          ],

          className,
        )}
        {...props}
      >
        {/* Ambient hover glow */}
        {interactive && (
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -right-20 -top-20",
              "size-40 rounded-full",
              "bg-primary/8 blur-3xl",
              "opacity-0 transition-opacity duration-500",
              "group-hover:opacity-100",
            )}
          />
        )}

        {/* Top accent line */}
        {interactive && (
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-px",
              "bg-linear-to-r from-transparent via-primary/60 to-transparent",
              "opacity-0 transition-opacity duration-300",
              "group-hover:opacity-100",
            )}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </article>
    );
  },
);

PrimaryCard.displayName = "PrimaryCard";

type PrimaryCardHeaderProps = {
  children: ReactNode;
  className?: string;
};

function PrimaryCardHeader({ children, className }: PrimaryCardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      {children}
    </div>
  );
}

type PrimaryCardIconProps = {
  children: ReactNode;
  className?: string;
};

function PrimaryCardIcon({ children, className }: PrimaryCardIconProps) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center",
        "rounded-lg",
        "border border-border/70",
        "bg-muted/50",
        "text-muted-foreground",
        "transition-[background-color,border-color,color,transform]",
        "duration-300",
        "group-hover:border-primary/20",
        "group-hover:bg-primary/10",
        "group-hover:text-primary",
        "group-hover:scale-105",
        className,
      )}
    >
      {children}
    </div>
  );
}

type PrimaryCardCategoryProps = {
  children: ReactNode;
  className?: string;
};

function PrimaryCardCategory({
  children,
  className,
}: PrimaryCardCategoryProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center",
        "rounded-full",
        "border border-primary/15",
        "bg-primary/8",
        "px-2 py-0.5",
        "text-[10px] font-medium",
        "leading-4 text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}

type PrimaryCardTitleProps = {
  children: ReactNode;
  className?: string;
};

function PrimaryCardTitle({ children, className }: PrimaryCardTitleProps) {
  return (
    <h3
      className={cn(
        "text-base font-semibold tracking-tight",
        "text-card-foreground",
        "transition-colors duration-300",
        "group-hover:text-primary",
        className,
      )}
    >
      {children}
    </h3>
  );
}

type PrimaryCardDescriptionProps = {
  children: ReactNode;
  className?: string;
};

function PrimaryCardDescription({
  children,
  className,
}: PrimaryCardDescriptionProps) {
  return (
    <p className={cn("text-sm leading-6", "text-muted-foreground", className)}>
      {children}
    </p>
  );
}

type PrimaryCardFooterProps = {
  children: ReactNode;
  className?: string;
};

function PrimaryCardFooter({ children, className }: PrimaryCardFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4",
        "border-t border-border/60",
        "pt-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

type PrimaryCardMetaProps = {
  children: ReactNode;
  className?: string;
};

function PrimaryCardMeta({ children, className }: PrimaryCardMetaProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        "text-xs text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

export {
  PrimaryCard,
  PrimaryCardCategory,
  PrimaryCardDescription,
  PrimaryCardFooter,
  PrimaryCardHeader,
  PrimaryCardIcon,
  PrimaryCardMeta,
  PrimaryCardTitle,
};
