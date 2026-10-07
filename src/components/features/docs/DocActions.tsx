"use client";

import { Button, Icon } from "@/components/ui";
import { useBookmarks, useCopyToClipboard } from "@/packages/hooks";

type DocActionsProps = {
  docId: string;
  title: string;
  markdown: string;
};

export const DocActions = ({ docId, title, markdown }: DocActionsProps) => {
  const { ids, toggle } = useBookmarks();
  const saved = ids.includes(docId);
  const page = useCopyToClipboard();
  const link = useCopyToClipboard();

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => page.copy(`# ${title}\n\n${markdown}`)} size="sm">
        <Icon name={page.copied ? "check" : "copy"} />
        {page.copied ? "Copied as Markdown" : "Copy page"}
      </Button>
      <Button
        onClick={() => link.copy(window.location.href)}
        size="sm"
        variant="secondary"
      >
        <Icon name={link.copied ? "check" : "link"} />
        {link.copied ? "Link copied" : "Copy link"}
      </Button>
      <Button
        aria-pressed={saved}
        onClick={() => toggle(docId)}
        size="sm"
        variant="secondary"
      >
        <Icon className={saved ? "fill-current" : ""} name="bookmark" />
        {saved ? "Saved" : "Save"}
      </Button>
    </div>
  );
};
