"use client";
import React from "react";
import { roboto, poppins } from "../../libs/utils/style";

const Font = () => {
  return (
    <>
      {" "}
      <style jsx global>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${roboto.style.fontFamily};
        }
        p,
        div,
        span,
        lalel {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
    </>
  );
};

export default Font;
