"use client";
import React, { useCallback, useEffect, useState } from "react";
import SplitType from "split-type";
import gsap from "gsap";
type Anim_HeadLineProps = {
  selector: string;
  textSelector?: string;
};
const Anim_HeadLine = ({ selector, textSelector }: Anim_HeadLineProps) => {
  const [textInput, setTextInput] = useState(
    textSelector ? textSelector : "VIVEK"
  );

  const animate = useCallback(
    (text: string, item: HTMLElement, ttl: gsap.core.Timeline) => {
      ttl.to(item, {
        innerHTML: text,
        duration: 0,
        opacity: 1,
        onComplete: () => {
          let split = SplitType.create(item, { types: "chars" });
          split.chars?.map((elem) => {
            ttl.fromTo(
              elem,
              {
                duration: 0,
                // stagger: 0.01,
                ease: "power3",
                innerHTML: "",
                opacity: 0,
                x: "-100%",
              },
              {
                innerHTML: elem.innerHTML,
                opacity: 1,
                x: "0%",
              }
            );
          });
        },
      });
    },
    []
  );

  useEffect(() => {
    const tl = gsap.timeline({ paused: true, repeatRefresh: true });
    const item = document.querySelector(selector) as HTMLDivElement;
    animate(textInput, item, tl);
    tl.play();
    return () => {
      tl.kill();
    };
  }, [textInput, animate, selector]);

  return <></>;
};

export default Anim_HeadLine;
