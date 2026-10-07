import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Components, ExtraProps } from "react-markdown";
import { CodeBlock } from "./CodeBlock";

type HastNode = NonNullable<ExtraProps["node"]>;
type HastChild = HastNode["children"][number];

const getText = (node: HastChild): string => {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map(getText).join("");
  return "";
};

const getLanguage = (node: HastNode | undefined): string | undefined => {
  const code = node?.children.find(
    (child) => child.type === "element" && child.tagName === "code",
  );
  if (code?.type !== "element") return undefined;

  const classes = code.properties?.className;
  const match = Array.isArray(classes)
    ? classes.find(
        (name): name is string =>
          typeof name === "string" && name.startsWith("language-"),
      )
    : undefined;

  return match?.replace("language-", "");
};

type Options = {
  /** Rendered immediately before the heading with this id. */
  inlineAd?: ReactNode;
  inlineAdBeforeId?: string;
};

type HeadingProps = ComponentPropsWithoutRef<"h2"> & ExtraProps;

const createHeading =
  (Tag: "h2" | "h3" | "h4", { inlineAd, inlineAdBeforeId }: Options = {}) =>
  ({ id, children }: HeadingProps) => (
    <>
      {inlineAd && id && id === inlineAdBeforeId ? inlineAd : null}
      <Tag id={id}>
        {children}
        {id && (
          <a
            aria-label="Link to this section"
            className="heading-anchor"
            href={`#${id}`}
          >
            #
          </a>
        )}
      </Tag>
    </>
  );

/** Plain function (not a component) so the map is rebuilt cleanly per render. */
export const createMarkdownComponents = (options: Options): Components => ({
  h2: createHeading("h2", options),
  h3: createHeading("h3"),
  h4: createHeading("h4"),

  pre: ({ node, children }) => (
    <CodeBlock
      code={node ? getText(node).replace(/\n$/, "") : ""}
      language={getLanguage(node)}
    >
      {children}
    </CodeBlock>
  ),

  a: ({ href = "", children }) => {
    // "//host/path" is protocol-relative (external), not an internal route.
    if (href.startsWith("/") && !href.startsWith("//"))
      return <Link href={href}>{children}</Link>;
    if (href.startsWith("#")) return <a href={href}>{children}</a>;
    return (
      <a href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  },

  table: ({ children }) => (
    <div className="table-wrap">
      <table>{children}</table>
    </div>
  ),

  img: ({ src, alt }) => (
    // biome-ignore lint/performance/noImgElement: markdown images have no known dimensions
    <img alt={alt ?? ""} decoding="async" loading="lazy" src={src as string} />
  ),
});
