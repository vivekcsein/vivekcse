import React from "react";
import { getPagesAPI } from "../../../libs/apis/serverlessAPI";
import Pages_Button from "./ui/Pages_Button";
import Pages_Item from "./ui/Pages_Item";

const AugmentedReality = async () => {
  const pagesJson: Promise<any> = getPagesAPI("augmentedreality");
  const pagesData = await pagesJson;
  const { title, category, desc, buttons, infoArr } = pagesData[0];
  return (
    <>
      <h1 className=" effect__gradient_headline flexCenter">{title}</h1>
      <div className="flex justify-center gap-5 my-5">
        {buttons?.map((button: pagesInfoButtons) => {
          return <Pages_Button key={`${button.id}`} ButtonInfo={button} />;
        })}
      </div>

      <div className="Line"></div>
      <p className="text-left mt-2 text-textLight">{`${desc} `}:-</p>

      <div className="flex flex-col gap-5 mt-3  ">
        {infoArr.map((elem: pagesInfoElem) => {
          return (
            <Pages_Item
              infoItem={elem}
              key={`${category}${title}`}
              category={category}
            />
          );
        })}
      </div>
    </>
  );
};

export default AugmentedReality;
