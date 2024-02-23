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
  description:
    "A NextJS template for creating full production based application",
  icons: "favicon.png",
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-bgc relative antialiased`}>
        {children}
        <Font />
      </body>
    </html>
  );
}
