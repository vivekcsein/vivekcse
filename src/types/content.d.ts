import type { IconName } from "@/components/ui";
import type { TopicColor } from "@/packages/configs/content.config";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Doc = {
  /** `<collection>[/<category>]/<slug>` */
  id: string;
  collection: string;
  /** "" when the file sits directly in the collection folder (no category). */
  category: string;
  slug: string;
  href: string;
  title: string;
  description: string;
  /** ISO 8601 */
  createdAt: string;
  updatedAt: string;
  readingMinutes: number;
  keywords: string[];
  featured: boolean;
  order?: number;
  /** Optional cover image path (front-matter `image`). */
  image?: string;
  /** Higher = shown earlier in "Popular" (front-matter `popularity`). */
  popularity: number;
  wordCount: number;
  headings: TocItem[];
  /** Markdown body (first `# Heading` already removed when used as the title). */
  content: string;
};

/** Safe to pass to client components — no markdown body. */
export type DocSummary = Omit<Doc, "content">;

export type Category = {
  collection: string;
  /** "" is the synthetic category holding files with no category folder. */
  key: string;
  title: string;
  description: string;
  icon: IconName;
  color: TopicColor;
  docs: Doc[];
};

/** A top-level section of the site: /docs, /tutorials, /resources … */
export type Collection = {
  key: string;
  title: string;
  description: string;
  icon: IconName;
  /** Show in the header/footer navigation. */
  nav: boolean;
  categories: Category[];
};

export type CategorySummary = Omit<Category, "docs"> & { count: number };

export type CollectionSummary = Omit<Collection, "categories"> & {
  count: number;
  categoryCount: number;
};

export type SearchEntry = {
  id: string;
  href: string;
  title: string;
  description: string;
  collectionTitle: string;
  categoryTitle: string;
  keywords: string[];
  headings: TocItem[];
};

export type CategoryInfo = { title: string; color: TopicColor };

export type KnowledgeStats = {
  articles: number;
  topics: number;
  words: number;
  /** ISO 8601 of the most recently updated doc */
  lastUpdated?: string;
};

/** Everything the left sidebar needs (computed once on the server). */
export type SidebarTopic = {
  id: string;
  title: string;
  href: string;
  color: TopicColor;
  count: number;
  docs: { id: string; title: string; href: string }[];
};

export type SidebarData = {
  total: number;
  topics: SidebarTopic[];
  collections: { key: string; title: string; href: string; icon: IconName }[];
};

/** Client-safe row for article listings (filters, sorting, pagination). */
export type ArticleListItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  readingMinutes: number;
  updatedAt: string;
  popularity: number;
  topicId: string;
  topicTitle: string;
  color: TopicColor;
  collectionKey: string;
};

export type ArticleList = {
  items: ArticleListItem[];
  topics: { id: string; title: string; count: number }[];
  collections: { key: string; title: string; count: number }[];
};
