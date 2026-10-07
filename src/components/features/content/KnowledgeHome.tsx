import { AdSlot } from "@/components/features/ads-sense/AdSlot";
import {
  type ContinueItem,
  ContinueReading,
} from "@/components/features/content/ContinueReading";
import {
  type FeedItem,
  HomeFeed,
} from "@/components/features/content/HomeFeed";
import { PopularList } from "@/components/features/content/PopularList";
import { QuoteCard } from "@/components/features/content/QuoteCard";
import { SectionHeading } from "@/components/features/content/SectionHeading";
import { FeaturedArticle } from "@/components/features/docs/article/FeaturedArticle";
import { CategoryCard } from "@/components/features/docs/CategoryCard";
import { DocsHero } from "@/components/features/docs/hero/DocsHero";
import { Icon } from "@/components/ui";
import appConfig from "@/packages/configs/app.config";
import { shellConfig } from "@/packages/configs/shell.config";
import {
  getAllDocs,
  getCollections,
  getKnowledgeStats,
  getPopularDocs,
  toSummary,
} from "@/packages/utils/loader";

export const KnowledgeHome = () => {
  const collections = getCollections();
  const docs = getAllDocs();
  const stats = getKnowledgeStats();

  const topics = collections.flatMap((collection) =>
    collection.categories.map((category) => ({
      id: `${collection.key}/${category.key}`,
      title: category.title,
      href: `/${collection.key}/${category.key}`,
      icon: category.icon,
      color: category.color,
      count: category.docs.length,
    })),
  );
  const topicById = new Map(topics.map((topic) => [topic.id, topic]));
  const viewAllHref = shellConfig.aggregateHref;

  const topicOf = (doc: { collection: string; category: string }) =>
    topicById.get(`${doc.collection}/${doc.category}`);

  const featured = docs.find((doc) => doc.featured) ?? docs[0];
  const featuredTopic = featured ? topicOf(featured) : undefined;

  const feed: FeedItem[] = docs.slice(0, 12).flatMap((doc) => {
    const topic = topicOf(doc);
    return topic
      ? [
          {
            id: doc.id,
            href: doc.href,
            title: doc.title,
            description: doc.description,
            readingMinutes: doc.readingMinutes,
            updatedAt: doc.updatedAt,
            topicId: topic.id,
            topicTitle: topic.title,
            color: topic.color,
          },
        ]
      : [];
  });

  const continueItems: ContinueItem[] = docs.slice(0, 40).flatMap((doc) => {
    const topic = topicOf(doc);
    return topic
      ? [
          {
            id: doc.id,
            href: doc.href,
            title: doc.title,
            minutes: doc.readingMinutes,
            topicTitle: topic.title,
            color: topic.color,
            icon: topic.icon,
          },
        ]
      : [];
  });

  return (
    <div className="container-page pb-16">
      <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_19.0625rem] xl:gap-x-12">
        <div className="min-w-0">
          <DocsHero stats={stats} />

          <HomeFeed
            items={feed}
            topics={topics.map(({ id, title, count }) => ({
              id,
              title,
              count,
            }))}
            total={docs.length}
            viewAllHref={viewAllHref}
          >
            {featured && featuredTopic && (
              <section aria-labelledby="featured-heading" id="featured">
                <SectionHeading
                  icon={
                    <Icon
                      className="fill-topic-amber text-topic-amber"
                      name="star"
                      size={18}
                    />
                  }
                  id="featured-heading"
                  title="Featured Article"
                />
                <FeaturedArticle
                  category={featuredTopic}
                  doc={toSummary(featured)}
                />
              </section>
            )}

            <section aria-labelledby="topics-heading" id="topics">
              <SectionHeading
                action={{ label: "View all topics", href: viewAllHref }}
                icon={
                  <Icon className="text-primary" name="layout-grid" size={18} />
                }
                id="topics-heading"
                title="Browse by Topic"
              />
              <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                {topics.map((topic) => (
                  <li key={topic.id}>
                    <CategoryCard
                      color={topic.color}
                      count={topic.count}
                      href={topic.href}
                      icon={topic.icon}
                      title={topic.title}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </HomeFeed>
        </div>

        <aside className="mt-10 space-y-4 xl:mt-0 xl:pt-8">
          <ContinueReading
            fallbackId={featured?.id ?? ""}
            items={continueItems}
          />
          <QuoteCard
            author={appConfig.author.name}
            text={appConfig.author.quote}
          />
          <AdSlot slot="rail" />
          <PopularList
            docs={getPopularDocs(5)}
            viewAllHref={`${viewAllHref}?sort=popular`}
          />
        </aside>
      </div>
    </div>
  );
};
