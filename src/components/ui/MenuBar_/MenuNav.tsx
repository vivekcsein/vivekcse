"use client";
import React, { useCallback, useEffect, useState } from "react";
import MenuPagination from "./MenuPagination";
type MenuNavProps = {
  navData: Array<menuProductData>;
};
const MenuNav = ({ navData }: MenuNavProps) => {
  const [currentCategory, setCurrentCategory] = useState("all");

  const categoryNavList = useCallback(() => {
    const categoryList: Array<string> = [];
    navData.map((item) => {
      const { category } = item;
      if (!categoryList.includes(category)) {
        categoryList.push(category);
      }
    });
    return categoryList;
  }, [navData]);

  const selectedCategory = useCallback((title: string, value: any) => {
    const _navList = document.querySelectorAll(".MenuNav_List");
    const __navList = _navList[0].children as HTMLCollectionOf<HTMLElement>;
    Array.from(__navList).map((item: HTMLElement) => {
      item.classList.remove("active");
    });
    let listItem = value as HTMLElement;
    listItem.classList.add("active");
    setCurrentCategory(title);
  }, []);

  return (
    <>
      <header className="MenuNav_header">
        <ul className="MenuNav_List">
          <li
            className="MenuNav_Item active"
            key={"all"}
            onClick={(e) => {
              selectedCategory("all", e.currentTarget);
              e.preventDefault();
            }}
          >
            {"All"}
          </li>
          {categoryNavList().map((item, ind) => {
            return (
              <li
                className="MenuNav_Item"
                key={`${item}_${ind}`}
                onClick={(e) => {
                  selectedCategory(item, e.currentTarget);
                  e.preventDefault();
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </header>
      <div className="MenuNav_Pagination">
        {currentCategory == "all" ? (
          <MenuPagination
            pageData={navData}
            showCount={6}
            showPage={1}
            category={currentCategory}
          />
        ) : (
          <MenuPagination
            pageData={navData.filter(
              (item) => item.category === currentCategory
            )}
            showCount={6}
            showPage={1}
            category={currentCategory}
          />
        )}
      </div>
    </>
  );
};

export default MenuNav;
