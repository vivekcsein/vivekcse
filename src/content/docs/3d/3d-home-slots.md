---
description: "3D model slots, asset requirements, configuration, optimization workflow, and implementation guidance for the homepage."
date: 2026-09-12
keywords:
  [
    3d,
    glb,
    three.js,
    react three fiber,
    models,
    animation,
    performance,
    homepage,
  ]
featured: false
---

# 3D Homepage Models

This document defines the 3D elements used throughout the homepage, their corresponding Figma locations, model configuration keys, asset paths, placeholders, and visual effects.

The homepage is designed so that **layout and interactions can be implemented before all final GLB assets are available**. When a production model does not yet exist, the corresponding slot renders a procedural placeholder.

This allows the homepage 3D system to be developed incrementally without blocking the rest of the UI.

---

## Overview

The homepage contains seven planned 3D model slots:

1. Hero workstation
2. About avatar
3. Web Apps showcase
4. APIs & Backend showcase
5. Database showcase
6. AR Experiences showcase
7. CTA globe

Each model is registered through:

```text
src/packages/configs/model3d.config.ts
```

Production GLB files are served from:

```text
public/models/
```

Raw, unoptimized source files are kept outside the public directory:

```text
models-src/
```

### 3D Asset Flow

```text
models-src/
    │
    ├── work-station.glb
    ├── avatar.glb
    ├── web-apps.glb
    ├── backend.glb
    ├── database.glb
    ├── ar.glb
    └── globe.glb
          │
          ▼
   models:optimize
          │
          ▼
public/models/
    │
    ├── work-station.glb
    ├── avatar.glb
    ├── web-apps.glb
    ├── backend.glb
    ├── database.glb
    ├── ar.glb
    └── globe.glb
          │
          ▼
model3d.config.ts
          │
          ▼
React Three Fiber
```

---

# Model Slots

## 1. Hero — Workstation

### Figma section

**Hero — "I build digital products…"**

The hero contains the primary 3D workstation scene. It visually communicates the developer/product-building theme and acts as the main 3D focal point on the homepage.

### Configuration

```text
Model key:
hero-workstation
```

### Asset

```text
Raw:
models-src/work-station.glb

Served:
public/models/work-station.glb
```

**Status:** ✅ Available

### Placeholder

```text
workstation
```

The placeholder should preserve the approximate dimensions and composition of the final workstation so that replacing it with the production GLB does not require major layout changes.

### Effects

- Purple under-glow
- Floating technology tiles
- Sparkles
- Pointer parallax
- Technology labels/icons:
  - React
  - Next.js
  - TypeScript
  - JavaScript
  - Database
  - `</>`

### Design intent

The workstation should feel like a developer workspace rather than a generic 3D computer model.

The supporting effects should remain separate from the GLB whenever possible. This keeps the model lightweight and allows effects to be controlled independently.

---

# 2. About — Avatar

### Figma section

**About — "Building solutions that solve real problems"**

The About section uses a 3D avatar surrounded by orbital elements.

### Configuration

```text
Model key:
about-avatar
```

### Asset

```text
Raw:
models-src/avatar.glb

Served:
public/models/avatar.glb
```

### Status

⏳ Pending

### Placeholder

```text
avatar
```

### Effects

- Two orbit rings
- Floating technology tiles
- Sparkles
- Pointer parallax

### Technology tiles

The supporting tiles should represent the development stack:

```text
</>
JS
TS
```

The avatar should remain the primary visual element while the rings and tiles provide depth and motion.

---

# 3. Interactive 3D Showcase — Web Apps

### Figma section

**Interactive 3D Showcase — Web Apps**

This slot represents frontend and web application development.

### Configuration

```text
Model key:
showcase-web-apps
```

### Asset

```text
Raw:
models-src/web-apps.glb

Served:
public/models/web-apps.glb
```

### Status

⏳ Pending

### Placeholder

```text
laptop
```

### Effects

- Under-glow
- Orbit rings

### Design intent

The laptop should visually communicate modern web application development while remaining compact enough to work within the showcase grid.

---

# 4. Showcase — APIs & Backend

### Figma section

**Showcase — APIs & Backend**

This model represents backend infrastructure, APIs, services, and server-side development.

### Configuration

```text
Model key:
showcase-backend
```

### Asset

```text
Raw:
models-src/backend.glb

Served:
public/models/backend.glb
```

### Status

⏳ Pending

### Placeholder

```text
server
```

### Effects

- Under-glow
- Orbit rings

### Design intent

The composition should communicate server infrastructure without becoming visually heavy compared with the other showcase models.

---

# 5. Showcase — Databases

### Figma section

**Showcase — Databases**

This model represents database systems and data storage.

### Configuration

```text
Model key:
showcase-database
```

### Asset

```text
Raw:
models-src/database.glb

Served:
public/models/database.glb
```

### Status

⏳ Pending

### Placeholder

```text
database
```

### Effects

- Under-glow
- Two orbit rings

### Design intent

The stacked-disk/database form should remain visually recognizable at the size used in the showcase section.

The orbital rings provide additional depth while reinforcing the circular geometry of the database model.

---

# 6. Showcase — AR Experiences

### Figma section

**Showcase — AR Experiences**

This model represents augmented-reality and interactive 3D experiences.

### Configuration

```text
Model key:
showcase-ar
```

### Asset

```text
Raw:
models-src/ar.glb

Served:
public/models/ar.glb
```

### Status

⏳ Pending

### Placeholder

```text
phone
```

### Effects

- Under-glow
- Orbit rings

### Design intent

The phone should act as the primary visual anchor, with the AR character or content extending beyond the device to communicate the interactive nature of the experience.

---

# 7. CTA — Globe

### Figma section

**CTA — "Let's build something amazing together"**

The final 3D element is a globe used in the call-to-action section.

### Configuration

```text
Model key:
cta-globe
```

### Asset

```text
Raw:
models-src/globe.glb

Served:
public/models/globe.glb
```

### Status

⏳ Pending

### Placeholder

```text
globe
```

### Effects

- Two orbit rings
- Sparkles

### Design intent

The globe should communicate connectivity, collaboration, and global digital products.

It should be visually distinct from the showcase models and work well as the closing visual element of the homepage.

---

# Model Registry

All homepage models should be represented in `model3d.config.ts`.

| #   | Section  | Model Key           | Raw Asset          | Served Asset       | Placeholder | Status     |
| --- | -------- | ------------------- | ------------------ | ------------------ | ----------- | ---------- |
| 1   | Hero     | `hero-workstation`  | `work-station.glb` | `work-station.glb` | workstation | ✅ Ready   |
| 2   | About    | `about-avatar`      | `avatar.glb`       | `avatar.glb`       | avatar      | ⏳ Pending |
| 3   | Web Apps | `showcase-web-apps` | `web-apps.glb`     | `web-apps.glb`     | laptop      | ⏳ Pending |
| 4   | Backend  | `showcase-backend`  | `backend.glb`      | `backend.glb`      | server      | ⏳ Pending |
| 5   | Database | `showcase-database` | `database.glb`     | `database.glb`     | database    | ⏳ Pending |
| 6   | AR       | `showcase-ar`       | `ar.glb`           | `ar.glb`           | phone       | ⏳ Pending |
| 7   | CTA      | `cta-globe`         | `globe.glb`        | `globe.glb`        | globe       | ⏳ Pending |

---

# GLB Export Requirements

Every production model should follow the same export conventions.

## Coordinate System

Models must use:

```text
Y-up
```

The model should be positioned so that:

- The origin is centered at the base.
- The model faces `+Z`.
- The model sits naturally on the virtual ground plane.
- No additional translation should be required just to place the model on its base.

This makes model placement predictable across different homepage sections.

---

# Model Orientation

Before exporting:

```text
Up:
+Y

Forward:
+Z

Origin:
Center of the model base
```

Avoid exporting models with arbitrary rotations or offsets.

If a model requires unusual orientation, apply the transformation in Blender before exporting rather than relying entirely on runtime corrections.

---

# Materials

Models should use clean, clearly named materials.

For example:

```text
Screen
ScreenGlow
Body
Metal
Plastic
Neon
Glass
```

Avoid generic names such as:

```text
Material.001
Material.002
Material.003
```

Meaningful material names make it easier to identify and customize materials from React Three Fiber.

---

## Emissive Materials

Screens, LEDs, neon elements, and other glowing components should use emissive materials where appropriate.

Examples:

```text
ScreenGlow
Neon
LED
Display
```

The page-level lighting and post-processing system should provide the overall glow rather than baking lighting into the model.

---

# Lighting

## Do not bake lighting into the GLB

Models must not contain baked scene lighting.

Avoid exporting:

- Backdrop lights
- Studio lighting
- Baked environment lighting
- Large light rigs
- Background planes

The homepage supplies the lighting environment.

This keeps the GLB reusable and allows the visual appearance to adapt to the active theme.

---

# Backdrop

Do not include a backdrop plane inside the model.

Avoid:

```text
Model
└── Backdrop Plane
```

Instead:

```text
3D Scene
├── Model
├── Page Lighting
├── Glow
├── Orbit Rings
└── Effects
```

This separation makes it easier to control the background and effects independently.

---

# Performance Targets

3D assets should be optimized before being placed in `public/models`.

## Showcase Models

Target:

```text
≤ 1 MB
~30,000 triangles or less
```

This applies to:

- Web Apps
- Backend
- Database
- AR

The target is not an absolute technical limit, but it should be treated as the default optimization budget.

---

## Hero Model

The hero workstation is allowed a larger budget because it is the primary 3D element.

Target:

```text
≤ 2.5 MB after optimization
```

The hero should still avoid unnecessary geometry and textures.

---

# Optimization Guidelines

Before exporting a model:

### Geometry

- Remove hidden geometry.
- Remove unnecessary internal parts.
- Reduce subdivision levels.
- Use optimized topology.
- Merge static geometry where appropriate.
- Avoid excessive small objects.

### Textures

- Use compressed textures.
- Avoid unnecessarily large texture maps.
- Reuse materials where possible.
- Prefer procedural/material-based details when practical.

### Scene

Remove:

- Cameras
- Lights
- Backdrop planes
- Unused objects
- Unused materials
- Unused animations

unless they are explicitly required by the runtime.

---

# Model Optimization Workflow

The recommended workflow is:

```text
Blender
   │
   ▼
Raw GLB
   │
   ▼
models-src/
   │
   ▼
bun run models:optimize <key>
   │
   ▼
Optimized GLB
   │
   ▼
public/models/
   │
   ▼
React Three Fiber
```

---

# Adding a New Model

## Step 1 — Add the raw model

Place the exported GLB inside:

```text
models-src/
```

Example:

```text
models-src/avatar.glb
```

---

## Step 2 — Optimize the model

Run:

```bash
bun run models:optimize <key>
```

For example:

```bash
bun run models:optimize about-avatar
```

The optimized model should be generated in:

```text
public/models/
```

---

## Step 3 — Start the development server

```bash
bun dev
```

---

## Step 4 — Open Model Lab

Use the development **Model Lab** to inspect and tune the model.

The Model Lab should be used to adjust values such as:

```text
position
rotation
scale
camera
lighting
animation
effects
```

The purpose of Model Lab is to avoid repeatedly editing production components just to tune model placement.

---

# Model Lab Workflow

The recommended tuning cycle is:

```text
Load model
    ↓
Inspect orientation
    ↓
Adjust scale
    ↓
Adjust position
    ↓
Adjust rotation
    ↓
Tune camera
    ↓
Tune effects
    ↓
Verify responsive layout
    ↓
Copy configuration
    ↓
Update model3d.config.ts
```

Once the model looks correct, use the **Copy values** functionality and paste the resulting configuration into:

```text
src/packages/configs/model3d.config.ts
```

---

# Configuration

The model registry should remain the source of truth for model-specific configuration.

Example structure:

```ts
{
  key: "hero-workstation",
  src: "/models/work-station.glb",
  placeholder: "workstation",
  position: [...],
  rotation: [...],
  scale: ...,
}
```

Keep model-specific transforms in the configuration rather than scattering values across multiple React components.

This makes model tuning easier and keeps the 3D implementation maintainable.

---

# Effects Architecture

3D models and visual effects should remain separate.

A conceptual scene should look like:

```text
Scene
├── Lighting
├── Model
│
├── UnderGlow
├── OrbitRings
├── FloatingTiles
├── Sparkles
└── PointerParallax
```

This separation provides several benefits:

- Effects can be reused.
- Models can be replaced without rewriting effects.
- Effects can be disabled on mobile.
- Performance can be tuned independently.
- The same effect can be shared between different sections.

---

# Pointer Parallax

Pointer-based movement should be applied to the scene or model group rather than modifying individual meshes.

Conceptually:

```text
Pointer
   ↓
Normalized coordinates
   ↓
Parallax controller
   ↓
Model group
```

The movement should remain subtle.

Avoid large rotations that can make the model feel unstable or distracting.

---

# Responsive Behavior

The 3D system must account for different viewport sizes.

## Desktop

Use:

- Full model scale
- Pointer parallax
- Full visual effects
- Orbit rings
- Sparkles

## Tablet

Reduce:

- Model scale
- Parallax intensity
- Effect density

## Mobile

Consider disabling or reducing:

- Pointer parallax
- Excessive sparkles
- Heavy post-processing
- Multiple orbit rings
- Expensive animations

The mobile layout should prioritize page performance and content readability.

---

# Reduced Motion

The 3D system should respect:

```text
prefers-reduced-motion
```

When reduced motion is enabled:

- Disable pointer parallax.
- Reduce continuous rotation.
- Reduce floating animation.
- Reduce sparkle movement.
- Keep the model visible.
- Avoid removing important visual content entirely.

The model should remain useful as a static visual element.

---

# Loading Strategy

GLB files should be loaded only when required by the relevant section.

Avoid loading every homepage model immediately if the page does not need all of them at startup.

A suitable strategy is:

```text
Hero model
    ↓
Load immediately

About model
    ↓
Load when approaching viewport

Showcase models
    ↓
Load progressively

CTA globe
    ↓
Load near CTA section
```

This reduces the initial network and GPU workload.

---

# Placeholder Strategy

Placeholders exist so that layout development does not depend on finished 3D assets.

Each slot should define a placeholder:

```text
hero-workstation → workstation
about-avatar → avatar
showcase-web-apps → laptop
showcase-backend → server
showcase-database → database
showcase-ar → phone
cta-globe → globe
```

When a production GLB becomes available, the placeholder should be replaced without changing the section's external API.

---

# 3D Sections vs Normal UI

Not every visual element in the homepage should be implemented as 3D.

## 3D Elements

The following are part of the 3D system:

- Hero workstation
- About avatar
- Web Apps laptop
- Backend server
- Database model
- AR phone/character
- CTA globe
- Orbit rings
- 3D sparkles
- Model under-glows
- Floating 3D technology tiles

## Normal UI Components

The following should remain normal React/HTML/CSS components:

- Tech-stack strip
- Featured project cards
- Statistics bar
- Journey timeline
- Footer
- Text content
- Buttons
- Navigation
- Standard cards and sections

Do not convert ordinary UI into 3D simply for visual effect. Use 3D where it adds meaningful visual context.

---

# Showcase Podium Bases

The four podium bases beneath the showcase models are **not yet implemented**.

Planned structure:

```text
Showcase
├── Web Apps
│   └── Podium + 3D Model
│
├── Backend
│   └── Podium + 3D Model
│
├── Database
│   └── Podium + 3D Model
│
└── AR
    └── Podium + 3D Model
```

The podium system should be treated as a separate visual component rather than baked into each GLB.

This allows the same podium design to be reused across all four showcase slots.

---

# Final Asset Checklist

Before accepting a GLB into the project, verify:

### Geometry

- [ ] Model is optimized.
- [ ] Hidden geometry has been removed.
- [ ] Triangle count is within the target.
- [ ] No unnecessary objects remain.

### Orientation

- [ ] Y-up.
- [ ] Facing +Z.
- [ ] Origin is centered at the base.
- [ ] Scale is appropriate.

### Materials

- [ ] Materials have meaningful names.
- [ ] Screens use emissive materials where appropriate.
- [ ] No unnecessary duplicate materials.
- [ ] Textures are optimized.

### Scene

- [ ] No backdrop plane.
- [ ] No baked lighting.
- [ ] No unnecessary camera.
- [ ] No unnecessary lights.
- [ ] No unused assets.

### Performance

- [ ] Showcase model is approximately ≤ 1 MB.
- [ ] Showcase model is approximately ≤ 30k triangles.
- [ ] Hero model is approximately ≤ 2.5 MB.
- [ ] Textures are optimized.

### Runtime

- [ ] Model loads correctly in React Three Fiber.
- [ ] Model orientation is correct.
- [ ] Scale is correct.
- [ ] Position is correct.
- [ ] Responsive behavior works.
- [ ] Reduced-motion behavior works.
- [ ] No unnecessary console warnings/errors.

---

# Recommended Project Structure

```text
models-src/
├── work-station.glb
├── avatar.glb
├── web-apps.glb
├── backend.glb
├── database.glb
├── ar.glb
└── globe.glb

public/
└── models/
    ├── work-station.glb
    ├── avatar.glb
    ├── web-apps.glb
    ├── backend.glb
    ├── database.glb
    ├── ar.glb
    └── globe.glb

src/
├── packages/
│   └── configs/
│       └── model3d.config.ts
│
└── components/
    └── 3d/
        ├── Model3D.tsx
        ├── ModelPlaceholder.tsx
        ├── OrbitRings.tsx
        ├── Sparkles.tsx
        ├── UnderGlow.tsx
        ├── FloatingTechTiles.tsx
        └── PointerParallax.tsx

docs/
└── 3d/
    └── 3d-models-setup-guide.md
```

---

# Quick Reference

### Add a model

```bash
# Place raw GLB
models-src/<model>.glb

# Optimize
bun run models:optimize <key>

# Start development
bun dev
```

Then open the Model Lab, tune the model, copy the values, and update:

```text
src/packages/configs/model3d.config.ts
```

---

# Related Documentation

For the complete implementation details, see:

```text
docs/3d/3d-models-setup-guide
```

This document focuses on the **homepage model inventory and asset requirements**. The setup guide should contain the deeper implementation details for React Three Fiber, model loading, optimization, Model Lab, configuration, effects, and performance tuning.

# 3D slots on the homepage (from `homepage.png`)

Where each 3D element sits in the Figma design and how it maps to
`src/packages/configs/model3d.config.ts`. Until a slot's GLB exists it
renders a procedural placeholder, so the layout can be built first.

| #   | Section (Figma)                                                                            | Model key           | Raw file → served file                                              | Placeholder | Effects                                                                  |
| --- | ------------------------------------------------------------------------------------------ | ------------------- | ------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------ |
| 1   | Hero — "I build digital products…" (desk, monitor, floating tech tiles, purple under-glow) | `hero-workstation`  | `models-src/work-station.glb` → `public/models/work-station.glb` ✅ | workstation | underglow, tiles (React/Next/TS/JS/DB/`</>`), sparkles, pointer-parallax |
| 2   | About — "Building solutions that solve real problems" (avatar in orbit ring)               | `about-avatar`      | `avatar.glb`                                                        | avatar      | orbit-rings ×2, tiles (`</>`, JS, TS), sparkles, pointer-parallax        |
| 3   | Interactive 3D Showcase — Web Apps (laptop)                                                | `showcase-web-apps` | `web-apps.glb`                                                      | laptop      | underglow, orbit-rings                                                   |
| 4   | Showcase — APIs & Backend (servers + cloud)                                                | `showcase-backend`  | `backend.glb`                                                       | server      | underglow, orbit-rings                                                   |
| 5   | Showcase — Databases (stacked discs + rings)                                               | `showcase-database` | `database.glb`                                                      | database    | underglow, orbit-rings ×2                                                |
| 6   | Showcase — AR Experiences (phone + character)                                              | `showcase-ar`       | `ar.glb`                                                            | phone       | underglow, orbit-rings                                                   |
| 7   | CTA — "Let's build something amazing together" (globe with rings)                          | `cta-globe`         | `globe.glb`                                                         | globe       | orbit-rings ×2, sparkles                                                 |

## Export checklist for each model

- `.glb`, Y-up, origin at the centre of the base, facing +Z; apply scale/rotation.
- No backdrop plane, no baked lights (the page supplies light and glow).
- Emissive materials for screens/neon; name materials clearly.
- Target: showcase tiles ≤ 1 MB / ~30k tris, hero ≤ 2.5 MB after optimizing.

## Workflow

```bash
# 1. put the raw export in models-src/<file>.glb
bun run models:optimize <key>      # → public/models/<file>.glb
bun dev                            # → /dev → "Model lab": tune, then Copy values
# 2. paste the copied values into the model's entry in model3d.config.ts
```

Full guide: `docs/3d/3d-models-setup-guide`.

## Not 3D (build with normal components)

Tech-stack strip, featured project cards, stats bar, journey timeline, footer.
The 4 podium bases under the showcase models are still to do.
