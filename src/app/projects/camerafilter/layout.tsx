import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Camera Filter",
  description: "A web camera page to click selfie",
  icons: "favicon.png",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
