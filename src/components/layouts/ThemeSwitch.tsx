"use client";
import { useStyleTheme } from "@/components/providers/StyleProvider";
import { Button } from "../ui";

const ThemeSwitch = () => {
  const { cycleTheme } = useStyleTheme();

  return (
    <Button type="button" onClick={cycleTheme}>
      Next Theme
    </Button>
  );
};

export default ThemeSwitch;
