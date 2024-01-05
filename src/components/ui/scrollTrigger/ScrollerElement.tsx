import React from "react";
import Image from "next/image";
interface GsapElementProps {
  item: GsapElement;
}
const ScrollerElement = ({ item }: GsapElementProps) => {
  return (
    <section
      className="scrollerElement"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundColor: item.color ? item.color : "#00000000",
      }}
    >
      {item.imgSrc ? (
        <Image
          width={item.imgWidth}
          height={item.imgHeight}
          alt={item.alt ? item.alt : "img"}
          src={item.imgSrc}
          loading="lazy"
          className={item.styleClass}
          style={{ width: "100%", height: "auto" }}
        />
      ) : item.variant ? (
        <h1>Hello</h1>
      ) : null}
    </section>
  );
};

export default ScrollerElement;
