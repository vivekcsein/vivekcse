/**
 * model3d.config.ts — single source of truth for every 3D model on the site.
 *
 * Workflow (see docs/3d/3d-models-setup-guide and figma/3d-slots.md):
 *   1. Export the raw GLB into `models-src/<file>`.
 *   2. `bun run models:optimize`  → writes the web-ready file to `public/models/`.
 *   3. `bun run models:sync`      → refreshes models.manifest.ts (automatic on dev/build).
 *   4. Render it with <ClientModelViewer modelKey="…" />.
 *
 * Until the GLB exists, the slot renders a procedural `placeholder`, so pages
 * and effects can be built and tuned before the real model arrives.
 */

export type Vec3 = readonly [number, number, number];

export type ModelAnimation =
  | "none"
  | "float"
  | "spin"
  | "float-spin"
  | "entrance";

export type PlaceholderKind =
  | "workstation"
  | "avatar"
  | "laptop"
  | "server"
  | "database"
  | "phone"
  | "globe";

/** Decorative effects rendered around the model (all colours follow the theme). */
export type ModelEffect =
  | { type: "underglow" }
  | { type: "orbit-rings"; count?: number }
  | { type: "tiles"; items: readonly string[] }
  | { type: "sparkles"; count?: number }
  | { type: "pointer-parallax"; strength?: number };

/** Options for `bun run models:optimize`. */
export type ModelOptimize = {
  /** Keep this fraction of triangles (0–1). Omit to keep all. */
  simplify?: number;
  /** Material names to delete (e.g. a baked-in backdrop plane). */
  drop?: readonly string[];
  /** Downscale textures larger than this (px). Needs `sharp`. */
  maxTexture?: number;
};

export type Model3D = {
  key: string;
  /** File name inside public/models. */
  file: string;
  /** Shown while the file is missing (and if loading fails). */
  placeholder: PlaceholderKind;
  /** Largest bounding-box axis after auto-fit, in scene units. */
  size: number;
  /** Nudge after auto-centering. */
  position: Vec3;
  /** Radians, applied after auto-centering. */
  rotation: Vec3;
  animation: ModelAnimation;
  /** Name of a baked-in animation clip to play. */
  clip?: string;
  camera: { position: Vec3; fov: number };
  effects: readonly ModelEffect[];
  optimize?: ModelOptimize;
};

const DEFAULT_CAMERA = { position: [0, 1.2, 6], fov: 40 } as const;

export const MODELS = [
  // ── Hero (Figma: "I build digital products…") ────────────────────────────
  {
    key: "hero-workstation",
    file: "work-station.glb",
    placeholder: "workstation",
    size: 4,
    position: [0, -0.2, 0],
    rotation: [0.12, -0.5, 0],
    animation: "float",
    // y≈0 centres the scene vertically (a camera at y=1.4 looks straight ahead,
    // so everything sat low in the frame and the desk was cropped).
    camera: { position: [0, 0.1, 7.5], fov: 38 },
    effects: [
      { type: "underglow" },
      { type: "tiles", items: ["React", "Next", "TS", "JS", "DB", "</>"] },
      { type: "sparkles", count: 26 },
      { type: "pointer-parallax", strength: 0.35 },
    ],
    optimize: { simplify: 0.4, drop: ["Backdrop_Gradient"] },
  },

  // ── About (Figma: avatar inside orbit ring) ──────────────────────────────
  {
    key: "about-avatar",
    file: "avatar.glb",
    placeholder: "avatar",
    size: 3,
    position: [0, 0, 0],
    rotation: [0, -0.2, 0],
    animation: "float",
    camera: DEFAULT_CAMERA,
    effects: [
      { type: "orbit-rings", count: 2 },
      { type: "tiles", items: ["</>", "JS", "TS"] },
      { type: "sparkles", count: 18 },
      { type: "pointer-parallax", strength: 0.25 },
    ],
    optimize: { simplify: 0.6 },
  },

  // ── Interactive 3D Showcase: 4 podium tiles ──────────────────────────────
  {
    key: "showcase-web-apps",
    file: "web-apps.glb",
    placeholder: "laptop",
    size: 1.7,
    position: [0, 0, 0],
    rotation: [0, -0.4, 0],
    animation: "float-spin",
    camera: DEFAULT_CAMERA,
    effects: [{ type: "underglow" }, { type: "orbit-rings", count: 1 }],
    optimize: { simplify: 0.6 },
  },
  {
    key: "showcase-backend",
    file: "backend.glb",
    placeholder: "server",
    size: 1.7,
    position: [0, 0, 0],
    rotation: [0, -0.4, 0],
    animation: "float-spin",
    camera: DEFAULT_CAMERA,
    effects: [{ type: "underglow" }, { type: "orbit-rings", count: 1 }],
    optimize: { simplify: 0.6 },
  },
  {
    key: "showcase-database",
    file: "database.glb",
    placeholder: "database",
    size: 1.7,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    animation: "float-spin",
    camera: DEFAULT_CAMERA,
    effects: [{ type: "underglow" }, { type: "orbit-rings", count: 2 }],
    optimize: { simplify: 0.6 },
  },
  {
    key: "showcase-ar",
    file: "ar.glb",
    placeholder: "phone",
    size: 1.7,
    position: [0, 0, 0],
    rotation: [0, -0.4, 0],
    animation: "float-spin",
    camera: DEFAULT_CAMERA,
    effects: [{ type: "underglow" }, { type: "orbit-rings", count: 1 }],
    optimize: { simplify: 0.6 },
  },

  // ── CTA (Figma: "Let's build something amazing together") ────────────────
  {
    key: "cta-globe",
    file: "globe.glb",
    placeholder: "globe",
    size: 3.2,
    position: [0, 0, 0],
    rotation: [0.25, 0, 0],
    animation: "spin",
    camera: DEFAULT_CAMERA,
    effects: [
      { type: "orbit-rings", count: 2 },
      { type: "sparkles", count: 22 },
    ],
    optimize: { simplify: 0.6 },
  },
] as const satisfies readonly Model3D[];

export type ModelKey = (typeof MODELS)[number]["key"];

export const MODEL_KEYS: readonly ModelKey[] = MODELS.map((m) => m.key);

export const getModel = (key: ModelKey): Model3D =>
  MODELS.find((m) => m.key === key) ?? MODELS[0];
