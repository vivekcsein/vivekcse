import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { getRootLayoutAPI } from "../../libs/api/serverlessAPI";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const rootLayoutJson: Promise<rootLayoutData> = getRootLayoutAPI();
  const rootLayoutData = await rootLayoutJson;
  const { HeaderData, FooterData, productsData, gameData } = rootLayoutData;

  return (
    <>
      <section id="headerLoader" className="sticky top-0 z-50">
        {HeaderData ? (
          <Header
            HeaderData={HeaderData}
            productsData={productsData}
            gameData={gameData}
          />
        ) : null}
      </section>
      <main className="root relative">
        <div className="root-container">
          <div className="wrapper">{children}</div>
        </div>
      </main>
      <section id="footerLoader" className="z-50">
        {FooterData ? (
          <Footer FooterData={FooterData} productsData={productsData} />
        ) : null}
      </section>
    </>
  );
};

export default Layout;
