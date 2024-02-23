"use client";
import { Hamburger } from "frnz-ui";
import React, { useCallback } from "react";
type BurgerIconProps = {
  iconType?: string;
};
const BurgerIcon: React.FunctionComponent<BurgerIconProps> = ({ iconType }) => {
  const clickFunc = useCallback(() => {
    const Navbar = document.getElementsByClassName(
      "Navbar_ul"
    )[0] as HTMLDivElement;
    Navbar?.classList.toggle("nav_hide");
    const dropdownItems = document.getElementsByClassName("nav_dropdown");
    Array.from(dropdownItems).map((item) => {
      item.classList.remove("showflex");
    });
  }, []);
  return (
    <>
      <Hamburger
        variant="Snowy"
        fxc={{
          primary: "var(--primary)",
        }}
        onClick={clickFunc}
      />
    </>
  );
};

export default BurgerIcon;
