import type { ImgHTMLAttributes } from "react";

// Extended image metadata for logos, icons, etc.
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  id: string; // required unique identifier
  src: string; // required image source
  alt: string; // required alt text
  href?: string; // optional link wrapper
  width?: number; // optional width
  height?: number; // optional height
  color?: string; // optional color metadata
  className?: string; // optional className override
  loading?: "lazy" | "eager"; // optional loading strategy
  priority?: boolean; // optional priority metadata
}

// Icon metadata for navigation items, buttons, etc.
export type IconProps = {
  className?: string;
  size?: number;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
};
export type InputType =
  | "text"
  | "textarea"
  | "email"
  | "password"
  | "number"
  | "decimal"
  | "date"
  | "tel"
  | "url"
  | "select"
  | "multiselect"
  | "radio"
  | "checkbox"
  | "file"
  | "range"
  | "color";

/** Every input type this factory knows how to render. */
export type InputFactoryType =
  | "text"
  | "email"
  | "password"
  | "checkbox"
  | "select"
  | "textarea";

// Theme Mode
export type ThemeMode = "light" | "dark" | "system";

export type ResolvedThemeMode = Exclude<ThemeMode, "system">;

export type Variants =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"
  | "success"
  | "link";

export type Position = "top" | "left" | "right" | "bottom";

export type ResolvedXPosition = Exclude<Position, "top" | "bottom">;

export type ResolvedYPosition = Exclude<Position, "left" | "right">;

export type Axis = "horizontal" | "vertical";
