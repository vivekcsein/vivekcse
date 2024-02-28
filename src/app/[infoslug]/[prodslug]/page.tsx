import React from "react";
import { pagesInfo } from "../../../libs/utils/pages";
import LayoutToggle from "../../../components/content/LayoutToggle";

type props = {
  params: {
    infoslug: string | number | undefined;
    prodslug: string | number | undefined;
  };
};

const page = ({ params: { infoslug, prodslug } }: props) => {
  const serachItem = () => {
    return pagesInfo.filter(
      (slugElem) => String(infoslug).toLocaleLowerCase() === slugElem.title
    );
  };

  const prodSeachItem = () => {
    const searchProd = serachItem();
    if (searchProd.length > 0) {
      return searchProd[0].productsArr?.filter(
        (prodElem) => String(prodslug).toLocaleLowerCase() === prodElem.title
      );
    }
  };

  const currentPage = () => {
    const currentprod = prodSeachItem();
    if (currentprod && currentprod.length > 0) {
      return currentprod[0].filename();
    }
  };

  return (
    <div className="fullscreen ">
      {currentPage()}
      <LayoutToggle show="show" />
    </div>
  );
};

export default page;
