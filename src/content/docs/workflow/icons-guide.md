---
description: "A centralized, server-rendered LucideIcon wrapper that gives every component one consistent icon API, with usage rules and the bundle-size trade-offs."
date: 2026-10-02
keywords: [icons, lucide, server components, lucideicon, performance, design system, nextjs template]
order: 7
featured: false
---

# Stage 7 — Server-Only Icon System

## Goal

Create a centralized, server-rendered icon system that minimizes client-side JavaScript while providing a single, consistent API for rendering icons throughout the application.

Instead of importing individual icons directly from `lucide-react` across multiple components, the project uses a custom wrapper component named `LucideIcon`.

---

## Why Use a Custom Icon Component?

Using a single wrapper provides several advantages:

- Centralized icon rendering
- Consistent API across the project
- Easier refactoring and maintenance
- Supports dynamic icon rendering
- Keeps component code clean
- Eliminates repetitive icon imports

---

## Server-Only Rendering

`LucideIcon` is designed to be used as a **Server Component**.

Because it does **not** include `"use client"` and does not rely on browser APIs, it renders entirely on the server.

Benefits include:

- No client-side hydration
- Reduced JavaScript sent to the browser
- Faster initial page load
- Better SEO
- Improved performance

This makes the icon system ideal for layouts, navigation, dashboards, tables, forms, and other server-rendered UI.

---

## Component Location

Recommended project structure:

```text
components/
└── ui/
    └── images/
        └── LucideIcon.tsx
```

---

## Usage

Render any supported Lucide icon by passing its component name.

```tsx
<LucideIcon iconName="Home" />

<LucideIcon iconName="User" />

<LucideIcon iconName="Settings" />

<LucideIcon iconName="ChevronRight" />
```

The component accepts all standard SVG properties.

Example:

```tsx
<LucideIcon iconName="Home" className="size-5" strokeWidth={2} />
```

---

## How It Works

Internally, the component:

1. Imports the `icons` registry from `lucide-react`.
2. Receives the icon name as a string.
3. Looks up the matching icon component.
4. Renders the icon if it exists.
5. Returns `null` when an invalid icon name is supplied.

This enables dynamic rendering without importing icons individually throughout the application.

---

## Naming Convention

Always use the official Lucide component name.

Examples:

```text
Home
User
Settings
Search
Calendar
Bell
ChevronRight
ArrowUpRight
Folder
FileText
CircleHelp
```

Avoid using custom aliases or modified names.

---

## Project Convention

Instead of:

```tsx
import { Home, User, Search } from "lucide-react";

<Home />
<User />
<Search />
```

Use:

```tsx
<LucideIcon iconName="Home" />
<LucideIcon iconName="User" />
<LucideIcon iconName="Search" />
```

This keeps every component consistent and avoids repetitive imports.

---

## Best Practices

✅ Use `LucideIcon` throughout the application.

✅ Pass the icon name as a string.

✅ Forward SVG props such as:

- `className`
- `width`
- `height`
- `strokeWidth`
- `color`

✅ Keep icon rendering inside Server Components whenever possible.

---

## Performance Notes

- Icons are rendered on the server, eliminating hydration work for the icon component itself.
- A single wrapper simplifies maintenance and provides a uniform interface across the codebase.
- Because `lucide-react` exports React components, your application bundle still contains the icon components that are actually referenced by your build. The wrapper improves consistency and server rendering, but it does **not** automatically guarantee that every unused icon is excluded solely because the icon name is provided as a string. If minimizing icon bundle size becomes critical in client components, consider using static imports for those cases.

---

## Expected Outcome

After completing this stage, the project will have:

- A centralized icon system
- A consistent icon API
- Server-rendered icons by default
- Clean, maintainable component code
- Enterprise-ready icon architecture
