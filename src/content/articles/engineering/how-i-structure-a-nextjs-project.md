---
description: The folder layout, config split, and conventions I reuse across every Next.js App Router project.
date: 2026-09-15
keywords: [nextjs, project structure, app router, conventions]
featured: false
---

# How I structure a Next.js project

Every Next.js project I start uses the same shape: `app/` for routes only, `components/` split by feature, `packages/` for anything not React (config, utils, hooks), and `content/` when the site is content-driven.

## Routes stay thin

Pages fetch data and lay out components — they don't contain business logic. If a page function is more than ~30 lines, something belongs in `packages/` instead.

## One config file per concern

`app.config.ts` for copy and branding, `content.config.ts` for how content maps to routes, `shell.config.ts` for routing constants. Splitting them means a copy change never touches routing code.

## Co-locate feature components

`components/features/<feature>/` beats one flat `components/` folder once a project has more than a handful of screens — it's the difference between guessing and knowing where something lives.
