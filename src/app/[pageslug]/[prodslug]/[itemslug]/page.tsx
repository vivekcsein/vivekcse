import React, { useCallback } from "react";
import { pagesRouteInfo } from "../../../../libs/utils/pagesRoutes";
import LayoutToggle from "../../../../components/content/LayoutToggle";
import Pages_MainUI from "../../../../components/ui/Pages_/Pages_MainUI";

type props = {
  params: {
    pageslug: string | number | undefined;
    prodslug: string | number | undefined;
    itemslug: string | number | undefined;
  };
};

const Itempage = ({ params: { pageslug, prodslug, itemslug } }: props) => {
  const searchFunInfo = useCallback(() => {
    return pagesRouteInfo.filter(
      (slugElem) =>
        String(pageslug).toLocaleLowerCase() ===
        slugElem.urlLink.toLocaleLowerCase()
    );
  }, [pageslug]);

  const searchFunProd = useCallback(() => {
    const searchProd = searchFunInfo();
    if (!searchProd.length) return;
    return searchProd[0].productsArr?.filter(
      (prodElem) =>
        String(prodslug).toLocaleLowerCase() ===
        prodElem.urlLink.toLocaleLowerCase()
    );
  }, [prodslug, searchFunInfo]);

  const searchFunItem = useCallback(() => {
    const searchItem = searchFunProd();
    if (!searchItem) return;
    if (!searchItem.length) return;
    return searchItem[0].itemArr?.filter(
      (itemElem: any) =>
        String(itemslug).toLocaleLowerCase() ===
        itemElem.urlLink.toLocaleLowerCase()
    );
  }, [itemslug, searchFunProd]);

  const currentItem = searchFunItem();

  return (
    <div className="fullscreen ">
      <LayoutToggle show="show" />
      <Pages_MainUI apislug={currentItem} />
    </div>
  );
};

export default Itempage;
