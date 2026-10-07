import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/packages/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        muted: "bg-muted text-muted-foreground",
        primary: "bg-accent text-accent-foreground",
        outline: "border border-border text-muted-foreground",
      },
    },
    defaultVariants: { variant: "muted" },
  },
);

type BadgeProps = ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants>;

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
);
