import type { Project } from "@/types/projects";

const webApps = [
  {
    key: "lifeinvader-ads-studio",
    title: "LifeInvader Ads Studio",
    role: "Web Developer",
    client: "team",
    description:
      "A GTA RP classified-ad generator with lazy-loaded ad panels, server-side JSON obfuscation, AdSense and Media.net integration, and a full SEO-optimized blog.",
    tags: ["Next.js", "TypeScript", "AdSense", "Media.net", "SEO"],
    keywords: [
      "nextjs",
      "typescript",
      "adsense",
      "media.net",
      "seo",
      "gta-rp",
      "blog",
    ],
    href: "https://www.myroleplay.life",
    createdAt: "12/06/2026",
    updatedAt: "24/08/2026",
  },
  {
    key: "rastaa-web-page",
    title: "Rastaa Travel Guide",
    role: "Web Developer",
    client: "self",
    description:
      "An animated travel-planning site for Delhi NCR with curated places, restaurants, and activities, deployed as a static export on GitHub Pages.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    keywords: [
      "nextjs",
      "typescript",
      "tailwindcss",
      "gsap",
      "travel",
      "animation",
      "delhi-ncr",
    ],
    href: "https://frenzzofficial.github.io/rastaa/",
    createdAt: "16/08/2026",
    updatedAt: "17/08/2026",
  },
  {
    key: "ad-monetization",
    title: "Ad Monetization Platform",
    role: "Web Developer",
    client: "self",
    description:
      "A Next.js blog engineered for ad revenue, covering SSR/SSG-safe AdSense and Media.net placements while protecting performance and SEO.",
    tags: ["Next.js", "AdSense", "Media.net", "SEO"],
    keywords: [
      "adsense",
      "media.net",
      "advertising",
      "monetization",
      "seo",
      "nextjs",
      "ssr",
      "performance",
    ],
    href: "https://my-daily-blogs-app.vercel.app/",
    createdAt: "08/08/2026",
    updatedAt: "18/08/2026",
  },
] satisfies Project[];

export default webApps;
