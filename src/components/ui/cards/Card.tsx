import type { ComponentProps, ReactNode } from "react";
import { InteractiveCard } from "./InteractiveCard";
import InteractiveGlowCard from "./InteractiveGlowCard";
import { PrimaryCard } from "./PrimaryCard";

export type CardVariant = "primary" | "interactive" | "interactive-glow";

type InteractiveCardProps = ComponentProps<typeof InteractiveCard>;
type InteractiveGlowCardProps = ComponentProps<typeof InteractiveGlowCard>;
type PrimaryCardProps = ComponentProps<typeof PrimaryCard>;

export type CardProps = {
  variant?: CardVariant;
  children: ReactNode;
} & Omit<
  InteractiveCardProps & PrimaryCardProps & InteractiveGlowCardProps,
  "variant"
>;

const Card = ({ variant = "primary", children, ...props }: CardProps) => {
  if (variant === "interactive") {
    return <InteractiveCard {...props}>{children}</InteractiveCard>;
  }
  if (variant === "interactive-glow") {
    return <InteractiveGlowCard {...props}>{children}</InteractiveGlowCard>;
  }

  return <PrimaryCard {...props}>{children}</PrimaryCard>;
};

export default Card;
