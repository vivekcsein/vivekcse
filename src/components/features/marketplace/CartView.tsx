"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Icon } from "@/components/ui";
import {
  marketplaceConfig,
  marketplaceProducts,
} from "@/packages/configs/marketplace.config";
import { useMarketplaceCart } from "@/packages/hooks";
import {
  buildWhatsappCheckoutUrl,
  cartTotal,
} from "@/packages/utils/marketplace-checkout";
import { marketplaceColorStyle } from "@/packages/utils/marketplace-style";

const currency = (value: number) => `$${value}`;

export const CartView = () => {
  const { slugs, remove } = useMarketplaceCart();

  const products = useMemo(
    () =>
      slugs.flatMap(
        (slug) =>
          marketplaceProducts.find((product) => product.slug === slug) ?? [],
      ),
    [slugs],
  );

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border p-14 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full border border-border bg-muted/50 text-muted-foreground">
          <Icon name="shopping-cart" size={24} />
        </span>
        <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Browse the templates and hit “Buy” on the ones you want.
        </p>
        <Link
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          href="/marketplace"
        >
          <Icon name="arrow-left" size={15} />
          Browse templates
        </Link>
      </div>
    );
  }

  const total = cartTotal(products);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <ul className="space-y-3">
        {products.map((product) => (
          <li
            className="mkt-card flex items-center gap-4 rounded-xl p-4"
            key={product.slug}
            style={marketplaceColorStyle(product.color)}
          >
            <span
              className="mkt-badge grid size-12 shrink-0 place-items-center rounded-lg text-sm font-bold"
              aria-hidden="true"
            >
              {product.title.charAt(0)}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{product.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {product.category}
              </p>
            </div>

            <p className="shrink-0 text-base font-bold">
              {currency(product.price)}
            </p>

            <button
              aria-label={`Remove ${product.title} from cart`}
              className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => remove(product.slug)}
              type="button"
            >
              <Icon name="close" size={16} />
            </button>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-2xl border border-border bg-card/60 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Order summary
        </h2>

        <div className="mt-4 space-y-2 border-b border-border pb-4 text-sm">
          {products.map((product) => (
            <div
              className="flex justify-between text-muted-foreground"
              key={product.slug}
            >
              <span className="truncate pr-3">{product.title}</span>
              <span className="shrink-0">{currency(product.price)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Total
          </span>
          <span className="text-2xl font-bold">{currency(total)}</span>
        </div>

        <a
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp text-sm font-semibold text-ink shadow-[0_10px_28px_-10px_var(--brand-whatsapp)] transition-transform hover:scale-[1.02]"
          href={buildWhatsappCheckoutUrl(products)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon name="whatsapp" size={18} />
          Checkout via WhatsApp
        </a>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Opens WhatsApp with your order pre-filled — {marketplaceConfig.name}{" "}
          confirms payment and sends the files there.
        </p>
      </aside>
    </div>
  );
};
