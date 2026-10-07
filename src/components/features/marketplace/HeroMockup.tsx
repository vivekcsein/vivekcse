import { Icon } from "@/components/ui";

/**
 * Approximates the reference's hand-drawn annotated product mockup using
 * CSS/SVG only (no screenshot assets): a dark "app" window behind, a light
 * "app" window in front, tilted opposite ways, with a soft glow and a
 * handwritten-style note pointing at them.
 */
export const HeroMockup = () => (
  <div className="relative mx-auto h-76 w-full max-w-lg sm:h-88 lg:mx-0 lg:max-w-none">
    <div aria-hidden="true" className="mkt-hero-glow absolute inset-0 -z-10" />

    <p className="mkt-annotation absolute -top-2 right-6 hidden max-w-40 text-right text-base leading-snug sm:block">
      Launch your
      <br />
      next big idea.
      <svg
        aria-hidden="true"
        className="ml-auto mt-1 text-primary/70"
        fill="none"
        height="34"
        viewBox="0 0 60 40"
        width="50"
      >
        <path
          d="M4 4 C 20 8, 40 18, 52 32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M40 30 L52 32 L47 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </p>

    {/* Back window — dark "SaaS dashboard" style */}
    <div className="mkt-mock mkt-mock-back absolute left-[6%] top-10 w-[72%] overflow-hidden rounded-xl bg-mkt-dark sm:top-14">
      <div className="flex items-center gap-1.5 border-b border-paper/10 px-3 py-2">
        <span className="size-2 rounded-full bg-paper/20" />
        <span className="size-2 rounded-full bg-paper/20" />
        <span className="size-2 rounded-full bg-paper/20" />
        <span className="ml-2 flex items-center gap-1.5 text-[11px] font-medium text-paper/70">
          <span className="grid size-3.5 place-items-center rounded bg-primary text-[8px] text-primary-foreground">
            B
          </span>
          The Buddy
        </span>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-base font-bold leading-tight text-paper sm:text-lg">
          Turn ideas
          <br />
          into real products.
        </p>
        <p className="max-w-40 text-[10px] text-paper/40">
          A modern template for startups and creators.
        </p>
        <div className="flex gap-2 pt-1">
          <span className="rounded-md bg-primary px-2.5 py-1 text-[10px] font-medium text-primary-foreground">
            Get started
          </span>
          <span className="rounded-md border border-paper/15 px-2.5 py-1 text-[10px] font-medium text-paper/70">
            View demo
          </span>
        </div>
      </div>
    </div>

    {/* Front window — light "product" style */}
    <div className="mkt-mock mkt-mock-front absolute bottom-0 right-[2%] w-[56%] overflow-hidden rounded-xl bg-mkt-light sm:right-0">
      <div className="flex items-center gap-1.5 border-b border-ink/5 px-3 py-2">
        <span className="size-2 rounded-full bg-ink/10" />
        <span className="size-2 rounded-full bg-ink/10" />
        <span className="size-2 rounded-full bg-ink/10" />
      </div>
      <div className="space-y-2 p-4">
        <p className="text-sm font-bold leading-tight text-ink sm:text-base">
          Simpler
          <br />
          tax filing for everyone.
        </p>
        <div className="mt-3 flex h-10 items-end gap-1">
          {[40, 65, 30, 80, 50].map((h) => (
            <span
              className="w-2.5 rounded-sm bg-topic-teal/70"
              key={h}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>

    <Icon
      className="absolute -right-2 top-1/2 hidden text-primary/50 sm:block lg:right-4"
      name="sparkles"
      size={22}
    />
  </div>
);
