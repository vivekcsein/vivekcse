import React from "react";
import { dummyBannerImage } from "../../../libs/utils/images";
import Link from "next/link";
import Image from "next/image";
type itemProps = {
  item: projectsList;
  workTitle: string;
  onclickFunc?: () => void;
};

const ProjectCard = ({ item, workTitle, onclickFunc }: itemProps) => {
  return (
    <>
      <div className="max-w-md w-[600px] overflow-hidden rounded-lg shadow-md  dark:bg-gray-800">
        <Image
          className="object-cover w-full h-64"
          src={item.image !== "" ? item.image : dummyBannerImage}
          alt={item.id}
          width={1024}
          height={1024}
          loading="lazy"
        />
        <div className="p-6 ">
          <div>
            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
              {workTitle}
            </span>
            <Link
              className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
              target="_blank"
              href={item.link}
              tabIndex={0}
              role="link"
            >
              {item.name}
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <div className="flex items-center">
                <a
                  href="#"
                  className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                  tabIndex={0}
                  role="link"
                >
                  {item.client}
                </a>
              </div>
              <div>
                {item.platform.map((platform, index) => {
                  return (
                    <span
                      key={index}
                      className="mx-1 text-xs text-gray-600 dark:text-gray-300"
                    >
                      {`${platform} `}
                    </span>
                  );
                })}
              </div>
              <div className="mx-5">
                {item.tags.map((tag, index) => {
                  return (
                    <span
                      key={index}
                      className="mx-1 border-2 px-2 text-xs text-gray-600 dark:text-gray-300"
                    >
                      {`${tag} `}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
