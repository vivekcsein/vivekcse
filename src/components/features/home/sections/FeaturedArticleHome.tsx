import { Icon } from "@/components/ui";
import { getAllDocs, getCollections, toSummary } from "@/packages/utils/loader";
import { SectionHeading } from "../../content/SectionHeading";
import { FeaturedArticle } from "../../docs/article/FeaturedArticle";

const FeaturedArticleHome = () => {
  const collections = getCollections();
  const docs = getAllDocs();

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

  const topicOf = (doc: { collection: string; category: string }) => {
    return topicById.get(`${doc.collection}/${doc.category}`);
  };

  const featured = docs.find((doc) => doc.featured) ?? docs[0];
  const featuredTopic = featured ? topicOf(featured) : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-12">
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
          <FeaturedArticle category={featuredTopic} doc={toSummary(featured)} />
        </section>
      )}
    </div>
  );
};

export default FeaturedArticleHome;
