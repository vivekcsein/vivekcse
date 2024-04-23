import Link from "next/link";
import React from "react";

interface AccordianContentProps {
  desc: string;
  link?: string;
  linkdesc?: string;
}

const AccordianContent: React.FunctionComponent<AccordianContentProps> = ({
  desc,
  link,
  linkdesc,
}) => {
  return (
    <div className="accordianContent">
      <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
        <p className="mb-2 text-gray-500 dark:text-gray-400">{desc}</p>
        {link ? (
          <p className="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to{" "}
            <Link
              href={link}
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              get started
            </Link>{" "}
            {linkdesc ? linkdesc : ""}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default AccordianContent;
