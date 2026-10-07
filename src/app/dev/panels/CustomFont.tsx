"use client";
import { useStyleTheme } from "@/components/providers/StyleProvider";

const CustomFont = () => {
  const { currentTheme } = useStyleTheme();

  const customFont =
    currentTheme === "cyantrix-theme"
      ? "font-custom font-bold"
      : "font-brilliant font-bold";

  return (
    <>
      <p className={`${customFont} text-2xl text-accent`}>
        This Text is a Custom Font Text
      </p>
      <p>
        Your Current Theme is <b className="text-primary">{currentTheme}</b>
      </p>
    </>
  );
};

export default CustomFont;
