"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui";
import Reveal from "@/components/ui/reveal/Reveal";
import { siteConfig } from "@/packages/configs/site.config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Journey = () => {
  const { journey } = siteConfig;
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;

    if (!track || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: track,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-medium tracking-wide text-primary uppercase">
            {journey.eyebrow}
          </span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            {journey.heading}
          </h2>
        </Reveal>

        <div ref={trackRef} className="relative">
          <div className="absolute top-6 right-0 left-0 hidden h-px bg-border lg:block" />
          <div
            ref={lineRef}
            className="absolute top-6 right-0 left-0 hidden h-px scale-x-0 bg-primary lg:block"
          />

          <Reveal
            group
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          >
            {journey.steps.map((step) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-4 flex size-12 items-center justify-center rounded-full border border-primary/40 bg-background text-primary shadow-[0_0_0_6px_var(--background)]">
                  <Icon name={step.icon} className="size-5" />
                </div>
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Journey;
