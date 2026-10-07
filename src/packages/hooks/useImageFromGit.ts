import appConfig from "../configs/app.config";

type GitImage = {
  src: string;
  alt?: string;
};

type ImageSource = GitImage[] | string;

const PLACEHOLDER_IMAGE = "/placeholder.jpg"; // logo.png exists in /public; a dedicated placeholder.png doesn't

const normalizePath = (path: string): string =>
  path.startsWith("/") ? path : `/${path}`;

export const useImageFromGit = (images: ImageSource, index = 0): string => {
  const githubImageUrl = appConfig.repository.imageUrl;

  if (!githubImageUrl) {
    return PLACEHOLDER_IMAGE;
  }

  if (typeof images === "string") {
    return `${githubImageUrl}${normalizePath(images)}`;
  }

  const image = images[index];

  if (!image?.src) {
    return `${githubImageUrl}${PLACEHOLDER_IMAGE}`;
  }

  return `${githubImageUrl}${normalizePath(image.src)}`;
};
