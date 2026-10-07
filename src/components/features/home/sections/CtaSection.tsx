"use client";

import { Reveal } from "@/components/ui";
import { siteConfig } from "@/packages/configs/site.config";

const CtaSection = () => {
  const { cta } = siteConfig;

  return (
    <section id="contact" className="px-6 py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl border border-border bg-linear-to-br from-primary/20 via-background to-fuchsia-400/10 px-8 py-14 md:px-14">
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/25 blur-3xl" />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="left">
            <h2 className="text-3xl leading-tight font-bold text-balance sm:text-4xl">
              {cta.heading[0]}{" "}
              <span className="bg-linear-to-r from-primary to-fuchsia-400 bg-clip-text text-transparent">
                {cta.heading[1]}
              </span>
            </h2>

            <p className="mt-4 max-w-md text-muted-foreground">
              {cta.description}
            </p>

            <a
              href={cta.button.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]"
            >
              {cta.button.label} →
            </a>
          </Reveal>

          <Reveal direction="right" className="flex flex-col gap-4">
            <blockquote className="rounded-2xl border border-border bg-card/70 p-6 text-sm text-muted-foreground italic">
              “{cta.quote.text}”
              <footer className="mt-3 text-xs font-medium text-foreground not-italic">
                — {cta.quote.author}, {cta.quote.role}
              </footer>
            </blockquote>

            <p className="text-center text-xs tracking-wide text-muted-foreground uppercase">
              {cta.subtext}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
