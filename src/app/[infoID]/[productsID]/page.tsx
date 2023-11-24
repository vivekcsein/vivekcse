import React from "react";
import { infoArr } from "../../../libs/constants";
import ErrorFile from "../../../content/ErrorFile";
type props = {
  params: {
    infoID: string | number | undefined;
    productsID: string | number | undefined;
  };
};

const page = ({ params: { infoID, productsID } }: props) => {
  const serachItem = () => {
    return infoArr.filter(
      (infoElem) => String(infoID).toLocaleLowerCase() === infoElem.title
    );
  };
  const searchParam = () => {
    const resultsArr = serachItem();
    if (resultsArr.length != 0) {
      return resultsArr[0].productsArr?.filter(
        (prodElem) => String(productsID).toLocaleLowerCase() === prodElem.title
      );
    }
  };

  const fileServe = () => {
    const result = searchParam();
    if (result == undefined) {
      return ErrorFile(404);
    } else if (!result.length) {
      return ErrorFile(404);
    } else {
      console.log(`${result[0].urlLink} page is served by the server`);
      return result[0].filename();
    }
  };

  return <>{fileServe()}</>;
};

export default page;
