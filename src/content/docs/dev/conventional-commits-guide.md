---
description: "A developer-friendly guide explaining Git commit prefixes (feat, fix, chore, style, etc.) with real-world examples and a cheat sheet for better codebase history."
date: 2026-10-13
keywords:
  [
    "git",
    "conventional commits",
    "developer guide",
    "code quality",
    "git commit message",
    "best practices",
  ]
featured: false
---

# A Friendly Guide to Conventional Commits

Using a standard format for your Git commit messages helps you and your team quickly scan project history, understand changes at a glance, and automate releases.

This guide breaks down commit message conventions into simple, practical, and human-readable patterns you can use in your day-to-day workflow, including how to enforce them automatically in a Node.js project.

---

## 1. Quick Cheat Sheet

| Prefix         | When to use it                                 | Example                                   |
| -------------- | ---------------------------------------------- | ----------------------------------------- |
| **`feat`**     | Adding a new user-facing feature or capability | `feat: add Google login option`           |
| **`fix`**      | Resolving a bug or unexpected behavior         | `fix: resolve crash on checkout page`     |
| **`chore`**    | Maintenance, tooling updates, or configs       | `chore: update react to v18`              |
| **`docs`**     | Documentation changes only                     | `docs: update setup steps in README`      |
| **`style`**    | Code formatting (spacing, quotes, semicolons)  | `style: run prettier on source files`     |
| **`refactor`** | Restructuring code without changing behavior   | `refactor: simplify user auth logic`      |
| **`perf`**     | Code changes that specifically improve speed   | `perf: optimize image loading`            |
| **`test`**     | Adding or updating unit/e2e tests              | `test: add unit test for payment handler` |
| **`ci`**       | Updating CI/CD pipelines or GitHub Actions     | `ci: add automated PR check workflow`     |
| **`build`**    | Build system or external dependency changes    | `build: add production build command`     |
| **`revert`**   | Undoing a previous commit                      | `revert: undo dark mode commit`           |

---

## 2. Standard Commit Structure

A standard Conventional Commit message follows this structure:

```text
<type>(<scope>): <short description>

[optional detailed description body]

[optional footer(s)]
```

### Examples with Scopes & Bodies

#### Adding a Feature

```text
feat(auth): add multi-factor authentication

- Add SMS verification code inputs
- Integrate Twilio API service
```

#### Fixing a Bug with Code Cleanup

```text
fix(checkout): resolve discount calculation bug

- Fix logic causing incorrect total calculation
- Remove obsolete helper functions and unused files
```

---

## 3. Real-World Developer Scenarios

Here is how to handle common daily tasks with clear commit messages:

### 🛠️ Installing or Updating Dependencies

When adding packages (e.g., `knip`, `tailwindcss`, `lodash`):

- `chore(deps): add knip to devDependencies`
- `build(deps): upgrade react to v18.3.0`

### 🎨 Creating Drafts, Templates & UI

- **Project Scaffolding:** `chore: add initial project boilerplate template`
- **Process Templates:** `docs(github): add PR and issue templates`
- **Frontend UI Features:** `feat(ui): add basic navigation bar and user profile layout`

### 🧹 Formatting, Linting & Verification

When running `npm run format`, `lint:fix`, or running test suites across the project:

- `style: format and lint fix codebase`
- `chore: run lint:fix and codebase verification`

### 🗄️ Database & Environment Settings

- `chore: update .env.example with new API keys`
- `feat(db): add user_preferences table migration`

### ⚡ Performance & Testing

- `perf(ui): lazy load heavy image components`
- `test(auth): add unit tests for token expiration logic`

---

## 4. Enforcing Rules in a Node.js Project

To prevent team members or yourself from accidentally writing invalid commit messages, you can automate validation using **Commitlint** and **Husky**.

### Step 1: Install Dev Dependencies

Install the required CLI and conventional configuration package as development dependencies:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky
```

### Step 2: Create the Commitlint Configuration File

Create a file named `commitlint.config.js` in your project root directory. This config enforces your accepted prefix types and ensures subjects are written in lowercase:

```javascript
/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "subject-case": [2, "never", ["upper-case", "pascal-case"]],
  },
};
```

### Step 3: Set Up Husky Git Hooks

Initialize Husky so it triggers automatically when you run `git commit`:

```bash
npx husky init
```

This creates a `.husky` folder. Next, configure the `commit-msg` hook to validate every commit message against your rules:

```bash
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

Now, any time someone tries to commit with a bad message like `fixed the bug`, Git will block the commit and display your rules!

---

## 5. Pro-Tips for Better Commit History

1. **Focus on Primary Intent:** If a commit fixes a bug AND deletes dead code, use `fix` as the prefix and mention the file deletion in the commit body.
2. **Consider Splitting Commits:** When possible, keep functional fixes in one commit (`fix:...`) and cleanup in a separate commit (`chore:...`).
3. **Use Breaking Change Flags:** If an API change breaks backward compatibility, add `!` after the prefix:
   - `feat(api)!: remove deprecated v1 user endpoints`
