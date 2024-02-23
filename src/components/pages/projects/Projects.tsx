import React from "react";
import { getProjectsAPI } from "../../../libs/apis/serverlessAPI";
import ProjectCard from "../../ui/Cards/ProjectCard";
type projdata = {
  title: string;
  projList: projectsList;
};

const Projects = async () => {
  const apiProjectData: Promise<projectLayoutData> = getProjectsAPI();
  const projectsData = await apiProjectData;

  const projData: Array<projdata> = [];
  projectsData.map((workitem: wordkdata) => {
    workitem.projects.map((projList) => {
      const data = {
        title: workitem.title,
        projList: projList,
      };
      projData.unshift(data);
    });
  });

  return (
    <div>
      <div className="w-[80%] m-auto gap-10 my-10 flex flex-row flex-wrap justify-evenly">
        {projData.map((item) => {
          return (
            <ProjectCard
              key={item.projList.id}
              item={item.projList}
              workTitle={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
