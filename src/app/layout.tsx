import type { Metadata } from "next";
import "@/styles/globals.css";
import Script from "next/script";
import AppClientLayout from "@/components/layouts/AppClientLayout";
import { adScriptSrc } from "@/packages/configs/ads.config";
import appConfig from "@/packages/configs/app.config";
import seo from "@/packages/seo";
import { getThemeFontClassName } from "@/packages/utils/fonts";
export const metadata: Metadata = seo;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      data-theme={appConfig.site.style}
      className={`${getThemeFontClassName(appConfig.site.style)} h-full antialiased`}
    >
      <head>
        {/* Static same-origin script: applies saved theme + sidebar state
            before first paint and blocks framing. See public/scripts/init.js. */}
        <script src={`${appConfig.site.basePath}/scripts/init.js`} />
      </head>
      <body suppressHydrationWarning={true}>
        <AppClientLayout>{children}</AppClientLayout>
      </body>
      {adScriptSrc && (
        <Script
          async
          crossOrigin="anonymous"
          src={adScriptSrc}
          strategy="afterInteractive"
        />
      )}
    </html>
  );
}
