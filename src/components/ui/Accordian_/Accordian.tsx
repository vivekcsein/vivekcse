"use client";
import React, { useEffect } from "react";
// import { accordianList } from "@/libs/utils/accordianData";
import AccordianItem from "./AccordianItem";
import gsap from "gsap";
export type accordianItem = {
  id: number;
  title: string;
  desc: string;
  link?: string;
  linkdesc?: string;
  details?: Array<string>;
};

type AccordianProps = {
  accordianList: Array<accordianItem>;
};

const Accordian = ({ accordianList }: AccordianProps) => {
  const [choosen, setChoosen] = React.useState(-1);

  useEffect(() => {
    const elem = document.querySelectorAll(
      ".accordianItem"
    ) as unknown as Array<HTMLDivElement>;
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      elem,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
      }
    );
    tl.play();

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      {accordianList.map((item: accordianItem, index: number) => {
        return (
          <div className="accordianItem" key={item.id}>
            <AccordianItem
              accordianItem={item}
              templateNumber={index}
              statusOpen={index == choosen ? true : false}
              setChoosen={setChoosen}
            />
          </div>
        );
      })}
    </>
  );
};

export default Accordian;
