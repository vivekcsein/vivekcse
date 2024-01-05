import { getProjectsAPI } from "../../../libs/api/serverlessapi";
import React from "react";
import ProjectsCard from "../../../components/products/ProjectsCard";
import Button from "@/components/ui/buttons/Button";
import Accord01 from "@/components/ui/Accordian/Accord01";

type projdata = {
  title: string;
  projList: projectsList;
};

const Projects_show = async () => {
  const apiProjectData: Promise<projectdata> = getProjectsAPI();
  const projectsData = await apiProjectData;

  const userClickProjectCategory = (e: any) => {
    e.preventDefault();
    console.log(e.target.id);
  };

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
            <ProjectsCard
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

export default Projects_show;

{
  /* <section className="w-full flex justify-center p-5">
        <ul className="inline-flex gap-5   ">
          {projectsData.map((item: wordkdata, index) => {
            return (
              // <Button
              //   key={item.id}
              //   btnInfo={{ id: index, text: `${item.title}` }}
              // />

              <div key={item.id}>
                <Accord01
                  AccordData={{
                    heading: item.title,
                    contentHtml: item.description,
                  }}
                />
              </div>
            );
          })}
        </ul>
      </section> */
}

{
  /* {projectsData.map((workitem: wordkdata) => {
        return (
          <div
            key={workitem.id}
            className="flex flex-row flex-wrap justify-evenly"
          >
            {workitem.projects.map((projList) => {
              return (
                <div key={projList.id} className="my-5 px-5 ">
                  <ProjectsCard item={projList} workTitle={workitem.title} />
                </div>
              );
            })}
          </div>
        );
      })} */
}