"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import AccordianHeader from "./AccordianHeader";
// import AccordianContent from "./AccordianContent";
import { accordianItem } from "./Accordian";
import AccordianContent_interview from "./content/AccordianContent_interview";

type AccordianItemProps = {
  accordianItem: accordianItem;
  templateNumber: number;
  statusOpen: boolean;
  setChoosen: (choosen: number) => void;
  Children?: React.ReactNode;
};

const AccordianItem = ({
  accordianItem,
  templateNumber,
  statusOpen,
  setChoosen,
  Children,
}: AccordianItemProps) => {
  const [isOpen, setIsOpen] = React.useState(statusOpen);
  const [isSpecialOpen, setIsSpecialOpen] = React.useState(statusOpen);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      content,
      {
        height: 0,
        y: "-30%",
        scaleY: 0.7,
        opacity: 0.7,
      },
      {
        height: "auto",
        y: "0%",
        scaleY: 1,
        opacity: 1,
        duration: 0.3,
      }
    );
    tl.play();

    return () => {
      tl.kill();
    };
  }, [statusOpen, isOpen]);

  return (
    <div>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          if (!statusOpen) {
            setChoosen(templateNumber);
            setIsOpen(true);
          }
        }}
        className="z-10 relative"
      >
        <AccordianHeader title={accordianItem.title} />
        <div
          className={`w-5 h-5  absolute right-4 top-[50%] translate-y-[-50%] rounded ${statusOpen && isOpen ? "bg-red-500" : "bg-green-500"} cursor-pointer hover:scale-125`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
            setIsSpecialOpen(true);
          }}
        ></div>
      </div>
      <div ref={contentRef} className="-z-10 h-0">
        {statusOpen && isOpen ? (
          <AccordianContent_interview accordianItem={accordianItem} />
        ) : null}
        {!statusOpen && isOpen && isSpecialOpen ? (
          <AccordianContent_interview accordianItem={accordianItem} />
        ) : null}
      </div>
    </div>
  );
};

export default AccordianItem;
