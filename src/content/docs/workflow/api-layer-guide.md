---
description: "Build the API layer: AppError, toAppError, asyncHandler, one Axios instance with interceptors, typed services, Zod-validated responses and useAsyncAction."
date: 2026-10-02
keywords: [api layer, axios, error handling, zod, server actions, typescript, nextjs, nextjs template]
order: 10
featured: false
---

# Stage 10 — API Layer

## Overview

This stage builds the single Axios instance, error normalization, and typed service pattern every feature — including Authentication in Stage 11 — talks to the network through. It deliberately stops short of auth: token attachment and the 401-refresh flow are Stage 11's job.

It also answers a question that comes up the moment you have more than a handful of async calls: where does error handling actually live? Writing `try/catch` at every call site, with slightly different logic each time, is exactly the scattered pattern this stage exists to avoid. The fix is two small utilities — `toAppError` and `asyncHandler` — that every async operation in the app routes through, instead of each one reinventing its own error handling.

## Objectives

- `AppError` — one error shape for the whole app
- `toAppError` — normalizes _anything_ that was thrown (Axios errors, Zod errors, native errors, arbitrary values) into an `AppError`
- `asyncHandler` — a generic async wrapper so call sites destructure a result instead of writing `try/catch`
- A single configured Axios instance — no ad hoc `axios.create()` calls scattered through features
- Request/response interceptor pipeline built on `toAppError`, not a separate parallel error mapper
- A typed service pattern: components call services, services call Axios
- Zod-validated response parsing
- The same `asyncHandler` pattern applied to Server Actions and Client Components, not just services
- Defined extension points for Stage 11, without implementing auth here

## Prerequisites

- ✅ Stage 1 — Project Initialization
- ✅ Stage 2 — Professional Development Environment
- ✅ Stage 3 — Enterprise Architecture
- ✅ Stage 4 — Design System
- ✅ Stage 5 — Design System Implementation
- ✅ Stage 6 — Reusable UI Components
- ✅ Stage 7 — Icon System
- ✅ Stage 8 — Project Environment Setup
- ✅ Stage 9 — shadcn/ui Integration

## No New Dependencies

`axios` and `zod` were already installed in Stage 3. Everything in this stage is architecture built from what's already there — resist adding a library for this; the whole point is that two small functions cover it.

## 1. Environment

Fully covered in [Stage 8 — Project Environment Setup](/docs/workflow/project-env-setup). This stage just consumes `clientEnv` — no new env work here.

## 2. AppError — One Error Shape

```typescript
// packages/utils/errors.ts
export type AppErrorCode =
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "SERVER_ERROR"
  | "UNKNOWN";

type AppErrorOptions = {
  code: AppErrorCode;
  status?: number;
  cause?: unknown;
  details?: unknown;
};

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly status?: number;
  readonly details?: unknown;

  constructor(message: string, options: AppErrorOptions) {
    super(message);
    this.name = "AppError";
    this.code = options.code;
    this.status = options.status;
    this.details = options.details;
    if (options.cause) this.cause = options.cause;
  }
}
```

`packages/utils` already exists from Stage 3 — this and the two files below are new files inside it, not a new folder.

## 3. toAppError — Normalizing Anything That Was Thrown

This is the piece that makes "catch error any type" literal. `catch (error)` in TypeScript always gives you `unknown` — it could be an `AxiosError`, a `ZodError` from a failed schema parse, a plain `Error`, or something that isn't an `Error` at all (a string, `undefined`, anything — JavaScript lets you `throw` any value). `toAppError` is the single place that turns whatever that is into a consistent `AppError`, so nothing past this function ever has to branch on the error's origin.

```typescript
// packages/utils/errors.ts (continued)
import axios from "axios";
import { ZodError } from "zod";

export const toAppError = (error: unknown): AppError => {
  if (error instanceof AppError) return error;

  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return new AppError("Request timed out.", {
        code: "TIMEOUT",
        cause: error,
      });
    }
    if (!error.response) {
      return new AppError("Network error.", {
        code: "NETWORK_ERROR",
        cause: error,
      });
    }

    const { status } = error.response;

    if (status === 401)
      return new AppError("Unauthorized.", {
        code: "UNAUTHORIZED",
        status,
        cause: error,
      });
    if (status === 403)
      return new AppError("Forbidden.", {
        code: "FORBIDDEN",
        status,
        cause: error,
      });
    if (status === 404)
      return new AppError("Not found.", {
        code: "NOT_FOUND",
        status,
        cause: error,
      });
    if (status >= 500)
      return new AppError("Server error.", {
        code: "SERVER_ERROR",
        status,
        cause: error,
      });

    return new AppError("Request failed.", {
      code: "VALIDATION_ERROR",
      status,
      details: error.response.data,
      cause: error,
    });
  }

  if (error instanceof ZodError) {
    return new AppError("Response failed validation.", {
      code: "VALIDATION_ERROR",
      details: error.issues,
      cause: error,
    });
  }

  if (error instanceof Error) {
    return new AppError(error.message, { code: "UNKNOWN", cause: error });
  }

  return new AppError("An unexpected error occurred.", {
    code: "UNKNOWN",
    cause: error,
  });
};
```

Every branch is additive, not exhaustive — if a new error source shows up (a storage API, a WebSocket), add a branch here rather than teaching every call site to recognize it.

## 4. asyncHandler — The Global Async Wrapper

Wrap any promise, get back a result instead of a thrown error.

```typescript
// packages/utils/async-handler.ts
import { AppError, toAppError } from "./errors";

export type Result<T> = [error: null, data: T] | [error: AppError, data: null];

export const asyncHandler = async <T>(
  promise: Promise<T>,
): Promise<Result<T>> => {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [toAppError(error), null];
  }
};
```

```typescript
const [error, user] = await asyncHandler(usersService.getById(id));

if (error) {
  // error: AppError — fully typed, `user` is null here
  return;
}

// error is null here — `user` is typed as User, not User | null
```

No `try`, no `catch`, no repeated error-mapping logic — call `asyncHandler` on the promise and branch on the first element. This works for anything that returns a `Promise<T>`: a service call, a Zod parse wrapped in `Promise.resolve()`, a `fetch()`, a database call in a Server Component.

> **Note on the type narrowing above:** the tuple's two positions are tied to the same value, so checking `if (error)` narrows `user` too, in the same statement — you don't need a second check. If you ever see this not narrow correctly in your TypeScript version, index the tuple directly (`result[0]`, `result[1]`) instead of destructuring, or fall back to an explicit `error !== null` check.

## 5. The Axios Instance

```typescript
// packages/services/api/client.ts
import axios, { type AxiosInstance } from "axios";
import { clientEnv } from "@/packages/env/client.env";

export const apiClient: AxiosInstance = axios.create({
  baseURL: clientEnv.NEXT_PUBLIC_API_BASE_URL,
  timeout: clientEnv.NEXT_PUBLIC_API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // cookie-based sessions, wired up in Stage 11
});
```

`packages/services/api` was reserved as an empty folder in Stage 3's example tree — this is where it gets filled in.

## 6. Request Interceptor

A single place for headers and metadata every request needs. Auth token attachment is intentionally not here — Stage 11 adds it to this same pipeline rather than starting a second one.

```typescript
// packages/services/api/interceptors/request.ts
import type { InternalAxiosRequestConfig } from "axios";

export const attachRequestMetadata = (config: InternalAxiosRequestConfig) => {
  config.headers.set("X-Requested-With", "XMLHttpRequest");
  return config;
};
```

```typescript
apiClient.interceptors.request.use(attachRequestMetadata);
```

## 7. Response Interceptor — Now Just Delegates

Because the status-code mapping already lives in `toAppError`, the interceptor has nothing left to do but call it:

```typescript
// packages/services/api/interceptors/response.ts
import { toAppError } from "@/packages/utils/errors";

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(toAppError(error)),
);
```

Every rejection that leaves `apiClient` is already an `AppError` — no `AxiosError` ever reaches a service or component.

> **Stage 11 hooks in here.** The `UNAUTHORIZED` case inside `toAppError` currently just returns an error. Authentication replaces that path with: pause the failing request, trigger a token refresh, queue any other requests that fail with 401 while the refresh is in flight, then retry them once it succeeds. That's a stateful flow — it belongs with the auth system, not in this stage's stateless error mapping.

## 8. Typed Service Pattern

Components never call `apiClient` directly. Each feature gets a thin service that returns validated, typed data — and doesn't do its own error handling, since that's `asyncHandler`'s job at the call site.

```typescript
// packages/services/api/users.service.ts
import { apiClient } from "./client";
import { userSchema, type User } from "@/packages/schemas/user";

export const usersService = {
  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get(`/users/${id}`);
    return userSchema.parse(data);
  },
};
```

Rule: if a component imports `apiClient` directly, that's a review comment, not a style preference — it means a service is missing.

## 9. Response Validation with Zod

`packages/schemas` was reserved in Stage 3 for exactly this. TypeScript checks what you _assumed_ the response looks like at compile time; it says nothing about what actually came back over the wire. Every service method parses the response through a schema — `.parse()`, not a type assertion — so a shape mismatch throws a `ZodError` at the service boundary. That `ZodError` isn't a special case for the caller: `asyncHandler` catches it the same way it catches a network failure, and `toAppError` normalizes it to the same `VALIDATION_ERROR` shape it'd give a 422 from the server.

## 10. asyncHandler in Server Actions and Server Components

Next.js has a specific reason `asyncHandler` matters here, not just style: thrown `Error` messages from Server Actions don't reliably reach the client in production. Next.js strips them to a generic message plus a `digest` before sending anything to the browser, since it can't assume a thrown error's message is safe to expose. The [official guidance](https://nextjs.org/docs/app/getting-started/error-handling) is explicit — for errors you expect (validation failures, a 404 from an API, a failed auth check), return them as data instead of throwing.

```typescript
// app/(protected)/profile/actions.ts
"use server";

import { asyncHandler } from "@/packages/utils/async-handler";
import { usersService } from "@/packages/services/api/users.service";
import { updateProfileSchema } from "@/packages/schemas/user";
import type { User } from "@/packages/schemas/user";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string };

export const updateProfileAction = async (
  input: unknown,
): Promise<ActionResult<User>> => {
  const parsed = updateProfileSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  const [error, user] = await asyncHandler(usersService.update(parsed.data));

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: user };
};
```

`asyncHandler` doesn't remove the need to return a value instead of throwing in a Server Action — Next.js still requires that. What it removes is writing a bespoke `try/catch` block, with slightly different shape, in every single action.

Server Components can use `asyncHandler` directly too, since it's just an async function call:

```typescript
export default async function ProfilePage({ params }: { params: { id: string } }) {
  const [error, user] = await asyncHandler(usersService.getById(params.id));

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return <ProfileView user={user} />;
}
```

## 11. useAsyncAction — The Same Pattern in Client Components

Client Components need loading state on top of the result, which is the other half of "scattered": the same `isLoading`/`error` `useState` pair, rewritten per component. One hook covers it.

```typescript
// packages/hooks/useAsyncAction.ts
"use client";

import { useCallback, useState } from "react";
import { AppError } from "@/packages/utils/errors";
import { asyncHandler } from "@/packages/utils/async-handler";

type UseAsyncActionResult<Args extends unknown[], T> = {
  run: (...args: Args) => Promise<void>;
  isLoading: boolean;
  error: AppError | null;
  data: T | null;
};

export const useAsyncAction = <Args extends unknown[], T>(
  action: (...args: Args) => Promise<T>,
): UseAsyncActionResult<Args, T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [data, setData] = useState<T | null>(null);

  const run = useCallback(
    async (...args: Args) => {
      setIsLoading(true);
      setError(null);

      const [err, result] = await asyncHandler(action(...args));

      if (err) {
        setError(err);
      } else {
        setData(result);
      }

      setIsLoading(false);
    },
    [action],
  );

  return { run, isLoading, error, data };
};
```

```tsx
const { run, isLoading, error } = useAsyncAction(usersService.getById);

<Button onClick={() => run(userId)} disabled={isLoading}>
  {isLoading ? "Loading..." : "Load user"}
</Button>;
{
  error && <p className="text-destructive">{error.message}</p>;
}
```

`packages/hooks` was reserved in Stage 3 — this is a new file there, alongside `useBoolean`, `useDebounce`, and the rest.

## 12. Timeouts and Retries

A global timeout is already set via `clientEnv.NEXT_PUBLIC_API_TIMEOUT_MS`. Retries are intentionally **not** added by default: blindly retrying a non-idempotent `POST` or `PATCH` after a timeout can duplicate the action server-side. If a specific endpoint needs retry behavior, scope it to that one service method, not globally across the client.

## 13. Server vs. Client Usage

`apiClient` is a plain Axios instance with no DOM dependency, so the same file can be imported from Server Components, Route Handlers, and Client Components alike. The only thing that changes is which env module backs it — Server Components and Route Handlers should read server-only settings from `packages/env/app.env.ts`, never `client.env.ts`, so nothing server-only ends up in the client bundle.

## What Stays Out of This Stage

- Attaching an auth token or session cookie beyond `withCredentials: true`
- Request queuing during a token refresh
- The 401 → refresh → retry-original-request flow
- `AuthContext`, route guards, session state

All of that is Stage 11.

## Stage Deliverables

- ✅ `AppError` — one error shape for the whole app
- ✅ `toAppError` — normalizes any thrown value, from any source, into an `AppError`
- ✅ `asyncHandler` — a generic async wrapper, no repeated `try/catch` blocks
- ✅ One configured Axios instance, no per-feature `axios.create()` calls
- ✅ Request/response interceptors built on `toAppError`
- ✅ Typed service pattern in `packages/services/api`
- ✅ Zod-validated responses via `packages/schemas`
- ✅ `asyncHandler` applied consistently in services, Server Actions, Server Components, and Client Components via `useAsyncAction`
- ✅ A documented, deliberate non-implementation of retries

## Next Stage

Stage 11 — Authentication builds directly on the interceptor pipeline defined here: token attachment goes into the request interceptor, and the refresh-and-retry flow replaces the `UNAUTHORIZED` case inside `toAppError`.
