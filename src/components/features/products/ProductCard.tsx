"use client";

import { Icon } from "@/components/ui";
import { useMarketplaceCart } from "@/packages/hooks";
import { cn } from "@/packages/utils/cn";
import { marketplaceColorStyle } from "@/packages/utils/marketplace-style";
import type { MarketplaceProduct } from "@/types/marketplace";

type ProductCardProps = { product: MarketplaceProduct };

export const ProductCard = ({ product }: ProductCardProps) => {
  const { slugs, toggle } = useMarketplaceCart();
  const inCart = slugs.includes(product.slug);
  const isDark = product.preview.chrome === "dark";

  return (
    <div
      className="mkt-card group flex h-full flex-col overflow-hidden rounded-2xl"
      style={marketplaceColorStyle(product.color)}
    >
      {/* Mini "browser window" preview */}
      <div
        className={cn(
          "mkt-browser relative h-44 shrink-0",
          !isDark && "mkt-browser--light",
        )}
      >
        <span className="mkt-badge absolute left-3 top-3 z-10 rounded-md px-2.5 py-1 text-[11px] font-semibold">
          {product.category}
        </span>

        <div
          className={cn(
            "relative flex h-full flex-col px-4 pb-4 pt-9",
            isDark ? "text-paper" : "text-ink",
          )}
        >
          <div
            className={cn(
              "mb-3 flex items-center gap-3 border-b pb-2 text-[10px]",
              isDark
                ? "border-paper/10 text-paper/50"
                : "border-ink/5 text-ink/40",
            )}
          >
            <span className="flex items-center gap-1 font-semibold">
              <span
                className="mkt-badge grid size-3.5 place-items-center rounded text-[8px]"
                aria-hidden="true"
              >
                {product.preview.siteName.charAt(0)}
              </span>
              <span className={isDark ? "text-paper/80" : "text-ink/70"}>
                {product.preview.siteName}
              </span>
            </span>
            <span className="ml-auto hidden gap-3 sm:flex">
              <span>Features</span>
              <span>Pricing</span>
              <span>FAQ</span>
            </span>
          </div>

          <p className="text-lg font-bold leading-tight">
            {product.preview.heading}
            {product.preview.headingAccent && (
              <>
                <br />
                {product.preview.headingAccent}
              </>
            )}
          </p>

          <span
            className={cn(
              "mkt-badge mt-auto w-fit rounded-md px-2.5 py-1 text-[10px] font-medium",
              !isDark && "text-paper",
            )}
          >
            {product.preview.cta}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight">
            {product.title}
          </h3>
          <span className="shrink-0 text-lg font-bold">${product.price}</span>
        </div>

        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-1">
          {product.tags.map((tag) => (
            <span
              className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              key={tag}
            >
              {tag}
            </span>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <button
              aria-pressed={inCart}
              className={cn(
                "rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors",
                inCart
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
              onClick={() => toggle(product.slug)}
              type="button"
            >
              {inCart ? "Added" : "Buy"}
            </button>

            <a
              aria-label={`Preview ${product.title}`}
              className="mkt-card-arrow grid size-8 shrink-0 place-items-center rounded-full"
              href={product.previewHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="arrow-right" size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
