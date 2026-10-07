import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AdSlot } from "@/components/features/ads-sense/AdSlot";
import { ArticlesExplorer } from "@/components/features/articles/ArticlesExplorer";
import { DocActions } from "@/components/features/docs/DocActions";
import { DocPager } from "@/components/features/docs/DocPager";
import { DocToc } from "@/components/features/docs/DocToc";
import { ReadingTracker } from "@/components/features/docs/ReadingTracker";
import { RelatedDocs } from "@/components/features/docs/RelatedDocs";
import { Markdown } from "@/components/features/markdown/Markdown";
import { JsonLd } from "@/components/features/seo/JsonLd";
import { Breadcrumbs, Icon, ProgressBar } from "@/components/ui";
import { Badge } from "@/components/ui/badge/Badge";
import appConfig from "@/packages/configs/app.config";
import { formatDate } from "@/packages/utils/date";
import { formatReadingTime } from "@/packages/utils/format";
import {
  getAdjacentDocs,
  getAllDocs,
  getArticleList,
  getCategoryTitles,
  getCollection,
  getCollections,
  getRealCategories,
  getRelatedDocs,
  resolveDoc,
} from "@/packages/utils/loader";

type RoutePageProps = {
  params: Promise<{ collection: string; slug: string[] }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => {
  // One param set per doc (flat: [slug], nested: [category, slug]) …
  const docParams = getAllDocs().map(({ collection, category, slug }) => ({
    collection,
    slug: category ? [category, slug] : [slug],
  }));
  // … plus one per real (folder-backed) category, for its index page.
  const categoryParams = getCollections().flatMap((collection) =>
    getRealCategories(collection.key).map((category) => ({
      collection: collection.key,
      slug: [category.key],
    })),
  );
  return [...docParams, ...categoryParams];
};

/** Show a mid-article ad only when the article is long enough to deserve one. */
const MID_AD_MIN_SECTIONS = 4;

export const generateMetadata = async ({
  params,
}: RoutePageProps): Promise<Metadata> => {
  const { collection: collectionKey, slug } = await params;
  const doc = resolveDoc(collectionKey, slug);

  if (doc) {
    return {
      title: doc.title,
      description: doc.description,
      keywords: doc.keywords,
      alternates: { canonical: doc.href },
      openGraph: {
        type: "article",
        title: doc.title,
        description: doc.description,
        url: doc.href,
        publishedTime: doc.createdAt,
        modifiedTime: doc.updatedAt,
      },
    };
  }

  if (slug.length === 1) {
    const category = getRealCategories(collectionKey).find(
      (item) => item.key === slug[0],
    );
    if (category) {
      return {
        title: category.title,
        description: category.description,
        alternates: { canonical: `/${collectionKey}/${category.key}` },
      };
    }
  }

  return {};
};

const RoutePage = async ({ params }: RoutePageProps) => {
  const { collection: collectionKey, slug } = await params;
  const collection = getCollection(collectionKey);
  if (!collection) notFound();

  const doc = resolveDoc(collectionKey, slug);

  if (doc) {
    const { previous, next } = getAdjacentDocs(doc);
    const related = getRelatedDocs(doc);
    const titles = getCategoryTitles();

    const sections = doc.headings.filter((heading) => heading.level === 2);
    const midAdId =
      sections.length >= MID_AD_MIN_SECTIONS ? sections[2]?.id : undefined;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: doc.title,
      description: doc.description,
      datePublished: doc.createdAt,
      dateModified: doc.updatedAt,
      url: `${appConfig.site.url}/${doc.href}`,
      author: { "@type": "Organization", name: appConfig.author },
      publisher: { "@type": "Organization", name: appConfig.author },
      keywords: doc.keywords.join(", "),
    };

    return (
      <div className="container-page gap-10 py-8 xl:grid xl:grid-cols-[minmax(0,1fr)_17.5rem]">
        <ProgressBar />
        <ReadingTracker docId={doc.id} />

        <article className="min-w-0 max-w-3xl">
          <Breadcrumbs
            items={[
              { label: collection.title, href: `/${collection.key}` },
              ...(doc.category
                ? [
                    {
                      label:
                        titles[`${collection.key}/${doc.category}`] ??
                        doc.category,
                      href: `/${collection.key}/${doc.category}`,
                    },
                  ]
                : []),
              { label: doc.title },
            ]}
          />

          <header className="animate-fade-up">
            {doc.category && (
              <Badge variant="primary">
                {titles[`${collection.key}/${doc.category}`] ?? doc.category}
              </Badge>
            )}
            <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
              {doc.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {doc.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Icon name="calendar" size={14} />
                Updated{" "}
                <time dateTime={doc.updatedAt}>
                  {formatDate(doc.updatedAt)}
                </time>
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="clock" size={14} />
                {formatReadingTime(doc.readingMinutes)}
              </span>
            </div>

            <div className="mt-5 border-b border-border pb-6">
              <DocActions
                docId={doc.id}
                markdown={doc.content}
                title={doc.title}
              />
            </div>
          </header>

          {doc.headings.length > 0 && (
            <details className="mt-6 rounded-xl border border-border bg-card xl:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                <Icon name="align-left" size={16} /> On this page
                <Icon className="ml-auto" name="chevron-down" size={14} />
              </summary>
              <DocToc className="px-4 pb-4" items={doc.headings} />
            </details>
          )}

          <div className="mt-8">
            <Markdown
              content={doc.content}
              inlineAd={<AdSlot className="my-10" slot="inArticle" />}
              inlineAdBeforeId={midAdId}
            />
          </div>

          <AdSlot className="mt-12" slot="inArticle" />
          <DocPager next={next} previous={previous} />
          <RelatedDocs docs={related} titles={titles} />
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)] space-y-8">
            <DocToc
              className="max-h-[50svh] overflow-y-auto"
              items={doc.headings}
            />
            <AdSlot slot="rail" />
          </div>
        </aside>

        <JsonLd data={jsonLd} />
      </div>
    );
  }

  // Not a doc — is it a real (folder-backed) category index?
  if (slug.length === 1) {
    const category = getRealCategories(collectionKey).find(
      (item) => item.key === slug[0],
    );
    if (category) {
      return (
        <div className="container-page animate-fade-up py-8">
          <Breadcrumbs
            items={[
              { label: collection.title, href: `/${collection.key}` },
              { label: category.title },
            ]}
          />
          <header className="mb-8 flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon name={category.icon} size={24} />
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {category.title}
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {category.description}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {category.docs.length}{" "}
                {category.docs.length === 1 ? "guide" : "guides"}
              </p>
            </div>
          </header>

          <Suspense fallback={null}>
            <ArticlesExplorer
              items={
                getArticleList({
                  collection: collection.key,
                  category: category.key,
                }).items
              }
            />
          </Suspense>
        </div>
      );
    }
  }

  notFound();
};

export default RoutePage;
