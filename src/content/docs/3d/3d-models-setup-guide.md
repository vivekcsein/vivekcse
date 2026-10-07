---
description: "How a GLB gets onto the site: optimize it with one command, register it in model3d.config.ts, tune it live in the dev Model lab, then place it with ClientModelViewer."
date: 2026-09-12
keywords: [3d, glb, three.js, react three fiber, animation, performance]
featured: false
---

# Setting Up 3D Elements (GLB Models)

How to take a `.glb` file from Blender (or your 3D designer) and get it on
the site — optimized, correctly sized, positioned, animated and themed —
without writing new Three.js/R3F code each time.

## How it fits together

```
models-src/*.glb                      ← raw exports from Blender (keep these)
        │  bun run models:optimize
        ▼
public/models/*.glb                   ← web-ready files the site serves
src/packages/configs/model3d.config.ts   ← one entry per model: size, position, animation, effects
src/packages/configs/models.manifest.ts  ← auto-generated list of files that exist (models:sync)
src/components/features/models/
  ClientModelViewer.tsx   ← USE THIS in pages (lazy, SSR-safe, pauses off-screen)
  ModelViewer.tsx         ← Canvas + lights + model + effects
  GlbModel.tsx            ← loads, auto-fits and animates one GLB
  PlaceholderModel.tsx    ← stand-in shown until the GLB exists
  effects/                ← underglow, orbit rings, floating tiles, sparkles, parallax
```

The normal workflow is: **drop the raw file → `bun run models:optimize` →
tune in the Model lab → paste the values into `model3d.config.ts` → place
`<ClientModelViewer modelKey="…" />`.**

Every slot already exists in `model3d.config.ts` with a procedural
placeholder, so you can build the page and the effects _before_ a model is
exported. The moment `public/models/<file>` exists, the real model replaces
the placeholder — no code change.

## 1. Getting the file from your designer

- Format: **`.glb`** (single file, textures embedded), not `.gltf` + folder.
- Origin at the **centre of the model's base**, facing +Z, Y up. Apply scale
  and rotation in Blender before export.
- No backdrop planes or lights baked in — the page provides those. (If one
  slips through, list its material in `optimize.drop`.)
- Give emissive parts real emissive materials (screens, neon) — they pick up
  the theme's glow.
- If there is a baked animation, note the **exact clip name** for `clip`.
- Drop the file in **`models-src/`** using the `file` name from the config
  (e.g. `models-src/avatar.glb`).

## 2. Optimize

```bash
bun run models:optimize                # every model that has a raw file
bun run models:optimize hero-workstation   # one model, by key or file name
```

Reads `models-src/`, writes `public/models/`. It drops unwanted materials,
merges meshes that share a material (fewer draw calls), welds vertices,
optionally simplifies, quantizes and prunes. Example (the hero desk):

| | Before | After |
| --- | --- | --- |
| File size | 3.25 MB | 1.03 MB |
| Triangles | 148,392 | 65,201 |
| Draw calls | 179 | 28 |

Per-model options live in the config:

```ts
optimize: { simplify: 0.4, drop: ["Backdrop_Gradient"], maxTexture: 1024 },
```

`bun run models:sync` (runs automatically before `dev`/`build`) prints which
slots are still placeholders and warns when a file is over budget
(1.5 MB, hero 2.5 MB).

> Draco/Meshopt _compression_ is deliberately not used: it needs a WASM
> decoder at runtime, which the site's CSP does not allow.

## 3. Register and tune it

```ts
// src/packages/configs/model3d.config.ts
{
  key: "showcase-database",          // ← you reference the model by this key
  file: "database.glb",              // ← name inside public/models
  placeholder: "database",           // ← shown until the file exists
  size: 1.7,                         // ← largest axis, in scene units
  position: [0, 0, 0],               // ← nudge after auto-centering
  rotation: [0, 0, 0],               // ← radians
  animation: "float-spin",
  clip: undefined,                   // ← baked clip name, if any
  camera: { position: [0, 1.2, 6], fov: 40 },
  effects: [{ type: "underglow" }, { type: "orbit-rings", count: 2 }],
}
```

**Tune it live:** run `bun dev`, open `/dev` → **Model lab**. Pick a slot,
drag the sliders for size / position / rotation / camera / effects, watch the
FPS counter, then press **Copy values** and paste them into the entry. The
lab only exists in development; it is not in the production build.

## 4. Sizing

You don't need to know the scale your designer exported at. On load the
model is measured and uniformly scaled so its **largest axis equals `size`**,
then centred. Change `size` to make a model bigger or smaller — never ask
for a re-export.

| Use case | Suggested `size` |
| --- | --- |
| Small showcase tile (grid of 4) | `1.4 – 1.8` |
| Section hero (desk, avatar, globe) | `3 – 4` |
| Full-bleed centerpiece | `4+` |

## 5. Animation presets

| Preset | What it does |
| --- | --- |
| `"none"` | Static. |
| `"float"` | Gentle up/down drift with slight tilt. |
| `"spin"` | Slow continuous Y rotation. |
| `"float-spin"` | Both — default for showcase tiles. |
| `"entrance"` | One-time GSAP "pop in" (scale 0 → 1). |

A baked clip (`clip: "Idle"`) plays independently of the preset. All motion
switches off when the visitor has _reduce motion_ enabled. Wrong clip name?
In development the console lists the available names.

## 6. Effects

Listed per model in `effects`. Every colour comes from the active theme
(`--primary`, `--accent-foreground`, …) and updates when the theme changes —
never hard-code a colour in a 3D component.

| `type` | Look |
| --- | --- |
| `"underglow"` | Pulsing neon glow + ring on the floor under the model. |
| `"orbit-rings"` (`count`) | Thin glowing rings turning around the model. |
| `"tiles"` (`items`) | Glass tiles hovering around it (React / TS / Next…). |
| `"sparkles"` (`count`) | Faint drifting dots. |
| `"pointer-parallax"` (`strength`) | Whole scene eases toward the cursor. |

To add an effect: create a component in `models/effects/`, add its `type`
to `ModelEffect` in the config, and map it in `effects/index.tsx`.

## 7. Placing it on a page

Always use **`ClientModelViewer`** (the Canvas can't be server-rendered).

```tsx
import { ClientModelViewer } from "@/components/features/models/ClientModelViewer";

const ShowcaseCard = () => (
  <div className="aspect-square rounded-3xl border border-border">
    <ClientModelViewer modelKey="showcase-database" />
  </div>
);
```

| Prop | Meaning |
| --- | --- |
| `modelKey` | The `key` from `model3d.config.ts`. |
| `className` | Sizing is up to the parent — give it an explicit height. |
| `eager` | Mount immediately (above-the-fold hero). Default: when scrolled near. |
| `interactive` | Visitors can drag-orbit. Leave off for decorative tiles. |
| `overrides` | Override size / position / effects for one usage. |

## 8. Performance and security notes

- Three.js loads in its own chunk, only when a viewer is within 300 px of
  the viewport, and rendering pauses while it is off-screen.
- Pixel ratio is capped and drops automatically if the frame rate falls.
- No WebGL (or a failed GLB) shows a CSS glow / the placeholder — never a
  broken page.
- Keep the 4-up showcase light: `size` ≈ 1.7, no `interactive`, ~1 effect
  pair each.
- The strict CSP blocks third-party fetches, so don't use drei's
  `<Environment preset="…">` (it downloads an HDR). Lights use a built-in
  procedural environment.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Slot shows the placeholder | The file isn't in `public/models/` yet, or the `file` name doesn't match. Run `bun run models:sync`. |
| Model tiny or huge | Adjust `size`, not the GLB. |
| Model off-centre | A stray empty/light far from the origin is counted in the bounds — delete it in Blender. |
| Parts look flat/dark | Missing emissive on glowing parts, or the material was merged/dropped — check `optimize.drop`. |
| `clip` doesn't play | Name typo — the dev console lists the real clip names. |
| Hydration error mentioning `WebGLRenderer` | A viewer was imported directly instead of `ClientModelViewer`. |
| Works locally, not on GitHub Pages sub-path | Don't hard-code `/models/…`; the viewer prefixes the base path itself. |
