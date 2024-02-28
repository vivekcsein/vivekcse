import React from "react";
import { pagesInfo } from "../../libs/utils/pages";
import LayoutToggle from "../../components/content/LayoutToggle";

type props = {
  params: {
    infoslug: string | number | undefined;
  };
};
const page = ({ params: { infoslug } }: props) => {
  const searchParam = () => {
    return pagesInfo.filter(
      (infoElem) => String(infoslug).toLocaleLowerCase() === infoElem.title
    );
  };

  const currentPage = () => {
    const result = searchParam();
    if (searchParam().length > 0) {
      return result[0].filename();
    }
  };

  return (
    <div className="fullscreen">
      {currentPage()}
      <LayoutToggle show="show" />
    </div>
  );
};

export default page;
