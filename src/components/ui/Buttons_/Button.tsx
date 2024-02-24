"use client";
import { Button as FrnzBtn } from "frnz-ui";
type ButtonProps = {
  variant: number;
  label: string;
};
const Button = ({ variant, label }: ButtonProps) => {
  switch (variant) {
    case 1:
      return (
        <FrnzBtn
          label={label}
          variant="Starlight"
          fxc={{
            primary: "var(--textDark)",
            bgc: "var(--textDark)",
            secondary: "var(--textDark)",
          }}
        />
      );

    default:
      break;
  }
};

export default Button;
