import React from "react";
import Button from "../components/Button";
import "../styles/content/Projects.scss";

const Projects = () => {
  const btnInfo = {
    id: "redirectToCameraFilter",
    type: 2,
    text: "camera filter",
    href: `/projects/camerafilter`,
  };
  return (
    <>
      <div className="projects_section">
        <div className="card_menu">
          <div className="cards">
            <Button btnInfo={btnInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
