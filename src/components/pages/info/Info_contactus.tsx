import Link from "next/link";
import React from "react";

const Info_contactus = () => {
  return (
    <div className="fullscreen">
      <section className=" body-font relative">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            {/* <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Contact Us
            </h1> */}
            <h1 className="lg:w-2/3 font-bold text-xl md:text-2xl mx-auto leading-relaxed  text-textDark">
              let me know what we can bring changes into any project
            </h1>
            <h1 className="mt-4 text-xl  md:mt-4">
              <span className="relative inline-block">
                {/* <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300"></span> */}
                <span className="relative text-textDark">
                  {" "}
                  Have a question?{" "}
                </span>
              </span>
              <br className="block sm:hidden text-textDark" />
              Ask me on{" "}
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/vivekcsein/"
                title=""
                className="transition-all duration-200 text-textLight hover:text-textDark hover:underline"
              >
                LinkedIN
                <br />
              </Link>
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    // for="name"
                    className="leading-7 text-sm text-textDark"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full  rounded border  text-base outline-none  py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    // for="email"
                    className="leading-7 text-sm  text-textDark"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-black rounded border border-gray-300 focus:border-indigo-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    // for="message"
                    className="leading-7 text-sm text-textDark"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-black rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none  py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-secondary rounded text-lg">
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Info_contactus;
