import React from "react";
type Pages_ItemProps = {
  infoItem: pagesRoutesInfoArr;
  category: string;
};

const Pages_Item = ({ infoItem, category }: Pages_ItemProps) => {
  return (
    <>
      <div className="pl-2">
        <span className="text-textDark"> {infoItem.title} :</span>
        <ul className="flex flex-col gap-5 mt-3 list-disc pl-5">
          {infoItem.details?.map((item, index: number) => {
            return item.content ? (
              <li key={`${category}${infoItem.title}${index}`} className="pl-2">
                {item.headline ? (
                  <span className="text-textDark">
                    {" "}
                    {item.headline ? item.headline : ""}:{" "}
                  </span>
                ) : null}
                {item.content}
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </>
  );
};

export default Pages_Item;
