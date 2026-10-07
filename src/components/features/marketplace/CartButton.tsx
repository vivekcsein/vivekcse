"use client";

import Link from "next/link";
import { Icon } from "@/components/ui";
import { marketplaceConfig } from "@/packages/configs/marketplace.config";
import { useMarketplaceCart } from "@/packages/hooks/";
import { cn } from "@/packages/utils/cn";

const iconButton =
  "grid size-10 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary/40 hover:bg-muted";

const CartButton = () => {
  const { count } = useMarketplaceCart();

  return (
    <Link
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
      className={cn(iconButton, "relative")}
      href={marketplaceConfig.cart.href}
    >
      <Icon name="shopping-cart" size={17} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid size-4.5 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
