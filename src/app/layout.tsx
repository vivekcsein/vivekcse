import "../styles/globals.css";
import "../styles/Styles.scss";
import "../styles/Vars.scss";
import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import { getLayoutAPI } from "../libs/layoutapi";
import Header from "../content/Header";
import Footer from "../content/Footer";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
// const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "FRNZ",
  description: "Frenzz Official Website",
  icons: "favicon.png",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLayoutData: Promise<layoutdata> = getLayoutAPI();
  const layoutJson = await apiLayoutData;
  const { HeaderData, FooterData, productsData, gameData } = layoutJson;

  return (
    <html lang="en">
      <body className={roboto.className}>
        {HeaderData && productsData && gameData ? (
          <Header
            HeaderData={HeaderData}
            productsData={productsData}
            gameData={gameData}
          />
        ) : null}

        {children}

        {FooterData && productsData ? (
          <Footer FooterData={FooterData} productsData={productsData} />
        ) : null}
      </body>
    </html>
  );
}
