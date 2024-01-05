import "../styles/globals.css";
import "../styles/Vars.scss";
import "../styles/Styles.scss";
import type { Metadata } from "next";
import { Poppins, Roboto, Nunito, Cabin, Lora } from "next/font/google";
import { getLayoutAPI } from "../libs/api/serverlessapi";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});
// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "700"],
// });
// const nunito = Nunito({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "700"],
// });
// const cabin = Cabin({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "700"],
// });

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vivekcse.in"),
  title: {
    default: "VivekCSE",
    template: `%s | VivekCSE`,
  },
  description: "A personal portfolio website for VivekCSE",
  icons: "favicon.png",
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
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
      <body className={`${roboto.className} bg-bg relative`}>
        <div id="headerLoader" className="hidden sticky z-50">
          {HeaderData && productsData && gameData ? (
            <Header
              HeaderData={HeaderData}
              productsData={productsData}
              gameData={gameData}
            />
          ) : null}
        </div>
        {/* <div className="absolute w-full h-screen bg-black -z-50">

        </div> */}

        {children}

        <div id="footerLoader" className="hidden">
          {FooterData && productsData ? (
            <Footer FooterData={FooterData} productsData={productsData} />
          ) : null}
        </div>
      </body>
    </html>
  );
}
