import Script from "next/script";
// require("dotenv").config();
import Hero from "../../components/content/Hero";
import dynamic from "next/dynamic";
import Spline_3d from "../../components/content/Spline_3d";

const MenuBar = dynamic(() => import("../../components/ui/MenuBar_/MenuBar"), {
  ssr: false,
});
// import MenuBar from "../../components/ui/MenuBar/MenuBar";

export default function Home() {
  // const gaMeasurementId = process.env.GOOGLE_GA_MEASUREMENT_ID;
  return (
    <>
      <div className="Line"></div>
      <Hero />
      <div className="Line"></div>
      <MenuBar />
      <div className="Line"></div>
      <Spline_3d />
      <div className="Line"></div>
    </>
  );
}
