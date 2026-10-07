import { Icon } from "@/components/ui";
import { marketplaceConfig } from "@/packages/configs/marketplace.config";

export const ComingSoonCard = () => {
  const lines = marketplaceConfig.comingSoon;

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
      <span className="grid size-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
        <Icon name="image" size={22} />
      </span>
      <p className="mt-4 whitespace-pre-line text-lg font-semibold leading-snug">
        {lines.title}
      </p>
      <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
        {lines.subtitle}
      </p>
    </div>
  );
};
