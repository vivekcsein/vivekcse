"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroImage = {
  src: string;
  alt?: string;
};

type BackgroundFadeEffectImageProps = {
  images: HeroImage[];
  interval?: number;
};
const BackgroundFadeEffectImage = ({
  images,
  interval = 6000,
}: BackgroundFadeEffectImageProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [images.length, interval]);

  if (!images.length) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        -z-10
        overflow-hidden
      "
    >
      {images.map((image, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={image.src}
            className={`
              absolute
              inset-0
              transition-opacity
              duration-2000
              ease-in-out
              ${isActive ? "opacity-100" : "opacity-0"}
            `}
          >
            <Image
              src={image.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="
                object-cover
                scale-105
                blur-[2px]
              "
            />
          </div>
        );
      })}

      {/* Bottom fade */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-1/3
          bg-linear-to-t
          from-background
          to-transparent
        "
      />
    </div>
  );
};

export default BackgroundFadeEffectImage;
