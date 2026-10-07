/**
 * secure-export.ts  —  runs automatically after `next build` (see "postbuild").
 *
 * The site is a static export served by GitHub Pages, which cannot send
 * security headers. This script moves what it can into the HTML itself:
 *
 *   1. Injects a per-page <meta http-equiv="Content-Security-Policy">.
 *      Next.js emits inline <script> tags whose content changes on every
 *      build, so instead of 'unsafe-inline' we hash each one (sha256) and
 *      allow exactly those. Anything an attacker injects is blocked.
 *   2. Fails the build (strict mode) if the export contains something that
 *      would defeat that policy: inline event handlers, javascript: URLs,
 *      unexpected third-party scripts, http:// sub-resources, localhost URLs.
 *
 * NOT possible in a <meta> tag (ignored by browsers): frame-ancestors,
 * report-uri, sandbox. Clickjacking is handled by /public/scripts/init.js instead.
 *
 * It also checks the export is deployable to GitHub Pages: index/404/.nojekyll/
 * robots/sitemap exist, and a custom domain (CNAME) matches NEXT_PUBLIC_SITE_URL
 * and is not combined with the project-pages base path.
 *
 * Strict mode = CI=true or SECURE_EXPORT_STRICT=true (warnings become errors).
 */

import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(process.cwd(), "out");
const STRICT =
  process.env.CI === "true" || process.env.SECURE_EXPORT_STRICT === "true";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_IS_HTTPS = SITE_URL.startsWith("https://");
const USES_PROJECT_BASE_PATH =
  process.env.NEXT_PUBLIC_GH_PROJECT_PAGES === "true";

// ---------------------------------------------------------------------------
// Policy
// ---------------------------------------------------------------------------

/** Remote image hosts the app uses (next.config.ts images.remotePatterns). */
const IMAGE_HOSTS = ["https://*.githubusercontent.com", "https://i.ibb.co"];

/**
 * Google AdSense. Only added to a page that actually loads the AdSense script
 * (i.e. NEXT_PUBLIC_ADSENSE_CLIENT was set at build time). This list is
 * best-effort: after enabling ads, open the site with DevTools → Console and
 * add any host reported as a CSP violation.
 */
const ADS = {
  scriptMarker: "pagead2.googlesyndication.com",
  script: [
    "https://pagead2.googlesyndication.com",
    "https://*.googlesyndication.com",
    "https://*.google.com",
    "https://*.doubleclick.net",
    "https://*.adtrafficquality.google",
    "https://partner.googleadservices.com",
    "https://www.googletagservices.com",
  ],
  connect: [
    "https://pagead2.googlesyndication.com",
    "https://*.googlesyndication.com",
    "https://*.google.com",
    "https://*.doubleclick.net",
    "https://*.adtrafficquality.google",
  ],
  frame: [
    "https://*.doubleclick.net",
    "https://*.googlesyndication.com",
    "https://*.google.com",
  ],
};

type Directives = Record<string, string[]>;

const serialize = (directives: Directives, extra: string[] = []) =>
  [
    ...Object.entries(directives).map(([name, values]) =>
      values.length ? `${name} ${values.join(" ")}` : name,
    ),
    ...extra,
  ].join("; ");

/** Policy for every page Next.js generates. No 'unsafe-inline' for scripts. */
const appPolicy = (scriptHashes: string[], hasAds: boolean) => {
  const directives: Directives = {
    "default-src": ["'self'"],
    "script-src": ["'self'", ...scriptHashes, ...(hasAds ? ADS.script : [])],
    // Inline style="" attributes are used throughout (dynamic topic colours).
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      ...(hasAds ? ["https:"] : IMAGE_HOSTS),
    ],
    "font-src": ["'self'", "data:"], // next/font self-hosts at build time
    // blob: — three.js decodes GLB-embedded textures via fetch(blob:…).
    "connect-src": ["'self'", "blob:", ...(hasAds ? ADS.connect : [])],
    "frame-src": hasAds ? ADS.frame : ["'none'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
  };
  return serialize(
    directives,
    SITE_IS_HTTPS ? ["upgrade-insecure-requests"] : [],
  );
};

/**
 * Policy for the standalone demo pages in /public/templates/*.
 * They use inline onclick/onsubmit handlers and the Tailwind Play CDN (which
 * compiles in the browser), so they need 'unsafe-inline' + 'unsafe-eval'.
 * Still blocks plugins, base-tag hijacking, off-site form posts and any
 * network requests. To tighten: precompile their CSS and move the handlers
 * into addEventListener calls, then delete this special case.
 */
const templatePolicy = () =>
  serialize(
    {
      "default-src": ["'self'"],
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://cdn.tailwindcss.com",
      ],
      "style-src": [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
      ],
      "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
      "img-src": ["'self'", "data:", "https:"],
      "connect-src": ["'self'"],
      "frame-src": ["https://www.google.com"],
      "object-src": ["'none'"],
      "base-uri": ["'self'"],
      "form-action": ["'self'"],
    },
    SITE_IS_HTTPS ? ["upgrade-insecure-requests"] : [],
  );

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const EXECUTABLE_TYPES = new Set([
  "",
  "module",
  "text/javascript",
  "application/javascript",
]);

const attr = (attrs: string, name: string) =>
  new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, "i").exec(attrs)?.[1] ??
  new RegExp(`\\b${name}\\s*=\\s*'([^']*)'`, "i").exec(attrs)?.[1];

type Analysis = {
  hashes: string[];
  externalScripts: string[];
  problems: string[];
  warnings: string[];
  hasAds: boolean;
};

const analyze = (html: string, isTemplate: boolean): Analysis => {
  const hashes = new Set<string>();
  const externalScripts: string[] = [];
  const problems: string[] = [];
  const warnings: string[] = [];

  for (const match of html.matchAll(SCRIPT_RE)) {
    const [, attrs, body] = match;
    const src = attr(attrs, "src");
    const type = (attr(attrs, "type") ?? "").toLowerCase();

    if (src) {
      if (/^(https?:)?\/\//i.test(src)) externalScripts.push(src);
      continue;
    }
    if (!EXECUTABLE_TYPES.has(type)) continue; // ld+json, json… = data, not code

    hashes.add(
      `'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`,
    );
  }

  const hasAds = externalScripts.some((s) => s.includes(ADS.scriptMarker));

  if (!isTemplate) {
    // Strip script bodies so JS like `a<b` can't look like a tag.
    const markup = html.replace(SCRIPT_RE, "<script></script>");

    if (/<[a-zA-Z][^>]*\son[a-z]+\s*=/i.test(markup)) {
      problems.push("inline event handler attribute (onclick=, …)");
    }
    if (/\s(?:href|src|action)\s*=\s*["']\s*javascript:/i.test(markup)) {
      problems.push("javascript: URL");
    }
    if (
      /<(?:script|img|iframe|source|video|audio)\b[^>]*\ssrc\s*=\s*["']http:\/\//i.test(
        markup,
      ) ||
      // Only <link>s the browser fetches; rel=author/canonical/alternate are just metadata.
      /<link\b(?=[^>]*\srel\s*=\s*["'][^"']*\b(?:stylesheet|preload|modulepreload|prefetch|icon|manifest)\b)[^>]*\shref\s*=\s*["']http:\/\//i.test(
        markup,
      )
    ) {
      problems.push("http:// (mixed content) sub-resource");
    }
    for (const src of externalScripts) {
      if (!src.includes(ADS.scriptMarker)) {
        problems.push(`unexpected third-party script: ${src}`);
      }
    }
  }

  // Only metadata can leak a dev URL (canonical, og:url, <link>, JSON-LD).
  // Page text may legitimately mention localhost (e.g. "open http://localhost:3000").
  const head = /<head[\s\S]*?<\/head>/i.exec(html)?.[0] ?? "";
  const jsonLd = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ]
    .map((m) => m[1])
    .join("\n");

  if (/\/\/(?:localhost|127\.0\.0\.1)[:/]/i.test(`${head}\n${jsonLd}`)) {
    warnings.push(
      "metadata contains localhost URLs (is NEXT_PUBLIC_SITE_URL set?)",
    );
  }

  return { hashes: [...hashes], externalScripts, problems, warnings, hasAds };
};

const CSP_META_RE =
  /<meta\s+http-equiv=["']Content-Security-Policy["'][^>]*>/gi;

const injectCsp = (html: string, policy: string) => {
  const tag = `<meta http-equiv="Content-Security-Policy" content="${policy}"/>`;
  const cleaned = html.replace(CSP_META_RE, "");
  // Must come before any script/link so it covers the whole document.
  return cleaned.replace(/<head([^>]*)>/i, `<head$1>${tag}`);
};

/** Structural checks for GitHub Pages. Returns hard errors; pushes soft ones into `warned`. */
const checkPagesExport = async (warned: Set<string>): Promise<string[]> => {
  const errors: string[] = [];
  const exists = (name: string) =>
    stat(path.join(OUT_DIR, name)).then(
      () => true,
      () => false,
    );

  for (const required of [
    "index.html",
    "404.html",
    ".nojekyll",
    "robots.txt",
    "sitemap.xml",
  ]) {
    if (!(await exists(required))) {
      errors.push(`out/${required} is missing (needed for GitHub Pages)`);
    }
  }

  if (await exists("CNAME")) {
    const cname = (await readFile(path.join(OUT_DIR, "CNAME"), "utf8")).trim();
    let siteHost = "";
    try {
      siteHost = new URL(SITE_URL).hostname;
    } catch {
      // invalid URL is reported by the env schema
    }

    if (siteHost !== cname) {
      const message = `custom domain mismatch: CNAME is "${cname}" but NEXT_PUBLIC_SITE_URL host is "${siteHost}"`;
      if (STRICT) errors.push(message);
      else warned.add(message);
    }
    if (USES_PROJECT_BASE_PATH) {
      errors.push(
        "NEXT_PUBLIC_GH_PROJECT_PAGES=true adds a /<repo> base path, which breaks a custom domain (CNAME). Use one or the other.",
      );
    }
  } else if (!USES_PROJECT_BASE_PATH && SITE_URL.includes("github.io/")) {
    warned.add(
      "serving from <user>.github.io/<repo> needs NEXT_PUBLIC_GH_PROJECT_PAGES=true (asset URLs need the /<repo> base path)",
    );
  }

  return errors;
};

const walk = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    }),
  );
  return nested.flat();
};

// ---------------------------------------------------------------------------

const run = async () => {
  const files = (await walk(OUT_DIR)).filter((f) => f.endsWith(".html"));
  if (files.length === 0) {
    throw new Error(`No HTML found in ${OUT_DIR}. Did \`next build\` run?`);
  }

  const errors: string[] = [];
  const warned = new Set<string>();
  let adPages = 0;
  let templatePages = 0;

  for (const file of files) {
    const rel = path.relative(OUT_DIR, file).split(path.sep).join("/");
    const isTemplate = rel.startsWith("templates/");
    const html = await readFile(file, "utf8");
    const result = analyze(html, isTemplate);

    for (const problem of result.problems) errors.push(`${rel}: ${problem}`);
    for (const warning of result.warnings) warned.add(warning);

    const policy = isTemplate
      ? templatePolicy()
      : appPolicy(result.hashes, result.hasAds);

    await writeFile(file, injectCsp(html, policy), "utf8");

    if (isTemplate) templatePages += 1;
    if (result.hasAds) adPages += 1;
  }

  // feed.xml is generated at build time from the site URL as well.
  try {
    const feed = await readFile(path.join(OUT_DIR, "feed.xml"), "utf8");
    if (/\/\/(?:localhost|127\.0\.0\.1)[:/]/i.test(feed)) {
      warned.add("feed.xml contains localhost URLs");
    }
  } catch {
    // no feed — fine
  }

  if (!SITE_IS_HTTPS) {
    warned.add(`NEXT_PUBLIC_SITE_URL is "${SITE_URL}" (not https)`);
  }

  errors.push(...(await checkPagesExport(warned)));

  console.log(
    `[secure-export] CSP injected into ${files.length} page(s)` +
      ` (${templatePages} template, ${adPages} with ads)`,
  );
  for (const warning of warned)
    console.warn(`[secure-export] warning: ${warning}`);
  if (adPages > 0) {
    console.warn(
      "[secure-export] ads are on: check DevTools → Console for CSP violations and extend ADS in secure-export.ts if needed.",
    );
  }

  if (errors.length > 0 || (STRICT && warned.size > 0)) {
    const all = [...errors, ...(STRICT ? [...warned] : [])];
    console.error(`[secure-export] ${all.length} problem(s):`);
    for (const line of all.slice(0, 25)) console.error(`  - ${line}`);
    if (errors.length > 0 || STRICT) process.exit(1);
  }
};

run().catch((error: unknown) => {
  console.error("[secure-export] failed:", error);
  process.exit(1);
});
