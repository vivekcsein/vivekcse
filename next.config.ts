import type { NextConfig } from "next";

// Set this to your repo name (only needed for a *project* page like
// username.github.io root site).
const useProjectPagesBasePath =
  process.env.NEXT_PUBLIC_GH_PROJECT_PAGES === "true";
const repoName = "vivekcsexyz";
const basePath = useProjectPagesBasePath ? `/${repoName}` : "";
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ["three"],
  // `*.dev.tsx` files (src/app/dev) are routes only under `next dev`.
  pageExtensions: ["tsx", "ts", "jsx", "js", ...(isDev ? ["dev.tsx"] : [])],
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "i.ibb.co" },
    ],
    unoptimized: true,
  },

  output: "export", // static HTML export -> ./out
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  trailingSlash: true, // GitHub Pages serves /route/index.html cleanly

  // Exposed so static files in /public (e.g. /scripts/init.js) can be referenced
  // correctly when the site is served from a sub-path.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  typescript: {
    ignoreBuildErrors: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
