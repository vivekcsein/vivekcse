import React from "react";
import AccordContent from "./AccordContent";
import AccordHeading from "./AccordHeading";
type Accord01Props = {
  AccordData: AccordData;
};

interface AccordData {
  heading: string;
  contentHtml?: string | JSX.Element;
}
const Accord01 = ({ AccordData }: Accord01Props) => {
  return (
    <div>
      <div className="flex justify-center items-center w-screen p-10">
        <div className="flex flex-row w-56">
          <button className="group border-t border-r border-l border-black focus:outline-none">
            <AccordHeading />
            <AccordContent />
          </button>
          {/* <button className="group border-t border-r border-l  border-black focus:outline-none">
            <AccordHeading />
            <AccordContent />
          </button>
          <button className="group border border-black focus:outline-none">
            <AccordHeading />
            <AccordContent />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Accord01;
