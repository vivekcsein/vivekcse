import { ImageResponse } from "next/og";
import { Lora } from "next/font/google";
export const runtime = "edge";

// Image metadata
export const alt = "World best social media for gamers & coders";
export const size = {
  width: 1200,
  height: 630,
};

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

export const contentType = "image/png";

// Image generation
export default async function OGImage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // fontFamily: `${Lora}`,
        }}
        tw={lora.className}
      >
        A NextJS starter template for creating large scale applications
      </div>
      // {
      //   ...size,
      //   fonts: [
      //     {
      //       name: "Lora",
      //       data: loraArrayBuffer,
      //       style: "normal",
      //       weight: 700,
      //     },
      //   ],
      // }
    )
  );
}
