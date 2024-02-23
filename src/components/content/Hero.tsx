import React from "react";
import "../../styles/content/Hero.scss";
import Anim_Intro from "../ui/Animations_/Anim_Intro";
// import Anim_cursorFollower from "../ui/Animations/Anim_cursorFollower";
import { poppins } from "../../libs/utils/style";
import { Button } from "frnz-ui";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="fullscreen  Hero relative flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full flex justify-center  h-full ">
        <div className=" my-10 md:flex  gap-5 items-baseline md:items-start ">
          <p className="text-3xl bold">I am a</p>
          <div className="Header_animate">
            <h3 className={`Hero_Intro ${poppins.className}`}></h3>
          </div>
          <p className="text-3xl bold">Developer</p>
        </div>
      </div>
      <div className="flex gap-5">
        <Link href={"/projects"} target="_blank">
          <Button
            label="projects"
            variant="Gradient"
            fx={{
              width: "150px",
            }}
          />
        </Link>
        <Link href={"/aboutUS"} target="_blank">
          <Button
            label="aboutME"
            variant="Gradient"
            fx={{
              width: "150px",
            }}
          />
        </Link>
      </div>
      <Anim_Intro selector={".Hero_Intro"} />
    </div>
  );
};

export default Hero;

{
  /* <Anim_cursorFollower /> */
}

{
  /* <Anim_Flowers selector={".Header_animate"} /> */
}
