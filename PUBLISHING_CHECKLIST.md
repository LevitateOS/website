# docs/website Publish + Growth Checklist (P0/P1/P2)

This checklist is specific to:
- Astro site in `docs/website`
- Cloudflare Pages project `levitateos-docs`
- Domains `www.levitateos.org` and `levitateos.org`

Use this as the source of truth for launch readiness and first growth phases.

## Current Quick-Check Status (2026-02-16)

- [x] `bun run check` passes (`typecheck` + `build`).
- [x] `bun run deploy` succeeds with pinned `CLOUDFLARE_ACCOUNT_ID`.
- [x] Pages project `levitateos-docs` has all expected domains:
  - [x] `levitateos-docs.pages.dev`
  - [x] `levitateos.org`
  - [x] `www.levitateos.org`
- [x] HTTPS is serving `200` for both:
  - [x] `https://levitateos.org`
  - [x] `https://www.levitateos.org`
- [x] HTTP redirects to HTTPS on both hosts.
- [x] Canonical and OG URLs are consistent (currently apex-canonical).
- [x] Internal links normalized to trailing-slash route style to avoid unnecessary 308s.
- [x] Security headers include `Strict-Transport-Security: max-age=31536000`.
- [ ] Decide whether to keep dual-host 200 responses, or enforce one host redirect (`apex <-> www`) in Cloudflare dashboard rules.

## P0 (Blockers: must be done before calling the site "launch-ready")

### P0.1 Domain, DNS, and SSL
- [x] `www.levitateos.org` is `active` in Pages custom domains.
- [x] `levitateos.org` (apex) is `active` in Pages custom domains.
- [ ] Remove conflicting apex `A`/`AAAA` DNS records that point to old origin infrastructure.
- [ ] Ensure apex points to Pages target (`levitateos-docs.pages.dev`) via Cloudflare-managed setup.
- [x] Confirm HTTPS works for both:
  - [x] `https://www.levitateos.org`
  - [x] `https://levitateos.org`
- [x] Confirm no 522/526/530 on apex and `www`.
- [ ] Configure canonical redirect policy:
  - [ ] either `www -> apex`
  - [ ] or `apex -> www`
- [ ] Verify there is no redirect loop.

### P0.2 Build + Deploy Reliability
- [x] `bun run typecheck` passes in `docs/website`.
- [x] `bun run build` passes in `docs/website`.
- [x] `bun run deploy` succeeds and creates a fresh production deployment.
- [ ] Latest deployment in Pages maps to current commit hash.
- [ ] Rollback target is known (last good deployment URL noted).

### P0.3 Route Health (Production)
- [x] Core routes load with HTTP 200:
  - [x] `/`
  - [x] `/download/`
  - [x] `/ralph4days/`
  - [x] `/docs/`
  - [x] `/docs/getting-started/`
  - [x] `/privacy/`
- [x] Unknown route returns styled 404 page (`/404.html` behavior verified).
- [ ] Header navigation links all resolve correctly on desktop.
- [ ] Mobile menu opens/closes and routes resolve correctly.

### P0.4 Content Accuracy (No stale claims)
- [ ] Home page claims match actual current product behavior.
- [ ] `Ralph4days` page copy matches current product model and terminology.
- [ ] Download page dates/statuses are current and intentionally labeled (`planned`/`coming soon`).
- [ ] No claims imply features that are not shipped.
- [ ] All screenshots reflect the current UI state.
- [ ] All external links resolve (GitHub, docs links, issue links, license links).

### P0.5 Metadata + SEO Baseline
- [ ] Unique `<title>` and description are present for key pages.
- [ ] Canonical URL points to chosen canonical domain.
- [ ] OpenGraph fields render correctly (`title`, `description`, `image`, `url`).
- [ ] Twitter Card fields render correctly.
- [ ] `sitemap-index.xml` is generated in build output.
- [ ] `robots.txt` exists and matches intended index policy.
- [ ] `og-image.png` is valid and readable in social previews.

### P0.6 Accessibility + UX Minimum Bar
- [ ] Text contrast passes WCAG AA for primary content and CTAs.
- [ ] Keyboard navigation works for nav, toggles, links, and buttons.
- [ ] Focus styles are visible on interactive elements.
- [ ] Theme toggle works and persists.
- [ ] `prefers-reduced-motion` behavior is respected (including background/parallax effects).
- [ ] Images have meaningful `alt` text where needed.

### P0.7 Performance Baseline
- [ ] No obvious layout shift on initial render (logo/text/hero stable).
- [ ] Hero content appears quickly on broadband and typical laptop/mobile.
- [ ] Large images are not oversized relative to display dimensions.
- [ ] No severe script/runtime errors in console on key pages.

### P0.8 Production Security Hygiene
- [ ] No secrets or tokens are committed in repo files.
- [x] Security headers present and sane (`X-Frame-Options`, `Referrer-Policy`, `X-Content-Type-Options`).
- [x] `https` is enforced across canonical and non-canonical hostnames.
- [ ] Privacy/legal footer links are reachable.

### P0.9 Instrumentation Essentials
- [ ] At least one analytics tool is enabled (privacy-compatible).
- [ ] Events tracked at minimum:
  - [ ] `nav_click_download`
  - [ ] `cta_click_home_primary`
  - [ ] `cta_click_r4d_primary`
  - [ ] `docs_entry`
- [ ] Events are verified in production (not just local dev).

### P0.10 Final Go/No-Go Gate
- [ ] Domain routing stable for 24h.
- [ ] No P0 open defects.
- [ ] Latest deployment + commit documented in release note.

---

## P1 (High impact: first 7-14 days after launch)

### P1.1 Conversion Optimization
- [ ] Tighten hero copy on `/` to one primary promise and one primary CTA.
- [ ] Add one low-friction secondary CTA (`View on GitHub` or `Read docs`) above fold.
- [ ] Add clearer CTA hierarchy on `/ralph4days` (download vs learn more vs source).
- [ ] Ensure CTA copy is outcome-based (not generic “Click here” style).
- [ ] Add supporting proof near CTAs (screenshots, concrete claims, status clarity).

### P1.2 Content System Cleanup
- [ ] Add “Last updated” metadata on key landing pages where factual drift matters.
- [ ] Align naming conventions across all pages (`LevitateOS`, `RalphOS`, `acornOS`, `R4D`).
- [ ] Remove duplicated statements that dilute clarity.
- [ ] Add short FAQ section for top objections:
  - [ ] Is this production-ready?
  - [ ] What runs locally vs remote?
  - [ ] Who is this for?
- [ ] Add one concise “not for you if…” qualifier section to improve fit.

### P1.3 SEO Expansion
- [ ] Add internal links between `/`, `/ralph4days`, `/download`, and top docs pages.
- [ ] Add descriptive anchor text (avoid vague “read more” links).
- [ ] Add/update JSON-LD on key pages as needed.
- [ ] Validate Search Console indexing for canonical host.
- [ ] Submit sitemap for canonical host.

### P1.4 Visual and UX Polish
- [ ] Cross-browser validation:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] Mobile checks:
  - [ ] 375px width
  - [ ] 768px width
- [ ] Verify background effects do not hurt readability on light/dark mode.
- [ ] Validate spacing rhythm between sections on long pages.

### P1.5 Performance Hardening
- [ ] Run Lighthouse on production for `/`, `/ralph4days`, `/download`.
- [ ] Triage largest opportunities from LCP/INP/CLS results.
- [ ] Optimize heavy assets in `public/` where needed.
- [ ] Ensure no unnecessary blocking font or script behavior.

### P1.6 Distribution Pack (Launch Assets)
- [ ] Create final “launch blurb” versions:
  - [ ] X/Twitter short
  - [ ] LinkedIn post
  - [ ] Reddit/HN summary
- [ ] Create 2-3 social cards from real UI screenshots.
- [ ] Create one 20-40s silent demo loop (gif/video) for social embeds.
- [ ] Prepare press-kit-like page section:
  - [ ] Logos
  - [ ] Product one-liner
  - [ ] Links

### P1.7 Monitoring + Operations
- [ ] Basic uptime checks configured for canonical hostname.
- [ ] 404/error trend monitored post-release.
- [ ] Weekly review ritual created:
  - [ ] traffic
  - [ ] CTA conversion
  - [ ] top entry pages
  - [ ] top exit pages

---

## P2 (Scale and growth loops: after baseline is stable)

### P2.1 Growth Loops + Shareability
- [ ] Create shareable proof artifacts (before/after workflows, screenshots, clips).
- [ ] Add “share this” entry points on high-intent sections.
- [ ] Add user stories/case examples with concrete outcomes.
- [ ] Add community submission channel for showcases.

### P2.2 Experiment Program
- [ ] Establish recurring A/B testing cadence (biweekly or monthly).
- [ ] Keep one experiment backlog with:
  - [ ] hypothesis
  - [ ] target metric
  - [ ] expected lift
- [ ] Run tests on:
  - [ ] hero headline variants
  - [ ] CTA labels
  - [ ] section order
  - [ ] download CTA placement
- [ ] Document outcomes and roll forward winners only.

### P2.3 Content Engine
- [ ] Add comparison pages for search intent (`vs alternatives`).
- [ ] Publish technical deep-dive posts linked from landing pages.
- [ ] Publish roadmap/changelog cadence to build trust and return visits.
- [ ] Add glossary pages for ecosystem terms to capture long-tail traffic.

### P2.4 Analytics Maturity
- [ ] Build funnel dashboard:
  - [ ] landing view
  - [ ] CTA click
  - [ ] docs engagement
  - [ ] return sessions
- [ ] Segment by acquisition source and campaign.
- [ ] Track content-assisted conversions (docs -> CTA).
- [ ] Build monthly KPI report for iteration planning.

### P2.5 Technical Platform Maturity
- [ ] Add CI guardrails for metadata/SEO regressions.
- [ ] Add automated link-check job.
- [ ] Add visual regression checks for top pages.
- [ ] Add scheduled dependency/security update workflow.
- [ ] Define static asset budget thresholds and enforce in CI.

---

## Suggested Execution Order

1. Close all `P0.1` domain tasks first.
2. Run full `P0.2` to `P0.10` pass and deploy once.
3. Spend first week on `P1.1`, `P1.2`, and `P1.4`.
4. Start `P1.6` distribution pack before major announcement.
5. Begin `P2` only after two stable weeks of production metrics.

---

## Fast Command Checklist (docs/website)

```bash
cd docs/website
bun run typecheck
bun run build
bun run deploy
bunx wrangler pages deployment list --project-name levitateos-docs
bunx wrangler pages project list
```

## Domain Verification Commands

```bash
curl -I https://www.levitateos.org
curl -I https://levitateos.org
dig +short www.levitateos.org
dig +short levitateos.org
```

## Puppeteer Visual Testing

The site has anchors for easy navigation:

```
http://localhost:43117/#hero      - Hero section
http://localhost:43117/#features  - Features section
http://localhost:43117/#download  - Download section
```

### Target Viewport

Primary target: **960x1080** (half-width of 1920x1080)

This simulates a user with the site on one half of their screen (common for power users reading docs while working).

### Visual Stages

- [ ] Hero fits above the fold at 960x1080
- [ ] CTAs (Download, GitHub) visible without scrolling
- [ ] Feature cards readable, no text overflow
- [ ] Code blocks don't overflow containers
- [ ] Dark mode renders correctly
- [ ] Light mode renders correctly

---

## Lighthouse Audit
