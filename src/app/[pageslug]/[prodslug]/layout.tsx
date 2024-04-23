import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://vivekcse.in/WebDevelopment"),
  title: {
    default: "technoglies used in current products",
    template: `%s | VivekCSE`,
  },
  description: "Technoglies used in Products",
  icons: "favicon.png",
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
