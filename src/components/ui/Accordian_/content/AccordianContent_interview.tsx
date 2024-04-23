import React from "react";
import { accordianItem } from "../Accordian";

type AccordianContent_interviewProps = {
  accordianItem: accordianItem;
};

const AccordianContent_interview: React.FunctionComponent<
  AccordianContent_interviewProps
> = ({ accordianItem }) => {
  return (
    <div className="accordianContent">
      <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
        <h6 className="mb-2 text-gray-500 dark:text-gray-400">
          {accordianItem.desc}
        </h6>
        <ul className="list-disc pl-5">
          {accordianItem.details?.map((item, index) => {
            return <li key={`accordianItem${index}`}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default AccordianContent_interview;
