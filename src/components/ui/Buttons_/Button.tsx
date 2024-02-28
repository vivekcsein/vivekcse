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

    case 2:
      return (
        <FrnzBtn
          label={label}
          variant="Spotlight"
          fx={{
            height: "40px",
            width: "100px",
            backgroundColor: "var(--fav_gray)",
            borderColor: "var(--secondary)",
          }}
        />
      );

    default:
      break;
  }
};

export default Button;
