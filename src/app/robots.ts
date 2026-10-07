import type { MetadataRoute } from "next";
import appConfig from "@/packages/configs/app.config";

// Static export: this is rendered once at build time into out/robots.txt.
export const dynamic = "force-static";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      // Per-visitor / transactional pages: nothing for a search engine to index.
      disallow: ["/bookmarks/", "/marketplace/cart/"],
    },
  ],
  sitemap: `${appConfig.site.url}/sitemap.xml`,
});

export default robots;
