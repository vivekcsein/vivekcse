import Hero from "../../components/content/Hero";
import dynamic from "next/dynamic";
import Spline_3d from "../../components/content/Spline_3d";
// import Script from "next/script";

const MenuBar = dynamic(() => import("../../components/ui/MenuBar_/MenuBar"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <div className="Line"></div>
      <Hero />
      <div className="Line"></div>
      <MenuBar />
      <div className="Line"></div>
      {process.env.NODE_ENV === "production" ? (
        <>
          <Spline_3d />
          <div className="Line"></div>
        </>
      ) : null}
    </>
  );
}
