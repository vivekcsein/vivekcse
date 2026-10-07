---
description: "A plain-English explanation of static websites for business owners: how hosting, live data from outside services and user login work, and what the approach cannot do."
date: 2026-09-12
keywords: [static site, static export, hosting, authentication, web basics]
featured: false
---

# How Your Website Works: Hosting, Live Data & User Login

### A plain-language guide for non-technical stakeholders

---

## 1. The Big Picture

Think of your website as a **printed brochure that can still make phone calls**.

- The pages themselves (text, images, layout) are built once and served instantly — like a printed brochure. This makes the site **extremely fast, cheap to host, and hard to hack**, because there's no live server sitting behind it waiting to be attacked.
- But unlike a real brochure, the pages can still "pick up the phone" and talk to outside services in real time — fetching live prices, submitting a form, checking if a user is logged in, and so on.

This approach is often called a **static site** or **static export**. It's the same technique used by many fast, modern marketing sites and web apps today.

**Why this matters to your business:**

- **Speed** — pages load almost instantly for visitors anywhere in the world.
- **Cost** — hosting is free or near-free (no server to rent or maintain).
- **Reliability** — nothing to crash, patch, or keep online 24/7.
- **Security** — there's no backend server on your domain for attackers to target.

---

## 2. Where the Site Lives

The website is hosted using **GitHub Actions** and **GitHub Pages**, which means:

- Every time an update is made to the site, an automated process builds the latest version and publishes it — no manual uploading, no IT ticket.
- The site is connected to your **own domain name** (e.g. `www.yourbrand.com`), so visitors never see any third-party branding in the address bar.
- This publishing pipeline is free to run for a project of this size.

In short: you get a professional, custom-domain website with an automated, self-updating publishing process, at effectively zero infrastructure cost.

---

## 3. Connecting to Outside Services

Even though the pages are pre-built, they are not "dumb" — once loaded in a visitor's browser, they can:

- Fetch live data (prices, availability, listings, dashboards, etc.)
- Submit forms (contact forms, orders, signups)
- Talk to third-party tools (payment processors, email tools, databases)

This happens the moment the page loads in the visitor's browser, the same way a mobile app talks to the internet after you open it. The "phone call" happens live, from the visitor's device to the outside service — the website itself doesn't need to run a server to make this happen.

**Business implication:** we are not limited to a static brochure. We can layer in live functionality — bookings, dashboards, user accounts — without needing to rent and maintain a traditional web server.

---

## 4. Building a Simple Landing Page + Signup/Login

Here is how a typical setup looks for a landing page that also lets visitors create an account and log in:

### Step 1 — The Landing Page

A polished homepage describing the product/service, with a clear call to action: **"Sign Up"** or **"Log In."** This part is pure static content — fast and lightweight.

### Step 2 — The Sign-Up / Login Form

When a visitor clicks "Sign Up," a form appears asking for an email and password (or a "Sign in with Google" button, etc.).

### Step 3 — Handing Off to Supabase

This is where **Supabase** comes in. Supabase is a ready-made backend service that handles:

- Creating and storing user accounts securely
- Verifying passwords and login attempts
- Sending confirmation/verification emails
- Managing "who is currently logged in"
- Optionally storing other data tied to each user (orders, profiles, preferences)

Instead of building and maintaining our own account system and database (which is expensive, slow, and a security responsibility), the site simply **connects directly to Supabase** from the visitor's browser. Supabase does all the heavy lifting of authentication and data storage behind the scenes.

### Step 4 — The Result

- The visitor signs up or logs in directly from the page.
- Supabase confirms whether the login is valid.
- The website then shows the visitor their personalized content (a dashboard, account page, members' area, etc.) — all without our site ever needing its own server.

**Visual summary:**

```
Visitor's Browser
     |
     |-- loads instantly --> Static Website (GitHub Pages, your domain)
     |
     |-- signs up / logs in --> Supabase (handles accounts & security)
     |
     |-- sees personalized content <-- confirmed identity from Supabase
```

---

## 5. Why This Combination Makes Sense for the Business

| Concern         | How it's addressed                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| Cost            | Hosting is free/near-free; Supabase has a generous free tier before any paid plan is needed          |
| Speed to launch | No custom backend to build — Supabase provides login, accounts, and storage out of the box           |
| Maintenance     | No servers to patch, update, or monitor; publishing is automated                                     |
| Security        | No exposed backend server on our domain; account security is handled by a dedicated, audited service |
| Scalability     | Both GitHub Pages and Supabase scale automatically as traffic grows                                  |
| Branding        | Fully hosted under our own custom domain, so the experience feels 100% ours                          |

---

## 6. What This Approach Cannot Do (Good to Know Upfront)

To set the right expectations:

- **No server-side secrecy on our domain.** Anything sensitive (private API keys, admin-only logic) has to live in Supabase or another secure backend service — not directly in the website's code — because everything shipped to the browser is technically visible.
- **No always-on custom server logic.** If, later, the business needs something more custom than what Supabase offers (complex backend rules, heavy data processing), that would run as a separate, small backend service rather than being part of this static site.
- These are standard trade-offs for this architecture, and for a landing page + signup/login use case, Supabase comfortably covers what's needed.

---

## 7. Summary for Decision-Makers

- The website is built as a fast, static site and published automatically through GitHub Actions to our own domain — minimal cost, minimal maintenance.
- Despite being "static," it can connect live to outside services, including full user signup and login.
- **Supabase** acts as the secure account and data backend, so we get professional-grade authentication and storage without building or hosting our own server.
- This gives the business a fast, secure, low-cost foundation that can grow — from a simple landing page today to a full account-based product later — without re-architecting the site.
