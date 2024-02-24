"use client";
import React, { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
type MenuCard_animProps = {
  selector: string;
  depedency: Array<string | number>;
};
const MenuCard_anim = ({ selector, depedency }: MenuCard_animProps) => {
  const [depedency1, depedency2] = depedency;
  useEffect(() => {
    const items = document.querySelectorAll(selector);
    const itemList = Array.from(items) as Array<HTMLDivElement>;
    const tl = gsap.timeline({ paused: true, repeatRefresh: true });
    if (itemList.length > 0) {
      tl.add("boxstart");
      tl.fromTo(
        itemList,
        {
          duration: 0,
          y: "20%",
          opacity: 0,
        },
        {
          y: "0%",
          duration: 0.2,
          opacity: 1,
          stagger: 0.1,
          ease: "expo.out",
        }
      );
      tl.play();
    }
    return () => {
      tl.kill();
    };
  }, [selector, depedency1, depedency2]);

  return <></>;
};

export default MenuCard_anim;
