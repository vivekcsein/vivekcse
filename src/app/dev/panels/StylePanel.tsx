import StyleSelector from "@/components/layouts/StyleSelector";
import ThemeSwitch from "@/components/layouts/ThemeSwitch";
import ThemeToggle from "@/components/layouts/ThemeToggle";
import CustomFont from "./CustomFont";

const StylePanel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <h1 className="font-serif text-4xl text-foreground">Hello Themes</h1>
      <CustomFont />
      <ThemeToggle />
      <ThemeSwitch />
      <StyleSelector />
    </div>
  );
};

export default StylePanel;
