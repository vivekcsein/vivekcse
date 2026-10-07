import * as React from "react";
import { cn } from "@/packages/utils/cn";

import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

// map of all button variants
const buttonVariants = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-7 text-base",
  icon: "size-11 px-0",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className, children, ...props },
    ref,
  ) => {
    const ButtonComponent = buttonVariants[variant];

    return (
      <ButtonComponent
        ref={ref}
        className={cn(buttonSizes[size], className)}
        {...props}
      >
        {children}
      </ButtonComponent>
    );
  },
);

Button.displayName = "Button";

export { Button };
