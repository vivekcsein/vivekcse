import React from "react";
import dynamic from "next/dynamic";
import "../../../styles/ui/Navbar/navbar.scss";
import NavbarItem from "./NavbarItem";
import { arrowDown, arrowUp } from "../../../libs/utils/images";
import Dropdown from "./Dropdown";
const BurgerIcon = dynamic(() => import("./BurgerIcon"), {
  ssr: true,
});
type navbarProps = {
  navbar: navbar;
  productsData: productsData;
  gameData: gameData;
};
const Navbar = ({
  navbar: { nav_Links },
  productsData,
  gameData,
}: navbarProps) => {
  const effect = "button_navbar";

  return (
    <>
      <ul className="Navbar_ul">
        {nav_Links?.map((item) => {
          return (
            <li key={item.id}>
              {typeof item.details == "string" ? (
                item.details == "dropdown" ? (
                  <NavbarItem
                    item={item}
                    effect={effect}
                    // font={roboto.className}
                    icon={{ show: true, offPath: arrowDown, onPath: arrowUp }}
                  >
                    <Dropdown
                      dropdownData={productsData}
                      effect={effect ? effect : ""}
                    />
                  </NavbarItem>
                ) : item.details == "gameData" ? (
                  <NavbarItem
                    item={item}
                    effect={effect}
                    // font={roboto.className}
                    icon={{ show: true, offPath: arrowDown, onPath: arrowUp }}
                  >
                    <Dropdown
                      dropdownData={gameData}
                      effect={effect ? effect : ""}
                    />
                  </NavbarItem>
                ) : // :
                //  item.special && item.details == "formBtn" ? (
                //   <LogINBtn LogInText={LogInText} />
                // )
                null
              ) : (
                <NavbarItem item={item} effect={effect} />
              )}
            </li>
          );
        })}
      </ul>
      <div className="flex_center BurgerIcon">
        <BurgerIcon />
      </div>
    </>
  );
};

export default Navbar;
