import React from "react";
import LayoutToggle from "../../components/content/LayoutToggle";
import Projects from "../../components/pages/projects/Projects";
const page = () => {
  return (
    <div className="fullScreen">
      <Projects />
      <LayoutToggle show={"show"} />
    </div>
  );
};

export default page;
