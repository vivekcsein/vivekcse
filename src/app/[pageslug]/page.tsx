import React, { useCallback } from "react";
import { pagesRouteInfo } from "../../libs/utils/pagesRoutes";
import LayoutToggle from "../../components/content/LayoutToggle";
import Pages_MainUI from "../../components/ui/Pages_/Pages_MainUI";

type props = {
  params: {
    pageslug: string | number | undefined;
  };
};

const Infopage = ({ params: { pageslug } }: props) => {
  const searchFunInfo = useCallback(
    () =>
      pagesRouteInfo.filter(
        (slugElem) =>
          String(pageslug).toLocaleLowerCase() ===
          slugElem.urlLink.toLocaleLowerCase()
      ),
    [pageslug]
  );

  const currentItem = searchFunInfo();

  return (
    <div className="fullscreen">
      <LayoutToggle show="show" />
      <Pages_MainUI apislug={currentItem} />
    </div>
  );
};

export default Infopage;
