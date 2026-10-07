import type { Metadata } from "next";
import { metadata } from "../configs/seo.config";

const seo: Metadata = {
  ...metadata,
};

export default seo;

export function getSeo(title: string, description: string, keywords: string[]) {
  return {
    title,
    description,
    keywords,
    ...seo,
  };
}
