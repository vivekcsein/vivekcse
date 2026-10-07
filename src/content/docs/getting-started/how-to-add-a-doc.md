---
description: Add a new guide in under a minute — create a markdown file, and it is published, searchable and listed automatically.
date: 2026-09-21
keywords: [docs, markdown, front matter, authoring, how to]
order: 1
---

# How to add a new doc

Every guide on this site is a plain `.md` file. There is no registry to edit and no config to touch — create the file and it appears on the home page, in the sidebar, in search and in the sitemap.

## 1. Create the file

The folder path is the URL: `src/content/<section>/<category>/<slug>.md` becomes `/<section>/<category>/<slug>`.

```text
src/content/
├── docs/                          →  /docs            (a section, shown in the header)
│   ├── business/                  →  /docs/business
│   │   └── best-freelance-platforms-for-dev-teams-2026.md
│   └── getting-started/
│       └── how-to-add-a-doc.md    →  /docs/getting-started/how-to-add-a-doc
└── code/                          →  /code            (a new section — just make the folder)
    └── javascript/
        └── array-methods.md       →  /code/javascript/array-methods
```

Use lowercase kebab-case names. A new folder becomes a new category, and a new top-level folder becomes a whole new section with its own page, sidebar and menu link — no code changes.

### Which section and category?

The **section** (top-level folder) is the *type* of content; the **category** (sub-folder) is the *subject*. Reuse an existing category before inventing a new one, and never create a catch-all like `misc` or `others`.

| Section | Put here | Categories in use |
| --- | --- | --- |
| `docs` | Evergreen guides and references | `frontend`, `security`, `seo`, `deployment`, `workflow`, `3d`, `ai-prompts`, `business`, `interview`, `getting-started` |
| `tutorials` | Step-by-step, project-based walkthroughs | `security`, `backend`, `deployment` |
| `resources` | Cheat-sheets and copy-ready notes | `javascript` |
| `articles` | Longer-form writing and opinion | `engineering`, `client-advisory` |

## 2. Write a heading

The first `# Heading` in the file becomes the page title. If there is none, the `title` from front-matter is used, then the default from `content.config.ts`, then the file name.

```md
# My guide title

A short intro paragraph — it doubles as the description in search and Google.
```

## 3. Optional front-matter

Everything here is optional. Skip it entirely if you like.

```yaml
---
description: One sentence for cards, search and SEO.
date: 2026-09-21 # first published
updated: 2026-10-02 # last meaningful edit
keywords: [freelance, clients]
featured: true # shows in "Start here" on the home page
order: 1 # lower = earlier inside its category
draft: true # hidden in production builds
---
```

## Code blocks are copy-ready

Any fenced block gets a language label and a one-click copy button.

```ts
type Doc = {
  slug: string;
  title: string;
};

export const getDoc = (slug: string): Doc | undefined =>
  docs.find((doc) => doc.slug === slug);
```

```bash
bun run dev
bun run build
```

Inline `code`, tables and task lists work too:

| Field         | Required | Default            |
| ------------- | -------- | ------------------ |
| `title`       | no       | first `# Heading`  |
| `description` | no       | first paragraph    |
| `date`        | no       | file modified time |

- [x] Write the guide
- [ ] Share it

## Turning on ads

Set `NEXT_PUBLIC_ADSENSE_CLIENT` and the slot ids in your environment. Ads appear in the right rail and inside long articles — nothing else to change.

## Next steps

Run `bun run dev`, open the page, and use `/` to search for it.
