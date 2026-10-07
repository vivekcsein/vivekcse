import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { z } from "zod";
import {
  categoryConfig,
  collectionConfig,
  docDefaults,
  fallbackCategory,
  fallbackCollection,
  fallbackTopicColors,
  reservedCollections,
} from "@/packages/configs/content.config";
import { reservedRoutes } from "@/packages/configs/shell.config";
import type {
  ArticleList,
  Category,
  CategoryInfo,
  CategorySummary,
  Collection,
  CollectionSummary,
  Doc,
  DocSummary,
  KnowledgeStats,
  SearchEntry,
  SidebarData,
} from "../../types/content";
import {
  buildExcerpt,
  extractHeadings,
  extractLeadingHeading,
  humanize,
  readingMinutes,
} from "./parse";

/**
 * Filesystem-driven content — the folder depth decides the route:
 *
 *   src/content/<collection>/<slug>.md              →  /<collection>/<slug>
 *   src/content/<collection>/<category>/<slug>.md   →  /<collection>/<category>/<slug>
 *
 * Drop a .md file in a folder and it is published. A new top-level folder is
 * a new collection (e.g. /docs, /tutorials, /resources); a file placed
 * directly inside a collection folder is published with no category, one
 * placed inside a sub-folder gets that folder as its category. Files/folders
 * starting with `_` or `.` are ignored; `draft: true` hides a doc in
 * production builds.
 */
const CONTENT_ROOT = path.join(process.cwd(), "src/content");
const SAFE_NAME = /^[a-z0-9][a-z0-9-]*$/;

const keywordsSchema = z
  .union([z.array(z.coerce.string()), z.string()])
  .transform((value) =>
    (Array.isArray(value) ? value : value.split(","))
      .map((keyword) => keyword.trim())
      .filter(Boolean),
  );

const frontmatterSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  keywords: keywordsSchema.optional(),
  order: z.number().optional(),
  featured: z.boolean().optional(),
  draft: z.boolean().optional(),
  image: z.string().optional(),
  popularity: z.number().optional(),
});

const assertSafeName = (name: string, file: string) => {
  if (!SAFE_NAME.test(name)) {
    throw new Error(
      `Invalid name "${name}" (${file}). Use lowercase kebab-case, e.g. "my-new-guide.md".`,
    );
  }
};

const byNewest = (a: Doc, b: Doc) => b.updatedAt.localeCompare(a.updatedAt);

const byOrderThenNewest = (a: Doc, b: Doc) => {
  if (a.order !== undefined && b.order !== undefined && a.order !== b.order) {
    return a.order - b.order;
  }
  if (a.order !== undefined && b.order === undefined) return -1;
  if (a.order === undefined && b.order !== undefined) return 1;
  return byNewest(a, b);
};

const listDirs = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith("_") &&
        !entry.name.startsWith("."),
    )
    .map((entry) => entry.name);

const readDoc = (
  collection: string,
  /** "" when the file has no category (sits directly in the collection). */
  category: string,
  fileName: string,
): Doc | null => {
  const slug = fileName.replace(/\.md$/, "");
  const file = category
    ? path.join(CONTENT_ROOT, collection, category, fileName)
    : path.join(CONTENT_ROOT, collection, fileName);
  assertSafeName(slug, file);

  const parsed = matter(fs.readFileSync(file, "utf-8"));
  const result = frontmatterSchema.safeParse(parsed.data);

  if (!result.success) {
    throw new Error(
      `Invalid front-matter in ${collection}/${category}/${fileName}:\n${z.prettifyError(result.error)}`,
    );
  }

  const meta = result.data;
  const label = [collection, category, slug].filter(Boolean).join("/");
  if (meta.draft) {
    if (process.env.NODE_ENV === "production") return null;
    console.warn(`"${label}" is marked as draft.`);
  }

  const id = [collection, category, slug].filter(Boolean).join("/");
  const defaults = docDefaults[id];
  const { title: headingTitle, body } = extractLeadingHeading(parsed.content);

  // Title: first "# Heading" in the file → front-matter → config default → filename
  const title = headingTitle ?? meta.title ?? defaults?.title ?? humanize(slug);

  // Description: front-matter → first paragraph → config default → category text
  const description =
    meta.description ??
    (buildExcerpt(body) ||
      defaults?.description ||
      categoryConfig[`${collection}/${category}`]?.description ||
      fallbackCategory.description);

  const modified = fs.statSync(file).mtime;
  const createdAt = (meta.date ?? meta.updated ?? modified).toISOString();
  const updatedAt = (meta.updated ?? meta.date ?? modified).toISOString();

  return {
    id,
    collection,
    category,
    slug,
    href: `/${[collection, category, slug].filter(Boolean).join("/")}`,
    title,
    description,
    createdAt,
    updatedAt,
    readingMinutes: readingMinutes(body),
    keywords: meta.keywords ?? [],
    featured: meta.featured ?? false,
    order: meta.order,
    image: meta.image,
    popularity: meta.popularity ?? 0,
    wordCount: body.match(/\S+/g)?.length ?? 0,
    headings: extractHeadings(body),
    content: body,
  };
};

/** key === "" reads the .md files sitting directly in the collection folder. */
const readCategory = (collection: string, key: string): Category => {
  const dir = path.join(CONTENT_ROOT, collection, key);
  if (key) assertSafeName(key, dir);
  const meta = key ? categoryConfig[`${collection}/${key}`] : undefined;

  const docs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".md") &&
        !entry.name.startsWith("_"),
    )
    .map((entry) => readDoc(collection, key, entry.name))
    .filter((doc): doc is Doc => doc !== null)
    .sort(byOrderThenNewest);

  return {
    collection,
    key,
    title: key ? (meta?.title ?? humanize(key)) : "General",
    description: meta?.description ?? fallbackCategory.description,
    icon: meta?.icon ?? fallbackCategory.icon,
    color: meta?.color ?? "violet",
    docs,
  };
};

const collectionNav = (key: string) => collectionConfig[key]?.nav ?? true;

export const getCollections = cache((): Collection[] => {
  if (!fs.existsSync(CONTENT_ROOT)) return [];

  return listDirs(CONTENT_ROOT)
    .map((key) => {
      assertSafeName(key, path.join(CONTENT_ROOT, key));
      if (reservedCollections.has(key) || reservedRoutes.includes(key)) {
        throw new Error(
          `"${key}" is reserved and can't be a content folder (src/content/${key}).`,
        );
      }
      const meta = collectionConfig[key];

      return {
        key,
        title: meta?.title ?? humanize(key),
        description: meta?.description ?? fallbackCollection.description,
        icon: meta?.icon ?? fallbackCollection.icon,
        nav: collectionNav(key),
        categories: [
          // .md files directly in the collection folder → synthetic "" category
          readCategory(key, ""),
          ...listDirs(path.join(CONTENT_ROOT, key)).map((category) =>
            readCategory(key, category),
          ),
        ]
          .filter((category) => category.docs.length > 0)
          .sort((a, b) => {
            const orderA = categoryConfig[`${key}/${a.key}`]?.order ?? 50;
            const orderB = categoryConfig[`${key}/${b.key}`]?.order ?? 50;
            return orderA - orderB || a.title.localeCompare(b.title);
          }),
      } satisfies Collection;
    })
    .filter((collection) => collection.categories.length > 0)
    .sort((a, b) => {
      const orderA = collectionConfig[a.key]?.order ?? 50;
      const orderB = collectionConfig[b.key]?.order ?? 50;
      return orderA - orderB || a.title.localeCompare(b.title);
    })
    .map((collection, _i, all) => {
      // Rotate the palette across categories that don't set their own colour.
      let cursor = 0;
      for (const previous of all) {
        for (const category of previous.categories) {
          if (categoryConfig[`${previous.key}/${category.key}`]?.color)
            continue;
          if (previous === collection) {
            category.color =
              fallbackTopicColors[cursor % fallbackTopicColors.length];
          }
          cursor += 1;
        }
        if (previous === collection) break;
      }
      return collection;
    });
});

export const getCollection = (key: string): Collection | undefined =>
  getCollections().find((collection) => collection.key === key);

export const getCategory = (
  collectionKey: string,
  key: string,
): Category | undefined =>
  getCollection(collectionKey)?.categories.find(
    (category) => category.key === key,
  );

export const getCollectionDocs = (collectionKey: string): Doc[] =>
  (getCollection(collectionKey)?.categories ?? [])
    .flatMap((category) => category.docs)
    .sort(byNewest);

/** Every published doc across all collections, newest first. */
export const getAllDocs = cache((): Doc[] =>
  getCollections()
    .flatMap((collection) =>
      collection.categories.flatMap((category) => category.docs),
    )
    .sort(byNewest),
);

export const getDoc = (
  collection: string,
  category: string,
  slug: string,
): Doc | undefined =>
  getCategory(collection, category)?.docs.find((doc) => doc.slug === slug);

/** Resolves a catch-all `[...slug]` under a collection to a doc, if any. */
export const resolveDoc = (
  collection: string,
  slugParts: string[],
): Doc | undefined => {
  if (slugParts.length === 1) return getDoc(collection, "", slugParts[0]);
  if (slugParts.length === 2)
    return getDoc(collection, slugParts[0], slugParts[1]);
  return undefined;
};

export const toSummary = ({ content: _content, ...summary }: Doc): DocSummary =>
  summary;

export const getCollectionSummaries = (): CollectionSummary[] =>
  getCollections().map(({ categories, ...collection }) => ({
    ...collection,
    categoryCount: categories.length,
    count: categories.reduce((sum, category) => sum + category.docs.length, 0),
  }));

export const getCategorySummaries = (
  collectionKey: string,
): CategorySummary[] =>
  (getCollection(collectionKey)?.categories ?? []).map(
    ({ docs, ...category }) => ({ ...category, count: docs.length }),
  );

/** `<collection>/<category>` → category title, for labelling cards. */
export const getCategoryTitles = (): Record<string, string> =>
  Object.fromEntries(
    getCollections().flatMap((collection) =>
      collection.categories.map((category) => [
        `${collection.key}/${category.key}`,
        category.title,
      ]),
    ),
  );

/** Real (non-synthetic) categories only — i.e. actual folders, for routing. */
export const getRealCategories = (collectionKey: string): Category[] =>
  (getCollection(collectionKey)?.categories ?? []).filter(
    (category) => category.key !== "",
  );

export const getLatestDocs = (limit: number): DocSummary[] =>
  getAllDocs().slice(0, limit).map(toSummary);

export const getFeaturedDocs = (limit: number): DocSummary[] =>
  getAllDocs()
    .filter((doc) => doc.featured)
    .slice(0, limit)
    .map(toSummary);

export const getAdjacentDocs = (doc: Doc) => {
  const siblings = getCategory(doc.collection, doc.category)?.docs ?? [];
  const index = siblings.findIndex((item) => item.id === doc.id);

  return {
    previous: index > 0 ? toSummary(siblings[index - 1]) : undefined,
    next:
      index >= 0 && index < siblings.length - 1
        ? toSummary(siblings[index + 1])
        : undefined,
  };
};

/** Same category, then same collection, ranked by shared keywords, then newest. */
export const getRelatedDocs = (doc: Doc, limit = 3): DocSummary[] => {
  const keywords = new Set(
    doc.keywords.map((keyword) => keyword.toLowerCase()),
  );

  return getAllDocs()
    .filter((other) => other.id !== doc.id)
    .map((other) => ({
      other,
      score:
        (other.collection === doc.collection ? 1 : 0) +
        (other.category === doc.category && other.collection === doc.collection
          ? 2
          : 0) +
        other.keywords.filter((keyword) => keywords.has(keyword.toLowerCase()))
          .length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || byNewest(a.other, b.other))
    .slice(0, limit)
    .map(({ other }) => toSummary(other));
};

export const getSearchIndex = cache((): SearchEntry[] => {
  const collections = new Map(getCollections().map((c) => [c.key, c.title]));
  const categories = getCategoryTitles();

  return getAllDocs().map((doc) => ({
    id: doc.id,
    href: doc.href,
    title: doc.title,
    description: doc.description,
    collectionTitle: collections.get(doc.collection) ?? doc.collection,
    categoryTitle:
      categories[`${doc.collection}/${doc.category}`] ?? doc.category,
    keywords: doc.keywords,
    headings: doc.headings,
  }));
});

/** `<collection>/<category>` → title + colour, for labelling cards. */
export const getCategoryMap = (): Record<string, CategoryInfo> =>
  Object.fromEntries(
    getCollections().flatMap((collection) =>
      collection.categories.map((category) => [
        `${collection.key}/${category.key}`,
        { title: category.title, color: category.color },
      ]),
    ),
  );

/** Ranked by front-matter `popularity`, then featured, then newest. */
export const getPopularDocs = (limit: number): DocSummary[] =>
  [...getAllDocs()]
    .sort(
      (a, b) =>
        b.popularity - a.popularity ||
        Number(b.featured) - Number(a.featured) ||
        byNewest(a, b),
    )
    .slice(0, limit)
    .map(toSummary);

export const getKnowledgeStats = (): KnowledgeStats => {
  const docs = getAllDocs();

  return {
    articles: docs.length,
    topics: getCollections().reduce(
      (sum, collection) => sum + collection.categories.length,
      0,
    ),
    words: docs.reduce((sum, doc) => sum + doc.wordCount, 0),
    lastUpdated: docs[0]?.updatedAt,
  };
};

export const getSidebarData = cache(
  (): SidebarData => ({
    total: getAllDocs().length,
    // The synthetic "" category (loose files) isn't a real topic to filter by.
    topics: getCollections().flatMap((collection) =>
      collection.categories
        .filter((category) => category.key !== "")
        .map((category) => ({
          id: `${collection.key}/${category.key}`,
          title: category.title,
          href: `/${collection.key}/${category.key}`,
          color: category.color,
          count: category.docs.length,
          docs: category.docs.map(({ id, title, href }) => ({
            id,
            title,
            href,
          })),
        })),
    ),
    collections: getCollections().map(({ key, title, icon }) => ({
      key,
      title,
      href: `/${key}`,
      icon,
    })),
  }),
);

/** Listing data for /articles, a collection page or a category page. */
export const getArticleList = (scope?: {
  collection?: string;
  category?: string;
}): ArticleList => {
  const categories = getCollections().flatMap((collection) =>
    collection.categories
      .filter(
        (category) =>
          (!scope?.collection || collection.key === scope.collection) &&
          (!scope?.category || category.key === scope.category),
      )
      .map((category) => ({ collection, category })),
  );

  const items = categories.flatMap(({ collection, category }) =>
    category.docs.map((doc) => ({
      id: doc.id,
      href: doc.href,
      title: doc.title,
      description: doc.description,
      readingMinutes: doc.readingMinutes,
      updatedAt: doc.updatedAt,
      popularity: doc.popularity,
      topicId: `${collection.key}/${category.key}`,
      topicTitle: category.title,
      color: category.color,
      collectionKey: collection.key,
    })),
  );

  return {
    items,
    topics: categories
      .filter(({ category }) => category.key !== "")
      .map(({ collection, category }) => ({
        id: `${collection.key}/${category.key}`,
        title: category.title,
        count: category.docs.length,
      })),
    collections: getCollections()
      .filter(
        (collection) =>
          !scope?.collection || collection.key === scope.collection,
      )
      .map((collection) => ({
        key: collection.key,
        title: collection.title,
        count: collection.categories.reduce((sum, c) => sum + c.docs.length, 0),
      })),
  };
};
