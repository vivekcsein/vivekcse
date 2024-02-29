import React from "react";
import Pages_backBtn from "./Pages_backBtn";

type Pages_notFoundProps = {
  title: string;
};
const Pages_notFound = ({ title }: Pages_notFoundProps) => {
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row-reverse lg:flex-row justify-start  items-center py-2 ">
        <Pages_backBtn href="./" />
        <div className=" w-full">
          <h1 className=" effect__gradient_headline flexCenter ">
            {title.toUpperCase()}
          </h1>
        </div>
      </div>
      <div className="Line"></div>
      <div>This page is under development</div>
    </>
  );
};

export default Pages_notFound;
