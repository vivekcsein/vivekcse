import Script from "next/script";
// require("dotenv").config();
import Hero from "../../components/content/Hero";
import dynamic from "next/dynamic";
const MenuBar = dynamic(() => import("../../components/ui/MenuBar/MenuBar"), {
  ssr: false,
});
// import MenuBar from "../../components/ui/MenuBar/MenuBar";

export default function Home() {
  // const gaMeasurementId = process.env.GOOGLE_GA_MEASUREMENT_ID;
  return (
    <>
      <Hero />
      <MenuBar />
    </>
  );
}
