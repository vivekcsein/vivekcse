"use client";
import React, { useLayoutEffect } from "react";
type LayoutToggleProps = {
  show: string;
};
const LayoutToggle = ({ show }: LayoutToggleProps) => {
  useLayoutEffect(() => {
    const header = document.querySelector("#headerLoader") as HTMLDivElement;
    const footer = document.querySelector("#footerLoader") as HTMLDivElement;
    if (show == "show") {
      header.style.display = "flex";
      footer.style.display = "block";
    }
    if (show == "hide") {
      header.style.display = "none";
      footer.style.display = "none";
    }
  });

  return <></>;
};

export default LayoutToggle;
