"use client";
import React, { useLayoutEffect } from "react";
import SplitType from "split-type";
import gsap from "gsap";
type ScramblyProps = {
  initialLoaderRef: React.MutableRefObject<HTMLDivElement | null>;
  IntialTextRef: React.MutableRefObject<HTMLHeadingElement | null>;
  IntialBtnRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const Scrambly = ({
  initialLoaderRef,
  IntialTextRef,
  IntialBtnRef,
}: ScramblyProps) => {
  let initialLoader: HTMLDivElement =
    initialLoaderRef?.current as HTMLDivElement;
  let count = 0;
  // let lastIndex: number | undefined;
  const repeatCount = 2;
  const scrTimeline = gsap.timeline({
    repeat: -1,
    yoyo: true,
  });

  let runBtn: () => void;

  const ScremblyAnimCompleted = (index: number) => {
    count++;

    if (count == index * repeatCount + index) {
      runBtn();
    }
  };

  useLayoutEffect(() => {
    const item = IntialTextRef?.current as HTMLHeadingElement;
    item.style.display = "block";

    runBtn = () => {
      if (IntialBtnRef.current != null) {
        const initialBtn: HTMLButtonElement =
          IntialBtnRef.current as HTMLButtonElement;
        // if (initialBtn.style.display == "none") {
        initialBtn.style.display = "block";
        scrTimeline.fromTo(
          initialBtn,
          { opacity: 0.5, duration: 2, ease: "power3" },
          { opacity: 1 }
        );
        clearTimeout(timer);
        // }
      }
    };

    const timer = setTimeout(() => {
      runBtn();
    }, 10000);
    const split = SplitType.create(item, { types: "chars" });
    const lastIndex = split.chars?.length;
    let ctx = gsap.context(() => {
      split.chars?.forEach((elem, index) => {
        if (lastIndex && index == lastIndex - 1) {
          const tl = gsap.timeline({
            repeatRefresh: true,
            repeat: index * repeatCount + index,
          });
          tl.from(elem, {
            duration: 0.1,
            ease: "power3",
            rotateX: "random(-360, 360)",
            innerHTML: "random([0,1])",
            // "random([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5,6,7,8,9,0)",
            color: "random([red, blue, green,yellow,purple])",
            onComplete: () => {
              ScremblyAnimCompleted(index);
            },
          });
        } else {
          const tl = gsap.timeline({
            repeatRefresh: true,
            repeat: index * repeatCount + index,
          });
          tl.from(elem, {
            duration: 0.1,
            ease: "power3",
            rotateX: "random(-360, 360)",
            innerHTML: "random([0,1])",
            // "random([a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5,6,7,8,9,0)",
            color: "random([red, blue, green,yellow,purple])",
          });
        }
      });
    }, initialLoader);

    return () => {
      ctx.kill();
      scrTimeline.kill();
    };
  });
  return <></>;
};

export default Scrambly;
