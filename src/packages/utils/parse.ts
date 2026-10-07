import GithubSlugger from "github-slugger";
import type { TocItem } from "../../types/content";

/**
 * Pure markdown helpers (no fs) — everything the loader needs to derive
 * title / description / table-of-contents from a plain .md file.
 */

type ScannedLine = { text: string; inFence: boolean };

const FENCE = /^\s{0,3}(`{3,}|~{3,})/;
const H1 = /^#\s+(.+?)\s*#*\s*$/;
const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/;

/** Splits into lines and flags the ones inside ``` / ~~~ code fences. */
const scanLines = (content: string): ScannedLine[] => {
  let open: { char: string; length: number } | null = null;

  return content.split(/\r?\n/).map((text) => {
    const match = FENCE.exec(text);

    if (open) {
      const closes =
        match !== null &&
        match[1][0] === open.char &&
        match[1].length >= open.length;
      if (closes) open = null;
      return { text, inFence: true };
    }

    if (match) {
      open = { char: match[1][0], length: match[1].length };
      return { text, inFence: true };
    }

    return { text, inFence: false };
  });
};

/** Markdown inline syntax → plain text (matches what rehype-slug hashes). */
export const stripInline = (input: string): string => {
  const codeSpans: string[] = [];

  return input
    .replace(/`([^`]+)`/g, (_, code: string) => {
      codeSpans.push(code);
      return `\uE000${codeSpans.length - 1}\uE001`;
    })
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/(?<!\w)__(.+?)__(?!\w)/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/(?<!\w)_(.+?)_(?!\w)/g, "$1")
    .replace(/\uE000(\d+)\uE001/g, (_, i: string) => codeSpans[Number(i)] ?? "")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * Finds the first `# Heading` (outside code). If it is also the first thing
 * in the document it is removed from the body, because the page header
 * already renders the title — otherwise it would show twice.
 */
export const extractLeadingHeading = (
  content: string,
): { title?: string; body: string } => {
  const lines = scanLines(content);
  const index = lines.findIndex((line) => !line.inFence && H1.test(line.text));

  if (index === -1) return { body: content };

  const match = H1.exec(lines[index].text);
  const title = match ? stripInline(match[1]) : undefined;
  const firstContent = lines.findIndex((line) => line.text.trim() !== "");

  if (index !== firstContent) return { title, body: content };

  let end = index + 1;
  while (end < lines.length && lines[end].text.trim() === "") end += 1;

  return {
    title,
    body: lines
      .slice(end)
      .map((line) => line.text)
      .join("\n"),
  };
};

/**
 * h2/h3 list for the table of contents. Ids come from the same slugger
 * algorithm rehype-slug uses, fed every heading in document order, so
 * duplicates (`intro`, `intro-1`) line up with the rendered page.
 */
export const extractHeadings = (body: string): TocItem[] => {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  for (const line of scanLines(body)) {
    if (line.inFence) continue;
    const match = HEADING.exec(line.text);
    if (!match) continue;

    const level = match[1].length;
    const text = stripInline(match[2]);
    const id = slugger.slug(text);

    if (level === 2 || level === 3) items.push({ id, text, level });
  }

  return items;
};

const truncate = (text: string, max: number) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 30))}…`;
};

/** First real paragraph (or blockquote intro) as a plain-text description. */
export const buildExcerpt = (body: string, max = 170): string => {
  const blocks: string[] = [];
  let current: string[] = [];

  for (const line of scanLines(body)) {
    if (line.inFence || line.text.trim() === "") {
      if (current.length) blocks.push(current.join(" "));
      current = [];
      continue;
    }
    current.push(line.text.trim());
  }
  if (current.length) blocks.push(current.join(" "));

  const paragraph = blocks.find(
    (block) => !/^(#|\||-|\*|\+|\d+\.|<|!\[|---)/.test(block),
  );
  if (!paragraph) return "";

  return truncate(
    stripInline(paragraph.replace(/^>\s?/, "").replace(/\s>\s?/g, " ")),
    max,
  );
};

export const readingMinutes = (body: string): number =>
  Math.max(1, Math.round((body.match(/\S+/g)?.length ?? 0) / 210));

export const humanize = (value: string): string =>
  value
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
