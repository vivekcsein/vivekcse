---
description: A from-scratch walkthrough of cookie-based auth in a Next.js App Router project — no third-party auth service.
date: 2026-09-12
keywords: [nextjs, authentication, cookies, middleware, sessions, tutorial]
featured: false
---

# Build auth with Next.js

This walks through a minimal, cookie-based auth flow: a signed session cookie, a middleware check, and a login route — no external auth provider.

## 1. Sign a session token

Use a small library (or the Web Crypto API directly) to sign a payload containing the user id and an expiry, and set it as an `httpOnly`, `secure` cookie on login.

## 2. Verify it in middleware

`middleware.ts` reads the cookie on every request to a protected route, verifies the signature, and redirects to `/login` if it's missing or invalid.

## 3. Read the session in Server Components

Re-verify the same cookie in a `getSession()` helper called from Server Components — middleware protects the route, but the page still needs the user's identity to render anything personalized.
