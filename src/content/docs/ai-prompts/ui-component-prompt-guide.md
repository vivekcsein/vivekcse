---
description: "Reusable AI prompts for generating production-grade UI components like Button, Link and Input, with a master template and rules for variants, sizes and code quality."
date: 2026-09-12
keywords: [ui components, ai prompts, prompt engineering, react, nextjs, design system]
featured: false
---

# UI Component Prompt Guide

A reusable set of prompts for generating individual, production-grade UI
components (Button, Link, Input, and other "micro UI") for your
`next-js-ui` template. Built from what actually broke in the audit, so
each prompt now closes those gaps by default instead of leaving them to
chance.

Stack assumed throughout: **TypeScript, Next.js (App Router), React,
Tailwind CSS v4 + theme CSS variables, `class-variance-authority`,
Bun.**

---

## How to use this

1. Copy the **Master Template** and fill in the blanks for whatever
   component you're building — OR
2. Copy one of the **ready-made prompts** below (Button, Link, Input)
   as-is.
3. Before you accept the output, run it through the **Pre-Ship
   Checklist** at the bottom. Every item on that checklist maps to a
   real bug found in your repo.

Keep one prompt per component, one component per file. Don't ask for
Button and Link (or Button and Input) in the same prompt — that's what
produced the tangled, half-finished comparison folders last time.

---

## The Master Template

Use this skeleton for _any_ new component (Checkbox, Switch, Select,
Badge, Tooltip, Avatar, Textarea, etc.). Replace the bracketed parts.

```
Create a standalone [COMPONENT NAME] component, extracted into its own
file, that extends [the native HTML element / the library primitive it
wraps] (not a wrapper that reinvents its props).

Isolation requirement (critical):
- This component must be the ONLY client-rendered piece in its tree.
  Mark it "use client" itself and keep it self-contained — never force
  a parent/page component to become client-rendered just to use this
  [COMPONENT]. Any animation/interactivity logic must live inside this
  component or its own hooks, not leak upward.

Independence requirement (only if this component visually echoes
another one, e.g. a Link that should look like a Button):
- This component must NOT import [OTHER COMPONENT] or any of its
  internal code. Both must be able to exist, build, and ship
  independently. Visual parity between them is achieved by both
  pulling from the SAME shared design tokens file (e.g.
  `motion.config.ts`, theme CSS variables) — never by one importing
  the other.

Tech requirements:
- TypeScript, extending `React.[X]HTMLAttributes<HTML[X]Element>` (or
  the equivalent `ComponentProps<typeof ...>` for a wrapped primitive)
  so all native props work out of the box
- Styling via Tailwind CSS v4 + our theme CSS variables
  (styles/theme/current-theme.css) — no hardcoded colors, and no CSS
  variable referenced in a class that isn't ALSO defined in
  current-theme.css (list every var you introduce and confirm it's
  defined, in both light and dark)
- Use `cva` (class-variance-authority) for variants
- Use `cn()` for all conditional/merged classNames

Variants required:
- `[variant 1]` — [behavior]
- `[variant 2]` — [behavior]
- ...list every variant explicitly. Do not say "the rest should be
  standard" — spell out what "standard" means for this component, or
  it will be skipped or half-implemented.

Sizes: [list sizes, or "match shadcn's sm / default / lg / icon scale"]

States required: [hover, focus-visible, active/pressed, disabled,
loading, error, success — list only the ones that apply]

Defaults:
- If no `variant` prop is passed, default to `[x]`
- If no `size` prop is passed, default to `[x]`
- All defaults must be set via cva's `defaultVariants`, not manual
  prop fallback logic in the component body

Code quality requirements:
- Export both the component and its `[name]Variants` (cva instance)
- Forward refs (`React.forwardRef`)
- Any animation logic beyond a simple CSS transition must live in a
  custom hook (e.g. `use[Component]Interaction`), not inline in the
  component
- If two or more variants/props branch into similar-but-different CSS
  (e.g. 3 underline directions, 3 tooltip placements), implement that
  branching in exactly ONE place — either cva `compoundVariants` OR a
  hook, never both. State which one you're using and don't duplicate
  the other.
- Respect `prefers-reduced-motion` for every animated variant
- Fully accessible: proper focus-visible ring, disabled state removes
  interactivity and updates aria-disabled/aria-invalid as relevant, no
  keyboard traps, correct semantic element/role

Output:
- `[Component].tsx` (component + variants) — no placeholder/stub
  content; every exported variant must be fully implemented, not left
  as a TODO
- Any custom hook file used
- A short usage example file (`[Component]Examples.tsx`) showing every
  variant, every size, and the disabled state side by side
```

---

## Ready-made prompt: Button

```
# Prompt: Standalone Button Component

Create a standalone `Button` component, extracted into its own file,
that extends the native HTML button props (not a wrapper that
reinvents them).

## Isolation requirement (critical)

- This component must be the ONLY client-rendered piece in its tree.
  Mark it `"use client"` itself and keep it self-contained — never
  force a parent/page component to become client-rendered just to use
  this Button. Any animation/interactivity logic must live inside this
  component or its own hooks, not leak upward.
- The component must be fully self-contained: it must NOT import a
  `Link` component or any Link-internal code, even for the `link`
  variant described below. `Button` builds and ships independently.

## Tech requirements

- TypeScript, extending `React.ButtonHTMLAttributes<HTMLButtonElement>`
  so all native button props (onClick, disabled, type, etc.) work out
  of the box.
- Built shadcn-button-compatible: same variant/size API shape as
  shadcn/ui's Button (drop-in replacement), using `cva` for variants,
  defined independently in this file.
- Styling via Tailwind CSS v4 + theme CSS variables only — no
  hardcoded colors.
- `current-theme.css` is off-limits: reference its existing variables
  only, never add, rename, or edit anything inside it. Every color and
  shadow token this component uses (`--destructive` /
  `--destructive-foreground`, `--success` / `--success-foreground`,
  glow/shadow tokens, etc.) is assumed to already exist there. Do not
  add new variables to that file, even conditionally ("if it doesn't
  already exist"). If a token this component would like to use isn't
  already defined in the theme, derive it instead as a utility class
  in `ui.css` via `color-mix()` against the nearest existing theme
  token — never extend `current-theme.css` to fill the gap.
- Any custom CSS the component needs that Tailwind utility classes
  can't express — a glow/shadow effect, a fill-sweep or gradient-shift
  keyframe for the `primary` variant, etc. — does not live inline or
  scoped only to Button. It goes into the shared stylesheet `ui.css`
  as reusable utility classes, written so other components (e.g. a
  Link component's button-styled variant, if one exists in the
  project) could consume the exact same classes instead of
  redefining them. Keep `ui.css` limited to genuinely shared
  primitives — nothing Button-specific belongs there.
- The `primary` variant's animation timing (duration, easing) and any
  shadow/glow values must come from a shared tokens file,
  `motion.config.ts` (or equivalent) — not hardcoded numbers in this
  component. If that file already exists in the project, extend it
  rather than redefining conflicting values; if it doesn't exist yet,
  create it with just the values Button needs.
- Use `cn()` for all conditional/merged classNames.

## Variants required (all seven, fully implemented — none as a stub)

- **`primary`** — the signature interactive button: animated
  hover/press (scale, gradient shift, or fill-sweep — CSS transition,
  pixel-perfect read of the design), should feel premium and "alive".
  Timing/easing/shadow values come from `motion.config.ts`; any
  non-Tailwind-expressible CSS (the sweep keyframe, a `color-mix()`
  glow shadow) comes from `ui.css`.
- **`secondary`** — same base structure as primary, but the ONLY
  change on hover is a flat background-color shift toward the accent
  color — no motion, no scale, no extra animation.
- **`outline`** — bordered, transparent background, standard shadcn
  hover.
- **`ghost`** — transparent, no border, standard shadcn hover.
- **`destructive`** — uses the existing `--destructive` /
  `--destructive-foreground` theme tokens.
- **`success`** — uses the existing `--success` /
  `--success-foreground` theme tokens. Do not add these to
  `current-theme.css`; assume they're already defined there.
- **`link`** — visually and behaviorally matches a text-link style:
  underline expands outward from the center on hover, text color
  transitions to primary/accent color, NO button chrome at all (no
  background, no border, no padding, no shadow, no fixed height).
  Implement this natively with `cva`/Tailwind classes in this file —
  do not import an actual Link component to achieve it.

## Sizes

`sm` / `default` / `lg` / `icon`, matching shadcn's scale.

## Defaults

- If no `variant` prop is passed, default to `primary`.
- If no `size` prop is passed, default to `default`.
- Set via cva's `defaultVariants`, not manual fallback logic.

## Code quality requirements

- Export both `Button` and `buttonVariants`.
- Forward refs (`React.forwardRef`).
- Any animation logic beyond simple CSS transitions lives in a
  `useButtonInteraction` hook, not inline.
- Respect `prefers-reduced-motion` for the primary variant's
  animation.
- Fully accessible: focus-visible ring, disabled removes
  interactivity and sets `aria-disabled`, no keyboard traps.

## Constraints

- No inline `<style>` blocks or CSS-in-JS — Tailwind utility classes
  only. Anything Tailwind can't express (sweep keyframe, `color-mix()`
  glow shadow) is defined once in `ui.css`, never duplicated inline.
- `current-theme.css` is read-only for this task: no new variables,
  no edits, no renames.
- No hardcoded hex/HSL colors — every color references an existing
  theme CSS variable (directly, or via a `ui.css` utility built on top
  of one).

## Output

- **`Button.tsx`** — component + variants, all 7 variants fully
  built, no dependency on any Link component.
- **`useButtonInteraction.ts`**
- **`motion.config.ts`** (or equivalent) — shared timing/easing/shadow
  tokens for the `primary` variant (create if it doesn't already exist
  in the project, extend if it does — never redefine conflicting
  values).
- **`ui.css`** — shared non-Tailwind utility classes the `primary`
  variant needs (sweep keyframe, `color-mix()` glow shadow, etc.),
  written for reuse rather than scoped to Button alone.
- **`ButtonExamples.tsx`** showing all 7 variants, all 4 sizes, and a
  disabled row, side by side.
```

---

## Ready-made prompt: Link Component

```
# Prompt: Standalone Link Component (single source of truth)

Assume the project already has Tailwind CSS v4 configured, a `cn()`
utility (clsx + tailwind-merge) at the standard utils path, and
`class-variance-authority` installed. Do not set any of that up or
explain how — go straight to building the component.

Create a standalone `Link` component, extracted into its own file,
that extends `next/link` (not a native `<a>`) so all Next.js routing
behavior (prefetching, client-side navigation, `href` typing) works
natively.

## Independence requirements (critical)

- The component must be fully self-contained. It must NOT import
  `Button`, `buttonVariants`, or any Button-internal code. `Link` and
  `Button` must each build and ship independently.
- Visual parity between Link's `button` variant and Button's `primary`
  variant is achieved by both pulling from the SAME shared design
  tokens — a `motion.config.ts` (or equivalent shared constants file)
  plus theme CSS variables — never by one importing the other's
  styles or variants, and never by duplicating raw magic numbers
  (durations, easings, padding, radius) in both places.
- Mark the file `"use client"` itself. Never force a parent/page
  component to become client-rendered just to use this Link.

## Tech requirements

- TypeScript, extending `React.ComponentProps<typeof NextLink>`.
- Styling via Tailwind CSS v4 + theme CSS variables only — no
  hardcoded colors, and no CSS variable referenced that isn't defined
  in the project's current theme stylesheet.
- `current-theme.css` is off-limits: read/reference its existing
  variables only, never add, rename, or edit anything inside it. If a
  variable Link needs doesn't already exist there, that's a signal to
  reconsider the approach, not a reason to touch that file.
- Any custom CSS this component needs that Tailwind utility classes
  can't express (the underline `::after`, the shine sweep keyframes,
  `color-mix()` shadow helpers, etc.) must NOT be written inline or
  scoped only to Link. It goes into a single shared stylesheet,
  `ui.css`, as reusable utility classes — written so `Button` can pull
  from the exact same classes for its matching `primary` variant
  instead of redefining them. Nothing project-specific to Link alone
  should live in `ui.css`; keep it limited to genuinely shared
  primitives (shine sweep, underline expansion, mixed-shadow
  utilities, etc.).
- `cva` for variants, defined independently in this file — do not
  import a cva instance from Button or anywhere else.
- `cn()` for all conditional/merged classNames.
- Forward refs (`React.forwardRef`).
- Export both `Link` and `linkVariants`, entirely independent of
  Button's exports.

## Variants required

**`primary`** (default)
- Text link, color transitions to accent on hover.
- Animated underline via `::after`, `width: 0 → 100%` on hover/focus,
  ~300ms ease-out.
- `underlineOrigin: "left" | "center" | "right"` (default `"center"`)
  controls where the underline expansion originates from:
  - `left`: anchored left edge, grows rightward.
  - `center`: anchored at 50% with a `-50%` translateX so it stays
    centered as it grows.
  - `right`: anchored right edge, grows leftward.

**`secondary`**
- Structural base only: `relative`, with bottom padding reserved so
  an active indicator never shifts layout when it appears.
- `hoverEffect: "text" | "background"` (default `"text"`) — config-
  driven choice of hover treatment, never hardcoded per call-site:
  - `hoverEffect: "text"` — no background involved at all. Inactive:
    muted color (~70% opacity of the primary/accent token). Hover:
    full-opacity color, plain color transition, nothing else moves.
    Active: full-opacity color PLUS a static (non-animated) indicator
    bar — a thin full-width rounded bar pinned to the bottom edge of
    the link, present or absent based on `active`, no transition on
    the bar itself (it should snap in/out with route changes, not
    animate).
  - `hoverEffect: "background"` — rounded hover background using
    theme accent tokens, paired with a small (5px) leading status dot
    that shifts from a muted foreground tint to the accent/primary
    token on hover or when active.
- A boolean `active` prop (not just relying on native `aria-current`)
  drives all of the above and also auto-sets `aria-current="page"` on
  the rendered anchor for accessibility — the caller only ever passes
  `active`, never has to set `aria-current` manually.

**`neutral`**
- Fully inherits surrounding text color, no underline, no background
  change on hover — for use inside colored banners/footers where the
  parent context sets the color.

**`button`**
- Its own independently defined cva variant, matching Button's
  `primary` variant (same animation feel, padding, radius, shadow)
  purely via the shared tokens file — implemented natively here, not
  inherited from Button.
- Filled/gradient background, hover lift + brightness, soft colored
  shadow built from theme tokens (e.g. `color-mix()` against the
  accent/primary token — not a flat Tailwind shadow utility). This
  `color-mix()` shadow helper belongs in `ui.css` as a shared utility
  class, not duplicated inline here and again in Button's file.
- A one-shot diagonal shine sweep on hover, implemented as the shared
  `ui.css` keyframe/utility described above.
- Active state scales down slightly with a tighter shadow.
- Supports `aria-disabled="true"`: disables pointer events and hover
  effects, reduces opacity.

## Defaults

Set via cva's `defaultVariants`, not manual fallback logic:
- `variant` → `"primary"`
- `underlineOrigin` → `"center"`
- `hoverEffect` → `"text"`
- `active` → `false`

## Code quality requirements

- Underline animation logic for all three `underlineOrigin` values
  must be implemented in exactly ONE place — either a shared hook or
  `compoundVariants`, never both. Pick one and state which, in a
  comment at the top of the file.
- The `secondary` variant's two `hoverEffect` treatments and its
  `active` state must each be their own distinct `compoundVariants`
  entries — they must not share a class string or leak into each
  other (e.g. the dot must never render for `hoverEffect: "text"`,
  and the bottom bar must never render for `hoverEffect: "background"`).
- Respect `prefers-reduced-motion` for every animated variant
  (underline, button lift, and shine sweep). The `secondary` active
  bar is not animated in the first place, so this doesn't apply to it.
- Fully accessible:
  - Visible `focus-visible` ring using theme ring/radius tokens.
  - Correct semantic anchor behavior — no href-less
    `javascript:void(0)`.
  - `target="_blank"` auto-applies `rel="noopener noreferrer"` unless
    the caller already set a conflicting `rel`.
  - `active` auto-sets `aria-current="page"`, as described above.

## Deliverables

Only the files actually needed to implement and demonstrate the
component — no setup instructions, no dependency install steps:

1. **`Link.tsx`** — the component + variants, fully self-contained.
2. **The single hook/utility** used for underline origins (only if
   the hook approach was chosen over `compoundVariants`).
3. **`motion.config.ts`** (or equivalent) — the shared tokens file
   both Link and Button read from for the `button` variant's
   timing/easing/shadow values.
4. **`ui.css`** — the shared, non-Tailwind CSS utilities (shine
   sweep, underline expansion helper if needed, `color-mix()` shadow
   classes, etc.) that both Link and Button consume. `current-theme.css`
   is not touched or extended by this file — `ui.css` only builds
   utility classes on top of the variables that already exist there.
5. **`LinkExamples.tsx`** — a showcase rendering every variant:
   `primary` in all three `underlineOrigin` values side by side;
   `secondary` with `hoverEffect: "text"` in both inactive and
   `active` states (to show the bar), and `hoverEffect: "background"`
   in both inactive and `active` states (to show the dot); `neutral`
   inside a dark banner to prove color inheritance; and `button` in
   normal and `aria-disabled` states.

## Constraints

- No inline `<style>` blocks or CSS-in-JS. Plain Tailwind utility
  classes handle everything they can; anything they can't (the shine
  keyframe, `color-mix()` shadows, underline expansion if not done via
  `compoundVariants`) is defined once in `ui.css` and referenced from
  there — never redeclared per component.
- `current-theme.css` is read-only for this task: no new variables,
  no edits, no renames. If something feels like it belongs in the
  theme file, put it in `ui.css` instead and reference existing theme
  variables from it.
- No hardcoded hex/HSL colors — every color references an existing
  theme CSS variable.
- No values shared with Button's `primary` variant may be duplicated
  as raw numbers — they must come from the shared tokens file
  (`motion.config.ts`) and/or the shared `ui.css` utility classes.
```

---

## Ready-made prompt: Input

```
Create a standalone Input component, extracted into its own file, that
extends the native HTML input props (not a wrapper that reinvents
them).

Isolation requirement (critical):
- Mark this "use client" itself. Keep it self-contained — never force
  a parent/page component to become client-rendered just to use this
  Input.

Tech requirements:
- TypeScript, extending `React.InputHTMLAttributes<HTMLInputElement>`
- Styling via Tailwind CSS v4 + our theme CSS variables — no hardcoded
  colors, no undefined CSS variables
- `cva` for variants, `cn()` for merged classNames
- Support an optional `label`, `helperText`, and `errorText` prop,
  each rendered with the correct semantic association (`<label
  htmlFor>`, `aria-describedby` pointing at helper/error text)

Variants required:
- `default` — standard bordered input, border color shifts to
  `--ring`/primary on focus, no layout shift
- `error` — border/ring uses `--destructive`, `errorText` (if passed)
  renders below in `--destructive` color, sets `aria-invalid="true"`
  automatically
- `success` — border/ring uses `--success`, for validated fields

States required: default, hover, focus-visible, disabled, read-only,
error, success. Disabled must reduce opacity, remove pointer
interaction, and NOT be focusable.

Sizes: sm / default / lg, consistent height scale with Button so they
align in a form row.

Defaults:
- `variant` defaults to `default`
- `size` defaults to `default`
- Set via cva's `defaultVariants`

Code quality requirements:
- Export both `Input` and `inputVariants`
- Forward refs (`React.forwardRef`)
- If there's any transition/animation beyond a plain color transition
  (e.g. an animated error-shake), put it in a `useInputInteraction`
  hook, not inline
- Respect `prefers-reduced-motion`
- Fully accessible: label correctly associated via `htmlFor`/`id`
  (generate a stable id with `React.useId()` if none is passed),
  `aria-invalid` reflects error state, `aria-describedby` links to
  helper/error text, focus-visible ring never removed

Output:
- Input.tsx (component + variants)
- Any hook used
- InputExamples.tsx showing default/error/success, all 3 sizes, with
  and without label/helper text, and a disabled state
```

---

## Guide: adapting this for any other micro UI

For Checkbox, Switch/Toggle, Select, Textarea, Badge, Tooltip, Avatar,
Radio, or anything else — fill in the **Master Template** using the
table below to decide what actually needs specifying for that
component. Don't skip a row just because it feels obvious; the things
that broke in your repo were exactly the things that felt obvious and
got left unstated.

| Component         | Extends                                                           | Typical variants                               | Typical states                                                  | Watch out for                                                                                                                           |
| ----------------- | ----------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Checkbox / Radio  | `React.InputHTMLAttributes<HTMLInputElement>` + custom visual box | `default`, `error`                             | checked, indeterminate, disabled, focus-visible                 | Custom-drawn box must still be a real `<input type="checkbox">` under the hood for accessibility — don't fake it with a `<div onClick>` |
| Switch / Toggle   | Same as checkbox, `role="switch"`                                 | `default`, sizes                               | on/off, disabled, focus-visible                                 | Animate the thumb with `transform`, not `left`, to avoid layout thrash; respect reduced-motion                                          |
| Select / Dropdown | `React.SelectHTMLAttributes` or a headless primitive (Radix)      | `default`, `error`                             | open, closed, disabled, focus-visible, has-value vs placeholder | If using a headless primitive, be explicit that Input/Button styling tokens are reused, not redefined                                   |
| Textarea          | `React.TextareaHTMLAttributes<HTMLTextAreaElement>`               | `default`, `error`, `success`                  | same as Input, plus resizable vs fixed                          | Match Input's border/radius/focus tokens exactly — sibling components in a form should feel identical                                   |
| Badge / Tag       | `React.HTMLAttributes<HTMLSpanElement>`                           | `default`, `success`, `destructive`, `outline` | usually static (no interactive states)                          | No hover/focus states needed unless it's dismissible — say explicitly whether it's interactive                                          |
| Tooltip           | Wraps a trigger, portal-rendered content                          | `default`                                      | visible/hidden, placement (top/right/bottom/left)               | Animation on enter/exit must be interruptible (no animation "lock" if the mouse leaves mid-transition)                                  |
| Avatar            | `React.HTMLAttributes<HTMLSpanElement>` + `<img>`/fallback        | `default`, sizes                               | image-loaded, image-error → fallback initials/icon              | Always specify the fallback behavior explicitly, or it'll be skipped                                                                    |

General rule when writing any of these prompts yourself: **name every
variant, every state, and every default out loud.** Anything you
describe as "the usual" or "standard" is exactly what gets half-built
or skipped.

---

## Meta-prompt: auditing a component that already exists

Use this when something's "not working as you want" and you're not
sure why, before asking for a rebuild:

```
Audit [Component].tsx and any files it imports. For each of the
following, tell me explicitly yes/no and quote the line if "no":

1. Does every CSS variable referenced in a class (e.g. var(--x)) have
   a matching definition in current-theme.css, for both light and
   dark?
2. Is there any branching logic (variant-dependent classes, animation
   origins, hover effects) implemented in more than one place — e.g.
   both a hook AND a compoundVariant producing overlapping classes?
3. Are there any files that are empty, or return only a placeholder
   string/div?
4. Does every variant listed in the type/props actually have a
   corresponding, fully-styled case — none silently falling through
   to a default?
5. Is this component's "use client" boundary isolated, or does using
   it force a parent to also become a client component?
6. Does this component import another sibling component's internals
   (e.g. Link importing Button) when the requirements say they must
   be independent?

Report findings as a plain list, do not fix anything yet.
```

Run the audit prompt first, review the findings, then feed only the
confirmed issues into a targeted fix prompt — cheaper and more
reliable than a full rebuild every time.
