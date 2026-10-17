"use client";

import Image from "next/image";
import { Icon } from "@/components/ui";
import type {
  OptionDef,
  SectionKind,
  SectionLayout,
} from "@/packages/configs/dev-services.config";
import { cn } from "@/packages/utils/cn";

type OptionButtonProps = {
  option: OptionDef;
  layout: SectionLayout;
  kind: Exclude<SectionKind, "fields">;
  selected: boolean;
  onSelect: () => void;
};

const shell =
  "group relative border text-left outline-none transition-[border-color,background-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-ring/70";
const idle =
  "border-border bg-card/40 hover:border-primary/40 hover:bg-card/70";
const active =
  "border-primary bg-primary/12 shadow-[0_0_0_1px_var(--primary),0_14px_40px_-20px_var(--primary)]";

/** The round check / radio mark. */
const Mark = ({
  selected,
  className,
}: {
  selected: boolean;
  className?: string;
}) => (
  <span
    aria-hidden="true"
    className={cn(
      "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
      selected
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-transparent",
      className,
    )}
  >
    {selected && <Icon name="check" size={12} strokeWidth={3} />}
  </span>
);

/** Icon or logo image of an option. */
const Media = ({
  option,
  size,
  selected,
  className,
}: {
  option: OptionDef;
  size: number;
  selected: boolean;
  className?: string;
}) => {
  if (option.image) {
    return (
      <Image
        alt=""
        className={cn("shrink-0 object-contain", className)}
        height={size}
        src={option.image}
        width={size}
      />
    );
  }
  if (option.icon) {
    return (
      <Icon
        className={cn(
          "shrink-0 transition-colors",
          selected ? "text-primary" : "text-muted-foreground",
          className,
        )}
        name={option.icon}
        size={size}
        strokeWidth={1.5}
      />
    );
  }
  return null;
};

/** One selectable option. `layout` picks which of the four designs to render. */
export const OptionButton = ({
  option,
  layout,
  kind,
  selected,
  onSelect,
}: OptionButtonProps) => {
  const a11y = {
    "aria-checked": selected,
    onClick: onSelect,
    role: kind === "single" ? "radio" : "checkbox",
    type: "button",
  } as const;

  if (layout === "cards") {
    return (
      <button
        {...a11y}
        className={cn(
          shell,
          "flex gap-4 rounded-xl p-5",
          selected ? active : idle,
        )}
      >
        <Media
          className="mt-0.5"
          option={option}
          selected={selected}
          size={44}
        />
        <span className="flex min-w-0 flex-1 flex-col pr-4">
          <span className="text-base font-semibold text-foreground">
            {option.title}
          </span>
          {option.description && (
            <span className="mt-1 text-[13px] leading-5 text-muted-foreground">
              {option.description}
            </span>
          )}
          {option.badge && (
            <span
              className={cn(
                "mt-3 inline-flex w-fit rounded-md px-2.5 py-1 text-[11px] font-medium",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {option.badge}
            </span>
          )}
        </span>
        <Mark className="absolute top-4 right-4" selected={selected} />
      </button>
    );
  }

  if (layout === "tiles") {
    return (
      <button
        {...a11y}
        className={cn(
          shell,
          "flex items-start gap-3 rounded-xl p-3.5",
          selected ? active : idle,
        )}
      >
        <Media
          className="mt-0.5"
          option={option}
          selected={selected}
          size={26}
        />
        <span className="flex min-w-0 flex-1 flex-col pr-5">
          <span className="text-[13.5px] font-semibold text-foreground">
            {option.title}
          </span>
          {option.description && (
            <span className="mt-0.5 text-xs leading-4 text-muted-foreground">
              {option.description}
            </span>
          )}
        </span>
        <Mark className="absolute top-3 right-3" selected={selected} />
      </button>
    );
  }

  if (layout === "chips") {
    return (
      <button
        {...a11y}
        className={cn(
          shell,
          "flex h-12 items-center gap-3 rounded-xl px-3.5",
          selected ? active : idle,
        )}
      >
        <Media option={option} selected={selected} size={24} />
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
          {option.title}
        </span>
        <Mark selected={selected} />
      </button>
    );
  }

  // radio
  return (
    <button
      {...a11y}
      className={cn(
        shell,
        "flex h-11 items-center gap-3 rounded-xl px-3.5",
        selected ? active : idle,
      )}
    >
      <Mark selected={selected} />
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
        {option.title}
      </span>
      {selected && (
        <span
          aria-hidden="true"
          className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground ring-2 ring-background"
        >
          <Icon name="check" size={11} strokeWidth={3} />
        </span>
      )}
    </button>
  );
};
