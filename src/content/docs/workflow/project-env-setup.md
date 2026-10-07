---
description: "Read every environment variable through Zod-validated client, app and auth modules, with server-only boundaries, fail-fast parsing and a synced .env.example."
date: 2026-10-02
keywords: [environment variables, zod, env validation, server-only, nextjs, security, nextjs template]
order: 8
featured: false
---

# Stage 8 — Project Environment Setup

## Overview

Every environment variable in the app is read through a small number of Zod-validated modules — never through a raw `process.env.X` scattered across the codebase. This stage builds those modules, splits them by trust boundary (server-only vs. client-safe), and makes that split impossible to violate by accident rather than just documented as a rule.

## Objectives

- A Zod schema per environment module: `app.env.ts`, `auth.env.ts`, `client.env.ts`
- Parse-once, fail-fast — invalid or missing env crashes at boot with a readable error, not mid-request
- A build-time guard (`server-only`) that blocks server env from ever reaching a client bundle
- `.env.example` kept in sync with the schemas, so onboarding a new dev is one file
- Fully typed, autocompletable env access everywhere in the app

## Prerequisites

Required:

- ✅ Stage 1 — Project Initialization
- ✅ Stage 2 — Professional Development Environment
- ✅ Stage 3 — Enterprise Architecture (this stage fills in `packages/env`, reserved there)

Stages 4–8 aren't technical dependencies of this one, but are assumed complete if you're following the template in order.

## 1. Why Not Just `process.env.X`?

Three problems with reading `process.env` directly, everywhere:

- **No runtime validation.** A typo'd or missing variable silently becomes `undefined` and fails somewhere deep in a request, far from the actual cause.
- **No compile-time safety.** `process.env.PORT` is typed as `string | undefined` at every call site, forever.
- **No enforced trust boundary.** Next.js only inlines variables prefixed `NEXT_PUBLIC_` into the client bundle — it doesn't stop a developer from accidentally importing a module that reads a server secret into a Client Component. That's a bundler error on a good day and a leaked secret on a bad one.

## 2. The Split

Three modules, three trust boundaries:

| Module          | Boundary                      | Example variables                                             | Consumed by                                |
| --------------- | ----------------------------- | ------------------------------------------------------------- | ------------------------------------------ |
| `client.env.ts` | Public — ships to the browser | `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_APP_NAME`            | Client Components, Server Components       |
| `app.env.ts`    | Server-only — general config  | `PORT`, `LOG_LEVEL`, `DATABASE_URL`                           | Route Handlers, Server Components, actions |
| `auth.env.ts`   | Server-only — auth secrets    | `JWT_SECRET`, `SESSION_COOKIE_NAME`, `REFRESH_TOKEN_TTL_DAYS` | Auth service layer only (Stage 11)         |

Splitting `app.env.ts` from `auth.env.ts` isn't a Next.js requirement — both are server-only. It keeps the highest-sensitivity secrets (session/JWT signing keys) in one small, easy-to-audit file instead of mixed in with general config.

## 3. Install the Boundary Guard

```bash
bun add server-only
```

`server-only` does one thing: if a file that imports it is ever pulled into a Client Component's bundle, even transitively, the build fails immediately with a clear error — instead of silently shipping a server secret to the browser.

## 4. client.env.ts

```typescript
// packages/env/client.env.ts
import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_API_TIMEOUT_MS: z.coerce.number().default(15000),
});

const parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_API_TIMEOUT_MS: process.env.NEXT_PUBLIC_API_TIMEOUT_MS,
});

if (!parsed.success) {
  throw new Error(`Invalid client environment:\n${parsed.error.toString()}`);
}

export const clientEnv = Object.freeze(parsed.data);
```

Every key here **must** start with `NEXT_PUBLIC_` — that prefix is what tells Next.js to inline the value at build time. A key without it silently becomes `undefined` in the browser; the schema catches that immediately instead of letting it surface downstream.

## 5. app.env.ts (server-only)

```typescript
// packages/env/app.env.ts
import "server-only";
import { z } from "zod";

const appEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  DATABASE_URL: z.string().url(),
});

const parsed = appEnvSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid app environment:\n${parsed.error.toString()}`);
}

export const appEnv = Object.freeze(parsed.data);
```

## 6. auth.env.ts (server-only, highest sensitivity)

```typescript
// packages/env/auth.env.ts
import "server-only";
import { z } from "zod";

const authEnvSchema = z.object({
  JWT_SECRET: z.string().min(32),
  SESSION_COOKIE_NAME: z.string().default("session"),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().default(30),
});

const parsed = authEnvSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid auth environment:\n${parsed.error.toString()}`);
}

export const authEnv = Object.freeze(parsed.data);
```

`JWT_SECRET` is validated by minimum length, not just presence — a 4-character "secret" passes a bare `z.string()` check and fails every security review that follows. This module should only ever be imported from the auth service layer (Stage 11) — not from a route handler or component directly.

## 7. .env.example

Committed, no real values — the schemas above are the actual source of truth; this just documents them for onboarding.

```bash
# .env.example

# client.env.ts
NEXT_PUBLIC_APP_NAME=
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_API_TIMEOUT_MS=15000

# app.env.ts
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
DATABASE_URL=

# auth.env.ts
JWT_SECRET=
SESSION_COOKIE_NAME=session
REFRESH_TOKEN_TTL_DAYS=30
```

## 8. Fail Fast, On Purpose

All three modules parse `process.env` at import time and throw synchronously on invalid data. There's no `.optional()` escape hatch for anything the app actually needs — a missing `DATABASE_URL` should crash on the first request that touches `app.env.ts`, in development at startup, not surface three layers deep as `Cannot read property 'query' of undefined`.

## Rules

- Never read `process.env` outside these three files.
- Never add a server-only variable to `client.env.ts`, even temporarily.
- Give every schema field a real Zod constraint (`.url()`, `.min()`, `.enum()`) — bare `z.string()` accepts empty strings and whitespace.
- Adding a new env variable means updating its schema _and_ `.env.example` in the same commit.
- `auth.env.ts` is imported by the auth service layer only.

## Stage Deliverables

- ✅ Three Zod-validated env modules, split by trust boundary
- ✅ `server-only` enforcing the split at build time, not just by convention
- ✅ Parse-once, fail-fast environment loading
- ✅ `.env.example` in sync with the schemas
- ✅ Typed, autocompletable env access project-wide

## Next Stage

Continue to [Stage 10 — API Layer](/docs/frontend/api-layer-guide), which consumes `clientEnv` directly for the Axios instance's base URL and timeout.
