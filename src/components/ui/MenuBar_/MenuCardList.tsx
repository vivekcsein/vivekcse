import React from "react";
import MenuCard from "./MenuCard";
import MenuCard_anim from "./MenuCard_anim";

type MenuCardListProps = {
  cardListData: Array<menuProductData>;
  cardListCurrentPage: number;
  cardListShowData: number;
};
const MenuCardList = ({
  cardListData,
  cardListCurrentPage,
  cardListShowData,
}: MenuCardListProps) => {
  return (
    <>
      <ul className="MenuCardList">
        {cardListData
          ?.slice(
            cardListCurrentPage * cardListShowData - cardListShowData,
            cardListCurrentPage * cardListShowData
          )
          .map((cardData: menuProductData) => {
            return (
              <div className="MenuCard_Item_wrapper" key={cardData.id}>
                <MenuCard cardData={cardData} photoFilter={true} />
              </div>
            );
          })}
      </ul>
    </>
  );
};

export default MenuCardList;
