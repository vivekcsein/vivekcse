"use client";
import React from "react";
import { Loader } from "frnz-ui";
const Pages_loading = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <Loader variant="GradientSpin" size={150} />
      loading for you...
    </div>
  );
};

export default Pages_loading;
