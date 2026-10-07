import { Card } from "@/components/ui";
import type { DocSummary } from "@/types/content";
import { DocCard } from "./DocCard";

type RelatedDocsProps = {
  docs: DocSummary[];
  titles: Record<string, string>;
};

export const RelatedDocs = ({ docs, titles }: RelatedDocsProps) => {
  if (docs.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-14">
      <h2 className="text-xl font-semibold tracking-tight" id="related-heading">
        Keep reading
      </h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {docs.map((doc) => (
          <li key={doc.id}>
            <Card variant="interactive-glow">
              <DocCard
                categoryTitle={titles[`${doc.collection}/${doc.category}`]}
                doc={doc}
              />
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
};
