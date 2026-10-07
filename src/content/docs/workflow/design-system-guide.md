---
description: "The design-system contract: semantic tokens, light/dark/system themes, shadcn-compatible variables and how every token maps to a Tailwind utility."
date: 2026-10-02
keywords: [design system, design tokens, theming, tailwind css, shadcn ui, next-themes, nextjs template]
order: 4
featured: false
---

# Stage 4 — Design System

## Overview

A design system is the single source of truth for how the interface looks and behaves. Instead of styling components individually, the project defines tokens, themes, typography, spacing, and reusable patterns that every feature follows — consistent by construction, not by discipline.

This stage defines the contract: what the tokens are and how they map to Tailwind. [Stage 5](/docs/frontend/design-implementation-guide) implements it.

## Objectives

- Design tokens
- Theme system (light / dark / system)
- shadcn/ui compatible variables
- Tailwind CSS compatible theme
- Global CSS architecture
- Component guidelines

## Check Installed Dependencies

```bash
bun add class-variance-authority tailwind-merge next-themes clsx lucide-react
```

## Design Philosophy

- Consistency over customization
- Reusable UI components
- Accessibility by default
- Mobile-first, responsive layouts
- Theme-aware components
- Semantic color tokens
- Predictable spacing
- Scalable typography

## Design Tokens

Centralize every visual value instead of hardcoding it inside components:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Z-index
- Animation durations

## Theme Configuration

Three modes: **Light**, **Dark**, **System** — powered by **next-themes**.

| What                | Where                               |
| ------------------- | ----------------------------------- |
| Theme configuration | `packages/configs/theme.config.ts`  |
| Style configuration | `packages/configs/styles.config.ts` |

No component defines its own color palette.

## Semantic Theme Variables

The project follows the shadcn/ui semantic color system. Components reference tokens, never raw color values.

**Foundation** — `background`, `foreground`, `border`, `input`, `ring`, `radius`

**Surface** — `card`, `card-foreground`, `popover`, `popover-foreground`

**Brand** — `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `accent`, `accent-foreground`

**Utility** — `muted`, `muted-foreground`

**Feedback** — `destructive`, `destructive-foreground`

**Optional** (larger applications) — `success` / `warning` / `info` pairs, `chart-1` through `chart-5`, `sidebar` tokens

## Tailwind CSS Compatibility

Every semantic token maps to a Tailwind utility:

| Theme Token            | Tailwind Utility              |
| ---------------------- | ----------------------------- |
| background             | `bg-background`               |
| foreground             | `text-foreground`             |
| primary                | `bg-primary`                  |
| primary-foreground     | `text-primary-foreground`     |
| secondary              | `bg-secondary`                |
| secondary-foreground   | `text-secondary-foreground`   |
| accent                 | `bg-accent`                   |
| accent-foreground      | `text-accent-foreground`      |
| card                   | `bg-card`                     |
| card-foreground        | `text-card-foreground`        |
| popover                | `bg-popover`                  |
| popover-foreground     | `text-popover-foreground`     |
| muted                  | `bg-muted`                    |
| muted-foreground       | `text-muted-foreground`       |
| destructive            | `bg-destructive`              |
| destructive-foreground | `text-destructive-foreground` |
| border                 | `border-border`               |
| input                  | `border-input`                |
| ring                   | `ring-ring`                   |

## Global CSS Architecture

```text
├── styles
│   ├── themes
|        ├── cyantrix-theme.css
|        ├── cosmic-night.css
│   ├── utils
|        ├── app.css
|        ├── fonts.css
|        ├── theme.css
|        ├── animations.css
|        ├── typography.css
│   ├── ui
|        ├── input.css
|        ├── button.css
|        ├── navigation.css
│   ├── globals.css
```

| File           | Responsibility                     |
| -------------- | ---------------------------------- |
| globals.css    | CSS Imports                        |
| theme.css      | CSS Variables compatible to shadcn |
| typography.css | Reset & Typography utilities       |
| input.css      | Shared input styles                |
| app.css        | Shared app utilities               |
| animations.css | Common animations                  |
| navigation.css | Navigation-specific themes         |

## Component Guidelines

Reusable UI lives in `components/ui`. Business-specific components live in `components/features`.

Every reusable component should:

- Use semantic theme variables
- Support light and dark themes
- Reuse existing UI primitives
- Avoid inline styles and hardcoded colors
- Support accessibility
- Expose variants with CVA where relevant

## Color Usage

✅ Preferred

```tsx
className = "bg-primary text-primary-foreground";
className = "bg-card text-card-foreground";
className = "bg-muted text-muted-foreground";
className = "border-border";
className = "focus-visible:ring-ring";
```

❌ Avoid

```tsx
className = "bg-blue-600";
className = "bg-white";
className = "text-gray-500";
className = "border-gray-300";
```

## Stage Deliverables

- ✅ Semantic design tokens
- ✅ Light / Dark / System themes
- ✅ shadcn/ui compatible variables
- ✅ Tailwind CSS compatible theme
- ✅ Global CSS architecture
- ✅ Component guidelines

## Next Stage

Continue to [Stage 5 — Design System Implementation](/docs/frontend/design-implementation-guide) to implement the tokens, typography, spacing, and component variants defined here.
