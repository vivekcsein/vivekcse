import React from "react";
import { layoutInfo } from "../../../libs/utils/pages";
import LayoutToggle from "../../../components/content/LayoutToggle";

type props = {
  params: {
    slug: string | number | undefined;
  };
};
const page = ({ params: { slug } }: props) => {
  const searchParam = () => {
    return layoutInfo.filter(
      (infoElem) => String(slug).toLocaleLowerCase() === infoElem.title
    );
  };

  const currentPage = () => {
    const result = searchParam();
    if (searchParam().length > 0) {
      return result[0].filename();
    }
  };

  return (
    <div className="fullscreen bg_awesome">
      {currentPage()}
      <LayoutToggle show="show" />
    </div>
  );
};

export default page;

// const currentPage = () => {
//   if (!searchParam().length) {
//     return <div>404 - Page Not Found</div>;
//   } else if (typeof slug !== "string") {
//     // If the parameter is a number, it's an index so we show the first element of the array
//     return searchParam()[0];
//   } else {
//     // Else, we try to find the good one
//     let i = 1;
//     while (
//       i < pagesInfo.length &&
// String(searchParam()[i].title)
// .includes(slug)
//     )
//       i++;
//     return searchParam()[i] || pagesInfo[0]; // Default value : The homepage
//   }
// };
