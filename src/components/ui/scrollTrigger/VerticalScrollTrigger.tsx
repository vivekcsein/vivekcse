"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);
type VerticalScrollTriggerProps = {
  selector: string;
  start?: string;
  end?: string;
  timeline?: gsap.core.Timeline;
};

const VerticalScrollTrigger = ({
  selector,
  start,
  end,
  timeline,
}: VerticalScrollTriggerProps) => {
  useEffect(() => {
    const item = document.querySelector(selector) as HTMLDivElement;
    const childs = Array.from(item.children);
    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: item,
        toggleActions: "play reset restart complete",
        // toggleActions: "play play resume complete",
        markers: {
          startColor: "blue",
          endColor: "white",
          fontSize: "40px",
          indent: 20,
        },
        // pin: true,
        // scrub: 1,
        start: start ? start : "top 80%",
        end: end ? end : "bottom 80%",
      },
    });
    tl.add("start");
    tl.add(timeline ? timeline : "end");
    // .to(childs[0], { duration: 2, x: 500, stagger: 0.1 }, "start")
    // .to(childs[1], { duration: 1, y: 200 }, "+=1")
    // .to(childs[2], { duration: 3, rotation: 360 }, "start");

    return () => {
      tl.kill();
    };
  });
  return <></>;
};

export default VerticalScrollTrigger;
