"use client";

import { Icon } from "@/components/ui";
import StylishIcon from "@/components/ui/icon/StylishIcon";
import Reveal from "@/components/ui/reveal/Reveal";
import { siteConfig } from "@/packages/configs/site.config";

const Metrics = () => {
  const { metrics } = siteConfig;
  return (
    <section className="px-6">
      <Reveal
        group
        className="mx-auto grid max-w-6xl grid-cols-2 gap-6 rounded-3xl border border-border bg-card/50 px-6 py-8 sm:grid-cols-4"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center gap-4">
            <StylishIcon size="sm">
              <Icon name={metric.icon} className="size-5" />
            </StylishIcon>

            <div>
              <p className="text-xl font-bold sm:text-2xl">{metric.value}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {metric.label}
              </p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

export default Metrics;
