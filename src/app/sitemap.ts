import type { MetadataRoute } from "next";
import appConfig from "@/packages/configs/app.config";
import { getAllDocs, getCollections } from "@/packages/utils/loader";

// Static export: this is rendered once at build time into out/sitemap.xml.
export const dynamic = "force-static";

/** Fixed pages that exist in the app (keep in step with src/app). */
const STATIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/careers",
  "/privacy",
  "/terms",
  "/marketplace",
  "/content",
] as const;

// `trailingSlash: true` in next.config.ts → every page is served as /route/
const url = (path: string) => {
  const base = appConfig.site.url.replace(/\/$/, "");
  return path === "/" ? `${base}/` : `${base}${path.replace(/\/$/, "")}/`;
};

const sitemap = (): MetadataRoute.Sitemap => {
  const collections = getCollections();

  const sections = collections.flatMap((collection) => [
    `/${collection.key}`,
    ...collection.categories
      .filter((category) => category.key !== "")
      .map((category) => `/${collection.key}/${category.key}`),
  ]);

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: url(path),
      priority: path === "/" ? 1 : 0.7,
    })),
    ...sections.map((path) => ({ url: url(path), priority: 0.6 })),
    ...getAllDocs().map((doc) => ({
      url: url(doc.href),
      lastModified: doc.updatedAt ?? doc.createdAt,
      priority: doc.featured ? 0.8 : 0.5,
    })),
  ];
};

export default sitemap;
