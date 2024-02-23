// import ListingItems from "../../../components/products/ListingItems";
import Image from "next/image";
// import Link from "next/link";
import React from "react";

const Info_aboutus = () => {
  return (
    <div className="fullscreen">
      <section className=" pt-5  md:pt-0 sm:pt-16 2xl:pt-10">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 lg:grid-cols-2">
            <div>
              <span className="text-3xl flex flex-col gap-3 md:flex-row align-baseline font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Hey 👋 I am <br className="block sm:hidden" />
                <h1 className="text-textDark">VIVEK</h1>
              </span>
              <div className="max-w-lg mt-3 text-xl leading-relaxed  md:mt-5 text-textDark">
                {/* {introText} */}
                <span>
                  💡 Welcome to a digital frontier where innovation meets code
                  and user experiences are elevated to new heights.
                </span>
                <br />
                <span>
                  🎓 As a JavaScript developer, I embrace the challenge of
                  crafting seamless, responsive, and visually stunning web
                  applications.
                </span>
                <br />
                <span>
                  🌱 I use Nextjs for creating stunning websites and web
                  applications with beautiful animations.
                </span>
                <br />
                <span>
                  ✍️ In my free time, I pursue YouTube and Gaming as my hobby.
                </span>

                {/* <ListingItems /> */}
              </div>

              {/* <p className="mt-4 text-xl  md:mt-8">
                <span className="relative inline-block">
                  <span className="relative text-textDark">
                    {" "}
                    Have a question?{" "}
                  </span>
                </span>
                <br className="block sm:hidden text-textDark" />
                Ask me on{" "}
                <Link
                  target="_blank"
                  href="https://about.me/vivekcsein"
                  title=""
                  className="transition-all duration-200 text-textLight hover:text-textDark hover:underline"
                >
                  Aboutme
                </Link>
              </p> */}
            </div>
            <div className="relative  lg:visible invisible">
              <Image
                className="relative w-2/3 p-10 xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110 rounded-full"
                src="https://avatars.githubusercontent.com/u/54096095"
                height={400}
                width={400}
                alt=""
                loading="lazy"
              />
              <canvas className="w-full absolute h-full top-0"></canvas>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Info_aboutus;

{
  /* <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300"></span> */
}
