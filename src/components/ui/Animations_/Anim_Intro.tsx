"use client";
import React, { useCallback, useEffect, useState } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { Names } from "../../../libs/utils/constants";
type Anim_IntroProps = {
  selector: string;
  textSelector?: string;
};
const Anim_Intro = ({ selector }: Anim_IntroProps) => {
  const [textNum, setTextNum] = useState<number>(5);
  useEffect(() => {
    setTextNum(0);
    const timer = setInterval(() => {
      setTextNum((prev) => {
        if (prev >= Names.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [selector]);

  useEffect(() => {
    const headTL = gsap.timeline({
      paused: true,
      repeatRefresh: true,
    });
    const item = document.querySelector(selector) as HTMLHeadingElement;
    const text = Names[textNum];
    headTL.add("start").to(item, {
      duration: 0,
      opacity: 1,
      innerHTML: text,
      onComplete: () => {
        const split = SplitType.create(item, { types: "chars" }).chars;
        if (split) {
          headTL.fromTo(
            split,
            {
              duration: 0,
              y: "100%",
            },
            {
              y: "0%",
              duration: 0.4,
              stagger: 0.05,
              onComplete: () => {
                SplitType.create(item, { types: "chars" }).revert();
              },
            }
          );
        }
      },
    });
    headTL.play();
    return () => {
      headTL.kill();
    };
  }, [textNum, selector]);

  return <></>;
};

export default Anim_Intro;
