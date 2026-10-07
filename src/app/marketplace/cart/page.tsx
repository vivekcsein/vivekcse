import type { Metadata } from "next";
import Link from "next/link";
import { CartView } from "@/components/features/marketplace/CartView";
import { Icon } from "@/components/ui";
import { marketplaceConfig } from "@/packages/configs/marketplace.config";

export const metadata: Metadata = {
  title: `Cart — ${marketplaceConfig.name}`,
  robots: { index: false },
};

const CartPage = () => (
  <>
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <Link
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        href="/marketplace"
      >
        <Icon name="arrow-left" size={18} />
        Continue browsing
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">Your Cart</h1>
      <p className="mt-1.5 text-muted-foreground">
        Review your templates, then check out over WhatsApp.
      </p>

      <div className="mt-8">
        <CartView />
      </div>
    </div>
  </>
);

export default CartPage;
