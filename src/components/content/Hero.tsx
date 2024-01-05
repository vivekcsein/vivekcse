import React from "react";
import Animate_Color from "../ui/animation/Animate_Color";
import Info_aboutus from "../pages/info/Info_aboutus";
const Hero = () => {
  return (
    <div className="fullscreen relative">
      <Info_aboutus />
      <Animate_Color />
    </div>
  );
};

export default Hero;
