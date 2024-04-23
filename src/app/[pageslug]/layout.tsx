import React from "react";
import { Metadata } from "next";
import { getRootLayoutAPI } from "../../libs/apis/serverlessAPI";
import "../../styles/pages/pages_default.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://vivekcse.in"),
  title: {
    default: "vivekcse pages",
    template: `%s | VivekCSE`,
  },
  description: "Software Engineer portfolio  of Vivek CSE.",
  icons: "favicon.png",
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

// import Header from "../../components/layout/Header";
// import Footer from "../../components/layout/Footer";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const rootLayoutJson: Promise<rootLayoutData> = getRootLayoutAPI();
  const rootLayoutData = await rootLayoutJson;
  const { HeaderData, FooterData, productsData, gameData } = rootLayoutData;

  return (
    <>
      {/* <section id="headerLoader" className="sticky top-0 z-50">
        {HeaderData ? (
          <Header
            HeaderData={HeaderData}
            productsData={productsData}
            gameData={gameData}
          />
        ) : null}
      </section> */}
      <div className="Line"></div>
      <main className="root fullscreen ">
        <div className="root-container">
          <div className="pages_wrapper relative ">{children}</div>
        </div>
      </main>
      <div className="Line"></div>
      {/* <section id="footerLoader" className="z-50">
        {FooterData ? (
          <Footer FooterData={FooterData} productsData={productsData} />
        ) : null}
      </section> */}
    </>
  );
};

export default Layout;
