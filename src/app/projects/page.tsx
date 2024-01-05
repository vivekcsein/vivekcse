import React from "react";
import Projects_show from "../../components/pages/projects/Projects_show";
import LayoutToggle from "../../components/content/LayoutToggle";

const page = () => {
  return (
    <div className="fullScreen">
      <Projects_show />
      <LayoutToggle show={"show"} />
    </div>
  );
};

export default page;
