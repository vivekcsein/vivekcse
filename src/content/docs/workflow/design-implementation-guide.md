---
description: "Implement the design system: CSS variables, next-themes, typography, spacing, radius and shadow scales, cn(), CVA variants and the first reusable UI components."
date: 2026-10-02
keywords: [design system, css variables, next-themes, cva, tailwind css, typography, accessibility, nextjs template]
order: 5
featured: false
---

# Stage 5 — Design System Implementation

## Overview

Stage 4 defined the design system's contract. This stage implements it: CSS variables, theme wiring, typography, spacing, radius, shadows, breakpoints, and the first reusable UI components.

## Objectives

- CSS variable system (light + dark)
- Theme provider wired up with next-themes
- Tailwind theme integration
- Typography, spacing, radius, and shadow scales
- Utility functions (`cn()` and friends)
- Component variants with CVA
- First reusable UI components

## 1. CSS Variables

Define light and dark values for every semantic token from Stage 4 — `background`, `foreground`, `primary`, `card`, `muted`, `destructive`, `border`, `input`, `ring`, `radius`, plus any optional tokens the project needs — inside `styles/globals.css`.

## 2. Theme Configuration

Wire up **next-themes**:

- Default theme
- System theme detection
- Theme persistence
- `ThemeProvider` in `components/providers/ThemeProvider`
- A theme switcher component

## 3. Tailwind CSS Integration

Configure Tailwind to consume the semantic tokens from Stage 4 as first-class utilities: semantic classes, theme-aware utilities, custom utilities, responsive variants.

## 4. Typography System

| Token      | Usage                 |
| ---------- | --------------------- |
| Display    | Landing pages         |
| H1         | Main page title       |
| H2         | Section title         |
| H3         | Card title            |
| H4         | Small section title   |
| Body Large | Main content          |
| Body       | Default text          |
| Small      | Secondary information |
| Caption    | Labels                |

Define font families, sizes, weights, and line heights as utilities inside `styles/typography.css`.

## 5. Spacing System

```text
4px   8px   12px   16px   20px   24px   32px   40px   48px   64px
```

Avoid arbitrary spacing values unless no reasonable token fits.

## 6. Border Radius

```text
Small · Medium · Large · Extra Large · Full
```

Buttons, inputs, cards, dialogs, and modals all reuse these values — never a one-off radius.

## 7. Shadow System

```text
Shadow XS · Shadow SM · Shadow MD · Shadow LG · Shadow XL
```

Avoid hand-written `box-shadow` values in components.

## 8. Responsive Breakpoints

| Device      | Width  |
| ----------- | ------ |
| Mobile      | <640px |
| Small       | 640px  |
| Medium      | 768px  |
| Large       | 1024px |
| Extra Large | 1280px |
| 2XL         | 1536px |

Design mobile-first; apply breakpoints consistently across the application.

## 9. Utility Functions

```typescript
// packages/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

## 10. Component Variants (CVA)

```text
Button
├── default
├── outline
├── ghost
├── destructive
└── link
```

```text
Badge
├── default
├── success
├── warning
└── error
```

Use Class Variance Authority to manage variants — never duplicate a component to express a variant.

## 11. Reusable UI Components

First components to build inside `components/ui`:

```text
ui
├── button
│   └── Button.tsx
│
├── input
│   ├── Input.tsx
│   ├── Checkbox.tsx
│   ├── Select.tsx
│   ├── PasswordInput.tsx
│   └── InputFactory.tsx
│
└── shadcn
```

These stay presentation-only — no business logic, no data fetching, no feature-specific state.

## 12. Icons

Single icon library: `lucide-react`. Tree-shakeable, consistent style, typed, lightweight. Don't mix icon families.

## 13. Animation Guidelines

Shared animations live in `styles/animations.css`: fade in, fade out, scale, slide, accordion, skeleton loading. Keep timing consistent across components.

## 14. Accessibility

Build it in, don't bolt it on:

- Keyboard navigation
- Visible focus states
- Sufficient color contrast
- Semantic HTML
- ARIA attributes where needed
- Screen reader compatibility

## Design System Rules

- Never hardcode colors inside components.
- Reuse design tokens.
- Keep spacing consistent.
- Prefer semantic color names.
- Keep typography centralized.
- Reuse component variants — don't duplicate implementations.
- Build accessible components by default.

## Stage Deliverables

- ✅ Light / Dark / System theme system, fully wired
- ✅ Semantic CSS variables
- ✅ Tailwind semantic utilities
- ✅ Typography, spacing, radius, and shadow scales
- ✅ Shared styling utilities
- ✅ Reusable component variants (CVA)
- ✅ Foundation UI components: Button, Input, Checkbox, Card, Badge, Dialog
- ✅ Consistent, accessible design language

## Design Philosophy

The project follows a modern enterprise design system inspired by:

- Shadcn UI
- Frontend Skills
- Taste Skills

The visual style should feel:

- Minimal
- Premium
- Professional
- Spacious
- Accessible
- Modern
- Performance-first

Avoid decorative or flashy UI unless explicitly requested.

---
