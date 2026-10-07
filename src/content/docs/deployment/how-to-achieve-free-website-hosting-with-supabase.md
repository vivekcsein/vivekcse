---
description: "Technical guide to hosting a static Next.js site for free: Supabase auth, a GitHub Pages custom domain and a GitHub Actions deployment workflow."
date: 2026-09-12
keywords: [nextjs, supabase, github pages, github actions, static export, free hosting]
featured: false
---

# Technical Implementation Guide: Static Next.js + Supabase Auth + GitHub Actions Deployment

### Audience: Developers implementing the architecture

---

## 1. Architecture Overview

```
┌─────────────────────┐      build (next build)      ┌──────────────────┐
│  Next.js repo        │ ───────────────────────────▶ │  ./out (static)   │
│  (App Router, TS)    │      GitHub Actions CI        │  HTML/CSS/JS      │
└─────────────────────┘                                └────────┬─────────┘
                                                                  │ deploy
                                                                  ▼
                                                        ┌──────────────────┐
                                                        │  GitHub Pages     │
                                                        │  custom domain    │
                                                        └────────┬─────────┘
                                                                  │
                                          visitor's browser fetches page
                                                                  │
                                                                  ▼
                                                        ┌──────────────────┐
                                                        │  Supabase project │
                                                        │  (Auth + Postgres)│
                                                        └──────────────────┘
```

Key point: `output: "export"` produces a fully static bundle with **no Node.js server**. All Supabase calls happen client-side via `@supabase/supabase-js`, using the **anon/public key** (safe to expose — protected by Row Level Security, not secrecy).

---

## 2. Project Setup

### 2.1 Scaffold

```bash
npx create-next-app@latest my-app --typescript --app --eslint --tailwind
cd my-app
npm install @supabase/supabase-js @supabase/ssr
```

`@supabase/ssr` is used even in a static export because it provides consistent cookie/localStorage session handling helpers usable from client components.

### 2.2 `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // static HTML export -> ./out
  images: {
    unoptimized: true, // required: next/image optimization needs a server
  },
  trailingSlash: true, // avoids 404s on GitHub Pages for nested routes
};

export default nextConfig;
```

**Constraints this imposes:**

- No `app/api/*` route handlers (they're silently excluded/error at build).
- No `middleware.ts` with dynamic logic (only supported in limited static-compatible form).
- No dynamic route without `generateStaticParams` — every route must be resolvable at build time.
- `revalidate`/ISR options are ignored; use `next build` re-runs (via CI) for freshness instead.

---

## 3. Environment Variables

Static export bakes env vars into the JS bundle **at build time**. Only variables prefixed `NEXT_PUBLIC_` are available client-side.

`.env.local` (not committed):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

> The anon key is meant to be public. Do not put your Supabase **service_role** key anywhere in this repo — it bypasses Row Level Security and must never reach client code.

---

## 4. Supabase Client Setup

### 4.1 Browser client — `lib/supabase/client.ts`

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

Because there's no server component executing per-request (static export), you only need the **browser client**. Skip the server-client / middleware session-refresh pattern used in SSR Next.js deployments — it doesn't apply here.

### 4.2 Auth context — `context/AuthProvider.tsx`

```typescript
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => setSession(newSession)
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user: session?.user ?? null, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

Wrap the root layout:

```typescript
// app/layout.tsx
import { AuthProvider } from "@/context/AuthProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

---

## 5. Sign-Up / Sign-In / Sign-Out

### 5.1 Sign-up form — `app/signup/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Creating account...");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login/`,
      },
    });

    setStatus(error ? error.message : "Check your email to confirm your account.");
  }

  return (
    <form onSubmit={handleSignUp}>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" minLength={6} />
      <button type="submit">Sign Up</button>
      {status && <p>{status}</p>}
    </form>
  );
}
```

### 5.2 Login form — `app/login/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard/");
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Log In</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

### 5.3 Protected route pattern — `app/dashboard/page.tsx`

Because there's no server to gate access, protection is client-side (redirect after mount) plus **Row Level Security in Supabase as the real security boundary**:

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login/");
  }, [loading, user, router]);

  if (loading || !user) return <p>Loading...</p>;

  return <p>Welcome, {user.email}</p>;
}
```

### 5.4 Sign-out

```typescript
async function handleSignOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.href = "/";
}
```

> **Security note:** Client-side redirects only hide the UI — they don't protect data. Every table a logged-in user can query must have **Row Level Security (RLS) policies** enabled in Supabase (`Table Editor → RLS`), e.g. `user_id = auth.uid()`, or any visitor could query the table directly via the public API.

---

## 6. Landing Page Structure

```
app/
├── layout.tsx
├── page.tsx              # landing page (marketing/hero/CTA)
├── login/page.tsx
├── signup/page.tsx
├── dashboard/page.tsx     # protected
lib/
└── supabase/client.ts
context/
└── AuthProvider.tsx
public/
└── CNAME                 # custom domain file for GitHub Pages
```

---

## 7. GitHub Pages Custom Domain

`public/CNAME`:

```
www.yourbrand.com
```

This file is copied into `./out` on build and tells GitHub Pages which domain to serve.

**DNS records (at your registrar):**

- Subdomain (`www`): `CNAME` → `<github-username>.github.io`
- Apex domain (`yourbrand.com`): `A` records → GitHub Pages IPs:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

In repo settings → **Pages**: set custom domain, enable **Enforce HTTPS** once DNS propagates (can take up to 24h).

---

## 8. GitHub Actions Workflow

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Repo secrets to configure** (`Settings → Secrets and variables → Actions`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Even though these are "public" values, storing them as secrets keeps the workflow file clean and avoids hardcoding environment-specific values in the repo.

**Repo settings:** `Settings → Pages → Build and deployment → Source: GitHub Actions`.

---

## 9. package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

`next build` with `output: "export"` automatically emits static files to `./out` — no separate export command needed (the old `next export` command is deprecated as of Next 13.3+).

---

## 10. Supabase Project Configuration Checklist

1. **Auth → URL Configuration**: set Site URL to `https://www.yourbrand.com`, add redirect URLs for `/login/`, `/dashboard/`, etc.
2. **Auth → Email templates**: customize confirmation/reset emails if needed.
3. **Database → Tables**: enable **Row Level Security** on every table; write explicit policies (`select`, `insert`, `update`, `delete`) scoped to `auth.uid()`.
4. **API settings**: confirm you're using the `anon` key client-side, never `service_role`.
5. **CORS**: Supabase allows all origins for the REST/Auth API by default via its own gateway — no extra CORS config needed on your end for standard usage.

---

## 11. Local Development Workflow

```bash
npm run dev          # localhost:3000, live Supabase calls against your project
npm run build         # produces ./out, mirrors production build
npx serve out         # optional: preview the static export locally
```

Recommended: use a **separate Supabase project (or schema) for dev/staging** vs production to avoid test signups polluting real user data, and set different GitHub Actions environments/secrets per branch if you introduce a staging deploy.

---

## 12. Summary Checklist

- [ ] `next.config.ts` set to `output: "export"`, `images.unoptimized: true`
- [ ] Supabase project created, anon key + URL saved as repo secrets
- [ ] `@supabase/supabase-js` + `@supabase/ssr` installed
- [ ] Browser Supabase client (`lib/supabase/client.ts`)
- [ ] `AuthProvider` wrapping root layout
- [ ] Sign-up, login, sign-out, protected route implemented
- [ ] Row Level Security policies enabled on all tables
- [ ] `public/CNAME` added with custom domain
- [ ] DNS A/CNAME records configured at registrar
- [ ] GitHub Actions workflow (`deploy.yml`) building and deploying `./out` via `actions/deploy-pages`
- [ ] Repo → Settings → Pages → Source set to GitHub Actions, custom domain + HTTPS enforced
