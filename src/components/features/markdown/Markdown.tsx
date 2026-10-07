import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { createMarkdownComponents } from "./create-markdown";

type MarkdownProps = {
  content: string;
  /** Optional ad rendered before the heading whose id is `inlineAdBeforeId`. */
  inlineAd?: ReactNode;
  inlineAdBeforeId?: string;
};

export const Markdown = ({
  content,
  inlineAd,
  inlineAdBeforeId,
}: MarkdownProps) => (
  <div className="prose-docs">
    <ReactMarkdown
      components={createMarkdownComponents({ inlineAd, inlineAdBeforeId })}
      rehypePlugins={[
        rehypeSlug,
        [rehypeHighlight, { detect: false, ignoreMissing: true }],
      ]}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  </div>
);
