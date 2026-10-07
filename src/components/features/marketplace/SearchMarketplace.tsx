import { useState } from "react";
import { Icon } from "@/components/ui";
import { marketplaceConfig } from "@/packages/configs/marketplace.config";

const SearchMarketplace = () => {
  const [query, setQuery] = useState("");

  return (
    <label className="relative hidden w-full max-w-xs sm:block">
      <span className="sr-only">Search templates</span>
      <Icon
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        name="search"
        size={16}
      />
      <input
        className="h-10 w-full rounded-full border border-border bg-card/60 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground hover:border-primary/40 focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
        onChange={(event) => setQuery(event.target.value)}
        placeholder={marketplaceConfig.searchPlaceholder}
        type="search"
        value={query}
      />
    </label>
  );
};

export default SearchMarketplace;
