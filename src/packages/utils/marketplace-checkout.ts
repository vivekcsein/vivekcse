import { marketplaceConfig } from "@/packages/configs/marketplace.config";
import type { MarketplaceProduct } from "@/types/marketplace";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const cartTotal = (products: MarketplaceProduct[]): number =>
  products.reduce((sum, product) => sum + product.price, 0);

const buildMessage = (products: MarketplaceProduct[]): string => {
  const lines = products.map(
    (product) => `• ${product.title} — ${currency.format(product.price)}`,
  );

  return [
    `Hi ${marketplaceConfig.name}! I'd like to buy:`,
    "",
    ...lines,
    "",
    `Total: ${currency.format(cartTotal(products))}`,
  ].join("\n");
};

/** wa.me deep link, pre-filled with the cart contents — opens WhatsApp Web or the app. */
export const buildWhatsappCheckoutUrl = (
  products: MarketplaceProduct[],
): string => {
  const text = encodeURIComponent(buildMessage(products));
  return `https://wa.me/${marketplaceConfig.cart.whatsappNumber}?text=${text}`;
};
