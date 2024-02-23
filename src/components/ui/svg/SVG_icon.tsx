"use client";
import React from "react";
type SVG_iconProps = {
  path: string;
  size: number;
  color?: string;
  viewbox?: number;
};
const SVG_icon = ({ path, color, size, viewbox }: SVG_iconProps) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={(size * 300) / 100}
      height={(size * 300) / 100}
      viewBox={`0 0 512  ${viewbox || 512}`}
      fillRule="evenodd"
    >
      <path d={path} fill={color ? color : ""} fillRule="evenodd" />
    </svg>
  );
};

export default SVG_icon;
