"use client";

import { Button } from "@/components/ui";
import ImageComponent from "@/components/ui/images/ImageComponent";
import { siteConfig } from "@/packages/configs/site.config";
import { useTechStack } from "@/packages/gsap/useTechStack";

const TechStack = () => {
  const { techStack } = siteConfig;

  const { activeCategory, filteredItems, containerRef, setActiveCategory } =
    useTechStack({
      techStack,
    });

  return (
    <section
      ref={containerRef}
      className="w-full overflow-hidden no-scrollbar px-4 py-16 sm:px-6 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-4">
          {/* Heading */}
          <div className="tech-stack-heading">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {techStack.heading}
            </h3>
          </div>

          {/* Category filters */}
          <div
            className="
              tech-stack-filters
              -mx-1
              flex
              w-full
              gap-2
              overflow-x-auto
              px-1
              pt-1
              pb-1
              no-scrollbar
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {techStack.categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <Button
                  key={category}
                  type="button"
                  variant="secondary"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`
                    shrink-0
                    rounded-lg
                    px-3.5
                    py-2
                    text-xs
                    font-medium
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90"
                        : "border-border/70 bg-card/40 text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground"
                    }
                  `}
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Technology strip */}
        <div
          className="
            -mx-4
            overflow-x-auto
            px-4
            no-scrollbar
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
            sm:-mx-6
            sm:px-6
          "
        >
          <div
            className="
              flex
              w-max
              min-w-full
              gap-2
              pb-1
            "
          >
            {filteredItems.map((item) => (
              <TechCard key={item.name} name={item.name} image={item.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TechCardProps {
  name: string;
  image: string;
}

const TechCard = ({ name, image }: TechCardProps) => {
  return (
    <div
      className="
        tech-stack-card
        group
        flex
        h-19
        w-19
        shrink-0
        flex-col
        items-center
        justify-center
        gap-1.5
        rounded-xl
        border
        border-border/70
        bg-card/40
        px-2
        transition-colors
        duration-200
        hover:border-primary/30
        hover:bg-card
        sm:h-20
        sm:w-20
      "
    >
      <div className="relative flex size-8 items-center justify-center sm:size-9">
        <ImageComponent
          id={`tech-stack-card-${name}`}
          src={image}
          alt={name}
          width={36}
          height={36}
          className="
            size-7
            object-contain
            opacity-90
            transition-transform
            duration-200
            group-hover:scale-110
            group-hover:opacity-100
            sm:size-8
          "
        />
      </div>

      <span
        className="
          max-w-full
          truncate
          text-[10px]
          font-medium
          text-muted-foreground
          transition-colors
          duration-200
          group-hover:text-foreground
        "
      >
        {name}
      </span>
    </div>
  );
};

export default TechStack;
