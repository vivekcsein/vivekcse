"use client";
import React from "react";
import Button from "../Button";

const Error404 = () => {
  const onClickFunc = () => {
    return 0;
  };
  return (
    <div className="errorShow">
      <div>
        <h1>Page Not Found</h1>
        <Button
          btnInfo={{ id: 1, text: "Back to page", type: 2 }}
          onClickFunc={onClickFunc}
        />
      </div>
    </div>
  );
};

export default Error404;
