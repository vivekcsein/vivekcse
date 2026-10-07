---
description: "Integrate shadcn/ui into the project's architecture: components.json aliases, theme presets via ui.shadcn.com or tweakcn, safe diffs and generated-component rules."
date: 2026-10-02
keywords: [shadcn ui, components.json, tweakcn, theming, tailwind css, bun, design system, nextjs template]
order: 9
featured: false
---

# Stage 9 — shadcn/ui Integration

## Overview

shadcn/ui generates component source directly into the project rather than shipping a runtime package. This stage runs that generator against the architecture from Stages 3–5 — customizing aliases and file locations so generated components land in the right place, and deciding the actual theme at the same moment, since both changes land in the same file.

## Objectives

- shadcn/ui initialized and configured
- Project-specific import aliases (`components.json`)
- Generated components co-located under `components/ui/shadcn`
- The `cn()` utility unified with `packages/utils`
- A theme decided and applied during `init`, not patched in afterward
- Generated components compatible with the semantic tokens from Stage 4

## Prerequisites

Required:

- ✅ Stage 1 — Project Initialization
- ✅ Stage 2 — Professional Development Environment
- ✅ Stage 3 — Enterprise Architecture
- ✅ Stage 4 — Design System
- ✅ Stage 5 — Design System Implementation

Stages 6–8 aren't technical dependencies of this one, but are assumed complete if you're following the template in order.

## Why shadcn/ui

- Full ownership of component source — no black-box runtime dependency
- Easy to customize or fork a single component without ejecting a library
- Strong accessibility defaults (built on Radix primitives)
- Tailwind CSS native
- TypeScript throughout
- Compatible with the semantic token system from Stage 4 — *if* it's wired up that way, which is what this stage does

## Initialize shadcn/ui

```bash
bunx --bun shadcn@latest init
```

or, to skip the interactive template prompt:

```bash
bunx --bun shadcn@latest init -t next
```

> Always invoke the CLI through the project's package runner — `bunx --bun shadcn@latest` here, since the project standardizes on Bun. `-t` accepts `next`, `vite`, `start`, `react-router`, `laravel`, or `astro`; `-b`/`--base` picks the primitive layer (`radix` by default). Follow the remaining prompts for style and base color.

## ⚠️ Before You Accept the Diff

`shadcn init` writes to `styles/globals.css` — recent CLI versions add their own `@import "shadcn/tailwind.css"` and can propose their own CSS variables. This project already has a design system in that same file, built in Stage 4 and 5.

Preview before applying anything, rather than trusting the CLI to merge cleanly:

```bash
bunx --bun shadcn@latest add button --dry-run
bunx --bun shadcn@latest add button --diff
```

`--dry-run` shows what would be written without touching the filesystem; `--diff` shows the actual diff against what's already there. If `init` or an `add` proposes CSS variables that duplicate or conflict with the semantic tokens already defined in Stage 4, keep the project's tokens and discard shadcn's — the reverse breaks the theme system every other component relies on.

## Decide the Theme at the Same Moment

`init` is the step that writes to `globals.css` — so the theme decision and the diff-review above are the same moment, not two separate ones. Walking through `init` with a default palette and picking real colors afterward means doing the CSS-variable reconciliation twice instead of once.

Two ways to bring in a theme instead of hand-writing every token value:

**[ui.shadcn.com/create](https://ui.shadcn.com/create)** — the official preset builder, wired directly into the CLI. Build or browse a preset with live previews against real components (a Button, Card, and Input rendered with the actual palette, fonts, and radius — not swatches), then apply it without leaving the terminal:

```bash
bunx --bun shadcn@latest init --preset <preset-name>
```

This is the same mechanism behind the CLI's own built-in styles (`nova` is the default) — a custom preset built on the site is just another named preset. No copy-paste: the CLI writes the resulting CSS variables into `globals.css` directly, so run the `--dry-run` / `--diff` preview from above *against* the preset, not instead of it.

**[tweakcn.com](https://tweakcn.com/)** — an open-source, community visual theme editor with a larger preset library and finer-grained controls (typography, shadows, per-component tweaks) than the official builder. Its flow is copy-paste, not CLI-integrated: pick or build a theme, then copy the generated CSS and paste it into `styles/globals.css` directly. Because tweakcn targets the same semantic token names shadcn's own theming system uses (`background`, `primary`, `card`, and so on), pasted output replaces the Stage 4 tokens at those names — it isn't a second, parallel system to reconcile later. (A few unofficial community mirrors wrap tweakcn-style themes in the CLI's `add <url>` format for a terminal-only flow — treat those as third-party and pin a specific URL rather than trusting one that could change.)

**Either way**, whatever comes out — CLI preset or pasted CSS — lands in the same file Stage 4 and 5 already populated. Before moving on to installing components, confirm the result still satisfies Stage 4's token contract: every semantic name present, both `:root` and `.dark` defined, foreground/background pairs still readable.

If neither tool fits — a specific brand rather than a starting point to tweak — the two presets below are ready-to-paste starting points, built directly against Stage 4's token list.

### Preset — Classic Corporate (Light)

For B2B SaaS, admin panels, and finance/legal-adjacent products: desaturated cool neutrals, one confident deep-blue primary, modest radius. Deliberately light-only — this archetype rarely needs dark mode as its primary identity, though a `.dark` block can be added against the same token names if needed.

```css
:root {
  --background: oklch(0.99 0.002 260);
  --foreground: oklch(0.18 0.014 260);

  --card: oklch(0.995 0.001 260);
  --card-foreground: oklch(0.18 0.014 260);

  --popover: oklch(0.995 0.001 260);
  --popover-foreground: oklch(0.18 0.014 260);

  --primary: oklch(0.32 0.08 260);
  --primary-foreground: oklch(0.98 0 0);

  --secondary: oklch(0.95 0.004 260);
  --secondary-foreground: oklch(0.28 0.02 260);

  --accent: oklch(0.94 0.012 250);
  --accent-foreground: oklch(0.28 0.02 260);

  --muted: oklch(0.96 0.004 260);
  --muted-foreground: oklch(0.48 0.012 260);

  --destructive: oklch(0.58 0.22 27);
  --destructive-foreground: oklch(0.98 0 0);

  --border: oklch(0.9 0.005 260);
  --input: oklch(0.9 0.005 260);
  --ring: oklch(0.32 0.08 260);

  --radius: 0.375rem;

  --chart-1: oklch(0.32 0.08 260);
  --chart-2: oklch(0.55 0.1 220);
  --chart-3: oklch(0.7 0.08 200);
  --chart-4: oklch(0.6 0.12 40);
  --chart-5: oklch(0.75 0.1 90);
}
```

Design notes: primary sits at low chroma but with enough lightness contrast against white to hold up as `text-primary-foreground` at default weight. Radius is 6px — modest rather than fully rounded or sharp, reading as "considered" instead of "default template" or "aggressive startup."

### Preset — Premium Cyber (Dark + Light)

For gaming, streaming, and creator-brand products where the interface is part of the show: near-black surfaces, one saturated violet as the signature primary, a cyan secondary accent for interactive highlights, rounder radius for a glassy, premium feel rather than a sharp terminal one. This archetype is usually dark-first but still needs a light mode that doesn't feel like an afterthought — both are included.

```css
:root {
  --background: oklch(0.98 0.004 292);
  --foreground: oklch(0.16 0.012 280);

  --card: oklch(0.995 0.002 292);
  --card-foreground: oklch(0.16 0.012 280);

  --popover: oklch(0.995 0.002 292);
  --popover-foreground: oklch(0.16 0.012 280);

  --primary: oklch(0.55 0.24 292);
  --primary-foreground: oklch(0.98 0 0);

  --secondary: oklch(0.95 0.006 292);
  --secondary-foreground: oklch(0.3 0.02 292);

  --accent: oklch(0.7 0.14 200);
  --accent-foreground: oklch(0.15 0.02 200);

  --muted: oklch(0.95 0.006 292);
  --muted-foreground: oklch(0.5 0.02 292);

  --destructive: oklch(0.58 0.22 27);
  --destructive-foreground: oklch(0.98 0 0);

  --border: oklch(0.88 0.01 292);
  --input: oklch(0.88 0.01 292);
  --ring: oklch(0.55 0.24 292);

  --radius: 0.75rem;

  --chart-1: oklch(0.55 0.24 292);
  --chart-2: oklch(0.7 0.14 200);
  --chart-3: oklch(0.62 0.18 330);
  --chart-4: oklch(0.58 0.18 40);
  --chart-5: oklch(0.72 0.14 140);
}

.dark {
  --background: oklch(0.15 0.012 280);
  --foreground: oklch(0.96 0.006 280);

  --card: oklch(0.19 0.016 280);
  --card-foreground: oklch(0.96 0.006 280);

  --popover: oklch(0.19 0.016 280);
  --popover-foreground: oklch(0.96 0.006 280);

  --primary: oklch(0.62 0.25 292);
  --primary-foreground: oklch(0.98 0 0);

  --secondary: oklch(0.24 0.02 280);
  --secondary-foreground: oklch(0.9 0.01 280);

  --accent: oklch(0.75 0.15 200);
  --accent-foreground: oklch(0.15 0.02 200);

  --muted: oklch(0.22 0.012 280);
  --muted-foreground: oklch(0.65 0.02 280);

  --destructive: oklch(0.6 0.24 25);
  --destructive-foreground: oklch(0.98 0 0);

  --border: oklch(0.28 0.02 280);
  --input: oklch(0.28 0.02 280);
  --ring: oklch(0.62 0.25 292);

  --radius: 0.75rem;

  --chart-1: oklch(0.62 0.25 292);
  --chart-2: oklch(0.75 0.15 200);
  --chart-3: oklch(0.7 0.2 330);
  --chart-4: oklch(0.65 0.2 40);
  --chart-5: oklch(0.8 0.15 140);
}
```

Design notes: violet sits around a 292° hue — the same family a brand purple like `#7A2EFF` lands in, without copying a specific brand's exact value — paired with a 200° cyan for accents, which is far enough around the OKLCH wheel to read as a deliberate second color rather than a shade of the primary. Radius is 12px, roughly double the corporate preset, for the glassier feel. If this identity should default to dark rather than following system preference, set `defaultTheme="dark"` on the `ThemeProvider` from Stage 5 — the token set doesn't change either way.

> Shipping both presets as **switchable** brand themes (rather than picking one for the project) is a different feature from what `init` writes here — that's a `data-theme` attribute layered on top of the existing `.dark` class from Stage 5, and worth its own stage if the project needs it.

## Generated Files (Defaults)

```text
components.json

components/
└── ui/

lib/
└── utils.ts
```

These defaults get relocated to match the project's structure.

## Relocate the Utility File

```text
lib/utils.ts   →   packages/utils/cn.ts
```

This keeps the shadcn-originated `cn()` helper in the same place as every other shared utility, rather than in a second, parallel `lib` folder.

## Configure components.json

```json
{
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui/shadcn",
    "utils": "@/packages/utils/cn",
    "hooks": "@/packages/hooks",
    "lib": "@/packages"
  }
}
```

| Alias | Resolves to | Purpose |
| ----------- | -------------------------- | -------------------------------------------- |
| `components` | `@/components` | Shared application components |
| `ui` | `@/components/ui/shadcn` | Where generated components land |
| `utils` | `@/packages/utils/cn` | The `cn()` helper generated components import |
| `hooks` | `@/packages/hooks` | Shared React hooks |
| `lib` | `@/packages` | Shared application packages |

These aliases resolve through the `@/*` path mapping already configured in `tsconfig.json` (Stage 1) — no separate alias system to maintain.

## Component Location

Every generated component stays inside `components/ui/shadcn`, as a flat file per component — this is how the shadcn CLI actually writes output; it does not create a subfolder per component.

```text
components
└── ui
    └── shadcn
        ├── accordion.tsx
        ├── alert.tsx
        ├── avatar.tsx
        ├── badge.tsx
        ├── button.tsx
        ├── card.tsx
        ├── checkbox.tsx
        ├── dialog.tsx
        ├── dropdown-menu.tsx
        ├── input.tsx
        ├── select.tsx
        └── tabs.tsx
```

> `dropdown-menu` is the real component name in the shadcn registry — not `dropdown`. Use it as written when running `add`, and treat any doc that says `dropdown` as shorthand.

Keeping generated components isolated in their own folder makes future upgrades a clean diff instead of a hunt through hand-written code.

## Adding Components

Install only what's needed, when it's needed:

```bash
bunx --bun shadcn@latest add button
```

```bash
bunx --bun shadcn@latest add button input card dialog
```

Avoid `add -a` (install everything) unless the project genuinely needs the full set — every added component is source code the team now owns and maintains.

## Previewing and Updating Existing Components

Once a component has been customized, blindly re-running `add` risks overwriting local changes. Preview first:

```bash
bunx --bun shadcn@latest add button --diff
```

```bash
bunx --bun shadcn@latest view button
```

`view` shows the upstream registry version without touching the project; `add --diff` shows exactly what would change locally. Only pass `--overwrite` once the diff has been read.

## Custom Components Stay Out of `shadcn/`

Application-specific UI components belong next to the generated ones, not inside `shadcn/`:

```text
components
└── ui
    ├── buttons
    │   └── Button.tsx
    │
    ├── inputs
    │   ├── Input.tsx
    │   ├── Checkbox.tsx
    │   ├── Select.tsx
    │   ├── PasswordInput.tsx
    │   └── InputFactory.tsx
    │
    ├── links
    │   └── Link.tsx
    │
    ├── svg
    │   ├── EyeOpen.tsx
    │   └── EyeClose.tsx
    │
    └── shadcn
```

This separation keeps "generated, upstream-tracked" and "hand-written, project-owned" from blurring together.

## Styling Guidelines

Every generated component should be re-pointed at the project's semantic tokens, not shadcn's defaults.

✅ Preferred

```tsx
className = "bg-primary text-primary-foreground";
```

❌ Avoid

```tsx
className = "bg-blue-600 text-white";
```

Tokens, not fixed colors, are what makes a generated `button.tsx` automatically support Light, Dark, and System themes.

## Project Conventions

- Don't modify a generated component's public API unless there's no other option.
- Keep generated components inside `components/ui/shadcn`.
- Build a wrapper around a generated component instead of heavily editing it — wrappers survive the next `add --overwrite`, edited internals don't.
- Prefer composition over modification.
- Use semantic design tokens instead of fixed colors.
- Reuse shared utilities from `packages/utils` and hooks from `packages/hooks`.
- Run `--dry-run` / `--diff` before accepting an update to any component you've already customized.

## Stage Deliverables

- ✅ shadcn/ui initialized and configured
- ✅ `components.json` aliases matching the project's architecture
- ✅ `cn()` unified with `packages/utils`
- ✅ Generated components isolated in `components/ui/shadcn`
- ✅ A theme chosen and applied during `init` — via `ui.shadcn.com/create`, `tweakcn.com`, or one of the two curated presets
- ✅ Generated components using Stage 4's semantic tokens, not shadcn defaults
- ✅ A reviewed, non-conflicting `styles/globals.css`

## Next Stage

Continue to [Stage 10 — API Layer](/docs/frontend/api-layer-guide) to build the Axios instance and service layer. [Stage 6 — Reusable UI Components](/docs/frontend/reusable-ui-guide) remains the governing rulebook for when to reuse these components versus building new ones.
