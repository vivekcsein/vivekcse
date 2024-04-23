import React from "react";
import Pages_productUI from "../../ui/Pages_/Pages_ProductUI";

type WebDevelopmentProps = {
  apislug: pagesRouteProductsElem;
};
const WebDevelopment = ({ apislug }: WebDevelopmentProps) => {
  return (
    <>
      <Pages_productUI apislug={apislug} />
    </>
  );
};

export default WebDevelopment;
