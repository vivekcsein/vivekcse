"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/ui";
import { Badge } from "@/components/ui/badge/Badge";
import { cn } from "@/packages/utils/cn";
import { searchDocs } from "@/packages/utils/search";
import type { SearchEntry } from "@/types/content";

type SearchContextValue = {
  index: SearchEntry[];
  open: () => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export const useSearch = (): SearchContextValue => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearch must be used inside <SearchProvider>");
  return context;
};

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

type SearchPanelProps = {
  index: SearchEntry[];
  onClose: () => void;
};

const SearchPanel = ({ index, onClose }: SearchPanelProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const isBrowsing = query.trim() === "";
  const results = useMemo(
    () =>
      isBrowsing
        ? index.slice(0, 6).map((entry) => ({
            entry,
            href: entry.href,
            heading: undefined,
          }))
        : searchDocs(index, query),
    [index, query, isBrowsing],
  );

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => Math.min(value + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      go(results[active].href);
    }
  };

  return (
    <div className="animate-pop-in mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-pop">
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Icon className="text-muted-foreground" name="search" size={18} />
        <input
          aria-label="Search documentation"
          autoComplete="off"
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search guides, topics, sections…"
          // biome-ignore lint/a11y/noAutofocus: the dialog exists only to be typed into
          autoFocus
          spellCheck={false}
          value={query}
        />
        <kbd className="rounded-md border border-border px-1.5 py-0.5 text-[0.65rem] text-muted-foreground">
          esc
        </kbd>
      </div>

      <div className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
        {isBrowsing && (
          <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Latest guides
          </p>
        )}

        {results.length === 0 ? (
          <p className="px-3 py-10 text-center text-sm text-muted-foreground">
            No results for “{query.trim()}”. Try fewer or different words.
          </p>
        ) : (
          <ul id="search-results" ref={listRef}>
            {results.map((result, position) => (
              <li
                data-index={position}
                id={`search-result-${position}`}
                key={result.entry.id}
              >
                <Link
                  aria-current={position === active ? "true" : undefined}
                  className={cn(
                    "flex items-start gap-3 rounded-lg px-3 py-2.5",
                    position === active ? "bg-accent" : "hover:bg-muted",
                  )}
                  href={result.href}
                  onClick={onClose}
                  onMouseMove={() => setActive(position)}
                >
                  <Icon
                    className="mt-1 text-muted-foreground"
                    name={result.heading ? "align-left" : "file-text"}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {result.entry.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {result.heading
                        ? `Section: ${result.heading.text}`
                        : result.entry.description}
                    </span>
                  </span>
                  <Badge
                    className="mt-0.5 hidden sm:inline-flex"
                    variant="outline"
                  >
                    {result.entry.collectionTitle}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
        <span>↑↓ to navigate</span>
        <span className="flex items-center gap-1">
          <Icon name="corner-down-left" size={12} /> to open
        </span>
      </div>
    </div>
  );
};

type SearchProviderProps = {
  index: SearchEntry[];
  children: ReactNode;
};

export const SearchProvider = ({ index, children }: SearchProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((value) => !value);
      } else if (event.key === "/" && !isTypingTarget(event.target)) {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const value = useMemo(() => ({ index, open }), [index, open]);

  return (
    <SearchContext value={value}>
      {children}
      <dialog
        aria-label="Search"
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-4 pt-[10vh] backdrop:bg-background/70 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onClose={close}
        onKeyDown={(event) => {
          if (event.key === "Escape") close();
        }}
        ref={dialogRef}
      >
        {isOpen && <SearchPanel index={index} onClose={close} />}
      </dialog>
    </SearchContext>
  );
};
