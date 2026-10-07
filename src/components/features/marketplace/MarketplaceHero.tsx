import { Icon, type IconName } from "@/components/ui";
import { marketplaceConfig } from "@/packages/configs/marketplace.config";
import { HeroMockup } from "./HeroMockup";

export const MarketplaceHero = () => {
  const { hero } = marketplaceConfig;

  return (
    <section className="border-b border-border/70">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_26rem] lg:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            {hero.title}
            <br />
            <span className="text-gradient">{hero.highlight}</span>
          </h1>
          <p className="mt-5 max-w-lg text-muted-foreground">{hero.subtitle}</p>

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            {hero.features.map((feature) => (
              <li
                className="flex items-center gap-2 text-sm font-medium text-foreground/90"
                key={feature.label}
              >
                <Icon
                  className="text-primary"
                  name={feature.icon as IconName}
                  size={17}
                />
                {feature.label}
              </li>
            ))}
          </ul>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
};
