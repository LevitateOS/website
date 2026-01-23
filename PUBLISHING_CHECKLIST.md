# Website Publishing Checklist

## Fact-Checking (CRITICAL)

Before publishing, verify ALL claims against the actual codebase:

- [ ] **Hero tagline** matches actual product philosophy (check CLAUDE.md)
- [ ] **System requirements** match what's in CLAUDE.md (8GB RAM min, 64GB SSD, x86-64-v3)
- [ ] **Terminal examples** use real commands that actually exist
- [ ] **Recipe syntax** matches actual .rhai format (check recipe/examples/)
- [ ] **LLM claims** are accurate:
  - [ ] Model name correct (SmolLM3-3B)
  - [ ] "Local only" claim verified
  - [ ] "Sandboxed to recipes" claim verified
- [ ] **Package manager commands** are real (`recipe install`, `recipe llm`, etc.)
- [ ] **Feature descriptions** match implemented functionality
- [ ] **No claims about unreleased features** (or clearly marked as "planned")

### How to Fact-Check

```bash
# Check recipe CLI commands
cd recipe && cargo run -- --help

# Check recipe examples exist
ls recipe/examples/*.rhai

# Check LLM toolkit exists
ls llm-toolkit/

# Verify CLAUDE.md for source of truth
cat CLAUDE.md
```

### Red Flags to Watch For

- Claiming features that don't exist yet
- Incorrect command syntax
- Wrong model names or versions
- Outdated system requirements
- Screenshots that don't match current UI

---

## Content Review

- [ ] Hero messaging reviewed and approved
- [ ] Features section accurate and up-to-date
- [ ] Download section has correct system requirements
- [ ] All code examples are valid and runnable
- [ ] No placeholder text ("Lorem ipsum", "Coming soon" if launching)
- [ ] Footer links work (Documentation, GitHub, Issues)
- [ ] License link correct (LGPL-2.1)

## SEO & Meta Tags

- [ ] Page titles are descriptive (`<title>`)
- [ ] Meta descriptions on all pages
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] Canonical URLs set
- [ ] robots.txt configured
- [ ] sitemap.xml generated

## Images & Assets

- [ ] Favicon set (multiple sizes: 16x16, 32x32, 180x180)
- [ ] OG image created (1200x630 recommended)
- [ ] Logo optimized (PNG/SVG, reasonable file size)
- [ ] All images have alt text
- [ ] Images compressed/optimized

## Performance

- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] No render-blocking resources
- [ ] CSS/JS minified (Astro does this)
- [ ] Fonts optimized (preload, subset)
- [ ] No unused CSS/JS

## Accessibility

- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible
- [ ] Screen reader tested (VoiceOver, NVDA)
- [ ] No motion without prefers-reduced-motion respect

## Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Responsive Design

- [ ] Mobile (375px) - iPhone SE
- [ ] Tablet (768px) - iPad
- [ ] Desktop (1280px)
- [ ] Wide (1920px)
- [ ] Target: 960x1080 (half-screen)

## Functional Testing

- [ ] All internal links work
- [ ] All external links work (open in new tab)
- [ ] Copy buttons work on code blocks
- [ ] Theme toggle works (dark/light)
- [ ] Navigation works on mobile (hamburger menu?)
- [ ] Anchor links work (#hero, #features, #download)

## Analytics & Monitoring

- [ ] Analytics configured (Plausible, Umami, or similar - privacy-respecting)
- [ ] Error tracking (optional)
- [ ] Uptime monitoring (optional)

## Security

- [ ] HTTPS enforced
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] No sensitive data exposed
- [ ] Dependencies audited (`bun audit` or similar)

## Deployment

- [ ] Build succeeds: `bun run build`
- [ ] Preview build locally: `bun run preview`
- [ ] Environment variables set (if any)
- [ ] Redirects configured (if needed)
- [ ] 404 page exists and styled
- [ ] Caching headers configured

## DNS & Domain

- [ ] Domain registered and verified
- [ ] DNS records configured (A, CNAME, or platform-specific)
- [ ] SSL certificate provisioned (usually automatic)
- [ ] www redirect configured (or vice versa)

## Pre-Launch

- [ ] Remove any "Coming soon" if launching
- [ ] Update "Star the repo" messaging if ISO is available
- [ ] Final content proofread
- [ ] Test download links (when ISO is ready)

## Post-Launch

- [ ] Verify site is live and accessible
- [ ] Check analytics is receiving data
- [ ] Submit to search engines (Google Search Console)
- [ ] Share on social media / communities
- [ ] Monitor for errors in first 24-48 hours

---

## Quick Commands

```bash
# Development
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Check for issues
bun run astro check
```

## Puppeteer Visual Testing

The site has anchors for easy navigation:

```
http://localhost:3000/#hero      - Hero section
http://localhost:3000/#features  - Features section
http://localhost:3000/#download  - Download section
```

### Target Viewport

Primary target: **960x1080** (half-width of 1920x1080)

This simulates a user with the site on one half of their screen (common for power users reading docs while working).

### Visual Checkpoints

- [ ] Hero fits above the fold at 960x1080
- [ ] CTAs (Download, GitHub) visible without scrolling
- [ ] Feature cards readable, no text overflow
- [ ] Code blocks don't overflow containers
- [ ] Dark mode renders correctly
- [ ] Light mode renders correctly

---

## Lighthouse Audit

```bash
# Install lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:4321 --view
```

## Deployment Platforms

Recommended for Astro static sites:
- **Vercel** - Zero config, automatic deploys
- **Netlify** - Similar to Vercel
- **Cloudflare Pages** - Fast, free tier generous
- **GitHub Pages** - Free, good for open source
