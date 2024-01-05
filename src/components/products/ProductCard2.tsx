import Image from "next/image";
import React from "react";
import dumpProfileImage from "../../../public/images/saveBtn.png";
import Button from "../ui/buttons/Button";
type itemProps = {
  item: projectsList;
  onclickFunc?: () => void;
};

const ProjectsCard = ({ item, onclickFunc }: itemProps) => {
  const eventHandle = (e: any) => {
    e.preventDefault();
    // if (item.link) {
    //   window.open(item.link, "_blank");
    // }
  };

  return (
    <div className="w-full flex  flex-col md:flex-row  p-10">
      <div className=" w-full md:w-1/2 p-10 ">
        <Image
          src={item.image !== "" ? item.image : dumpProfileImage}
          alt={item.id}
          width={1024}
          height={1024}
          className="w-full h-full"
        />
      </div>

      <div className="w-full md:w-1/2 p-10 bg-black bg-opacity-50">
        <h1 className="text-white">{item.name}</h1>
        <br />
        <p className="text-white">{item.description ? item.description : ""}</p>
      </div>

      <Button btnInfo={{ id: 1, text: "click here" }} />
    </div>
  );
};

export default ProjectsCard;
