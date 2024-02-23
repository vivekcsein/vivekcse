"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import SVG_anim_butterfly from "../svg/SVG_anim_butterfly";
const Anim_cursorFollower = () => {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const heroSection = document.getElementsByClassName("Hero")[0];
    const onMouseMoveHero = (event: any) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.25,
        ease: "power1.out",
      });
    };

    heroSection.addEventListener("mousemove", onMouseMoveHero);

    return () => {
      heroSection.removeEventListener("mousemove", onMouseMoveHero);
    };
  }, []);

  return (
    <div id="cursor" className="cursorFollower">
      <div id="butterfly">
        <SVG_anim_butterfly />
      </div>
    </div>
  );
};

export default Anim_cursorFollower;
