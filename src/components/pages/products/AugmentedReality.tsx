import React from "react";
import Pages_productUI from "../../ui/Pages_/Pages_ProductUI";

type AugmentedRealityProps = {
  apislug: pagesRouteProductsElem;
};
const AugmentedReality = ({ apislug }: AugmentedRealityProps) => {
  return (
    <>
      <Pages_productUI apislug={apislug} />
    </>
  );
};

export default AugmentedReality;
