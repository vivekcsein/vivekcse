"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Animate_Header = () => {
  useEffect(() => {
    const Header = document.querySelector(".Header");
    gsap.fromTo(Header, { y: -100 }, { y: 0, duration: 1, ease: "bounce.out" });

    return () => {
      gsap.to(Header, { y: 0, duration: 0 });
    };
  }, []);

  return <></>;
};

export default Animate_Header;
