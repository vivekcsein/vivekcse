"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import ScrollerElement from "../scrollTrigger/ScrollerElement";

gsap.registerPlugin(ScrollTrigger);
type GsapScrollTriggerProps = {
  triggerData: gsapData;
  paddTop?: string;
  paddBot?: string;
};

const HorizontalScrollTrigger = ({
  triggerData,
  paddTop = "0px",
  paddBot = "0px",
}: GsapScrollTriggerProps) => {
  const component = useRef(null);
  const slider = useRef(null);
  const scrollerWidth = (triggerData.length * 100).toString().concat("%");

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".scrollerElement");
      const scrollerNow = document.querySelector(".scroller") as HTMLDivElement;
      const offsetwidth = scrollerNow.offsetWidth;

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          // markers: {
          //   startColor: "blue",
          //   endColor: "white",
          //   fontSize: "40px",
          //   indent: 20,
          // },
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=` + offsetwidth,
        },
      });
    }, component);
    return () => ctx.revert();
  });

  return (
    <div className="overflow-x-hidden" ref={component}>
      <div
        ref={slider}
        className="scroller"
        style={{
          width: scrollerWidth,
          height: "100vh",
          display: "flex",
          flexWrap: "nowrap",
          paddingTop: paddTop,
          paddingBottom: paddBot,
        }}
      >
        {triggerData.map((item, index) => {
          return <ScrollerElement key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default HorizontalScrollTrigger;
