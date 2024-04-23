import React from "react";
import Pages_productUI from "../../ui/Pages_/Pages_ProductUI";

type GamingProps = {
  apislug: pagesRouteProductsElem;
};
const Gaming = ({ apislug }: GamingProps) => {
  return (
    <>
      <Pages_productUI apislug={apislug} />
    </>
  );
};

export default Gaming;
