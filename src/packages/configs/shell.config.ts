/** Routing + app-shell settings that aren't content or branding. */
export const shellConfig = Object.freeze({
  /** Knowledge-base home (hero, featured, latest). Also served at "/". */
  homeHref: "/content",
  /** Site-wide filterable + paginated listing of every article. */
  aggregateHref: "/content/all",
  bookmarksHref: "/bookmarks",
  /** Articles per page on listing pages. */
  pageSize: 9,
  sidebar: {
    title: "Knowledge",
    subtitle: "Learn · Build · Grow",
    quote: "A better developer every single day.",
  },
});

/**
 * Top-level URL segments that content folders may not use — these are fixed
 * app routes, not collections. Real collections (/docs, /tutorials,
 * /resources, /articles, …) are free to use any other name.
 */
export const reservedRoutes: readonly string[] = ["content", "bookmarks"];
