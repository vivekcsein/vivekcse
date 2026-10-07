"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui";
import { imagesConfig } from "@/packages/configs/images.config";
import { siteConfig } from "@/packages/configs/site.config";
import { useCountUp } from "@/packages/hooks";
import type { KnowledgeStats } from "@/types/content";

/* ------------------------------------------------------------------ */
/* Theme-derived styles (only shadcn variables, no hardcoded colors)   */
/* ------------------------------------------------------------------ */

const TONES = {
  sky: "var(--chart-2)",
  teal: "color-mix(in oklab, var(--chart-2) 55%, var(--chart-3))",
  green: "var(--chart-3)",
  rose: "var(--chart-5)",
} as const;

type Tone = keyof typeof TONES;

const mix = (pct: number) =>
  `color-mix(in oklab, var(--primary) ${pct}%, transparent)`;

/** One smooth ambient wash: left glow, right glow, bottom glow. */
const BACKDROP: CSSProperties = {
  backgroundImage: [
    `radial-gradient(60% 90% at 6% 30%, ${mix(16)}, transparent 70%)`,
    `radial-gradient(45% 70% at 92% 85%, ${mix(12)}, transparent 70%)`,
    `radial-gradient(40% 50% at 50% 115%, ${mix(8)}, transparent 70%)`,
  ].join(","),
};

/**
 * Photo fades out with a MASK (alpha) instead of painting the background
 * color on top. That removes the hard vertical edge where the photo
 * container started.
 */
const maskX =
  "linear-gradient(to right, transparent 0%, rgb(0 0 0 / 0.3) 16%, rgb(0 0 0 / 0.75) 38%, #000 62%)";
const maskY =
  "linear-gradient(to bottom, transparent 0%, #000 24%, #000 68%, transparent 100%)";

const PHOTO_MASK_X: CSSProperties = {
  maskImage: maskX,
  WebkitMaskImage: maskX,
};
const PHOTO_MASK_Y: CSSProperties = {
  maskImage: maskY,
  WebkitMaskImage: maskY,
};

/**
 * Highlight gradient derived from --primary by shifting hue, so it stays
 * blue -> violet -> magenta on violet themes and adapts on any other theme.
 * The class gradient is the fallback if relative colors are unsupported.
 */
const HIGHLIGHT: CSSProperties = {
  backgroundImage:
    "linear-gradient(90deg, oklch(from var(--primary) calc(l + 0.14) c calc(h - 35)) 0%, oklch(from var(--primary) calc(l + 0.1) c h) 50%, oklch(from var(--primary) calc(l + 0.1) c calc(h + 40)) 100%)",
};

/* ------------------------------------------------------------------ */

type HeroStatProps = {
  icon: IconName;
  color: Tone;
  top: string;
  bottom: string;
  /** Label above value (used by "Last Updated"). */
  labelFirst?: boolean;
};

const HeroStat = ({ icon, color, top, bottom, labelFirst }: HeroStatProps) => (
  <div className="group flex min-w-0 items-center gap-2.5">
    <span
      className="
        grid size-7 shrink-0 place-items-center
        rounded-lg
        border border-current/25
        bg-current/10
        shadow-[0_0_18px_currentColor]
        shadow-current/15
        transition-transform duration-300
        group-hover:-translate-y-0.5
      "
      style={{ color: TONES[color] }}
    >
      <Icon name={icon} size={14} />
    </span>

    <span className="min-w-0 leading-none">
      <span
        className={
          labelFirst
            ? "block text-[11px] font-medium text-foreground/85"
            : "block text-sm font-semibold tracking-tight text-foreground"
        }
      >
        {top}
      </span>

      <span className="mt-1.5 block whitespace-nowrap text-[11px] text-muted-foreground">
        {bottom}
      </span>
    </span>
  </div>
);

const formatWords = (words: number) =>
  words >= 1000 ? `${Math.round(words / 1000)}K` : String(words);

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "UTC",
});

type DocsHeroProps = {
  stats: KnowledgeStats;
};

export const DocsHero = ({ stats }: DocsHeroProps) => {
  const articles = useCountUp(stats.articles, { duration: 1000 });
  const topics = useCountUp(stats.topics, { duration: 1100 });
  const words = useCountUp(stats.words, { duration: 1300 });

  const image = imagesConfig.heroImages.contentImages[0];
  const { article: hero } = siteConfig.hero;

  return (
    <section
      className="
        relative isolate
        mb-5
        min-h-75
        overflow-hidden
        bg-background
        sm:min-h-77.5
      "
    >
      {/* Ambient wash (one layer, theme-derived) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={BACKDROP}
      />

      {/* Dotted grid, top-left */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-0 top-0 -z-10
          size-44
          opacity-25
          bg-[radial-gradient(circle,var(--primary)_1px,transparent_1px)]
          bg-size-[12px_12px]
          mask-[linear-gradient(to_bottom_right,black,transparent)]
        "
      />

      {/* Right-side photo: masked, never paints a solid edge */}
      <div
        aria-hidden={image.alt ? undefined : true}
        className="absolute inset-y-0 right-0 -z-10 w-full opacity-40 sm:w-[68%] sm:opacity-100"
        style={PHOTO_MASK_X}
      >
        <div className="absolute inset-0" style={PHOTO_MASK_Y}>
          <Image
            alt={image.alt}
            className="object-cover object-[62%_50%]"
            fill
            priority={image.priority}
            sizes="(max-width: 640px) 100vw, 680px"
            src={image.src}
          />

          {/* Text legibility scrim (fades with the mask) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-background/70 via-background/25 to-transparent"
          />

          {/* Theme tint so the photo sits in the palette */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-primary/15 mix-blend-soft-light"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto min-h-75 max-w-7xl px-5 sm:min-h-77.5 sm:px-8 lg:px-10">
        <div className="flex min-h-75 max-w-152 flex-col justify-center py-8 sm:min-h-77.5 sm:py-9">
          {/* Eyebrow */}
          <p
            className="
              flex items-center gap-2.5
              text-[11px] font-bold uppercase tracking-[0.2em]
              text-[color-mix(in_oklab,var(--primary)_65%,var(--foreground))]
            "
          >
            <span
              aria-hidden="true"
              className="h-px w-6 bg-linear-to-r from-primary to-primary/40"
            />
            {hero.eyebrow}
          </p>

          {/* Heading */}
          <h1
            className="
              mt-3 max-w-140
              text-balance
              text-[2.45rem] font-bold leading-[1.03] tracking-[-0.05em]
              text-foreground
              sm:text-[2.9rem] lg:text-[3.1rem]
            "
          >
            {hero.title}
            <br />
            {hero.highlightPrefix}{" "}
            <span
              className="bg-linear-to-r from-primary via-primary to-primary bg-clip-text text-transparent"
              style={HIGHLIGHT}
            >
              {hero.highlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-100 text-sm leading-5 text-muted-foreground sm:text-[14px] sm:leading-6">
            {hero.subtitle}
          </p>

          {/* Stats */}
          <div
            className="
              mt-6 flex flex-wrap items-center
              gap-x-6 gap-y-4
              border-t border-border/40
              pt-4
              sm:gap-x-7
            "
          >
            <HeroStat
              bottom="Articles"
              color="sky"
              icon="file-text"
              top={String(articles)}
            />
            <HeroStat
              bottom="Topics"
              color="teal"
              icon="layers"
              top={String(topics)}
            />
            <HeroStat
              bottom="Words"
              color="green"
              icon="book-open"
              top={formatWords(words)}
            />
            {stats.lastUpdated && (
              <HeroStat
                bottom={dateFormatter.format(new Date(stats.lastUpdated))}
                color="rose"
                icon="calendar"
                labelFirst
                top="Last Updated"
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
      />
    </section>
  );
};
