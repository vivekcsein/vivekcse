---
description: "Composable layout primitives for React and Next.js: why to build layouts from reusable components, and how they improve spacing, responsiveness and readability."
date: 2026-09-12
keywords: [react, nextjs, layout components, reusable components, responsive design, tailwind]
featured: false
---

# Reusable UI Layout Components

A collection of small, composable layout primitives for building consistent, maintainable React/Next.js interfaces.

The goal is simple:

> **Build layouts from reusable primitives instead of repeatedly writing one-off wrapper components and CSS.**

These components should contain **layout behavior**, not business logic. They can be reused across pages, features, dashboards, forms, documentation, authentication screens, and other parts of the application.

---

## Why Reusable Layout Components?

As a project grows, layout code is often duplicated:

```tsx
<div className="flex items-center justify-center gap-4">...</div>
```

Then somewhere else:

```tsx
<div className="flex flex-col gap-6">...</div>
```

And somewhere else:

```tsx
<div className="mx-auto w-full max-w-5xl px-4">...</div>
```

The problem isn't that these implementations are difficult.

The problem is **consistency and maintenance**.

A reusable layout system turns those patterns into predictable components:

```tsx
<Center>...</Center>
```

```tsx
<Stack gap="lg">...</Stack>
```

```tsx
<Container size="lg">...</Container>
```

This makes the JSX communicate the **design intent** instead of exposing implementation details.

---

# Design Philosophy

The layout system should follow these principles:

### 1. Composition over specialization

Prefer:

```tsx
<Container>
  <Stack gap="lg">
    <Split>...</Split>

    <Grid>...</Grid>
  </Stack>
</Container>
```

over creating:

```tsx
<DashboardPageContentWrapper />
<ProfileHeaderWrapper />
<SettingsSectionWrapper />
```

---

### 2. Layout primitives should be boring

Layout components should not know about:

- authentication
- API calls
- users
- products
- business rules
- application state

They should primarily control:

- display
- direction
- alignment
- spacing
- sizing
- wrapping
- positioning
- responsive behavior
- overflow

---

### 3. Consistency should be built into the API

Instead of every developer deciding:

```tsx
gap-3
gap-4
gap-5
gap-[18px]
gap-[21px]
```

the design system can provide:

```tsx
gap = "sm";
gap = "md";
gap = "lg";
```

This creates a consistent visual rhythm across the application.

---

# Recommended Layout Primitives

## Component Overview

| Component     | Primary Responsibility      | Common Use                 |
| ------------- | --------------------------- | -------------------------- |
| `Box`         | Generic layout primitive    | Custom layout needs        |
| `Stack`       | Vertical/horizontal spacing | Sections, forms, content   |
| `Inline`      | Horizontal alignment        | Buttons, icons, actions    |
| `Center`      | Centering content           | Empty states, loaders      |
| `Container`   | Content width               | Pages and readable content |
| `Grid`        | Two-dimensional layout      | Cards, dashboards          |
| `Cluster`     | Wrapping groups             | Tags, filters, chips       |
| `Split`       | Push content apart          | Headers, list rows         |
| `Sidebar`     | Main + sidebar layout       | Admin panels, docs         |
| `AspectRatio` | Fixed media proportions     | Images, video, cards       |
| `ScrollArea`  | Controlled scrolling        | Sidebars, panels           |
| `Spacer`      | Flexible empty space        | Toolbars, navigation       |

---

# 1. Box

`Box` is the most generic layout primitive.

It should be used when a developer needs a styled layout element without introducing a specialized component.

### Example

```tsx
<Box padding="md" display="flex">
  ...
</Box>
```

### Common Use Cases

- Generic wrappers
- Custom sections
- Applying layout properties
- Building other primitives
- Situations where no specialized primitive fits

### UI/UX Impact

`Box` reduces the need for arbitrary `<div>` elements with inconsistent CSS.

It becomes a common building block that helps developers maintain the same spacing and sizing conventions throughout the project.

---

# 2. Stack

`Stack` manages spacing between elements along an axis.

### Example

```tsx
<Stack gap="md">
  <Heading />
  <Text />
  <Button />
</Stack>
```

Horizontal:

```tsx
<Stack direction="horizontal" gap="md">
  <Button />
  <Button />
</Stack>
```

### Common Use Cases

- Forms
- Settings sections
- Card content
- Authentication pages
- Vertical page sections
- Navigation groups
- Modal content

### UI/UX Impact

Without a Stack primitive, developers frequently use arbitrary margins:

```tsx
<Heading className="mb-4" />
<Text className="mb-6" />
<Button className="mt-2" />
```

This can produce inconsistent spacing.

With Stack:

```tsx
<Stack gap="lg">
  <Heading />
  <Text />
  <Button />
</Stack>
```

The spacing becomes a property of the **layout**, rather than individual children.

This makes changing the visual rhythm much easier.

For example, changing:

```tsx
gap = "md";
```

to:

```tsx
gap = "lg";
```

can update the entire section without touching its children.

---

# 3. Inline

`Inline` is designed for content that belongs on the same horizontal line.

### Example

```tsx
<Inline gap="sm" align="center">
  <Avatar />
  <span>John Doe</span>
  <Badge>Admin</Badge>
</Inline>
```

### Common Use Cases

- Icon + text
- Buttons
- Badges
- User information
- Toolbars
- Navigation actions
- Form controls

### UI/UX Impact

Inline layouts often appear throughout an application.

A shared primitive helps ensure:

- consistent horizontal spacing
- consistent vertical alignment
- predictable wrapping behavior
- easier responsive adjustments

It also prevents developers from repeatedly solving the same flexbox problem.

---

# 4. Center

`Center` centers its children according to the selected axis.

### Example

```tsx
<Center>
  <Spinner />
</Center>
```

Horizontal:

```tsx
<Center direction="horizontal">
  <Button />
</Center>
```

Vertical:

```tsx
<Center direction="vertical">
  <EmptyState />
</Center>
```

Both:

```tsx
<Center direction="both">
  <EmptyState />
</Center>
```

`both` should be the default.

### Common Use Cases

- Loading states
- Empty states
- Authentication screens
- Error screens
- Modal content
- Placeholder content
- Hero content

### UI/UX Impact

Centering is a common visual requirement.

A dedicated primitive avoids repeated flexbox implementations and makes the intention obvious:

```tsx
<Center>
```

instead of:

```tsx
<div className="flex min-h-full items-center justify-center">
```

It also makes global changes easier if the design system later changes alignment behavior.

---

# 5. Container

`Container` controls the maximum readable width of content.

### Example

```tsx
<Container size="lg">
  <PageContent />
</Container>
```

Possible sizes:

```tsx
<Container size="sm" />
<Container size="md" />
<Container size="lg" />
<Container size="xl" />
```

A fluid container can also be supported:

```tsx
<Container fluid>...</Container>
```

### Common Use Cases

- Main page content
- Documentation
- Blog articles
- Forms
- Marketing pages
- Settings
- Dashboards

### UI/UX Impact

Container width has a major effect on readability.

A page that is too wide can feel empty and make text difficult to scan.

A page that is too narrow can feel cramped.

Centralizing width rules means the application can change its content width consistently.

For example:

```tsx
<Container size="lg">
```

can become:

```tsx
<Container size="xl">
```

without rewriting page-level CSS.

---

# 6. Grid

`Grid` handles two-dimensional layouts.

### Example

```tsx
<Grid columns={3} gap="lg">
  <Card />
  <Card />
  <Card />
</Grid>
```

Responsive example:

```tsx
<Grid
  columns={{
    base: 1,
    md: 2,
    lg: 3,
  }}
>
  ...
</Grid>
```

### Common Use Cases

- Dashboard cards
- Product cards
- Image galleries
- Feature sections
- Admin interfaces
- Statistics
- Settings layouts

### UI/UX Impact

Grid controls the relationship between:

- number of columns
- content density
- spacing
- responsive behavior

A reusable Grid makes responsive design much easier.

Instead of manually rewriting CSS at every breakpoint, developers can express the intended layout:

```tsx
columns={{
  base: 1,
  md: 2,
  lg: 3,
}}
```

The same component can then adapt across desktop, tablet, and mobile layouts.

---

# 7. Cluster

`Cluster` is useful when items should appear together but are allowed to wrap.

### Example

```tsx
<Cluster gap="sm">
  <Tag>React</Tag>
  <Tag>Next.js</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Tailwind</Tag>
  <Tag>Node.js</Tag>
</Cluster>
```

Possible result:

```text
[React] [Next.js] [TypeScript] [Tailwind]
[Node.js] [Postgres] [Docker]
```

### Common Use Cases

- Tags
- Keywords
- Filters
- Chips
- Categories
- Button groups
- Search filters

### UI/UX Impact

Wrapping is important for responsive interfaces.

Without a shared primitive, developers may accidentally create:

- overflowing content
- broken mobile layouts
- inconsistent gaps
- awkward manual line breaks

Cluster makes wrapping an intentional part of the component's behavior.

---

# 8. Split

`Split` places content at opposite sides of a layout.

### Example

```tsx
<Split>
  <Heading />
  <Actions />
</Split>
```

Result:

```text
Heading                              Actions
```

### Common Use Cases

- Page headers
- Card headers
- List items
- Settings rows
- Navigation bars
- Toolbar layouts

### UI/UX Impact

Split removes the need for repeated:

```css
display: flex;
justify-content: space-between;
align-items: center;
```

More importantly, it makes the layout intention obvious.

The developer can immediately understand:

> These two areas belong together, but should occupy opposite sides.

---

# 9. Sidebar

`Sidebar` provides a reusable main-content + sidebar structure.

### Example

```tsx
<Sidebar sidebar={<Navigation />}>
  <MainContent />
</Sidebar>
```

Conceptually:

```text
┌──────────────┬─────────────────────────────┐
│              │                             │
│ Navigation   │        Main Content         │
│              │                             │
│              │                             │
└──────────────┴─────────────────────────────┘
```

### Common Use Cases

- Admin dashboards
- Documentation
- Developer tools
- Settings
- CMS interfaces
- SaaS applications

### UI/UX Impact

Sidebar behavior can become complex when responsive behavior is introduced.

A reusable Sidebar can centralize:

- sidebar width
- gaps
- collapse behavior
- mobile behavior
- sticky positioning
- responsive transitions

This prevents every page from implementing its own sidebar system.

---

# 10. AspectRatio

`AspectRatio` keeps content inside a predictable ratio.

### Example

```tsx
<AspectRatio ratio={16 / 9}>
  <Image src="/thumbnail.jpg" alt="Video thumbnail" fill />
</AspectRatio>
```

### Common Use Cases

- Video thumbnails
- Images
- Cards
- Banners
- Embedded media
- Gallery items

### UI/UX Impact

Without an aspect-ratio constraint, images with different dimensions can cause layouts to jump.

A shared AspectRatio component helps maintain visual consistency and reduces layout shift.

---

# 11. ScrollArea

`ScrollArea` provides controlled scrolling behavior.

### Example

```tsx
<ScrollArea>
  <Navigation />
</ScrollArea>
```

Horizontal:

```tsx
<ScrollArea orientation="horizontal">
  <LargeTable />
</ScrollArea>
```

### Common Use Cases

- Sidebars
- Tables
- Dropdown menus
- Chat windows
- Code blocks
- Panels
- Long navigation lists

### UI/UX Impact

Scrolling behavior is easy to implement incorrectly.

A shared primitive can standardize:

- overflow behavior
- scrollbar treatment
- maximum heights
- horizontal vs vertical scrolling
- nested scrolling behavior

This is especially important in complex dashboard interfaces.

---

# 12. Spacer

`Spacer` consumes available flexible space.

### Example

```tsx
<Inline>
  <Logo />

  <Spacer />

  <UserMenu />
</Inline>
```

Result:

```text
Logo                              UserMenu
```

### Common Use Cases

- Navigation bars
- Toolbars
- Card headers
- Action rows
- Header layouts

### UI/UX Impact

Spacer can make flexible layouts easier to understand than repeated margin hacks.

Instead of:

```tsx
<UserMenu className="ml-auto" />
```

you can express:

```tsx
<Spacer />
<UserMenu />
```

This can be particularly useful when building reusable layout primitives.

---

# How These Components Work Together

The real value doesn't come from using these components individually.

It comes from **composition**.

For example:

```tsx
<Container size="lg">
  <Stack gap="xl">
    <Split>
      <PageTitle />
      <PageActions />
    </Split>

    <Grid
      columns={{
        base: 1,
        md: 2,
        lg: 3,
      }}
      gap="lg"
    >
      <Card />
      <Card />
      <Card />
    </Grid>
  </Stack>
</Container>
```

This describes the layout almost like a design specification:

> Keep content within a large container → stack sections vertically → split the header → display cards in a responsive grid.

The implementation details become secondary.

---

# How Reusable Layout Components Make Development Easier

## Before

A developer receives a Figma design and repeatedly writes:

```tsx
<div className="mx-auto max-w-6xl px-4">
  <div className="flex flex-col gap-6">
    <div className="flex items-center justify-between">...</div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      ...
    </div>
  </div>
</div>
```

This works.

But every developer has to remember:

- container width
- spacing
- breakpoints
- alignment
- responsive rules
- design tokens

---

## After

```tsx
<Container size="lg">
  <Stack gap="lg">
    <Split>...</Split>

    <Grid
      columns={{
        base: 1,
        md: 2,
        lg: 3,
      }}
      gap="lg"
    >
      ...
    </Grid>
  </Stack>
</Container>
```

Now the developer mainly thinks about:

> **What is the layout?**

rather than:

> **How do I implement the layout?**

---

# How This Affects UI/UX

Reusable layout primitives don't just make code cleaner.

They can directly improve the product's UX.

## Consistent spacing

A shared spacing scale creates visual rhythm across the application.

```tsx
<Stack gap="sm" />
<Stack gap="md" />
<Stack gap="lg" />
```

Instead of hundreds of arbitrary values.

---

## Consistent responsive behavior

Responsive rules can be standardized.

```tsx
<Grid
  columns={{
    base: 1,
    md: 2,
    lg: 3,
  }}
/>
```

This reduces the chance that one page behaves differently from another.

---

## Better readability

`Container` prevents content from becoming unnecessarily wide.

```tsx
<Container size="md">
  <Article />
</Container>
```

This can make long-form content easier to read.

---

## Better visual hierarchy

`Stack`, `Split`, `Center`, and `Cluster` make spacing and alignment intentional.

That directly affects how users perceive:

- grouping
- hierarchy
- importance
- relationships between controls

---

## Fewer layout bugs

Centralizing common layout behavior reduces repeated CSS implementations.

That means fewer:

- overflow bugs
- mobile layout issues
- alignment issues
- inconsistent spacing
- unexpected wrapping problems

---

# Recommended Component API

A mature implementation should support common HTML behavior.

For example:

```tsx
<Stack as="section" gap="lg" className="...">
  ...
</Stack>
```

Where appropriate, support:

- `children`
- `className`
- `style`
- `id`
- HTML attributes
- semantic `as` / polymorphic rendering
- responsive props
- design-system spacing tokens

Avoid adding business-specific props to layout primitives.

Bad:

```tsx
<Stack userType="admin" />
```

Good:

```tsx
<Stack gap="lg" />
```

---

# Recommended Architecture

```text
components/
└── ui/
    ├── layout/
    │   ├── Box.tsx
    │   ├── Center.tsx
    │   ├── Container.tsx
    │   ├── Stack.tsx
    │   ├── Inline.tsx
    │   ├── Cluster.tsx
    │   ├── Grid.tsx
    │   ├── Split.tsx
    │   ├── Sidebar.tsx
    │   ├── AspectRatio.tsx
    │   ├── ScrollArea.tsx
    │   ├── Spacer.tsx
    │   └── index.ts
    │
    ├── button/
    ├── input/
    ├── card/
    ├── dialog/
    ├── dropdown/
    └── ...
```

Export them from one location:

```tsx
import {
  Box,
  Center,
  Cluster,
  Container,
  Grid,
  Inline,
  ScrollArea,
  Sidebar,
  Spacer,
  Split,
  Stack,
} from "@/components/ui/layout";
```

---

# AI Prompt: Create the Layout Components

Use the following prompt with an AI coding assistant such as Claude Code, Cursor, or another coding agent.

```text
You are a senior frontend architect and design-system engineer.

I am building a reusable UI/layout system for a production-grade React/Next.js application using TypeScript.

Create a set of reusable, enterprise-grade layout primitives:

1. Box
2. Stack
3. Inline
4. Center
5. Container
6. Grid
7. Cluster
8. Split
9. Sidebar
10. AspectRatio
11. ScrollArea
12. Spacer

Requirements:

- Use TypeScript.
- Components must be reusable throughout the application.
- Keep layout primitives focused only on layout behavior.
- Do not include business logic.
- Prefer composition over specialized page-specific wrappers.
- Support `children`.
- Support `className`.
- Preserve normal HTML attributes where appropriate.
- Use semantic HTML where appropriate.
- Design the API so it is easy to understand from JSX.
- Avoid unnecessary abstraction.
- Avoid over-engineering.
- Use a consistent design-token approach for spacing and sizing.
- Make responsive behavior easy to express.
- Ensure accessibility is preserved.
- Ensure components work well with server components in Next.js.
- Avoid adding "UI" suffixes to component names.
- Use clear enterprise-grade names.

Suggested API concepts:

Box:
- generic layout primitive
- support common layout properties

Stack:
- vertical/horizontal direction
- configurable gap
- alignment

Inline:
- horizontal layout
- configurable gap
- alignment
- optional wrapping

Center:
- direction: "vertical" | "horizontal" | "both"
- default direction should be "both"

Container:
- predefined max-width sizes such as sm, md, lg, xl
- fluid option
- horizontal padding

Grid:
- configurable columns
- configurable gap
- responsive column configuration

Cluster:
- horizontal grouping
- wrapping
- configurable gap
- alignment

Split:
- content on opposite sides
- alignment
- configurable gap

Sidebar:
- sidebar + main content
- configurable sidebar width
- responsive behavior
- allow sticky/collapsible behavior if it can be implemented cleanly

AspectRatio:
- configurable ratio
- preserve content dimensions

ScrollArea:
- vertical/horizontal scrolling
- configurable behavior
- avoid unnecessary custom scrollbar logic unless required by the project

Spacer:
- flexible space within flex layouts

Important:

Before writing code, inspect the existing project structure and identify:

- styling solution
- Tailwind configuration
- existing `cn` utility
- CVA usage
- existing UI conventions
- TypeScript configuration
- path aliases
- existing component patterns

Do not introduce a new styling library if the project already has one.

Follow the existing project's conventions.

Use the smallest reasonable abstraction.

For each component:

1. Create the component.
2. Define a clear TypeScript prop API.
3. Add useful JSDoc comments.
4. Add the component to the layout index barrel.
5. Provide 2–4 usage examples.
6. Consider responsive behavior.
7. Check accessibility and semantic HTML.
8. Run TypeScript/type checking.
9. Run linting.
10. Fix any issues found.

Also create a README.md inside the layout directory documenting:

- purpose of the layout system
- component overview
- API examples
- common use cases
- composition examples
- responsive examples
- design-system guidelines
- when NOT to create a new layout component

Do not create page-specific components such as:
- DashboardWrapper
- ProfileLayoutWrapper
- SettingsContainer
- UserCardContainer

unless an actual product requirement requires them.

The goal is to create a small, composable layout vocabulary that can be reused across the entire application.
```

---

# Guidelines for Developers

## Prefer composition

Good:

```tsx
<Container>
  <Stack>
    <Split />
    <Grid />
  </Stack>
</Container>
```

Avoid:

```tsx
<DashboardContentWrapper>
  <DashboardHeaderWrapper>...</DashboardHeaderWrapper>
</DashboardContentWrapper>
```

---

## Don't create a component for every `<div>`

Not every wrapper deserves a component.

Create a primitive when the layout pattern:

1. appears repeatedly,
2. has meaningful behavior,
3. benefits from a consistent API,
4. or represents an important design-system concept.

---

## Don't put business logic into layout primitives

Avoid:

```tsx
<Sidebar user={user} permissions={permissions} />
```

Prefer:

```tsx
<Sidebar sidebar={<Navigation />}>
  <Content />
</Sidebar>
```

The application decides **what** is rendered.

The layout primitive decides **how it is positioned**.

---

# Suggested Implementation Priority

You don't need to build all 12 components at once.

Start with the primitives that provide the highest value:

### Phase 1 — Core

```text
Box
Stack
Inline
Center
Container
```

### Phase 2 — Layout

```text
Grid
Cluster
Split
Spacer
```

### Phase 3 — Specialized Layout

```text
Sidebar
AspectRatio
ScrollArea
```

This keeps the design system small while allowing it to grow organically.

---

# Final Principle

The purpose of a layout system is not to hide CSS.

It is to create a **shared vocabulary for UI layout**.

Instead of developers repeatedly thinking:

```text
display: flex
flex-direction: column
gap: 24px
max-width: 1200px
margin: auto
align-items: center
justify-content: space-between
```

they should be able to think:

```tsx
<Container size="lg">
  <Stack gap="lg">
    <Split>...</Split>
  </Stack>
</Container>
```

That is the real advantage.

**The component system turns low-level implementation decisions into reusable design decisions.**

As the application grows, this can make UI development:

- faster
- more consistent
- easier to review
- easier to refactor
- more responsive
- easier for new developers to understand
- less prone to layout bugs
