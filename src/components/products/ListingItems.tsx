import React from "react";
import { workExperience } from "../../libs/utils/workExperience";
import Link from "next/link";
const ListingItems = () => {
  return (
    <>
      {workExperience.map((work: workList, index) => {
        return (
          <div key={work.id}>
            <span className="text-textLight">{work.TechnologyTitle}:- </span>
            {work.TechnologyList.map((tech: Technology) => {
              return (
                <span key={tech.id}>
                  <Link href={tech.link} className=" hover:underline">
                    {tech.TechnologyName}
                  </Link>
                  {", "}
                </span>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default ListingItems;
