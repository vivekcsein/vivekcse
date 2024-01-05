import React from "react";

const AccordContent = () => {
  return (
    <div>
      <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-40">
        <a
          className="flex items-center h-8 px-4 text-sm hover:bg-gray-200"
          href="#"
        >
          Item A
        </a>
        <a
          className="flex items-center h-8 px-4 text-sm hover:bg-gray-200"
          href="#"
        >
          Item B
        </a>
        <a
          className="flex items-center h-8 px-4 text-sm hover:bg-gray-200"
          href="#"
        >
          Item C
        </a>
      </div>
    </div>
  );
};

export default AccordContent;
