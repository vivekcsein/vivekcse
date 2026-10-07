import type { CSSProperties } from "react";
import appConfig from "@/packages/configs/app.config";
import ImageComponent from "./ImageComponent";

type NavigationLogoProps = {
  /** Override the default site logo — useful for a dark/light variant swap. */
  src?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * The site logo, pre-wired to `appConfig.site` and linked to home — drop
 * straight into Header without passing src/alt/href every time.
 *
 * Default size (40) is tuned for a header/nav bar. Pass a larger explicit
 * `width`/`height` for contexts like the footer brand column. If you
 * resize via className, prefer setting only `width` (e.g. `w-10`) and
 * let `height: auto` (handled in ImageComponent) keep the ratio — don't
 * pair it with a conflicting `h-*` class.
 */
const NavigationLogo = ({
  src,
  width = 150,
  height = 40,
  className,
  style,
}: NavigationLogoProps) => (
  <ImageComponent
    id="navigation-logo"
    src={src ?? appConfig.site.logo}
    alt={`${appConfig.site.name}-logo`}
    href={appConfig.routes.home}
    width={width}
    height={height}
    className={className}
    style={style}
    priority
  />
);

NavigationLogo.displayName = "NavigationLogo";

export default NavigationLogo;
