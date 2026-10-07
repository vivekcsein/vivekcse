import type { SearchEntry, TocItem } from "@/types/content";

export type SearchHit = {
  entry: SearchEntry;
  score: number;
  /** Best matching section, when the title alone didn't match. */
  heading?: TocItem;
  /** Deep link: the doc, or the matching section inside it. */
  href: string;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");

const startsWord = (haystack: string, token: string) =>
  haystack.startsWith(token) || haystack.includes(` ${token}`);

/** Every query word must match somewhere; weights favour title > keywords > sections. */
export const searchDocs = (
  index: SearchEntry[],
  query: string,
  limit = 12,
): SearchHit[] => {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const hits: SearchHit[] = [];

  for (const entry of index) {
    const title = normalize(entry.title);
    const description = normalize(entry.description);
    const category = normalize(
      `${entry.collectionTitle} ${entry.categoryTitle}`,
    );
    const keywords = entry.keywords.map(normalize);
    const headings = entry.headings.map((heading) => ({
      heading,
      text: normalize(heading.text),
    }));

    let total = 0;
    let titleMatched = true;
    let matched = true;
    let bestHeading: TocItem | undefined;

    for (const token of tokens) {
      let score = 0;

      if (startsWord(title, token)) score += 10;
      else if (title.includes(token)) score += 6;
      else titleMatched = false;

      if (keywords.some((keyword) => keyword.startsWith(token))) score += 5;
      else if (keywords.some((keyword) => keyword.includes(token))) score += 3;

      if (category.includes(token)) score += 2;
      if (description.includes(token)) score += 1.5;

      const headingHit = headings.find(({ text }) => text.includes(token));
      if (headingHit) {
        score += 2;
        bestHeading ??= headingHit.heading;
      }

      if (score === 0) {
        matched = false;
        break;
      }
      total += score;
    }

    if (!matched) continue;

    const heading = titleMatched ? undefined : bestHeading;
    hits.push({
      entry,
      score: total,
      heading,
      href: heading ? `${entry.href}#${heading.id}` : entry.href,
    });
  }

  return hits
    .sort(
      (a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title),
    )
    .slice(0, limit);
};
