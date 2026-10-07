import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticlesExplorer } from "@/components/features/articles/ArticlesExplorer";
import { Icon } from "@/components/ui";
import { getArticleList } from "@/packages/utils/loader";

export const metadata: Metadata = {
  title: "All articles",
  description: "Browse, filter and sort every article.",
  alternates: { canonical: "/content/all" },
};

const ArticlesPage = () => {
  const { items, topics, collections } = getArticleList();

  return (
    <div className="container-page animate-fade-up py-8">
      <header className="mb-6 flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon name="file-text" size={24} />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            All Articles
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {items.length} articles. Filter by topic, reading time or keyword,
            and sort the way you like.
          </p>
        </div>
      </header>
      <Suspense fallback={null}>
        <ArticlesExplorer
          collections={collections}
          items={items}
          topics={topics}
        />
      </Suspense>
    </div>
  );
};

export default ArticlesPage;
