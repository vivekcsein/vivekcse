import type { ComponentType } from "react";
import type { IconProps } from "@/types/app";
import { type BrandIconName, brandIcons } from "./BrandIcons";
import { type LucideIconName, lucideIcons } from "./LucideLibrary";

type IconComponent = ComponentType<IconProps>;

const iconMap = {
  ...lucideIcons,
  ...brandIcons,
} satisfies Record<string, IconComponent>;

export type IconName = LucideIconName | BrandIconName;

export type IconsLibraryProps = IconProps & {
  /**
   * Icon key from configuration.
   */
  name?: IconName;
};

const IconsLibrary = ({
  name,
  className,
  size = 24,
  strokeWidth,
  "aria-hidden": ariaHidden = true,
}: IconsLibraryProps) => {
  if (!name) {
    return null;
  }

  const Icon = iconMap[name];

  if (!Icon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`IconsLibrary: no icon mapped for "${name}"`);
    }

    return null;
  }

  return (
    <Icon
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden={ariaHidden}
    />
  );
};

export default IconsLibrary;
