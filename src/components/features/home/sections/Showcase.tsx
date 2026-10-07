"use client";

import Image from "next/image";
import { Icon, Reveal, ScrollStack, ScrollStackItem } from "@/components/ui";
import { siteConfig } from "@/packages/configs/site.config";

const Showcase = () => {
  const { showcase } = siteConfig;

  return (
    <section className="px-6 py-20 md:py-28" id="showcase">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 max-w-xl md:mb-14">
          <span className="text-xs font-medium tracking-wide text-primary uppercase">
            {showcase.eyebrow}
          </span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            {showcase.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">{showcase.description}</p>
        </Reveal>

        <ScrollStack>
          {showcase.items.map((item, index) => (
            <ScrollStackItem key={item.title}>
              <article
                aria-labelledby={`showcase-${index}`}
                className="relative grid gap-5 overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-lg md:grid-cols-2 md:items-center md:gap-10 md:p-10"
              >
                {/* soft brand tint, theme tokens only */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent"
                />

                {/* Visual — first on mobile, right on desktop */}
                <div className="relative order-1 aspect-16/10 w-full overflow-hidden rounded-2xl bg-muted md:order-2 md:aspect-4/3">
                  <Image
                    alt={item.image.alt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    src={item.image.src}
                  />
                </div>

                {/* Copy — centred on mobile, left-aligned on desktop */}
                <div className="relative order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
                  <div className="flex items-center gap-3 text-primary">
                    <span className="grid size-10 place-items-center rounded-xl border border-border bg-background/60">
                      <Icon name={item.icon} size={20} />
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-muted-foreground">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(showcase.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    className="mt-4 text-2xl font-bold tracking-tight md:text-3xl"
                    id={`showcase-${index}`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                    {item.description}
                  </p>
                </div>
              </article>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        <div className="mt-8 flex justify-center">
          <a
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]"
            href={showcase.cta.href}
          >
            {showcase.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
