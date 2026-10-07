import type { CSSProperties } from "react";
import {
  type TopicColor,
  topicPalette,
} from "@/packages/configs/content.config";

/** Inline `--topic` custom property consumed by .topic-* classes. */
export const topicStyle = (color: TopicColor): CSSProperties =>
  ({ "--topic": topicPalette[color] }) as CSSProperties;
