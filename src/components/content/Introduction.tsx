"use client";
import React, { useEffect, useLayoutEffect, useReducer, useRef } from "react";
import LayoutToggle from "./LayoutToggle";
import Scrambly from "../ui/Effects/Scrambly";
import gsap from "gsap";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./Hero"), { ssr: false });

type State = {
  showIntial: boolean;
  showIntro: boolean;
  showMain: boolean;
};

type Action = { type: string };
// | { type: "SHOW_INTIAL" }
// | { type: "SHOW_INTRO" }
// | { type: "SHOW_MAIN" };

const initialState = {
  showIntial: true,
  showIntro: false,
  showMain: false,
};

const actions = {
  SHOW_INTIAL: "SHOW_INTIAL",
  SHOW_INTRO: "SHOW_INTRO",
  SHOW_MAIN: "SHOW_MAIN",
  HIDE_INTIAL: "HIDE_INTIAL",
  HIDE_INTRO: "HIDE_INTRO",
  HIDE_MAIN: "HIDE_MAIN",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actions.SHOW_INTIAL:
      return { ...state, showIntial: true };
    case actions.SHOW_INTRO:
      return { ...state, showIntro: true };
    case actions.SHOW_MAIN:
      return { ...state, showMain: true };
    case actions.HIDE_INTIAL:
      return { ...state, showIntial: false };
    case actions.HIDE_INTRO:
      return { ...state, showIntro: false };
    case actions.HIDE_MAIN:
      return { ...state, showMain: false };
    default:
      return { ...state, showMain: true };
  }
};

const Introduction = () => {
  const initialLoaderRef = useRef<HTMLDivElement | null>(null);
  const introLoaderRef = useRef<HTMLDivElement | null>(null);
  const IntialTextRef = useRef<HTMLHeadingElement | null>(null);
  const IntialBtnRef = useRef<HTMLButtonElement | null>(null);
  const IntroTextRef = useRef<HTMLHeadingElement | null>(null);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { showIntial, showIntro, showMain } = state;

  useLayoutEffect(() => {
    const header = document.querySelector("#headerLoader") as HTMLDivElement;
    if (header.style.display == "flex") {
      // setShowIntial(false);
      // setShowMain(true);
      dispatch({ type: actions.HIDE_INTIAL });
      dispatch({ type: actions.SHOW_MAIN });
    }
  }, [showIntial, showMain]);

  useLayoutEffect(() => {
    gsap.to("html", {
      duration: 0,
      "--secondary": "#000",
    });
  });

  let initialLoaderr: HTMLDivElement;
  let btn: HTMLButtonElement;
  const tl1 = gsap.timeline({ paused: true });
  const userClicked = () => {
    console.log("user clicked");
    if (showIntial) {
      tl1
        .add("start")
        .to(btn, {
          duration: 0.2,
          opacity: 0,
        })
        .fromTo(
          initialLoaderr,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            display: "none",
            onComplete: () => {
              // setShowIntial(false);
              // setShowIntro(true);
              dispatch({ type: actions.HIDE_INTIAL });
              dispatch({ type: actions.SHOW_INTRO });
              // dispatch({ type: actions.SHOW_MAIN });
              tl1.kill();
            },
          }
        );
      tl1.restart();
    }
  };

  useEffect(() => {
    initialLoaderr = initialLoaderRef.current as HTMLDivElement;
    btn = IntialBtnRef?.current as HTMLButtonElement;

    return () => {};
  }, [showIntial]);

  useLayoutEffect(() => {
    const tl2 = gsap.timeline({ paused: true });
    const IntroText = IntroTextRef.current as HTMLHeadingElement;
    if (showIntro) {
      tl2
        .add("start")
        .fromTo(
          IntroText,
          {
            duration: 3,
            ease: "bounce.in",
            y: +50,
            scale: 0.75,
          },
          {
            scale: 1.2,
          }
        )
        .to(IntroText, {
          duration: 0,
          delay: 2,
          innerHTML: " I am a front-end Developer",
        })
        .fromTo(
          IntroText,
          {
            duration: 0,
            ease: "bounce.in",
            y: +50,
            scale: 0.75,
          },
          {
            duration: 3,
            y: 0,
            scale: 1,
          }
        )
        .to(IntroText, {
          duration: 0,
          delay: 2,
          innerHTML: "Welcome to My portfolio",
        })
        .fromTo(
          IntroText,
          {
            duration: 0,
            ease: "bounce.in",
            y: +50,
            scale: 0.75,
          },
          {
            duration: 3,
            y: 0,
            scale: 1,
            onComplete: () => {
              // setShowIntro(false);
              // setShowMain(true);
              // dispatch({ type: actions.SHOW_INTIAL });
              dispatch({ type: actions.HIDE_INTRO });
              dispatch({ type: actions.SHOW_MAIN });
              tl2.kill();
            },
          }
        );
      tl2.restart();
    }

    return () => {
      tl2.kill();
    };
  }, [showIntro]);

  return (
    <>
      {showIntial ? (
        <div
          id="initialLoader"
          className="w-full min-h-screen bg-black relative overflow-hidden"
          ref={initialLoaderRef}
        >
          <h1
            ref={IntialTextRef}
            className="text-3xl md:text-8xl text-green-500 hidden"
          >
            Hello Friend You are Hacked...
          </h1>
          <div className=" absolute w-full min-h-screen  translate-x-1/2  translate-y-40 md:translate-y-1/2 ">
            <button
              ref={IntialBtnRef}
              onClick={userClicked}
              className=" -translate-x-1/2 translate-y-1/2 px-7 py-5 text-3xl text-white bg-red-500 hover:bg-green-500 hover:text-black hidden"
            >
              warning : click to proceed
            </button>
          </div>
          <Scrambly
            initialLoaderRef={initialLoaderRef}
            IntialTextRef={IntialTextRef}
            IntialBtnRef={IntialBtnRef}
          />
        </div>
      ) : null}

      {showIntro ? (
        <div
          id="introLoader"
          ref={introLoaderRef}
          className="w-full min-h-screen bg-black relative overflow-hidden flex justify-center items-center "
        >
          <h1
            ref={IntroTextRef}
            className="text-4xl md:text-8xl text-green-500"
          >
            I am Vivek
          </h1>
        </div>
      ) : null}

      {showMain ? (
        <main>
          <Hero />
          <LayoutToggle show={"show"} />
        </main>
      ) : null}
    </>
  );
};

export default Introduction;
