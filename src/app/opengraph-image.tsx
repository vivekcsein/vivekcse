import { ImageResponse } from "next/og";
import { Lora } from "next/font/google";
// export const runtime = "edge";
export const alt = "A portfolio of VivekCSE";
export const size = {
  width: 1200,
  height: 600,
};

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
  // variable: "--font-lora",
});

export const contentType = "image/png";

// Image generation
export default async function OGImage({
  params,
}: {
  params: { slug: string };
}) {
  // const slug = params.slug || "A portfolio of vivekcse";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(60deg, #dd00ff, #6600ff,#dd00ff,#6600ff)",
          fontSize: 32,
          fontWeight: 600,
        }}
        tw={lora.className}
      >
        <h1 style={{ marginTop: 50, color: "#eeaaaa", fontSize: "3rem" }}>
          👋VivekCSE
        </h1>
        <h3 style={{ marginTop: 0, color: "#ffddff" }}>
          NextJS|Software Engineer|Gamer{" "}
        </h3>
      </div>
    )
  );
}
