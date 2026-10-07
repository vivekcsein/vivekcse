import type { Metadata } from "next";
import appConfig from "./app.config";

export const keywords = [
  "full-stack",
  "developer",
  "web-developer",
  "web-development",
  "frontend",
  "backend",
  "performance",
  "seo",
  "authentication",
  "security",
  "monetization",
  "react",
  "nextjs",
  "typescript",
  "tailwindcss",
];

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.site.url),

  title: {
    default: appConfig.site.title,
    template: appConfig.site.titleTemplate,
  },

  description: appConfig.site.description,

  keywords: keywords,

  authors: [
    {
      name: appConfig.author.name,
      url: appConfig.site.url,
    },
  ],

  creator: appConfig.author.name,

  // Emitted as <meta name="referrer"> (replaces the Referrer-Policy header,
  // which a static host can't send).
  referrer: "strict-origin-when-cross-origin",

  openGraph: {
    type: "website",
    siteName: appConfig.site.title,
    title: appConfig.site.title,
    description: appConfig.site.description,
    url: appConfig.site.url,
    images: appConfig.site.ogImage
      ? [
          {
            url: appConfig.site.ogImage,
            width: 1200,
            height: 630,
            alt: appConfig.site.title,
          },
        ]
      : undefined,
  },

  twitter: {
    card: appConfig.social.twitter.cardType,
    title: appConfig.site.title,
    description: appConfig.site.description,
    images: appConfig.site.ogImage ? [appConfig.site.ogImage] : undefined,
  },

  // Only emit the tag when a real token is configured (no placeholder in HTML).
  verification: appConfig.verification.google
    ? { google: appConfig.verification.google }
    : undefined,
};
