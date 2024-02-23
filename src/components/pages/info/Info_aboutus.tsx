// import ListingItems from "../../../components/products/ListingItems";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Info_aboutus = () => {
  const introText = "I am a front-end developer for the last 4 year.";

  return (
    <div className="fullscreen">
      <section className="h-full pt-10 overflow-hidden md:pt-0 sm:pt-16 2xl:pt-16">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Hey 👋 I am <br className="block sm:hidden" />
                VIVEK
              </h2>
              <div className="max-w-lg mt-3 text-xl leading-relaxed  md:mt-8 text-textDark">
                {/* {introText} */}
                {/* <span className="text-red-800">
                  💡 Welcome to a digital frontier where innovation meets code
                  and user experiences are elevated to new heights.
                </span>
                <br />
                <span className="text-green-500">
                  🎓 As a JavaScript developer, I embrace the challenge of
                  crafting seamless, responsive, and visually stunning web
                  applications.
                </span> */}
                <br />
                <span className="text-blue-800">
                  🌱 I use Nextjs for creating stunning websites and web
                  applications with beautiful animations.
                </span>
                <br />
                <span className="text-textDark">
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

            <div className="relative">
              <Image
                className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2"
                src="/logo.png"
                width={400}
                height={400}
                alt=""
              />

              <Image
                className="relative w-full p-10 xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110 rounded-full"
                src="https://avatars.githubusercontent.com/u/54096095"
                height={400}
                width={400}
                alt=""
                loading="lazy"
              />
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
