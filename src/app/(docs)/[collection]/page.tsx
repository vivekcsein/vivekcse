import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArticlesExplorer } from "@/components/features/articles/ArticlesExplorer";
import { Icon } from "@/components/ui";
import {
  getArticleList,
  getCollection,
  getCollections,
} from "@/packages/utils/loader";

type CollectionPageProps = {
  params: Promise<{ collection: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () =>
  getCollections().map(({ key }) => ({ collection: key }));

export const generateMetadata = async ({
  params,
}: CollectionPageProps): Promise<Metadata> => {
  const { collection: key } = await params;
  const collection = getCollection(key);
  if (!collection) return {};

  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/${collection.key}` },
  };
};

const CollectionPage = async ({ params }: CollectionPageProps) => {
  const { collection: key } = await params;
  const collection = getCollection(key);
  if (!collection) notFound();

  const { items, topics } = getArticleList({ collection: collection.key });

  return (
    <div className="container-page animate-fade-up py-8">
      <header className="mb-6 flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon name={collection.icon} size={24} />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {collection.title}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {collection.description}
          </p>
        </div>
      </header>
      <Suspense fallback={null}>
        <ArticlesExplorer items={items} topics={topics} />
      </Suspense>
    </div>
  );
};

export default CollectionPage;
