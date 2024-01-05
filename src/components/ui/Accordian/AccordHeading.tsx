import React from "react";

type AccordHeadingProps = {

}
const AccordHeading = ({}: AccordHeadingProps) => {
  return (
    <div>
      <div className="flex items-center justify-between h-12 px-3 font-semibold hover:bg-gray-200">
        <span className="truncate">Heading One</span>
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default AccordHeading;
