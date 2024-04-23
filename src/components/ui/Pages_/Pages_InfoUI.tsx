import React from "react";
import { getPagesAPI } from "../../../libs/apis/serverlessAPI";
import Pages_Item from "./molecules/Pages_Item";
import Pages_Button from "./atoms/Pages_Button";
import Pages_notFound from "./atoms/Pages_notFound";
import Pages_backBtn from "./atoms/Pages_backBtn";
type Pages_InfoUIprops = {
  apislug: PagesRouteInfoElem;
};

const Pages_InfoUI = async ({ apislug }: Pages_InfoUIprops) => {
  const pagesJson: Promise<any> = getPagesAPI(
    apislug.title.toLocaleLowerCase()
  );
  const pagesData = await pagesJson;
  if (!pagesData.length) return <Pages_notFound title={apislug.title} />;

  // const pagesJson: Promise<promisePagesRouteData> = getPagesAPI(apislug);
  // const pagesData = await pagesJson;
  // if (!pagesData.length) return <Pages_notFound title={apislug} />;
  const { title, category, desc, buttons, infoArr } = pagesData[0];
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row-reverse lg:flex-row justify-start  items-center py-2 ">
        <Pages_backBtn href="./" />
        <div className=" w-full">
          <h1 className=" effect__gradient_headline flexCenter ">{title}</h1>
          <div className="flex justify-center gap-5 my-5">
            {buttons?.map((button: pagesRoutesButtons, index: number) => {
              return (
                <Pages_Button
                  key={`btnProductUI${category}${index}`}
                  ButtonInfo={button}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="Line"></div>
      <p className="text-left mt-2 text-textLight">{`${desc} `}:-</p>

      <div className="flex flex-col gap-5 mt-3  ">
        {infoArr?.map((elem: pagesRoutesInfoArr, index: number) => {
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
export default Pages_InfoUI;

// <h1 className=" effect__gradient_headline flexCenter">{title}</h1>
// <Pages_backBtn href="./" />
// <div className="flex justify-center gap-5 my-5">
//   {buttons?.map((button, index: number) => {
//     return (
//       <Pages_Button
//         key={`btnParentUI${category}${index}`}
//         ButtonInfo={button}
//       />
//     );
//   })}
// </div>
