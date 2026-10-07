"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/ui";
import { cn } from "@/packages/utils/cn";

type SelectOption = { value: string; label: string };

type SelectProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
};

/**
 * A themed stand-in for <select>: a native <select> can't have its open
 * menu restyled cross-browser (it renders as the OS's own popup), so this
 * builds the dropdown from scratch — trigger button + a listbox positioned
 * with our own panel/border/scrollbar styling.
 */
export const Select = ({
  label,
  value,
  options,
  onChange,
  className,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selected =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    setActive(
      Math.max(
        0,
        options.findIndex((o) => o.value === value),
      ),
    );
    listRef.current?.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open, options, value]);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const commit = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
  };

  const onTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
    }
  };

  const onListKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      commit(active);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div className={cn("relative", className)} ref={rootRef}>
      <span className="sr-only" id={`${listboxId}-label`}>
        {label}
      </span>
      <button
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`${listboxId}-label ${listboxId}-value`}
        className="flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-border bg-card/60 pl-3 pr-2.5 text-left text-sm text-foreground outline-none transition-colors hover:border-primary/40 focus-visible:border-primary/60 focus-visible:ring-4 focus-visible:ring-primary/10 aria-expanded:border-primary/60 aria-expanded:ring-4 aria-expanded:ring-primary/10"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        type="button"
      >
        <span className="truncate" id={`${listboxId}-value`}>
          {selected?.label}
        </span>
        <Icon
          className={cn(
            "shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
          name="chevron-down"
          size={15}
        />
      </button>

      {open && (
        <div
          aria-activedescendant={`${listboxId}-${active}`}
          aria-labelledby={`${listboxId}-label`}
          className="sb-scroll animate-pop-in absolute left-0 top-[calc(100%+6px)] z-30 max-h-64 w-full min-w-max overflow-y-auto rounded-xl border border-border bg-popover p-1.5 shadow-pop"
          id={listboxId}
          onKeyDown={onListKeyDown}
          ref={listRef}
          role="listbox"
          tabIndex={-1}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <button
                aria-selected={isSelected}
                className={cn(
                  "flex h-8 w-full items-center gap-2 rounded-lg px-2.5 text-left text-[13px] transition-colors",
                  index === active && "bg-muted",
                  isSelected ? "font-medium text-primary" : "text-foreground",
                )}
                data-index={index}
                id={`${listboxId}-${index}`}
                key={option.value}
                onClick={() => commit(index)}
                onMouseEnter={() => setActive(index)}
                role="option"
                type="button"
              >
                <Icon
                  className={cn(
                    "shrink-0",
                    isSelected ? "opacity-100" : "opacity-0",
                  )}
                  name="check"
                  size={13}
                />
                <span className="truncate">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
