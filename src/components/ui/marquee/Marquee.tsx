"use client";
export interface MarqueeProps {
  /** The list of keywords to display */
  keywords: string[];
  /** Seconds for one full loop */
  speed?: number;
  /** Scroll direction */
  direction?: "left" | "right";
  /** Pause animation on hover */
  pauseOnHover?: boolean;
  /** Extra classes for the outer wrapper */
  className?: string;
}

/**
 * Marquee
 * A single-component, self-contained scrolling marquee of keyword pills.
 * Styled entirely with shadcn/ui theme CSS variables, so it automatically
 * matches whatever theme (light/dark/custom) is set on your <html> root.
 *
 * - Edge fade is a `mask-image`, not two overlay divs — it stays correct
 *   over any background (image, gradient, transparent) instead of only
 *   ever matching a flat `bg-background`.
 * - Each pill gets a theme-primary hover state (glow + lift + border/text
 *   shift) instead of a static, non-interactive chip.
 * - The animated track is `aria-hidden`; a single hidden list carries the
 *   real content once for screen readers, so assistive tech doesn't read
 *   the duplicated loop twice.
 */
const Marquee = ({
  keywords,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) => {
  if (!Array.isArray(keywords) || keywords.length === 0) return null;

  // Duplicate the list so the CSS translate loop is seamless.
  const items = [...keywords, ...keywords];

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pauseOnHover) e.currentTarget.style.animationPlayState = "paused";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pauseOnHover) e.currentTarget.style.animationPlayState = "running";
  };

  return (
    <div
      className={`marquee-fade relative w-full min-w-0 overflow-hidden py-8 ${className}`}
    >
      {/* Soft ambient glow behind the track — same primary/secondary
          language as the hero, kept faint so it reads as texture, not a
          second focal point. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-primary/6 via-transparent to-secondary/6"
      />

      {/* Screen-reader content: the real list, once, not the animated loop. */}
      <ul className="sr-only">
        {keywords.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="marquee-track flex w-max items-center gap-3"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((word, i) => (
          <span
            key={`${word}-${i}-${keywords.length}`}
            className="marquee-pill flex-none whitespace-nowrap rounded-full border border-border bg-muted/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm"
          >
            {word}
          </span>
        ))}
      </div>

      <style>{`
        .marquee-fade {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            #000 8%,
            #000 92%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            #000 8%,
            #000 92%,
            transparent
          );
        }

        .marquee-track {
          animation-name: marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .marquee-pill {
          transition:
            color 250ms ease-out,
            border-color 250ms ease-out,
            background-color 250ms ease-out,
            box-shadow 250ms ease-out,
            transform 250ms ease-out;
        }
        .marquee-pill:hover {
          cursor: pointer;
          color: var(--foreground);
          border-color: color-mix(in oklch, var(--primary) 50%, var(--border));
          background-color: color-mix(in oklch, var(--primary) 8%, var(--muted));
          box-shadow: 0 0 24px -6px color-mix(in oklch, var(--primary) 60%, transparent);
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
          .marquee-pill { transition: none; }
        }
      `}</style>
    </div>
  );
};

export default Marquee;

/* Example usage:
<Marquee
  keywords={["React", "Next.js", "Tailwind", "shadcn/ui", "AI", "Automation", "SEO"]}
  speed={20}
  direction="left"
/>

Requires these CSS variables to be defined on your theme root (standard
shadcn/ui setup via `npx shadcn init` already provides them):
  --background, --foreground, --border, --muted, --muted-foreground,
  --primary, --secondary
*/
