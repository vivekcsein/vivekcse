import React from "react";

interface AccordianHeaderProps {
  title: string;
}

const AccordianHeader: React.FunctionComponent<AccordianHeaderProps> = ({
  title,
}) => {
  return (
    <div className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-900 bg-gray-100 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 cursor-pointer transition-all">
      <h6>{title}</h6>
    </div>
  );
};

export default AccordianHeader;
