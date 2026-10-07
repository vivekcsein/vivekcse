---
description: Standing up a typed REST API with Hono, from an empty project to a validated, deployable route.
date: 2026-09-14
keywords: [hono, api, typescript, zod, bun, tutorial]
---

# Create an API with Hono

## 1. Scaffold the app

`bun create hono@latest` and pick a runtime target (Node, Bun, or Cloudflare Workers) — the resulting code is nearly identical across all three.

## 2. Define a route with validation

```ts
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

app.post(
  "/users",
  zValidator("json", z.object({ name: z.string() })),
  (c) => c.json({ ok: true }, 201),
);
```

## 3. Deploy it

Each target has its own one-line deploy command (`bun run deploy` for Workers via Wrangler, or a standard Node/Bun start command behind any host).
