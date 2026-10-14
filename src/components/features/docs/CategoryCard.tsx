import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui";
import {
  type TopicColor,
  topicPalette,
} from "@/packages/configs/content.config";

const mix = (pct: number, base = "transparent") =>
  `color-mix(in oklab, var(--topic) ${pct}%, ${base})`;

type CategoryCardProps = {
  href: string;
  title: string;
  icon: IconName;
  color: TopicColor;
  count: number;
  /** What is being counted. Defaults to articles. */
  unit?: { singular: string; plural: string };
};

/** "Browse by Topic" tile. */
export const CategoryCard = ({
  href,
  title,
  icon,
  color,
  count,
  unit = { singular: "article", plural: "articles" },
}: CategoryCardProps) => {
  const tone = topicPalette[color];

  const cardStyle = {
    "--topic": tone,
    border: `1px solid ${mix(26)}`,
    background: `linear-gradient(135deg, ${mix(16, "var(--card)")} 0%, var(--card) 75%)`,
  } as CSSProperties;

  const tileStyle: CSSProperties = {
    color: tone,
    background: mix(16),
    border: `1px solid ${mix(30)}`,
  };

  return (
    <Link
      className="
        group flex h-14.5 items-center gap-3 rounded-xl px-3.75
        transition-[border-color,transform,box-shadow] duration-200
        hover:-translate-y-px
        hover:[border-color:color-mix(in_oklab,var(--topic)_55%,transparent)]
        hover:[box-shadow:0_10px_30px_-14px_color-mix(in_oklab,var(--topic)_60%,transparent)]
      "
      href={href}
      style={cardStyle}
    >
      <span
        className="grid size-10 shrink-0 place-items-center rounded-[10px]"
        style={tileStyle}
      >
        <Icon name={icon} size={19} />
      </span>
      <span className="min-w-0 flex-1 leading-none">
        <span className="block truncate text-sm font-semibold text-foreground">
          {title}
        </span>
        <span className="mt-1.5 block text-xs text-muted-foreground">
          {count} {count === 1 ? unit.singular : unit.plural}
        </span>
      </span>
      <Icon
        className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
        name="arrow-right"
        size={18}
      />
    </Link>
  );
};
