import React from "react";
import LayoutToggle from "../../components/content/LayoutToggle";
import dynamic from "next/dynamic";
const Projects = dynamic(
  () => import("../../components/pages/projects/Projects"),
  {
    ssr: true,
  }
);
const page = () => {
  return (
    <div className="fullScreen">
      <Projects />
      <LayoutToggle show={"show"} />
    </div>
  );
};

export default page;
