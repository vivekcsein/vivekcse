import React from "react";
import { getPagesAPI } from "../../../../libs/apis/serverlessAPI";
import Pages_Item from "../ui/Pages_Item";
import Pages_backBtn from "../ui/Pages_backBtn";
import Pages_notFound from "./Pages_notFound";

type Pages_mainUIProps = {
  apislug: string;
};
const Pages_mainUI = async ({ apislug }: Pages_mainUIProps) => {
  const pagesJson: Promise<any> = getPagesAPI(apislug);
  const pagesData = await pagesJson;
  if (pagesData.length <= 0) return <Pages_notFound title={apislug} />;
  const { title, category, desc, infoArr } = pagesData[0];
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row-reverse lg:flex-row justify-start  items-center py-2 ">
        <Pages_backBtn href="./" />
        <div className=" w-full">
          <h1 className=" effect__gradient_headline flexCenter ">{title}</h1>
        </div>
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

export default Pages_mainUI;
