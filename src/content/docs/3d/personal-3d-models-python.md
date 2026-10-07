---
description: "A library of production-ready Blender prompts for the 3D assets on Vivek's portfolio, from the workspace and avatar to tech orbs, with shared rules for web-ready GLB export."
date: 2026-09-12
keywords: [blender, 3d, glb, portfolio, ai prompts, web performance]
featured: false
---

# Vivek Portfolio --- Blender 3D Model Prompt Library

## Purpose

This document contains production-oriented prompts for creating the 3D
assets used by the **Vivek Full-Stack Developer portfolio**.

The target website is a premium, interactive, modern portfolio designed
to communicate strong engineering ability without sacrificing
readability or performance.

### Brand

- Name: **Vivek**
- Handle: **@vivekcsein**
- Role: **Full-Stack Developer**
- Visual direction: premium, futuristic, technical, approachable
- Theme: shadcn-compatible dark/light UI
- Primary accent: violet/purple
- Secondary accents: indigo/blue
- Avoid aggressive/gamer branding

---

# Global Blender Production Requirements

Apply these requirements to every model unless a model-specific section
overrides them.

## Geometry

- Build clean, intentional geometry suitable for real-time web
  rendering.
- Prefer simple bevelled forms, smooth surfaces, and controlled
  topology.
- Avoid unnecessarily dense subdivision.
- Keep major components as separate named objects.
- Apply transforms before export.
- Use sensible object origins.
- Avoid hidden geometry that is not required for the final render.
- Use weighted normals or auto smooth where useful.
- Prefer bevel modifiers over manually dense edge geometry.

## Web Performance

Target real-time rendering in Three.js / React Three Fiber.

Recommended targets:

- Hero asset: ideally under 150k--250k triangles.
- Small decorative assets: ideally under 20k--50k triangles.
- Avoid large 4K textures unless genuinely required.
- Prefer procedural materials and simple PBR textures.
- Use 1K textures for most assets.
- Use 2K only for important hero assets.
- Compress textures with WebP/KTX2 when appropriate.
- Keep material count low.
- Reuse materials wherever possible.
- Avoid unnecessary transparency.
- Avoid excessive emissive surfaces.

## Materials

Use a premium technology aesthetic:

- matte black
- charcoal
- graphite
- dark navy
- subtle violet
- indigo
- cool blue
- small amounts of cyan
- occasional white metal

Purple should be an accent rather than covering the entire model.

Use:

- Metallic materials for hardware.
- Rough matte materials for desk/furniture.
- Glass only where it adds value.
- Emission sparingly for technology highlights.
- Physically plausible roughness.

## Lighting

Create models that look good under studio lighting.

Use:

- soft key light
- violet rim light
- subtle blue fill
- neutral ambient light

Avoid baked lighting unless specifically required.

## Background

The model itself must contain **no visible background plane** unless the
model explicitly requires a floor/base.

The exported GLB should work inside a transparent Three.js scene.

## Export

Every final model must be exportable as:

```text
GLB
```

Recommended export settings:

- glTF 2.0
- Binary GLB
- Apply transforms
- Include visible renderable objects
- Exclude unnecessary cameras/lights unless required
- Embed required textures
- Use Draco compression when compatible with the project
- Preserve object names
- Preserve material names

Recommended naming style:

```text
vivek_asset_<name>
```

Example:

```text
vivek_asset_developer_workspace
```

---

# Asset 01 --- Developer Workspace

## File

```text
developer-workspace.glb
```

## Portfolio Section

Hero section.

## Prompt

> Create a premium futuristic developer workstation designed for a
> professional full-stack developer portfolio. Build a clean matte-black
> desk with rounded bevelled edges, a modern widescreen monitor,
> mechanical keyboard, ergonomic wireless mouse, slim laptop,
> headphones, small desk plant, coffee mug, compact desk lamp, and
> subtle technology accessories. The workstation should feel realistic
> but stylized enough for a premium interactive website.
>
> Use a dark graphite and matte-black material palette with subtle
> violet and indigo emissive accents. The monitor should display an
> abstract modern code editor interface using generic
> TypeScript/React-style syntax rather than copyrighted UI. Add very
> subtle glowing edge details around the monitor and desk.
>
> Make every major component a separate named object. Use clean
> low-to-medium poly geometry, smooth bevels, realistic proportions, and
> optimized materials suitable for Three.js. The complete asset must
> work without a background and should look excellent against a dark
> shadcn-style portfolio interface.
>
> Do not add logos or brand names directly onto the physical hardware.
> Technology identities will be added separately in the website.

## Object Structure

```text
DeveloperWorkspace
├── Desk
├── Monitor
├── MonitorScreen
├── Keyboard
├── Mouse
├── Laptop
├── LaptopScreen
├── Headphones
├── CoffeeMug
├── Plant
├── Lamp
└── CableDetails
```

---

# Asset 02 --- Vivek 3D Avatar

## File

```text
vivek-avatar.glb
```

## Portfolio Section

About section.

## Prompt

> Create a friendly, professional 3D avatar representing Vivek, a
> full-stack developer. The character should look approachable,
> intelligent, confident, and humble rather than aggressive or overly
> stylized. Use a modern semi-realistic 3D illustration style suitable
> for a premium developer portfolio.
>
> Give the character a clean casual developer appearance with a dark
> hoodie or minimal modern casual outfit. Use natural proportions,
> expressive but subtle facial features, clean hair, and a friendly
> neutral expression.
>
> Create a simplified web-friendly character with clean topology and
> optimized materials. The model should work from waist-up or full-body
> presentation. Add subtle violet rim lighting only in the preview
> setup; do not bake the lighting into the geometry.
>
> Keep the model suitable for an interactive React Three Fiber viewer.
> Avoid excessive clothing details, complex hair simulation, unnecessary
> accessories, weapons, aggressive poses, or gamer aesthetics.
>
> The model should have a transparent environment and should export
> cleanly to GLB.

## Optional Animation

Create optional animations:

```text
Idle
Wave
Thinking
Typing
```

---

# Asset 03 --- React Technology Orb

## File

```text
react.glb
```

## Prompt

> Create a compact premium 3D technology orb representing React. Use a
> dark rounded-square glass/metallic base with a subtle violet-blue edge
> glow and a clean abstract React atom symbol floating or embossed on
> the front. The object should look like a high-end collectible
> technology badge.
>
> Use smooth bevels, minimal geometry, realistic reflections, subtle
> emission, and a transparent environment. Keep the model small and
> optimized for floating UI animations.
>
> Do not create a large background plane. Keep the object centered with
> its origin at the geometric center.

---

# Asset 04 --- Next.js Technology Orb

## File

```text
nextjs.glb
```

## Prompt

> Create a premium 3D technology badge representing Next.js. Use a dark
> graphite rounded-square body with subtle metallic edges, a clean
> high-contrast Next.js-inspired wordmark treatment, and a very subtle
> violet rim light. Keep the design minimal, professional, and suitable
> for a high-end full-stack developer portfolio.
>
> Use low-to-medium polygon geometry, bevelled edges, simple PBR
> materials, and minimal emissive lighting. The object must work as a
> floating 3D element in React Three Fiber.

---

# Asset 05 --- TypeScript Technology Orb

## File

```text
typescript.glb
```

## Prompt

> Create a compact 3D TypeScript technology badge using a blue square
> face with a clean TS symbol, surrounded by a dark metallic frame with
> rounded bevelled corners. Use realistic PBR materials and subtle
> blue-violet edge lighting.
>
> Make the object optimized for web rendering and suitable for floating
> animation. No background plane.

---

# Asset 06 --- Node.js Technology Orb

## File

```text
nodejs.glb
```

## Prompt

> Create a premium 3D Node.js technology badge using a dark
> rounded-square metallic body with a green Node.js-inspired symbol. Add
> a subtle green and violet rim glow while keeping the overall design
> dark and sophisticated.
>
> Use clean bevels, optimized topology, minimal materials, and a
> transparent environment.

---

# Asset 07 --- Database

## File

```text
database.glb
```

## Portfolio Section

Backend / database architecture.

## Prompt

> Create a futuristic 3D database cylinder representing modern
> application data infrastructure. Build three or four stacked
> cylindrical database layers with clean bevelled edges and a dark
> graphite metallic material. Add subtle violet and cyan glowing rings
> between the layers.
>
> The design should communicate PostgreSQL, MySQL, Supabase, and modern
> database architecture without placing specific commercial logos on the
> object.
>
> Make the geometry simple, elegant, and optimized for real-time web
> rendering. The object should rotate slowly and look attractive from
> all sides.
>
> Transparent environment, centered origin, GLB-ready.

---

# Asset 08 --- API Server

## File

```text
api-server.glb
```

## Portfolio Section

Backend & API development.

## Prompt

> Create a stylized futuristic API server for a full-stack developer
> portfolio. Build a compact vertical server unit with several subtle
> horizontal status lights and modular server panels. Use dark graphite
> materials with violet, cyan, and green indicator lights.
>
> Add small floating abstract data packets or connection nodes around
> the server, but keep them as separate objects so they can be animated
> independently.
>
> The model should visually communicate REST APIs, Node.js, Express,
> Fastify, Hono, and backend services without displaying company logos.
>
> Optimize for Three.js and export as GLB.

---

# Asset 09 --- Security Shield

## File

```text
security-shield.glb
```

## Portfolio Section

Authentication and security.

## Prompt

> Create a premium 3D cybersecurity shield representing secure
> authentication and session management. Use a dark metallic shield with
> a recessed central lock symbol. Surround the shield with subtle
> circular security rings and small floating encrypted data particles.
>
> Use deep graphite, violet, indigo, and small cyan highlights. The
> object should communicate secure cookies, authentication, refresh
> tokens, protected routes, and API security.
>
> Avoid military styling, weapons, aggressive imagery, or excessive
> hacker clichés.
>
> Use clean bevelled geometry and optimized materials for web rendering.

---

# Asset 10 --- Performance Rocket

## File

```text
performance-rocket.glb
```

## Portfolio Section

Performance and optimization.

## Prompt

> Create a premium stylized rocket representing web performance,
> optimization, speed, and scalable architecture. Use a compact
> futuristic rocket with a dark metallic body, violet highlights, and a
> subtle blue-white exhaust glow.
>
> Add small abstract speed particles around the exhaust. Keep the model
> elegant rather than cartoonish. The asset should look appropriate
> beside technical content about SSR, SSG, ISR, caching, code splitting,
> Core Web Vitals, and SEO.
>
> Optimize geometry and materials for Three.js. Keep the environment
> transparent.

---

# Asset 11 --- Cloud Server

## File

```text
cloud-server.glb
```

## Portfolio Section

Infrastructure / scalable architecture.

## Prompt

> Create a premium 3D cloud infrastructure object combining a soft
> futuristic cloud shape with a small modular server cluster inside it.
> Use dark blue and graphite materials with subtle violet and cyan
> illumination.
>
> The object should represent cloud hosting, scalable infrastructure,
> deployment, APIs, databases, and production systems.
>
> Keep the geometry clean and optimized. The cloud should not look
> childish or overly cartoon-like.

---

# Asset 12 --- AR Phone

## File

```text
ar-phone.glb
```

## Portfolio Section

AR Experiences.

## Prompt

> Create a modern smartphone floating vertically in space and displaying
> an abstract augmented reality interface. The phone should have a thin
> dark metallic frame, rounded glass screen, subtle blue-violet
> highlights, and a clean camera module.
>
> On the screen, show a generic AR character or geometric object
> surrounded by tracking points and a minimal AR interface.
>
> Keep all AR elements as separate objects where possible so they can
> animate independently in React Three Fiber.
>
> The model should communicate Lens Studio, AR filters, camera effects,
> and interactive marketing experiences.

---

# Asset 13 --- AR Camera

## File

```text
ar-camera.glb
```

## Prompt

> Create a compact futuristic AR camera device with a large circular
> lens, dark metallic body, subtle violet highlights, and small glowing
> tracking indicators. The design should feel like a premium creative
> technology device.
>
> It should visually communicate computer vision, camera effects,
> augmented reality, and Lens Studio development.
>
> Keep the geometry optimized and suitable for interactive web
> presentation.

---

# Asset 14 --- Global Network Globe

## File

```text
global-network.glb
```

## Portfolio Section

Final collaboration CTA.

## Prompt

> Create a premium futuristic 3D globe representing global digital
> collaboration. Use a dark translucent or metallic globe with subtle
> continent outlines and glowing violet network arcs traveling around
> the surface.
>
> Add several small connection nodes distributed around the globe. Use
> violet, indigo, and cyan accents with restrained emissive materials.
>
> The globe should rotate slowly and continuously in a web portfolio.
> Keep all network arcs and nodes as separate objects when possible.
>
> Avoid political borders and unnecessary geographic detail.

---

# Asset 15 --- Code Terminal

## File

```text
code-terminal.glb
```

## Portfolio Section

Hero / developer identity.

## Prompt

> Create a floating futuristic developer terminal window. Use a rounded
> dark glass frame, three small window controls, and a clean generic
> code editor interface showing TypeScript and API-style code. Add a
> subtle violet outer glow.
>
> The object should look like a premium floating developer tool rather
> than a literal desktop application screenshot.
>
> Keep the screen geometry separate from the frame so the website can
> replace the screen texture dynamically.

---

# Asset 16 --- Technology Orbit

## File

```text
technology-orbit.glb
```

## Portfolio Section

Hero / technology section.

## Prompt

> Create a modular 3D technology orbit system designed for a full-stack
> developer portfolio. Place several small abstract technology nodes
> around a central glowing core using thin circular orbital paths.
>
> The nodes should represent frontend, backend, databases, security,
> APIs, performance, and AR development. Do not place copyrighted logos
> directly into the model; the website will overlay official SVG logos.
>
> Keep every node, orbital ring, and core as a separate named object.
> Design the asset specifically for mouse interaction and scroll-driven
> animation.

---

# Asset 17 --- Project Device Showcase

## File

```text
project-device.glb
```

## Portfolio Section

Projects.

## Prompt

> Create a premium modular device showcase consisting of a laptop,
> desktop monitor, tablet, and smartphone arranged in a dynamic but
> balanced composition. Each screen should be a separate mesh with a
> replaceable material or texture.
>
> Use dark graphite bodies, subtle metallic edges, realistic glass
> screens, and restrained violet lighting.
>
> The devices should be clean enough to display SaaS dashboards, content
> editors, gaming communities, portfolio applications, and other web
> projects.
>
> Optimize the models for interactive web presentation and keep each
> device independently transformable.

---

# Asset 18 --- Analytics / Revenue Object

## File

```text
analytics-revenue.glb
```

## Portfolio Section

SEO / monetization.

## Prompt

> Create a premium 3D analytics dashboard object showing abstract
> upward-trending charts, traffic indicators, and revenue growth bars.
> Use a dark glass dashboard frame with violet, cyan, and green chart
> accents.
>
> The object should visually communicate SEO, web analytics, advertising
> monetization, Google AdSense, Media.net, Core Web Vitals, and growth.
>
> Do not reproduce any proprietary dashboard UI. Use original generic
> interface elements.

---

# Asset 19 --- Web Architecture Stack

## File

```text
fullstack-architecture.glb
```

## Portfolio Section

Engineering architecture.

## Prompt

> Create a sophisticated 3D full-stack architecture visualization
> consisting of several modular layers: browser/client, frontend
> application, API layer, authentication layer, backend services, cache,
> database, and external services.
>
> Arrange the layers vertically with subtle glowing connection lines.
> Use dark graphite modules with violet and indigo highlights.
>
> Every layer must be a separate named object. Connection lines must
> also be separate objects.
>
> The model should be visually impressive while remaining understandable
> to a developer or client viewing the portfolio.

---

# Asset 20 --- Journey / Growth Objects

## Files

```text
journey-learning.glb
journey-frontend.glb
journey-backend.glb
journey-fullstack.glb
journey-building.glb
journey-future.glb
```

## Prompt

> Create a family of six small premium 3D symbolic objects representing
> a developer's journey: learning, frontend development, backend
> development, full-stack engineering, building and sharing, and future
> growth.
>
> Each object should have a distinct silhouette while maintaining a
> unified visual language using dark graphite materials, violet accents,
> smooth bevels, and subtle emissive details.
>
> Keep each model compact, centered, transparent-background friendly,
> and optimized for use along a horizontal timeline.

---

# Blender Scene Organization

For each generated asset, organize collections like this:

```text
VivekAsset
├── MODEL
│   ├── Main
│   ├── Secondary
│   └── Details
│
├── MATERIALS
│   ├── MatteBlack
│   ├── Graphite
│   ├── VioletGlow
│   ├── BlueGlow
│   └── Glass
│
├── EXPORT
│
└── PREVIEW
    ├── Camera
    ├── KeyLight
    ├── FillLight
    └── RimLight
```

---

# Naming Convention

Use predictable names.

```text
VivekAsset_Workspace
VivekAsset_Monitor
VivekAsset_Keyboard
VivekAsset_Mouse

VivekAsset_Database
VivekAsset_API
VivekAsset_Security
VivekAsset_Rocket

VivekAsset_ARPhone
VivekAsset_ARCamera
VivekAsset_GlobalGlobe

VivekAsset_Core
VivekAsset_Node_01
VivekAsset_Node_02
VivekAsset_Orbit_01
```

Materials:

```text
MAT_Graphite
MAT_MatteBlack
MAT_Glass
MAT_VioletGlow
MAT_BlueGlow
MAT_CyanGlow
MAT_White
```

---

# Recommended Animation Library

The models should be exported in a state that makes these animations
easy to implement in React Three Fiber.

## Floating

```text
position.y = baseY + sin(time * speed) * amplitude
```

## Gentle Rotation

```text
rotation.y += delta * speed
```

## Mouse Follow

The model should rotate only a few degrees toward the pointer.

Recommended maximum:

```text
X: ±5°
Y: ±8°
```

## Hover

On hover:

```text
scale: 1.00 → 1.05
emission: normal → slightly stronger
rotation: subtle spring
```

## Scroll

Use scroll progress to control:

```text
rotation
position
scale
opacity
camera distance
```

---

# Performance Rules for the Portfolio

Do not load every model on the initial page load.

Recommended strategy:

```text
Hero
↓
Load developer-workspace.glb

About
↓
Load vivek-avatar.glb

Architecture section
↓
Lazy-load architecture assets

AR section
↓
Lazy-load AR assets

CTA
↓
Lazy-load global-network.glb
```

Use dynamic imports and lazy loading for React Three Fiber components.

Recommended tools:

```text
Three.js
React Three Fiber
@react-three/drei
GLTFLoader
DRACO
Meshopt
KTX2
```

---

# Final Asset Priority

Build the models in this order:

## Phase 1 --- Hero

1.  `developer-workspace.glb`
2.  `code-terminal.glb`
3.  `technology-orbit.glb`

## Phase 2 --- Identity

4.  `vivek-avatar.glb`

## Phase 3 --- Engineering

5.  `api-server.glb`
6.  `database.glb`
7.  `security-shield.glb`
8.  `fullstack-architecture.glb`

## Phase 4 --- Performance

9.  `performance-rocket.glb`
10. `analytics-revenue.glb`

## Phase 5 --- AR

11. `ar-phone.glb`
12. `ar-camera.glb`

## Phase 6 --- Storytelling

13. Journey objects

## Phase 7 --- Final CTA

14. `global-network.glb`

---

# Quality Checklist

Before exporting every model:

- [ ] No unnecessary background geometry
- [ ] Object names are meaningful
- [ ] Origins are correctly positioned
- [ ] Transforms are applied
- [ ] Normals are correct
- [ ] Materials are optimized
- [ ] No unnecessary modifiers remain
- [ ] No hidden heavy geometry
- [ ] Textures are optimized
- [ ] Model looks good under neutral lighting
- [ ] Model looks good under violet lighting
- [ ] Model works on a dark background
- [ ] Model works on a light background
- [ ] Model is suitable for real-time rendering
- [ ] GLB export succeeds
- [ ] GLB can be loaded by Three.js
- [ ] Mobile fallback is considered

---

# Portfolio Visual Principle

The goal is not to make the website look like a game.

The goal is to make visitors think:

> **"This developer understands frontend, backend, architecture,
> performance, 3D, interaction design, and product presentation."**

Use 3D as evidence of engineering capability, not as decoration
everywhere.

The strongest portfolio will combine:

```text
Excellent Typography
        +
Readable Content
        +
Real Projects
        +
Interactive 3D
        +
Smooth Motion
        +
Strong Architecture
        +
Performance
```

This creates a premium portfolio without sacrificing usability.
