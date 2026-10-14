---
description: "A client-facing business case for a hardened authentication backend, plus the step-by-step roadmap we follow to build it: shared rate limiting, key rotation, multi-factor sign-in and verifiable security."
date: 2026-10-13
keywords:
  - authentication security
  - secure login
  - multi-factor authentication
  - passkeys
  - JWT key rotation
  - rate limiting
  - enterprise SSO
  - OWASP ASVS
  - identity backend
  - Cloak Shield
featured: false
---

# Why Authentication Security Is Worth Paying For (and How We Build It)

_Cloak Shield Web: a roadmap for a top-tier authentication backend, and the business case for choosing it._

---

## 1. The short version

Sign-in is the front door to everything your customers store with you. Most products ship a login that works. A few ship one that stays safe when someone attacks it, and can prove it to an auditor, a security questionnaire or an enterprise buyer.

This article has two halves:

- **For clients:** why paying more for a hardened authentication layer is cheaper than the alternative.
- **For our team:** what we build, in what order, and how we show it is real.

---

## 2. For clients: why the extra investment pays back

### 2.1 A breach costs far more than the feature

Fixing a weak login after an incident means incident response, customer notification, legal review, lost trust and often lost contracts. Building it properly once costs a fraction of that, and the work compounds: every later product on the same foundation inherits it.

### 2.2 Enterprise customers will not buy without it

Larger buyers send security questionnaires before they sign. The same questions come up every time:

| They ask                                    | What a strong answer looks like                              |
| ------------------------------------------- | ------------------------------------------------------------ |
| Do you support multi-factor authentication? | Passkeys, authenticator apps and recovery codes              |
| Can we use our own single sign-on?          | OIDC and SAML, with automatic user provisioning              |
| How do you detect abuse?                    | Rate limiting, lockouts, risk-based checks, an audit trail   |
| Can we see what happened on an account?     | A tamper-evident log we can stream to their monitoring tools |
| Who has tested you?                         | An independent penetration test and a documented standard    |

If you cannot answer these, deals stall or you are limited to small customers. A hardened identity layer is often what unlocks the higher-priced plans.

### 2.3 It reduces support cost and churn

Account takeovers, locked-out users and "was this me?" emails are expensive. Device-aware sessions, new-device alerts, step-up checks and clear activity history turn those support tickets into self-service.

### 2.4 It is a selling point, not just a safeguard

Security you can show is a differentiator. Published key sets, a public disclosure policy, a status page and a standards checklist let a prospect verify your claims without trusting you blindly.

### 2.5 What the client gets, in plain terms

- Fewer successful attacks on user accounts.
- Faster security reviews and shorter sales cycles.
- Compliance groundwork (GDPR data handling, later SOC 2) already in place.
- A product that can be sold to regulated and enterprise customers.
- Lower long-term risk and maintenance cost than retrofitting later.

> **Honest scope note:** no one can promise "unhackable". What we promise is defence in depth, evidence that each control works, and fast detection when something goes wrong.

---

## 3. For our team: what "top tier" means in practice

The backend already has a strong base: argon2id password hashing with constant-time handling of unknown emails, refresh-token reuse detection, account lockout, per-device sessions, CSRF, CORS and security-header middleware, an audit trail, PKCE and OIDC verification, and a CI pipeline with secret scanning, architecture rules and Postgres-backed tests.

The gap to the top is in four areas: **weaknesses to fix, proof, depth, and product surface.**

### 3.1 Fix first: real weaknesses today

**a) Shared rate limiting**
The current limiter keeps counters in memory. On serverless hosting each instance has its own counters, so limits are weaker than they look.

How to achieve it:

1. Put counters in a shared store such as Redis (Upstash works well on Vercel).
2. Limit by account, by IP and by IP range, not just one.
3. Add progressive delays and a captcha challenge (for example Cloudflare Turnstile) after repeated failures.
4. Keep the in-memory limiter as the local and test fallback behind the same interface.
5. Test: many parallel requests across simulated instances must still hit the limit.

**b) Asymmetric signing keys with rotation**
Tokens are signed with one shared secret. Anyone who can verify a token can also forge one, and there is no rotation.

How to achieve it:

1. Move to EdDSA or ES256 key pairs.
2. Add a `kid` (key ID) to every token header.
3. Publish public keys at `/.well-known/jwks.json` so clients verify tokens without ever holding a secret.
4. Rotate on a schedule: add the new key, sign with it, keep the old one verifying until its tokens expire, then retire it.
5. Keep private keys in a secret manager or KMS, not a single environment variable.

**c) Multi-factor authentication**
How to achieve it:

1. Passkeys (WebAuthn) first: phishing-resistant and the best user experience.
2. TOTP authenticator apps and one-time recovery codes as fallback.
3. Extend the existing re-authentication step into step-up checks for sensitive actions (change email, change password, delete account).
4. Audit every enrol, use and removal.

**d) Breached-password screening**
How to achieve it:

1. Check new passwords against the Pwned Passwords range API. It uses k-anonymity, so the password never leaves the server.
2. Reject known-breached passwords at sign-up, reset and change.
3. Favour length over complexity rules, in line with current NIST guidance.

### 3.2 Make the security provable

- **Supply chain in CI:** dependency vulnerability scanning, CodeQL or Semgrep, a software bill of materials (CycloneDX), signed build provenance, and GitHub Actions pinned by commit hash.
- **Attacker's-eye testing:** run OWASP ZAP or Nuclei against every preview deployment. Add fuzz tests for request schemas and token parsing. Keep adding tests for classic identity bugs: token confusion, race conditions in reset and account-linking flows, user enumeration.
- **A written standard:** an OWASP ASVS Level 2 checklist mapping each requirement to the code and the test that proves it. This doubles as a sales document.
- **Independent validation:** an external penetration test, a public `security.txt`, a disclosure policy, then a bug bounty. SOC 2 Type I follows once controls are stable.

### 3.3 Defence in depth

- Postgres row-level security so a query bug cannot expose another user's rows.
- Envelope encryption for sensitive columns (phone numbers, OAuth tokens).
- A tamper-evident audit log (hash-chained entries), with retention settings and export to a customer's monitoring tools through webhooks or streaming.
- Risk-based sign-in using data we already store: new device, impossible travel, bursts of failures. Respond with step-up or a block.

### 3.4 Product surface buyers expect

- Organizations and members (multi-tenancy).
- Roles and scopes, plus API keys and service accounts.
- OIDC and SAML single sign-on, with SCIM user provisioning.
- Data export and deletion for GDPR.
- Versioned API documentation, a changelog, a public status page and an uptime commitment.

---

## 4. Suggested order of work

| Phase | Work                                             | Why this order                             |
| ----- | ------------------------------------------------ | ------------------------------------------ |
| 1     | Shared rate limiter; breached-password check     | Closes the largest real gaps quickly       |
| 2     | Asymmetric keys, `kid`, JWKS, rotation           | Foundation for selling an identity product |
| 3     | Passkeys, TOTP, recovery codes, step-up          | The most common enterprise requirement     |
| 4     | CI hardening: scanning, SBOM, provenance, ZAP    | Starts producing evidence                  |
| 5     | ASVS checklist, penetration test, `security.txt` | Turns evidence into trust                  |
| 6     | Multi-tenancy, SSO and SCIM, audit streaming     | Opens the enterprise price tier            |

Each phase ships on its own, with tests, and each one is something we can show a client.

---

## 5. How to pitch it

1. **Start with their risk.** Which accounts, data or contracts would hurt most if lost?
2. **Show the questionnaire.** Walk through section 2.2 and ask how they would answer today.
3. **Offer tiers.** Baseline (phases 1 and 2), Professional (adds phase 3 and 4), Enterprise (everything).
4. **Price against the alternative.** Compare the build cost with the cost of one lost enterprise deal or one incident.
5. **Deliver evidence, not promises.** Hand over the ASVS checklist, test reports and the published key set.

---

_Cloak Shield is built on Bun, Elysia, Drizzle and PostgreSQL. Roadmap items above are planned work, not current claims: only the controls listed under "base" in section 3 exist today._
