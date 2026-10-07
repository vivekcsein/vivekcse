"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/ui";
import { useCopyToClipboard } from "@/packages/hooks";
import { cn } from "@/packages/utils/cn";

type CodeBlockProps = {
  /** Raw source text — what lands on the clipboard. */
  code: string;
  language?: string;
  /** Syntax-highlighted <code> rendered on the server. */
  children: ReactNode;
};

export const CodeBlock = ({ code, language, children }: CodeBlockProps) => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="code-block">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 py-1.5 pl-4 pr-2">
        <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          {language ?? "text"}
        </span>
        <button
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium transition-colors",
            copied
              ? "text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
          onClick={() => copy(code)}
          type="button"
        >
          <Icon name={copied ? "check" : "copy"} size={14} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>{children}</pre>
      <output className="sr-only">
        {copied ? "Code copied to clipboard" : ""}
      </output>
    </div>
  );
};
