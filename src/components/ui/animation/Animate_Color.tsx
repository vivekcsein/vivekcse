"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { fav_colors } from "../../../libs/utils/contants";

const Animate_Color = () => {
  const [primaryColor, setPrimaryColor] = useState<string>("#d1903b");
  const [secondaryColor, setSecondaryColor] = useState<string>("#d1903b");
  const colors = Object.values(fav_colors);

  useLayoutEffect(() => {
    const changePrimaryColor = () => {
      let randomNum = Math.floor(Math.random() * fav_colors.length);
      setPrimaryColor(colors[randomNum].code);
    };
    const changeSecondaryColor = () => {
      let randomNum = Math.floor(Math.random() * fav_colors.length);
      setSecondaryColor(colors[randomNum].code);
    };

    const intervalId1 = setInterval(changePrimaryColor, 10000); // Changes color every 5 seconds
    const intervalId2 = setInterval(changeSecondaryColor, 20000); // Changes color every 5 seconds
    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    }; // Clear interval on unmount
  });

  useEffect(() => {
    gsap.to("html", {
      "--primary": `${primaryColor}`,
      duration: 10,
      ease: "ease-in",
      yoyo: true,
      repeat: -1,
    });
  }, [primaryColor]);
  useEffect(() => {
    gsap.to("html", {
      "--secondary": `${secondaryColor}`,
      duration: 20,
      ease: "ease-in",
      yoyo: true,
      repeat: -1,
    });
  }, [secondaryColor]);

  return <></>;
};

export default Animate_Color;
