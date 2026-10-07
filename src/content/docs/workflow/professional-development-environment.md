---
description: "Set up Biome, Husky, lint-staged and Conventional Commits so formatting, linting and import order are enforced automatically on every commit."
date: 2026-10-02
keywords: [biome, husky, lint-staged, conventional commits, git hooks, vs code, code quality, nextjs template]
order: 2
featured: false
---

# Stage 2 — Professional Development Environment

## Overview

This stage wires up the developer workflow — formatting, linting, Git hooks, and commit standards — so code quality is enforced automatically instead of relying on convention alone.

## Objectives

- Biome (formatter + linter)
- Husky Git hooks
- lint-staged
- Conventional Commit standards
- VS Code integration
- Pre-commit validation

## Why Biome

Biome replaces separate ESLint + Prettier configuration with one fast tool: formatter, linter, and import organizer in a single binary, minimal setup, strong TypeScript support.

## Install Dev Dependencies

```bash
bun add -d husky lint-staged @biomejs/biome
```

## Initialize Biome

```bash
bunx @biomejs/biome init
```

This creates `biome.json`.

## Configure Biome

Replace the generated `biome.json` with:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.2.0/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": true,
    "includes": ["**", "!node_modules", "!.next", "!dist", "!build"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },

  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noUnknownAtRules": "off"
      }
    },
    "domains": {
      "next": "recommended",
      "react": "recommended"
    }
  },
  "assist": {
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
```

## package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "biome lint .",
    "format": "biome format --write .",
    "check": "biome check --fix .",
    "typecheck": "tsc --noEmit --skipLibCheck",
    "verify": "bun run lint && bun run format && bun run check && bun run typecheck"
  }
}
```

## Initialize Husky

```bash
bunx husky init
```

Creates:

```text
.husky/
└── pre-commit
```

## Configure lint-staged

Create `lint-staged.config.mjs`:

```javascript
export default {
  "*.{js,jsx,ts,tsx,json,css,scss,md}": ["biome check --write"],
};
```

## Configure the Pre-commit Hook

`.husky/pre-commit`:

```sh
bunx lint-staged
```

Every commit now formats changed files, lints them, organizes imports, and blocks invalid commits automatically.

## Conventional Commit Standards

| Type     | Description                                  |
| -------- | -------------------------------------------- |
| init     | Intialization of any stage                   |
| feat     | New feature                                  |
| fix      | Bug fix                                      |
| docs     | Documentation                                |
| style    | Formatting or styling changes                |
| refactor | Code restructuring without changing behavior |
| perf     | Performance improvements                     |
| test     | Tests                                        |
| build    | Build system changes                         |
| ci       | CI/CD changes                                |
| chore    | Maintenance tasks                            |
| revert   | Revert previous commits                      |

```text
feat(auth): add SignIn page
fix(api): handle refresh token expiration
docs(readme): update installation guide
refactor(layout): simplify sidebar navigation
style(button): improve spacing
test(auth): add SignIn tests
```

## VS Code Integration

Install the **Biome** extension from the VS Code Marketplace, then create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "biomejs.biome",

  "editor.formatOnSave": true,

  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit"
  }
}
```

## Recommended .gitignore

```gitignore
node_modules
.next
coverage
dist
```

## Project Structure After This Stage

```text
create-next-app
│
├── .husky
│   └── pre-commit
│
├── .vscode
│   └── settings.json
│
├── src
│
├── biome.json
├── lint-staged.config.mjs
├── package.json
└── tsconfig.json
```

## Verify

```bash
bun run lint
bun run format
bun run check
bun run verify
```

Then confirm the hook fires:

```bash
git add .
git commit -m "chore: initial project setup"
```

If the commit succeeds, Git hooks are working correctly.

## Stage Deliverables

- ✅ Biome formatter and linter
- ✅ Import organization
- ✅ Husky Git hooks
- ✅ lint-staged
- ✅ Conventional Commit workflow
- ✅ VS Code integration, format on save
- ✅ Automated code quality checks

## Best Practices

- Format code before pushing changes.
- Use Conventional Commit messages.
- Keep commits focused and atomic.
- Run `bun run check` before opening a pull request.
- Avoid bypassing Git hooks unless absolutely necessary.
- Biome is the single source of truth for formatting and linting — don't reintroduce ESLint or Prettier.

## Next Stage

Continue to [Stage 3 — Enterprise Architecture](/docs/workflow/enterprise-architecture) to build the folder structure and provider architecture.
