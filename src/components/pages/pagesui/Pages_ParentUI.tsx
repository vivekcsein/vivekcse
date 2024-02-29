import React from "react";
import { getPagesAPI } from "../../../libs/apis/serverlessAPI";
import Pages_Item from "./Pages_Item";
import Pages_Button from "./Pages_Button";
import Pages_notFound from "./Pages_notFound";
type Pages_ParentUIprops = {
  apislug: string;
};
const Pages_ParentUI = async ({ apislug }: Pages_ParentUIprops) => {
  const pagesJson: Promise<any> = getPagesAPI(apislug);
  const pagesData = await pagesJson;
  if (!pagesData.length) return <Pages_notFound title={apislug} />;
  const { title, category, desc, buttons, infoArr } = pagesData[0];
  return (
    <>
      <h1 className=" effect__gradient_headline flexCenter">{title}</h1>
      <div className="flex justify-center gap-5 my-5">
        {buttons?.map((button: pagesInfoButtons, index: number) => {
          return (
            <Pages_Button
              key={`btnParentUI${category}${index}`}
              ButtonInfo={button}
            />
          );
        })}
      </div>

      <div className="Line"></div>
      <p className="text-left mt-2 text-textLight">{`${desc} `}:-</p>

      <div className="flex flex-col gap-5 mt-3  ">
        {infoArr.map((elem: pagesInfoElem, index: number) => {
          return (
            <Pages_Item
              infoItem={elem}
              key={`${category}${title}${index}`}
              category={category}
            />
          );
        })}
      </div>
    </>
  );
};
export default Pages_ParentUI;
