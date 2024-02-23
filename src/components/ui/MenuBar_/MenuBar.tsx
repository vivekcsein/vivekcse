import React from "react";
import "../../../styles/ui/MenuBar_/MenuBar.scss";
import MenuNav from "./MenuNav";
import { getMenubarAPI } from "../../../libs/apis/serverlessAPI";
import { Loader } from "frnz-ui";

// let menuData: MenuData;
const MenuBar = async () => {
  const navData: Array<menuProductData> = [];
  const menuJSON: Promise<MenuData> = getMenubarAPI();
  const menuData = await menuJSON;
  const { navbar } = menuData;
  menuData.navbar.map((item) => {
    return item.product.map((prod: menuProductData) => {
      return navData.push(prod);
    });
  });

  return (
    <section>
      <div className="MenuBar_heading">
        {menuData ? <h1>{menuData.title}</h1> : "My Tech Stack"}
        {menuData ? <p className="MenuBar_desc">{menuData.desc}</p> : ""}
      </div>
      {menuData ? (
        <MenuNav navData={navData} />
      ) : (
        <>
          <Loader variant="DotSpinner" />
        </>
      )}
    </section>
  );
};

export default MenuBar;
