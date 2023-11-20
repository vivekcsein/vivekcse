// "use client"; // Error components must be Client Components

import React from "react";
import Error404 from "../components/error/Error404";

const ErrorFile = (err: number) => {
  return (
    <div className="fullScreen">
      {err == 404 ? <Error404 /> : null}
      {err === 500 ? <h1>No error</h1> : null}
    </div>
  );
};

export default ErrorFile;
