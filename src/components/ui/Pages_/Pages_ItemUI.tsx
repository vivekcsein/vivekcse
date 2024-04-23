import React from "react";
import { getInterviewAPI } from "../../../libs/apis/serverlessAPI";
import Pages_backBtn from "./atoms/Pages_backBtn";
import Pages_notFound from "./atoms/Pages_notFound";
import Accordian from "../Accordian_/Accordian";
type Pages_ItemUIProps = {
  apislug: pagesRouteItemElem;
};

const Pages_ItemUI = async ({ apislug }: Pages_ItemUIProps) => {
  if (!apislug.jsonData) return;
  const pagesJson: Promise<any> = getInterviewAPI(apislug.jsonData);
  const pagesData = await pagesJson;
  const { title, desc } = apislug;
  if (!pagesData.length) return <Pages_notFound title={title} />;
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row-reverse lg:flex-row justify-start  items-center py-5 ">
        <Pages_backBtn href="./" />
        <div className=" w-full">
          <h1 className=" effect__gradient_headline flexCenter text-xl">
            {title}
          </h1>
        </div>
      </div>
      <div className="Line"></div>
      <p className="text-left mt-2 text-textLight">
        {`${desc ? `${desc} :-` : ""} `}
      </p>
      <Accordian accordianList={pagesData} />
    </>
  );
};

export default Pages_ItemUI;
