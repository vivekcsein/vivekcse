"use client";
import React, { useEffect, useLayoutEffect } from "react";
type LayoutToggleProps = {
  show: "show" | "hide";
};
const LayoutToggle = ({ show }: LayoutToggleProps) => {
  useEffect(() => {
    const header = document.querySelector("#headerLoader") as HTMLDivElement;
    const footer = document.querySelector("#footerLoader") as HTMLDivElement;
    if (header && footer) {
      if (show == "show") {
        header.style.display = "flex";
        footer.style.display = "block";
      }
      if (show == "hide") {
        header.style.display = "none";
        footer.style.display = "none";
      }
    }

    return () => {};
  }, [show]);

  return <></>;
};

export default LayoutToggle;
