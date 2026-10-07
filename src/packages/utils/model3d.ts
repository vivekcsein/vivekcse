import appConfig from "@/packages/configs/app.config";
import type { Model3D } from "@/packages/configs/model3d.config";
import { MODEL_FILES } from "@/packages/configs/models.manifest";

/**
 * URL of a model's GLB, or `null` when the file isn't in public/models yet
 * (the viewer then renders the placeholder and never requests a 404).
 *
 * `?v=<bytes>` busts caches when a model is re-optimized, since static hosts
 * cache aggressively.
 */
export const resolveModelSrc = (model: Model3D): string | null => {
  const entry = MODEL_FILES.find((f) => f.file === model.file);
  if (!entry) return null;
  return `${appConfig.site.basePath}/models/${model.file}?v=${entry.bytes}`;
};
