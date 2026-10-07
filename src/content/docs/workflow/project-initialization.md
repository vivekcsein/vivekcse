---
description: "Create the Next.js app every later stage builds on: App Router, TypeScript, Tailwind CSS, Biome, Bun and Turbopack, verified and running locally."
date: 2026-10-02
keywords: [nextjs, app router, typescript, tailwind css, bun, turbopack, project setup, nextjs template]
order: 1
featured: false
---

# Stage 1 — Project Initialization

## Overview

This stage creates the Next.js application every later stage builds on: App Router, TypeScript, Tailwind CSS, Bun, and Turbopack — verified and running locally.

## Objectives

- Create a new Next.js project
- Use the latest App Router
- Enable TypeScript
- Configure Tailwind CSS
- Use Bun as the package manager
- Verify the development environment

## Prerequisites

| Software | Version |
| -------- | ------- |
| Node.js  | 24+     |
| Bun      | Latest  |
| Git      | Latest  |

## Install Bun

macOS / Linux:

```bash
curl -fsSL https://bun.sh/install | bash
```

Windows:

```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

or install globally with npm:

```bash
npm install -g bun
```

Verify:

```bash
bun --version
node --version
```

## Create the Project

```bash
bunx create-next-app@latest .
```

## Recommended Options

```text
✔ Project name ............... create-next-template
✔ TypeScript ................. Yes
✔ ESLint/Biome ................ Biome
✔ Tailwind CSS ............... Yes
✔ Use src/ directory ......... Yes
✔ App Router ................. Yes
✔ Turbopack .................. Yes
✔ Import Alias ............... @/*
```

> ESLint is intentionally skipped — this template uses Biome for formatting and linting, configured in Stage 2.

## Install Dependencies

```bash
cd create-next-template
bun i
```

## Start the Development Server

```bash
bun dev
```

Visit `http://localhost:3000` — you should see the default Next.js welcome page.

## Verify the Project Structure

```
create-next-template
│
├── public
│
├── src
│   └── app
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
│
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Default Scripts

| Command     | Description                          |
| ----------- | ------------------------------------ |
| `bun dev`   | Start the development server         |
| `bun run build` | Build the application for production |
| `bun start` | Start the production server          |

## Verify TypeScript

`tsconfig.json` should already have strict type checking and the Next.js defaults enabled. No changes needed here.

## Verify Tailwind CSS

`src/app/globals.css` should already contain the Tailwind CSS imports. No additional configuration needed.

## Verify App Router

Confirm both files exist:

```text
src/app/layout.tsx
src/app/page.tsx
```

## Stage Deliverables

- ✅ Next.js initialized
- ✅ App Router enabled
- ✅ TypeScript configured
- ✅ Tailwind CSS configured
- ✅ Bun package manager
- ✅ Turbopack enabled
- ✅ Development server running

## Next Stage

Continue to [Stage 2 — Professional Development Environment](/docs/workflow/professional-development-environment) to configure Biome, Husky, lint-staged, and Conventional Commits.
