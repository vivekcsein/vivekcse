import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import type { ImageProps } from "@/types/app";

const ImageComponent = (props: ImageProps) => {
  const {
    id,
    src,
    alt,
    href,
    width,
    height,
    className,
    style,
    loading = "lazy",
    priority,
    ...imageProps
  } = props;

  const image = (
    <Image
      id={id}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      // Lock aspect ratio so a className that sets only width or only
      // height (e.g. Tailwind `w-10` with no `h-10`) can't desync the
      // two and trigger Next's "modified but not the other" warning.
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
        height: "auto",
        ...style,
      }}
      priority={priority}
      loading={priority ? undefined : loading}
      {...imageProps}
    />
  );

  return href ? <Link href={href}>{image}</Link> : image;
};

ImageComponent.displayName = "ImageComponent";

export default memo(ImageComponent);
