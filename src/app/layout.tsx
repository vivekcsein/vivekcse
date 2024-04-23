import type { Metadata } from "next";
import { roboto } from "../libs/utils/style";
import "../styles/globals.css";
import "../styles/style.scss";
import "../styles/utils.scss";
import Font from "../components/content/Font";
import "frnz-ui/dist/styles/styles_ui.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vivekcse.in"),
  title: {
    default: "VivekCSE",
    template: `%s | VivekCSE`,
  },
  description: "Software Engineer portfolio  of Vivek CSE.",
  icons: "favicon.png",
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getRootLayoutAPI } from "../libs/apis/serverlessAPI";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootLayoutJson: Promise<rootLayoutData> = getRootLayoutAPI();
  const rootLayoutData = await rootLayoutJson;
  const { HeaderData, FooterData, productsData, gameData } = rootLayoutData;
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-bgc relative antialiased`}>
        <section id="headerLoader" className="sticky top-0 z-50">
          {HeaderData ? (
            <Header
              HeaderData={HeaderData}
              productsData={productsData}
              gameData={gameData}
            />
          ) : null}
        </section>
        <div className="Line"></div>
        {children}
        <div className="Line"></div>
        <section id="footerLoader" className="z-50">
          {FooterData ? (
            <Footer FooterData={FooterData} productsData={productsData} />
          ) : null}
        </section>
        <Font />
      </body>
    </html>
  );
}
