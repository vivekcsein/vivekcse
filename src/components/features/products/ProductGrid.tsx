"use client";

import { useMemo, useState } from "react";
import { Icon, Select } from "@/components/ui";
import { marketplaceConfig } from "@/packages/configs/marketplace.config";
import type { MarketplaceProduct } from "@/types/marketplace";
import { ComingSoonCard } from "./ComingSoonCard";
import { ProductCard } from "./ProductCard";

type SortKey = "latest" | "price-asc" | "price-desc" | "az";

const SORTS: Record<SortKey, string> = {
  latest: "Latest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  az: "Name A → Z",
};

const sorters: Record<
  SortKey,
  (a: MarketplaceProduct, b: MarketplaceProduct) => number
> = {
  latest: (a, b) => b.addedAt.localeCompare(a.addedAt),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  az: (a, b) => a.title.localeCompare(b.title),
};

const normalize = (value: string) => value.toLowerCase().trim();

type ProductGridProps = { products: MarketplaceProduct[] };

export const ProductGrid = ({ products }: ProductGridProps) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("latest");

  const visible = useMemo(() => {
    const needle = normalize(query);
    const filtered = needle
      ? products.filter((product) =>
          [
            product.title,
            product.category,
            product.description,
            ...product.tags,
          ]
            .map(normalize)
            .some((field) => field.includes(needle)),
        )
      : products;

    return [...filtered].sort(sorters[sort]);
  }, [products, query, sort]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block flex-1">
          <span className="sr-only">Search templates</span>
          <Icon
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            name="search"
            size={17}
          />
          <input
            className="h-11 w-full max-w-md rounded-lg border border-border bg-card/60 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground hover:border-primary/40 focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={marketplaceConfig.searchPlaceholder}
            type="search"
            value={query}
          />
        </label>

        <div className="flex shrink-0 items-center gap-3">
          <span className="text-sm text-muted-foreground">Sort by</span>
          <Select
            className="w-40"
            label="Sort templates"
            onChange={(next) => setSort(next as SortKey)}
            options={Object.entries(SORTS).map(([value, label]) => ({
              value,
              label,
            }))}
            value={sort}
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-14 text-center text-muted-foreground">
          No templates match “{query.trim()}”.
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
          {!query.trim() && (
            <li>
              <ComingSoonCard />
            </li>
          )}
        </ul>
      )}
    </section>
  );
};
