# Deploying to GitHub Pages

The site is a **static export** (`output: "export"` → `./out`), built by GitHub Actions and
published with the official Pages actions. No server, no secrets.

```
push to main ─► lint ─► next build ─► postbuild checks + CSP ─► upload ./out ─► deploy
pull request ─► the same build and checks, but never deploys
```

## One-time setup

1. **Pages source.** Repo → *Settings → Pages → Build and deployment → Source: **GitHub Actions***.
2. **Custom domain.** `public/CNAME` already contains `vivekcse.xyz` (it ships in the build).
   In *Settings → Pages → Custom domain* enter the same name, then tick **Enforce HTTPS** once
   GitHub has issued the certificate.
3. **DNS** (at the domain registrar):

   | Type | Name | Value |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
   | AAAA (optional) | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
   | CNAME | `www` | `vivekcsein.github.io` |

   (Check GitHub's "Managing a custom domain for your GitHub Pages site" page if a value looks stale.)
4. Push to `main`. That is all — **no secrets and no variables are required.**

## Environment

Every `NEXT_PUBLIC_*` value is inlined into public HTML/JS at build time, so it is configuration,
never a secret. Set overrides as repository **variables** (*Settings → Secrets and variables →
Actions → Variables*), locally in `.env.local`. A blank value counts as "not set".

| Variable | Required? | Default / how it is set |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** (in production) | Workflow uses the repo variable if set, otherwise `https://<public/CNAME>` → `https://vivekcse.xyz`. Must be `https`, not localhost, and its host must equal the CNAME. |
| `NEXT_PUBLIC_GH_PROJECT_PAGES` | No | Only for `<user>.github.io/<repo>` hosting (adds the `/<repo>` base path). Never together with a CNAME. |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | No | Omitted from the HTML when blank. |
| `NEXT_PUBLIC_ADSENSE_CLIENT`, `_SLOT_RAIL`, `_SLOT_IN_ARTICLE` | No | Ads (and their CSP hosts) stay off when blank. |
| `NEXT_PUBLIC_ACTIVE_STYLE`, `NEXT_PUBLIC_ACTIVE_THEME` | No | `cyantrix-theme`, `system`. |
| Author / social / title variables | No | See `.env.example`; every one has a default. |

## What the build enforces (CI = strict)

The `postbuild` step (`src/packages/scripts/secure-export.ts`) fails the deploy when:

- the site URL is not `https` or contains `localhost` in metadata/feed;
- `public/CNAME` does not match the site URL host, or a CNAME is combined with the project-pages base path;
- `index.html`, `404.html`, `.nojekyll`, `robots.txt` or `sitemap.xml` is missing from `out/`;
- a page has inline event handlers, `javascript:` URLs, `http://` sub-resources or an unexpected third-party script.

It also injects a per-page Content-Security-Policy `<meta>` (GitHub Pages cannot send headers).

## Check it locally

```bash
CI=true NEXT_PUBLIC_SITE_URL=https://vivekcse.xyz bun run build   # same checks as CI
bun run preview                                                    # serves ./out on http://localhost:4173
```

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Deploy job: *"Get Pages site failed"* / *"Not Found"* | Pages source is not **GitHub Actions** yet (step 1). |
| Build: *"Set the repository variable NEXT_PUBLIC_SITE_URL…"* | `public/CNAME` is missing/empty and no variable is set. |
| Build: *"custom domain mismatch"* | `NEXT_PUBLIC_SITE_URL` host ≠ `public/CNAME`. Fix the variable or the CNAME. |
| Page loads but CSS/JS 404 | Hosting on `github.io/<repo>` without `NEXT_PUBLIC_GH_PROJECT_PAGES=true`. |
| *"DNS check unsuccessful"* in Pages settings | DNS records are missing or not propagated yet (can take up to 24 h). |
| Local typecheck fails on `@/assets/images/*.png` | Run `bun run build` (or `next dev`) once; Next generates `next-env.d.ts`. |

## Hosting without a custom domain

Delete `public/CNAME`, set `NEXT_PUBLIC_GH_PROJECT_PAGES=true` and
`NEXT_PUBLIC_SITE_URL=https://vivekcsein.github.io/vivekcsexyz`. Pages, assets and the sitemap work,
but canonical/Open Graph URLs ignore the `/vivekcsexyz` prefix — use a custom domain for production SEO.

## Rollback

*Actions → Deploy (GitHub Pages) → pick an earlier successful run → Re-run all jobs*, or revert the commit.
