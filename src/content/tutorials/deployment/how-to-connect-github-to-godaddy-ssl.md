---
description: "Step-by-step guide to deploying a site on GitHub Pages, pointing a GoDaddy domain at it with DNS records, and enabling free HTTPS."
date: 2026-09-12
keywords: [github pages, godaddy, dns, ssl, custom domain, hosting]
featured: false
---

# Connecting a GoDaddy Domain to GitHub Pages with SSL

This guide walks through deploying a site on GitHub Pages and connecting a custom domain purchased on GoDaddy, with HTTPS/SSL enabled — using **`vivekcse.xyz`** as the example domain throughout.

---

## Prerequisites

- A GitHub repository with your site's code (e.g. `username/vivekcse.xyz` or `username/username.github.io`)
- A domain purchased on GoDaddy (example: `vivekcse.xyz`)
- Repo has GitHub Pages enabled (Settings → Pages)

---

## Step 1: Enable GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, choose the branch to deploy from (e.g. `main`) and folder (`/root` or `/docs`)
3. Click **Save**

GitHub will give you a default URL like `https://username.github.io/vivekcse.xyz/`. Confirm this works before moving on.

---

## Step 2: Add the CNAME file to your repo

In the root of your repository, create a file literally named `CNAME` (no file extension) containing just your domain:

```
vivekcse.xyz
```

- No `http://` or `https://`
- No trailing slash
- No `www`

Commit and push this file. GitHub also lets you set this from Settings → Pages → Custom domain (it writes the same file automatically).

---

## Step 3: Configure DNS on GoDaddy

Log in to GoDaddy → **My Products** → `vivekcse.xyz` → **DNS** / Manage DNS.

### A records (for the root/apex domain `vivekcse.xyz`)

Add all four of GitHub Pages' IP addresses as separate A records on `@`:

| Type | Name | Value           |
| ---- | ---- | --------------- |
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

### CNAME record (for `www.vivekcse.xyz`)

| Type  | Name | Value               |
| ----- | ---- | ------------------- |
| CNAME | www  | username.github.io. |

> Replace `username` with your actual GitHub username or org name.

### Remove conflicting records

- Delete any pre-existing **A record** GoDaddy added by default (often a "parked page" IP)
- Delete any **domain forwarding** rule under GoDaddy → Domain settings → Forwarding — this conflicts with GitHub Pages and can block SSL issuance
- Do not leave a CNAME on `@` — root domains can only use A records (or ALIAS/ANAME if GoDaddy supports it)

---

## Step 4: Set the custom domain in GitHub

1. Repo → **Settings** → **Pages**
2. Under **Custom domain**, enter `vivekcse.xyz`
3. Click **Save**

GitHub will run a DNS check. If your A records are correct, it will confirm the domain.

---

## Step 5: Wait for DNS propagation

DNS changes usually take a few minutes to a few hours, occasionally up to 24 hours.

To check propagation:

- Use a tool like whatsmydns.net and search `vivekcse.xyz`, record type `A`
- Confirm all 4 GitHub IPs (185.199.108–111.153) appear across most locations

---

## Step 6: Enable "Enforce HTTPS"

Once DNS propagates and GitHub verifies ownership:

1. Go back to **Settings** → **Pages**
2. The **Enforce HTTPS** checkbox will become available (it's greyed out until GitHub issues a certificate via Let's Encrypt)
3. Check the box

Your site will now be served at:

```
https://vivekcse.xyz
```

with automatic HTTPS, and `http://vivekcse.xyz` / `www.vivekcse.xyz` will redirect to it.

---

## Troubleshooting

| Problem                                             | Likely cause                                     | Fix                                                                          |
| --------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| "Enforce HTTPS" greyed out                          | DNS not fully propagated or A records incomplete | Recheck all 4 A records exist on `@`, wait for propagation                   |
| `www.vivekcse.xyz` works but `vivekcse.xyz` doesn't | Missing A records on root                        | Add the 4 GitHub A records to `@`                                            |
| Domain shows GoDaddy parking page                   | Forwarding still enabled                         | Disable GoDaddy domain forwarding                                            |
| Certificate stuck / not issuing                     | GitHub cert cache issue                          | Remove the custom domain in Settings → Pages, save, wait 1 minute, re-add it |
| `ads.txt` / verification file not found at root     | File only in a subfolder                         | Ensure the file sits at repo root so it resolves at `vivekcse.xyz/ads.txt`   |

---

## Quick reference: final DNS table for `vivekcse.xyz`

| Type  | Name | Value               |
| ----- | ---- | ------------------- |
| A     | @    | 185.199.108.153     |
| A     | @    | 185.199.109.153     |
| A     | @    | 185.199.110.153     |
| A     | @    | 185.199.111.153     |
| CNAME | www  | username.github.io. |
