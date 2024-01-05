"use client";
import React from "react";
import Link from "next/link";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <Link href={"/"}></Link>
      {/* <button onClick={reset}>Try again</button> */}
    </div>
  );
};

export default Error;
