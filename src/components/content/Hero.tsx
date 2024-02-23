import React from "react";
import "../../styles/content/Hero.scss";
import Anim_Intro from "../ui/Animations_/Anim_Intro";
// import Anim_cursorFollower from "../ui/Animations/Anim_cursorFollower";
import Spline_vivekcse from "../ui/Spline_/Spline_vivekcse";
import { poppins } from "../../libs/utils/style";

const Hero = () => {
  return (
    <div className="fullscreen bg-secondary Hero relative overflow-hidden">
      <div className="Spline_vivekcse3d">
        <div
          style={{
            width: "960px",
            height: "512px",
            display: "flex",
            justifyContent: "flex-start",
            transform: "translate(-17.5%, 0%)",
            alignItems: "center",
          }}
        >
          <Spline_vivekcse />
        </div>
      </div>
      <div className="flex justify-center flex-col md:flex-row mx-5 mt-5 sm:mx-28  sm:mt-20">
        <div className="w-full sm:w-3/5">
          <div className="mt-5  gap-5 items-baseline">
            <p className="text-2xl bold">I am a</p>
            <div className="Header_animate">
              <h3 className={`Hero_Intro ${poppins.className}`}></h3>
              {/* <Anim_Flowers selector={".Header_animate"} /> */}
            </div>
            <p className="text-2xl bold">Developer</p>
          </div>
        </div>
        <div className="w-full sm:w-2/5">
          <div className="w-full flex justify-center relative ">
            <canvas className="absolute top-0 left-0 w-full h-full "></canvas>
          </div>
        </div>
      </div>
      <Anim_Intro selector={".Hero_Intro"} />
      {/* <Anim_cursorFollower /> */}
    </div>
  );
};

export default Hero;
