---
description: "The end-to-end process for building a web app from scratch: discovery, design, theming, config files, project structure, UI and page assembly, with AI prompt templates."
date: 2026-09-12
keywords: [web app, workflow, design system, project structure, ai prompts, nextjs]
featured: false
---

# How to Approach Creating a Web-App from Scratch

### From Idea to Production-Ready Application, with the Exact AI Prompts We Use

This document outlines our end-to-end approach to building web applications — the thinking, tools, and structure we follow on every project, including the AI prompt templates used at each relevant stage. It's meant to give clients, stakeholders, and technical reviewers a clear picture of how we work.

---

## 1. Core Idea & Discovery

Every project starts with a simple question: **what problem does this app solve, and for whom?**

Before any design or code, we gather everything available about the product — client briefs, references, business goals, and target users. This forms the foundation the rest of the build is measured against.

---

## 2. Design Phase

Once the idea is clear, we move into design.

- We consolidate all information collected from the client (brand references, content, tone, goals) into a structured design brief.
- Using AI-assisted design tools, we generate a Figma-style visual concept from that brief.
- This design is shared with the client and refined through rounds of feedback until it's approved.

> **If a design direction isn't already provided by the client**, this is exactly how we create one from scratch — starting from information, not guesswork.

#### 🔹 Prompt — Generate a Figma-Style Design Image

```
Create a high-fidelity Figma-style UI design mockup for a [PAGE TYPE, e.g. "SaaS landing page homepage"].

Brand & context:
- Product: [product name + one-line description]
- Target audience: [who uses this]
- Tone/style: [e.g. minimal, corporate, playful, premium, dark-mode-first]
- Primary brand color: [hex or description]
- Reference sites/styles (if any): [e.g. "similar to Linear.app / Vercel"]

Layout requirements:
- Sections to include: [e.g. Navbar, Hero, Features grid, Testimonials, Pricing, Footer]
- Include a clear visual hierarchy: hero headline, subtext, CTA button
- Use consistent spacing, a modern sans-serif type pairing, and a cohesive color palette (max 2 primary + 1 accent color)
- Show it as a desktop screen at 1440x1024, flat design, no browser chrome

Output style:
- Clean, modern SaaS/product design aesthetic
- Realistic placeholder content (not lorem ipsum) relevant to [product]
- No stock-photo clutter — prioritize whitespace and typography
```

**Tip:** Generate 2–3 variations by changing only the "tone/style" line (e.g. minimal vs. bold vs. corporate), then let the client pick a direction before refining further.

---

## 3. Design Analysis & Theming

With an approved design in hand, we translate it into a working design system:

- We extract the color palette, typography, and visual style from the approved design.
- These are converted into **CSS variables compatible with shadcn/ui**, using **TweakCN** to generate a clean, themeable stylesheet automatically.
- The result is a `current-theme.css` file — a single, portable source of truth for the app's visual identity.

---

## 4. Single Source of Truth — Configuration Files

Rather than scattering content and settings across the codebase, we centralize them:

| File             | Purpose                                                      |
| ---------------- | ------------------------------------------------------------ |
| `app.config.ts`  | Global app-level information (metadata, settings, constants) |
| `home.config.ts` | Content and structure specific to the homepage               |

This pattern is repeated per page/section as needed, so **every piece of copy or configuration lives in one predictable place** — making future edits fast and low-risk.

---

## 5. Project Bootstrapping

We start from a lean **Next.js boilerplate**, stripped of anything unused, so the codebase begins clean rather than bloated.

---

## 6. Project Structure

We organize the codebase into clear, purpose-driven folders:

```
├── app/         → Main application (routes, pages)
├── assets/      → Images, fonts, static media
├── components/  → All .tsx UI components
├── packages/    → All shared .ts logic/configs
├── styles/      → All .css / .scss files
└── types/       → All .d.ts type definitions
```

Configuration files (like `app.config.ts` and `home.config.ts`) live inside `packages/configs/`, and the generated theme lives at `styles/themes/current-theme.css`.

_(A full folder-structure reference is available here [folder-structure](/docs/workflow/folder-structure-guide).)_

---

## 7. Building the UI — From Atoms to Layout

We build the interface in layers, smallest pieces first:

1. **Foundational components** — Button, Link, Input, and other primitives
2. **Structural components** — Header, Footer, Sidebar, Navbar
3. **App Layout** — everything is wrapped in a single `AppClientLayout`, ensuring consistent structure across the entire app

[check ui-component-docs](/docs/ai-prompts/ui-component-prompt-guide)

By the end of this stage, the full layout and theme are complete and consistent site-wide.

#### 🔹 Prompt1 — Convert Design Image → React Component

```
You are given a UI design image. Convert it into a pixel-perfect, responsive React component.

Tech requirements:
- Framework: Next.js (App Router) + TypeScript
- Styling: Tailwind CSS v4, using CSS variables from our shadcn-compatible theme (styles/themes/current-theme.css) — no hardcoded hex colors
- Components: use shadcn/ui primitives where applicable (Button, Input, Card, etc.) instead of raw HTML elements
- Icons: lucide-react

Code quality requirements:
- Match the design pixel-for-pixel: spacing, font sizes, alignment, and proportions
- Fully responsive: mobile-first, with clean breakpoints at sm/md/lg/xl — no horizontal overflow, no broken layouts at any width
- Semantic, accessible HTML (proper heading hierarchy, alt text, aria labels where needed)
- Clean, readable code: small focused components, no inline styles, no magic numbers (use theme spacing/tokens)
- Pull all editable text/content from a config object (e.g. home.config.ts) rather than hardcoding strings in the component
- Export a single default component with clear prop types

Output:
- Return only the component code, split into logical files if needed (e.g. separate subcomponents for repeated blocks like cards)
- Note any assumptions you made about content that wasn't visible/legible in the image
```

#### 🔹 Prompt2 — Convert Design Image → Best-Fit React Component

```
You are given a UI design image. Convert it into a pixel-perfect, responsive React component.

Tech requirements:
- Framework: Next.js (App Router) + TypeScript
- Styling: Tailwind CSS v4 syntax only (never v3-style classes/config — use the v4 CSS-first `@theme`/CSS variable approach), using CSS variables from our shadcn-compatible theme (styles/themes/current-theme.css) — no hardcoded hex colors
- Components: use shadcn/ui primitives where applicable (Button, Input, Card, etc.) instead of raw HTML elements
- Icons: lucide-react
- Animation: GSAP, wrapped in custom hooks (not inline useEffect calls)
- Use the `cn()` utility everywhere className logic is conditional or merged — never string-concatenate classNames manually

Architecture requirements:
- Single source of truth: all editable text/content, links, and static data must live in a config file (e.g. home.config.ts), never hardcoded inline
- Extract any non-trivial logic (data transforms, conditional rendering rules, form/state handling, intersection/scroll logic, animation triggers) into custom hooks — never leave complex logic inline inside the component body
- Responsive/breakpoint logic must go through a shared `useBreakpoints` hook — never ad-hoc `window.innerWidth` checks or duplicated media-query logic per component
- Animation hooks: build reusable GSAP hooks for repeated patterns, e.g.:
  - useRevealHook(ref, options) — fade/slide-in on scroll (IntersectionObserver-driven, using GSAP + ScrollTrigger)
  - useStaggerReveal(ref, options) — staggered reveal for lists/grids of cards
  - useParallax(ref, speed) — subtle parallax on scroll, if the design calls for it
  - All animation hooks must clean up on unmount (kill GSAP timelines/ScrollTriggers) and respect prefers-reduced-motion
- Keep hooks in a dedicated hooks/ folder, one hook per file, named by what they do (useRevealHook.ts, not useEffectX.ts)

Code quality requirements:
- Match the design pixel-for-pixel: spacing, font sizes, alignment, and proportions
- Fully responsive: mobile-first, with clean breakpoints at sm/md/lg/xl — no horizontal overflow, no broken layouts at any width
- Fluid typography where appropriate (clamp()-based sizing) instead of hard breakpoint jumps for text
- Semantic, accessible HTML: correct heading hierarchy, alt text, aria labels, visible focus states, full keyboard navigability
- Any inline/decorative SVG (including SVGs used for animation) must include `aria-label` and `role="img"` (or `aria-hidden="true"` if purely decorative) so it never trips accessibility lint rules
- When rendering lists with `.map()`, always use a stable, semantically meaningful `key` (e.g. an id or slug from the data) — never the array index
- Small, focused, single-responsibility components — no component doing more than one job
- No inline styles, no magic numbers — use theme tokens/spacing scale throughout
- Strict TypeScript: explicit interfaces/types for all props and config shapes — never use `any`; if a type is genuinely unknown at that point, use `unknown` and narrow/typecast it explicitly before use
- All code must pass Biome lint rules (biome.js) — correctly formatted, no unused vars/imports, consistent import ordering, no implicit any, exhaustive dependency arrays on hooks
- Handle loading/empty/error states where the component involves async or conditional data, using skeleton states rather than layout shift
- Optimize images via next/image with correct sizing and lazy loading
- Add concise JSDoc comments on custom hooks and non-obvious logic — not on self-explanatory code
- Follow consistent naming conventions (PascalCase components, camelCase hooks/functions, kebab-case files) and use barrel exports (index.ts) where a folder has multiple related components

Output:
- Return only the component code, organized into logical files: main component, subcomponents (for repeated blocks like cards), custom hooks, and the config file
- List the file tree first (paths only), then the code for each file
- Note any assumptions made about content that wasn't visible/legible in the image, and flag anywhere you deviated from the design and why

```

**Tip:** Feed this prompt the design image directly alongside the text — the more precisely you describe spacing/typography in the surrounding message, the closer the pixel match.

---

## 8. Page Assembly

With components and layout in place, we build out individual pages — Home, About, Contact, and beyond — reusing the Stage 7 prompt per page/section, matching each new page to the approved design pixel-for-pixel.

---

## Suggested End-to-End Flow

1. Gather brief → run **Stage 2 prompt** → get design image → iterate with client until approved.
2. Extract theme colors from the approved image via TweakCN → generate `current-theme.css`.
3. Set up `app.config.ts` / `home.config.ts` as the single source of truth for content.
4. Bootstrap Next.js boilerplate → set up folder structure.
5. Build foundational + structural components → wrap in `AppClientLayout`.
6. Run **Stage 7 prompt** per page/section with the approved image attached → get component code.
7. Wire each component's text content into its matching `*.config.ts` file.
8. Manually QA responsiveness at mobile/tablet/desktop breakpoints before merging.

---

## Why This Process Works

- **Design-first, not code-first** — nothing gets built until the visual direction is approved.
- **Single source of truth** — content and theme are centralized, not hardcoded.
- **Component-driven** — reusable pieces mean faster iteration and fewer bugs.
- **Consistent structure** — every project follows the same predictable folder and config pattern, making handoff and scaling easy.

---

_Prepared by @vivekcsein — AI-powered web products, built with a clear, repeatable process._
