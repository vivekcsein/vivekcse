---
description: "100 Next.js interview questions from beginner to enterprise: App Router, rendering strategies, caching, performance, security and production debugging."
date: 2026-09-12
keywords: [nextjs, interview, app router, rendering, caching, performance, security]
featured: false
---

# Top 100 Next.js Interview Questions (Beginner → Enterprise)

A complete, progressively-structured guide covering Next.js fundamentals, App Router internals, rendering strategies, caching, performance, security, and real-world production debugging. Every question is Next.js-specific (not generic JavaScript/React).

---

## Table of Contents

1. [Beginner (Q1–Q25)](#beginner-q1-q25)
2. [Intermediate (Q26–Q50)](#intermediate-q26-q50)
3. [Advanced (Q51–Q75)](#advanced-q51-q75)
4. [Enterprise / Problem-Solving / Debugging (Q76–Q100)](#enterprise--problem-solving--debugging-q76-q100)

---

## Beginner (Q1–Q25)

### Q1. What is Next.js and why use it over plain React?

Next.js is a React meta-framework that adds file-based routing, server-side rendering (SSR), static site generation (SSG), API routes, image/font optimization, and a build system out of the box. Plain React (via Create React App or Vite) only gives you client-side rendering — Next.js solves routing, data fetching, SEO, and performance concerns without third-party glue code.

### Q2. What is the difference between SSR, SSG, ISR, and CSR in Next.js?

- **CSR (Client-Side Rendering):** HTML is empty at first; JS renders content in the browser.
- **SSR (Server-Side Rendering):** HTML is generated per-request on the server (`getServerSideProps` or dynamic rendering in App Router).
- **SSG (Static Site Generation):** HTML is generated at build time (`getStaticProps` or static rendering in App Router).
- **ISR (Incremental Static Regeneration):** Static pages are regenerated in the background after a `revalidate` interval, without a full rebuild.

### Q3. How does Next.js's file-based routing system work?

Every file inside the `pages/` (Pages Router) or `app/` (App Router) directory automatically becomes a route based on its file path. For example, `pages/about.js` maps to `/about`, and `app/blog/page.tsx` maps to `/blog`.

### Q4. What is the difference between the Pages Router and the App Router?

The Pages Router (`pages/`) uses `getStaticProps`/`getServerSideProps` and client-rendered-by-default components. The App Router (`app/`) is built on React Server Components, uses `page.tsx`/`layout.tsx` conventions, supports nested layouts, streaming, and server-first data fetching with `fetch()` directly inside components.

### Q5. What does `getStaticProps` do?

It runs at build time (Pages Router) to fetch data and pass it as props to a page, producing static HTML ahead of time. It only runs on the server, never in the browser bundle.

### Q6. What does `getServerSideProps` do?

It runs on every request on the server, fetches fresh data, and renders the page dynamically before sending HTML to the client. Useful for frequently changing or user-specific data.

### Q7. What is `getStaticPaths` used for?

It's paired with `getStaticProps` for dynamic routes (e.g. `[id].js`) to tell Next.js which paths to pre-render at build time, and whether unlisted paths should 404, block, or fallback-render.

### Q8. What is the `next/link` component and why not just use `<a>`?

`<Link>` enables client-side navigation between routes without a full page reload, prefetches linked pages in the background, and preserves the SPA feel while keeping SEO-friendly anchor tags in the rendered HTML.

### Q9. What is the `next/image` component used for?

It automatically optimizes images: resizing, serving modern formats (WebP/AVIF), lazy loading, and preventing layout shift via required width/height or `fill`, improving Core Web Vitals like LCP and CLS.

### Q10. How do you manage `<head>` tags / metadata in Next.js?

In the Pages Router, the `next/head` component injects tags into `<head>`. In the App Router, you export a `metadata` object or a `generateMetadata()` function from `layout.tsx`/`page.tsx`.

### Q11. What are API routes in Next.js?

Files inside `pages/api/` (or `app/api/*/route.ts` in App Router) let you build backend endpoints inside the same Next.js project, avoiding a separate backend server for simple logic.

### Q12. How do environment variables work in Next.js?

Variables in `.env.local`/`.env.production` are available server-side by default. To expose one to the browser, it must be prefixed with `NEXT_PUBLIC_`, which inlines it into the client bundle at build time.

### Q13. How do you style components in Next.js?

Supported out of the box: global CSS (imported once in the root layout/`_app.js`), CSS Modules (`.module.css` for scoped styles), and Sass. Styled-components/Tailwind/CSS-in-JS libraries are also commonly integrated.

### Q14. Where do static assets like images or fonts go?

Files placed in the `public/` directory are served from the root URL path — e.g. `public/logo.png` is available at `/logo.png`.

### Q15. What is the purpose of `_app.js` (Pages Router)?

It's the top-level component wrapping every page — used for global CSS imports, persistent layouts, and injecting context providers that should apply across all routes.

### Q16. What is the purpose of `_document.js`?

It customizes the base HTML document structure (`<html>`, `<body>` tags) and is only rendered on the server, useful for things like setting `lang`, injecting a CSS-in-JS server style tag, or custom fonts.

### Q17. How do dynamic routes work in Next.js?

A file named `[id].js` (Pages Router) or a folder `[id]/page.tsx` (App Router) captures a URL segment as a parameter, accessible via `router.query.id` or the `params` prop respectively.

### Q18. What are catch-all routes?

`[...slug].js` captures all following path segments into an array (e.g. `/a/b/c` → `slug = ['a','b','c']`). `[[...slug]].js` (double brackets) makes the segment optional, also matching the base route.

### Q19. How do you deploy a Next.js application?

Common options: Vercel (zero-config, built by the Next.js team), Netlify, AWS/GCP/Azure via containers, or self-hosting with `next build && next start`, or exporting a standalone Node server bundle.

### Q20. What do `next dev`, `next build`, and `next start` do?

`next dev` runs the app in development mode with hot reloading; `next build` compiles an optimized production bundle; `next start` runs that production build on a Node server.

### Q21. What is Fast Refresh in Next.js?

It's Next.js's hot-reloading system that preserves React component state while editing code during development, giving near-instant feedback without a full page reload.

### Q22. Does Next.js support TypeScript out of the box?

Yes — adding a `tsconfig.json` file (or creating a `.ts`/`.tsx` file) and running `next dev` auto-installs the required TypeScript dependencies and configures the project.

### Q23. What is Incremental Static Regeneration (ISR) at a beginner level?

By adding `revalidate: N` (seconds) to `getStaticProps`, or the `revalidate` export in the App Router, a static page will be regenerated in the background after N seconds have passed since the last request, keeping content fresh without a full redeploy.

### Q24. How do you create custom 404 and 500 error pages?

In the Pages Router: `pages/404.js` and `pages/500.js`. In the App Router: `app/not-found.tsx` for 404s and `app/error.tsx` (a Client Component) for runtime errors.

### Q25. How do you create shared layouts across pages?

Pages Router: wrap page content in a layout component inside `_app.js` or per-page via a `getLayout` pattern. App Router: nested `layout.tsx` files automatically wrap all routes within their folder segment and persist across navigations.

---

## Intermediate (Q26–Q50)

### Q26. What is a React Server Component (RSC) in the context of Next.js?

It's a component that renders entirely on the server, never ships JS to the client, and can directly access backend resources (databases, file systems) without an API layer. In the App Router, all components are Server Components by default.

### Q27. What does the `"use client"` directive do?

It marks a file (and everything it imports) as a Client Component, meaning it's hydrated and runs in the browser — required for hooks like `useState`/`useEffect` and browser-only APIs/event handlers.

### Q28. How does data fetching differ in the App Router vs Pages Router?

App Router components can `fetch()` data directly inside async Server Components with built-in caching/deduplication — no `getStaticProps`/`getServerSideProps` needed. Data fetching happens where it's used, closer to the UI.

### Q29. What is `loading.js` used for?

It's a special file that automatically wraps a route segment in a React Suspense boundary, showing an instant loading UI while the segment's data is being fetched on the server.

### Q30. What is `error.js` used for?

It defines an error boundary for a route segment. It must be a Client Component and receives `error` and `reset` props, letting you catch rendering errors without crashing the whole app.

### Q31. What are Route Groups in the App Router?

Folders wrapped in parentheses, e.g. `(marketing)/about`, organize routes without affecting the URL path — useful for grouping routes under different layouts or logical sections.

### Q32. What are Parallel Routes?

Using named slots (`@slotName` folders), Parallel Routes let you render multiple independent pages in the same layout simultaneously — e.g. a dashboard with independently-loading `@analytics` and `@team` panels.

### Q33. What are Intercepting Routes?

Using conventions like `(.)`, `(..)`, `(...)`, they let a route "intercept" another route's URL from within the current layout, commonly used for modal patterns (e.g. opening a photo in a modal while still supporting direct navigation to its full page).

### Q34. What is Next.js Middleware?

Middleware (`middleware.ts` at the project root) runs on the Edge Runtime before a request completes, letting you rewrite, redirect, set headers, or gate access (e.g. auth checks) before the page or API route executes.

### Q35. How do you configure redirects and rewrites?

Via the `redirects()` and `rewrites()` async functions exported from `next.config.js`, which define source/destination patterns applied at the routing layer without extra client code.

### Q36. How does Next.js handle code splitting?

Each page is automatically split into its own JS bundle. `next/dynamic` further enables component-level code splitting/lazy-loading, optionally disabling SSR for a component with `{ ssr: false }`.

### Q37. What does `next/font` solve?

It self-hosts Google Fonts (or local fonts) at build time, eliminating extra network requests to Google's CDN, preventing layout shift, and improving privacy/performance versus a standard `<link>` font import.

### Q38. What is `next/script` for and what strategies does it support?

It controls how third-party scripts load: `beforeInteractive`, `afterInteractive` (default), `lazyOnload`, and `worker` (experimental, offloads to a web worker) — preventing render-blocking scripts from hurting performance.

### Q39. How do on-demand ISR (`revalidatePath`/`revalidateTag`) work?

Instead of waiting for a time-based `revalidate` window, you can call `revalidatePath('/blog/post-1')` or `revalidateTag('posts')` inside a Server Action or Route Handler to purge the cache immediately after a content update (e.g. from a CMS webhook).

### Q40. What caching layers exist in the App Router?

Four: the **Request Memoization** cache (dedupes identical fetches per render), the **Data Cache** (persists fetch results across requests/deployments), the **Full Route Cache** (caches rendered HTML/RSC payload at build time), and the **Router Cache** (client-side cache of visited route segments).

### Q41. How does `fetch()` caching work by default in the App Router?

By default, `fetch()` requests are cached indefinitely (`force-cache`) unless you opt out with `{ cache: 'no-store' }` or set `{ next: { revalidate: N } }` for time-based revalidation.

### Q42. What is `generateStaticParams` used for?

It's the App Router equivalent of `getStaticPaths` — an async function exported from a dynamic route segment that returns the list of `params` to pre-render at build time.

### Q43. What is `generateMetadata` and how does it differ from the static `metadata` export?

`generateMetadata` is an async function used when metadata depends on dynamic data (e.g. fetching a blog post's title from an API), while the static `metadata` object is for values known at build time.

### Q44. What are Route Handlers?

Files named `route.ts` inside `app/api/*` that replace Pages Router API routes, exporting HTTP-method functions (`GET`, `POST`, etc.) and running as Server Components-adjacent backend logic with Web Request/Response APIs.

### Q45. How do you read cookies and headers inside a Server Component?

Via the `cookies()` and `headers()` functions imported from `next/headers`, which give read access to the incoming request's cookies/headers inside Server Components and Route Handlers.

### Q46. What are common authentication patterns in Next.js?

Middleware-based route protection combined with session/JWT cookies, or libraries like NextAuth.js/Auth.js that provide OAuth providers, session management, and route handlers pre-wired for the App Router.

### Q47. How does internationalization (i18n) routing work in Next.js?

The Pages Router has built-in `i18n` config in `next.config.js` (locale sub-paths/domains). The App Router doesn't ship built-in i18n routing — it's typically implemented manually with middleware-based locale detection and `[locale]` dynamic segments.

### Q48. Can you use a custom server with Next.js, and should you?

Yes, via a Node.js server (`server.js`) that imports `next()` and handles requests manually — useful for custom routing logic or WebSocket servers, but it disables some optimizations (like Edge deployment) and is discouraged unless strictly necessary.

### Q49. What is the difference between `next/router` and `next/navigation`?

`next/router` (`useRouter`) is for the Pages Router. `next/navigation` (`useRouter`, `usePathname`, `useSearchParams`, `redirect`) is the App Router equivalent, designed to work with Server and Client Components.

### Q50. How do you prefetch data or routes in Next.js?

`<Link>` automatically prefetches linked pages when they enter the viewport (production only). For data, App Router `fetch()` calls are cached/deduped automatically, and you can trigger `router.prefetch()` manually for programmatic navigation.

---

## Advanced (Q51–Q75)

### Q51. Explain the four-layer caching model in the App Router in depth.

1. **Request Memoization** — dedupes identical `fetch()` calls within a single render pass (server-only, cleared per request).
2. **Data Cache** — persists across requests and deployments unless invalidated; backed by an on-disk/external cache.
3. **Full Route Cache** — caches the rendered RSC payload + HTML for statically-rendered routes at build time.
4. **Router Cache (client-side)** — an in-memory client cache of visited/prefetched segments to avoid re-fetching during navigation within a session.
   Understanding which layer is stale is critical when debugging "why isn't my data updating" issues.

### Q52. What is Streaming SSR and how does Next.js implement it?

Streaming sends HTML to the browser in chunks as it becomes ready, rather than waiting for the entire page. Next.js implements this via React Suspense boundaries combined with `loading.js`, allowing slow data-fetching components to "pop in" progressively without blocking the initial paint.

### Q53. How do Suspense boundaries interact with Server Components for data fetching?

Wrapping an async Server Component in `<Suspense fallback={...}>` lets Next.js stream that component's content independently — the rest of the page renders and becomes interactive immediately while the wrapped section streams in once its data resolves.

### Q54. What is the Edge Runtime and how does it differ from the Node.js runtime?

The Edge Runtime is a lightweight V8-based runtime (no full Node.js APIs) that runs geographically close to users on CDN edge nodes, offering lower latency for Middleware and specific routes, at the cost of restricted APIs (no native Node modules like `fs`).

### Q55. What are the limitations of Next.js Middleware?

It runs on the Edge Runtime, so it can't use Node.js-specific APIs (e.g. direct database drivers relying on `net`/`fs`), has a smaller execution size limit, and runs on every matched request — so heavy logic there adds latency to all requests.

### Q56. What is Partial Prerendering (PPR)?

An experimental Next.js feature that combines static and dynamic rendering in a single route: the static "shell" is served instantly from the prerendered cache while dynamic, personalized holes stream in via Suspense — merging the speed of SSG with the freshness of SSR.

### Q57. What are Server Actions and how do they differ from API routes?

Server Actions are async functions marked `"use server"` that can be called directly from Client or Server Components (including as a form's `action`), letting you mutate data without manually building a Route Handler/API endpoint — Next.js handles the network call under the hood.

### Q58. How do you handle form submissions with Server Actions, including progressive enhancement?

Passing a Server Action directly to a `<form action={action}>` works even before JavaScript hydrates (native HTML form POST semantics), then upgrades to a fetch-based submission once JS loads — giving resilience on slow networks alongside the `useFormStatus`/`useFormState` hooks for pending/error states.

### Q59. How do you implement optimistic UI updates in the App Router?

The `useOptimistic` hook lets you render an assumed "next state" immediately upon a Server Action call, then reconciles with the real result once the action resolves — commonly used for likes, comments, or todo toggles.

### Q60. How do you analyze and reduce Next.js bundle size?

Using `@next/bundle-analyzer` to visualize chunk composition, then addressing bloat via dynamic imports for heavy client components, tree-shaking unused library exports, replacing large dependencies with lighter alternatives, and ensuring server-only code isn't leaking into client bundles.

### Q61. How does `next/image` optimization work internally?

On request, Next.js's image optimizer (or a configured loader/CDN) resizes and re-encodes the source image to the requested size/format, caches the result, and serves it with proper `srcset`/`sizes` for responsive delivery — avoiding shipping unnecessarily large images to small viewports.

### Q62. How does `next/font` avoid layout shift and external requests?

At build time, it downloads the font files and self-hosts them, generating `@font-face` declarations with calculated fallback font metrics (`size-adjust`) so the fallback font's box size closely matches the real font, minimizing CLS during the swap.

### Q63. How do you set up a Next.js app inside a monorepo (Turborepo/Nx)?

Structure the app as a workspace package, hoist shared config (ESLint, TS, UI packages) into shared packages, use `transpilePackages` in `next.config.js` for internal packages that ship untranspiled TS/JSX, and let Turborepo/Nx cache builds per-package for faster CI.

### Q64. What is Turbopack and how does it relate to Webpack in Next.js?

Turbopack is Rust-based bundler built by Vercel, designed as a faster successor to Webpack for both dev (`next dev --turbo`) and increasingly build, offering incremental compilation and faster cold starts; Webpack remains the default/stable option for complex custom configs not yet supported by Turbopack.

### Q65. When and how would you customize the Webpack config in Next.js?

Via the `webpack` function in `next.config.js`, used for cases like adding loaders for non-standard file types, aliasing modules, or integrating tools not natively supported — done cautiously since it can conflict with Next.js's internal Webpack setup across versions.

### Q66. What is `output: 'standalone'` and when would you use it?

It produces a minimal, self-contained build (only necessary `node_modules` traced via dependency analysis) ideal for Docker/container deployments, drastically reducing image size compared to shipping the full `node_modules`.

### Q67. What does self-hosting a Next.js app require versus using Vercel?

Self-hosting requires manually handling image optimization (or disabling/configuring a custom loader), ISR cache storage/invalidation across multiple server instances, CDN/edge caching configuration, and process management — features Vercel provides natively.

### Q68. How do you configure security headers in Next.js?

Via the `headers()` function in `next.config.js` (e.g. `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`) or dynamically per-request in Middleware, applied consistently across matched routes.

### Q69. How do you implement a strict Content Security Policy (CSP) with Next.js?

Generate a per-request nonce in Middleware, pass it via headers to be read in the root layout, apply it to the `<script>` tags Next.js injects (via the `nonce` prop supported by `next/script` and framework-injected scripts), and set the CSP header disallowing `unsafe-inline` except for the nonce.

### Q70. How do you monitor Core Web Vitals in a Next.js app?

Using the built-in `useReportWebVitals` hook (or the `reportWebVitals` export in the Pages Router) to capture LCP, FID/INP, CLS, TTFB metrics and forward them to an analytics endpoint, combined with Vercel Analytics/Speed Insights or third-party RUM tools.

### Q71. What causes hydration errors and how do you debug them?

They occur when server-rendered HTML doesn't match what React renders on the client — common causes: using `Date.now()`/`Math.random()` in render, browser-only APIs (`window`) accessed during SSR, invalid HTML nesting, or conditional rendering based on `typeof window`. Debug by reading the mismatch diff in the console and isolating the non-deterministic value, wrapping it in `useEffect` or `suppressHydrationWarning` where appropriate.

### Q72. How does React Server Component architecture affect client bundle size?

Because Server Components never ship their code or dependencies to the client, moving data-fetching and non-interactive logic into Server Components (keeping only truly interactive leaves as Client Components) meaningfully shrinks the JS shipped to the browser.

### Q73. What are common causes of memory leaks in a self-hosted Next.js server?

Long-lived database connections opened per-request without pooling/reuse, uncleared timers/intervals in server code, unbounded in-memory caches, and Route Handlers holding references to large payloads across requests without cleanup.

### Q74. How do you handle large-scale image galleries or lists performantly in Next.js?

Combine `next/image` with lazy loading (default for offscreen images), virtualization libraries (e.g. `react-virtual`/`react-window`) for very long lists, and pagination/infinite scroll backed by cursor-based data fetching rather than loading everything upfront.

### Q75. How do you profile a slow Next.js production build?

Use `next build --profile` alongside the bundle analyzer to find heavy modules, check for accidentally-bundled large dependencies in Server Components (since they don't need client-side tree-shaking concerns but still affect build/trace time), and review `generateStaticParams` output size if you're statically generating an excessive number of pages.

---

## Enterprise / Problem-Solving / Debugging (Q76–Q100)

### Q76. You see "Text content does not match server-rendered HTML" — how do you approach it?

Read the exact diff logged in the console to identify the mismatched element/text. Check for: non-deterministic values (timestamps, random IDs) rendered directly, `window`/`localStorage` reads outside `useEffect`, browser extensions injecting DOM (rare, but a known false-positive), or environment-dependent formatting (locale/timezone) differing between server and client.

### Q77. A page works in dev but fails to build with "Module not found" — what's your process?

Confirm the import path casing matches exactly (case-sensitive on Linux CI vs case-insensitive locally on macOS/Windows), verify the package is in `dependencies` not just `devDependencies` if needed at runtime, check for Node-only modules imported into a Client Component, and ensure `transpilePackages` includes any untranspiled monorepo packages.

### Q78. Your ISR page shows stale data in production despite setting `revalidate: 60` — how do you debug it?

Verify the cache is actually being hit (check response headers like `x-vercel-cache` if on Vercel), confirm you're not accidentally using `cache: 'no-store'` elsewhere in the request chain overriding the intended caching, check if a CDN/reverse-proxy in front of Next.js has its own longer TTL, and confirm the revalidation window has actually elapsed since the last request triggered a regeneration.

### Q79. How do you avoid race conditions when using on-demand revalidation (`revalidateTag`) triggered by CMS webhooks?

Ensure webhook handlers are idempotent, debounce/queue rapid successive webhook calls for the same content (e.g. via a short-lived lock or a queue like a serverless-friendly rate limiter), and validate webhook payload signatures to prevent unauthorized cache-purge triggers.

### Q80. How would you architect multiple Next.js apps sharing a design system in an enterprise monorepo?

Extract shared UI components, hooks, and TypeScript types into internal packages consumed via workspace protocol (`workspace:*`), configure `transpilePackages` for each consuming app, centralize lint/format/tsconfig via a shared base config package, and use Turborepo/Nx pipeline caching to avoid rebuilding unaffected apps in CI.

### Q81. How do you implement micro-frontends with Next.js?

Common approaches: Module Federation (via a community Next.js plugin) to load remote apps at runtime, or a simpler "multi-zone" setup using `rewrites()` in `next.config.js` to route different path prefixes to independently-deployed Next.js apps behind a single domain.

### Q82. How do you scale Next.js API routes / Route Handlers under high traffic?

Move heavy compute or long-running jobs off the request path into background workers/queues, apply rate limiting at the edge (Middleware or an API gateway), cache expensive read responses (Data Cache or an external cache like Redis), and ensure serverless function concurrency limits/cold-start behavior are accounted for in capacity planning.

### Q83. How do you implement rate limiting in a Next.js app?

Typically via Middleware checking a request identifier (IP, API key, session) against a token-bucket/sliding-window counter backed by an external store like Redis (Upstash is common on Edge), returning a 429 response with `Retry-After` headers when limits are exceeded.

### Q84. How do you manage secrets/env variables safely across multiple environments (dev/staging/prod)?

Never commit `.env` files with real secrets; use the hosting platform's environment variable management (scoped per environment), keep `NEXT_PUBLIC_` variables minimal since they're inlined into the client bundle at build time, and rotate/validate required variables at build/startup (e.g. with a schema validator) to fail fast on misconfiguration.

### Q85. How would you implement multi-tenant routing in Next.js (e.g. subdomain-per-customer)?

Use Middleware to inspect the `host` header, rewrite the request to a tenant-aware internal path (e.g. `/tenants/[tenant]/...`), and resolve tenant-specific config/theming/data at the layout level — while being careful that cached routes/Data Cache entries are properly scoped per tenant to avoid cross-tenant data leakage.

### Q86. How do you implement feature flags / A-B testing in Next.js?

Combine Middleware (to assign and persist a variant via cookie for consistent experience) with either a feature-flag service SDK (LaunchDarkly, Split, etc.) or a simple config-driven approach, ensuring the flag evaluation is deterministic across SSR and client hydration to avoid mismatches.

### Q87. What does a robust CI/CD pipeline for a Next.js enterprise app typically include?

Type-checking (`tsc --noEmit`), linting, unit tests, a production build step to catch build-time errors early, bundle-size regression checks, preview deployments per PR, and smoke/e2e tests (Playwright/Cypress) against the preview URL before promoting to production.

### Q88. What testing strategy would you use for a Next.js application?

Unit tests for utility functions/hooks (Jest/Vitest), component tests with React Testing Library (mindful of Server vs Client Component boundaries — Server Components generally need integration-level testing), API/Route Handler tests hitting the handler function directly or via a running server, and end-to-end tests (Playwright) covering critical user flows across real routing/rendering.

### Q89. How do error boundaries differ between Pages Router and App Router, and how do you design a global error strategy?

Pages Router relies on a custom `_error.js`/`pages/500.js` and manual `componentDidCatch` boundaries. App Router provides granular per-segment `error.tsx` boundaries plus a root `global-error.tsx` for catching errors in the root layout itself — an enterprise strategy typically nests boundaries so a failure in one section (e.g. a sidebar widget) doesn't take down the whole page.

### Q90. How do you set up logging/observability for a production Next.js app?

Instrument Route Handlers/Server Actions with structured logging (request ID correlation), integrate an APM tool (Sentry, Datadog, New Relic) for both server and client error tracking, capture Web Vitals via `useReportWebVitals`, and ensure Edge/Node runtime logs are aggregated centrally since they may originate from different execution environments.

### Q91. How do you manage database connections efficiently in a serverless Next.js deployment?

Use a connection-pooling proxy (e.g. PgBouncer, Prisma Accelerate, Neon/PlanetScale's built-in pooling) since serverless functions can spin up many concurrent instances, each opening its own connection — without pooling this quickly exhausts the database's max connection limit.

### Q92. How do you mitigate cold-start latency in serverless Next.js functions?

Keep function bundle size small (avoid heavy imports in the request path), use Edge Runtime for latency-sensitive lightweight logic where Node APIs aren't needed, consider provisioned/always-warm concurrency on your hosting platform for critical routes, and lazy-load rarely-used heavy dependencies.

### Q93. How do you handle large data payloads (e.g. exporting thousands of rows) without blocking the server?

Stream the response instead of buffering it fully in memory (Route Handlers support the Web `ReadableStream` API), paginate/cursor the underlying query, and offload very large or long-running exports to a background job with a polling/webhook completion pattern rather than a single synchronous request.

### Q94. What enterprise-level SEO considerations apply specifically to Next.js?

Ensuring critical content is server-rendered (not client-fetched) for crawlability, generating dynamic sitemaps/robots.txt via Route Handlers or the `sitemap.ts`/`robots.ts` file conventions, correctly setting canonical URLs via `generateMetadata` for paginated/duplicate content, and validating that Middleware-based redirects use proper 301/308 status codes.

### Q95. How do you ensure accessibility (a11y) compliance across a large Next.js codebase?

Enforce `eslint-plugin-jsx-a11y` in CI, ensure `next/image` alt text is required/reviewed, verify focus management after client-side route transitions (since SPA navigation doesn't reset focus like a full page load), and run automated audits (axe-core) in e2e tests alongside manual screen-reader testing for key flows.

### Q96. How would you plan and execute a migration from Pages Router to App Router in a large production app?

Migrate incrementally since both routers can coexist in the same project — start with layouts/leaf routes that have few dependencies, convert `getServerSideProps`/`getStaticProps` data fetching to async Server Components, replace `next/router` usage with `next/navigation`, and thoroughly regression-test caching behavior since the default caching semantics differ significantly between the two routers.

### Q97. Production users report intermittent 504 timeouts on a specific route — how do you triage it?

Check whether the route is doing a slow synchronous data fetch (e.g. an unindexed DB query or a slow third-party API) without a timeout/fallback, review serverless function timeout limits against actual execution time via APM traces, check for N+1 query patterns in the data-fetching logic, and consider adding caching or moving the slow operation off the critical request path.

### Q98. Your app's Vercel/production build succeeds but the deployed app throws "ReferenceError: window is not defined" — why, and how do you fix it?

This happens when server-only rendered code (a Server Component, or code executed during static generation) references a browser-only global. Fix by moving the browser-dependent code into a Client Component, guarding with `typeof window !== 'undefined'`, or deferring the access into a `useEffect` that only runs client-side.

### Q99. How do you debug a discrepancy where a page is statically generated (cached) when you expected it to be dynamic per-request?

Check for any accidental static-forcing factors: no `cookies()`/`headers()`/`searchParams` usage (which would opt a route into dynamic rendering), default `fetch()` caching not being overridden with `cache: 'no-store'`, or a missing `export const dynamic = 'force-dynamic'` where truly per-request behavior is required.

### Q100. As a tech lead, how do you decide whether a component should be a Server Component or a Client Component in a large team codebase?

Default to Server Components for anything that only reads/displays data, keeping the interactive "leaves" (forms, buttons with handlers, components using state/effects/browser APIs) as Client Components — pushing `"use client"` boundaries as far down the tree as possible minimizes shipped JS. Document this convention in a team guide/lint rule so contributors don't default to marking whole trees `"use client"` out of habit, which silently erodes the performance benefits of the App Router.

---

_Document generated for interview preparation — covers Next.js (App Router + Pages Router) from beginner fundamentals through enterprise-scale architecture and production debugging._
