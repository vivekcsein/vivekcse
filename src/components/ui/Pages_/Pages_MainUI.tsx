import React from "react";
import Pages_InfoUI from "./Pages_InfoUI";
import Pages_ProductUI from "./Pages_ProductUI";
import Pages_ItemUI from "./Pages_ItemUI";
import Pages_notFound from "./atoms/Pages_notFound";

type Pages_MainUIProps = {
  apislug: any;
};
const Pages_MainUI = ({ apislug }: Pages_MainUIProps) => {
  if (!apislug) return <Pages_notFound title={"Looking for wrong page"} />;
  if (!apislug.length)
    return <Pages_notFound title={"Looking for wrong info page"} />;
  if (!apislug[0].title) return;
  const currentslug = apislug[0];

  if (currentslug.filename) return <>{currentslug.filename()}</>;
  if (apislug[0].category === "Info")
    return <Pages_InfoUI apislug={currentslug} />;
  if (apislug[0].category === "Product")
    return <Pages_ProductUI apislug={currentslug} />;
  if (apislug[0].category === "Item")
    return <Pages_ItemUI apislug={currentslug} />;
};

export default Pages_MainUI;
