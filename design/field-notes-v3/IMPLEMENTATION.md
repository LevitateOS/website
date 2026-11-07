# Levitate Field Notes v3 — implementation handoff

## Direction and scope

V3 combines warm editorial paper with a substantial, architectural botanical surround. Authority comes from scale, dark material, precise alignment and controlled empty space. The live interface remains readable, practical and recognizably Field Notes. The frame treatment follows the family relationship requested with the user-owned sodaos.dev; this document does not claim an audit of that site.

The selected Levitate hovering leaf and curved ground line, and the selected sculpted, tilted Acorn, retain their geometry. Typography, spacing, minimum sizes and color roles below are v3 design decisions. The working v3 reference is `homepage.html`, with the visual reference in `index.html` and reusable values in `tokens.css` and `tokens.json`. Browser rendering and actual Plasma integration have **not** been verified by this handoff.

## Assets and responsibilities

Paths below are relative to the package root. Preserve the selected source geometry in the supplied logo assets.

| Role | Asset paths |
| --- | --- |
| Editorial type | `assets/fonts/newsreader-normal.woff2`, `assets/fonts/newsreader-italic.woff2` |
| Practical interface type | `assets/fonts/instrument-sans.woff2` |
| Font notices | `assets/fonts/newsreader-OFL.txt`, `assets/fonts/instrument-sans-OFL.txt` |
| Standard Levitate mark | `assets/logos/levitate-ink.svg`, `assets/logos/levitate-paper.svg` |
| Small Levitate mark | `assets/logos/levitate-micro-ink.svg`, `assets/logos/levitate-micro-paper.svg` |
| Levitate lockup | `assets/logos/levitate-lockup-ink.svg`, `assets/logos/levitate-lockup-paper.svg` |
| Acorn equivalents | The corresponding `acorn-ink.svg`, `acorn-paper.svg`, `acorn-micro-ink.svg`, `acorn-micro-paper.svg`, `acorn-lockup-ink.svg`, `acorn-lockup-paper.svg` in `assets/logos/` |
| Web surround | `assets/artwork/levitate-frame.webp` |
| Launcher size proof | `assets/proofs/launcher-scale.svg`, `assets/proofs/launcher-scale.png` |

Keep the original artwork PNG and generation brief with the artwork sources. Use the optimized WebP in the page. Do not generate a new mark from the botanical frame or reconstruct either logo in CSS.

## Color roles and contrast

| Token role | Value | Intended use |
| --- | --- | --- |
| Paper | `#F2EEE4` | Reading surfaces; light CTA lettering |
| Pine | `#214438` | Levitate identity, headline, small editorial labels |
| Ink | `#14221A` | Body text and ordinary headings on paper |
| Red | `#B22F27` | One concentrated primary action; occasional meaningful annotation |
| Red hover | `#95271F` | Primary action hover background |
| Acorn brown | `#644532` | Acorn identity within the shared paper system |
| Line | `#BFC6B8` | Quiet decorative separators |

Calculated using the [WCAG relative-luminance definition](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance), contrast against paper is **14.23:1** for ink, **9.30:1** for pine, **7.43:1** for Acorn brown and **5.44:1** for red. Paper lettering on red has the same 5.44:1 ratio, increasing to **7.00:1** on the hover red. These are specified solid-color pairings, not a full UI conformance audit.

Use paper-colored lettering on the red action and the designated dark pine ending/footer. Paper reading areas use ink, pine or Acorn brown. Literal white is unnecessary. Red is an identity/action choice, not the error color by implication. Do not use the pale separator as the sole boundary of an otherwise invisible interactive control. A selected text item needs a visible underline or another non-color cue.

## Protect foregrounds in embedded hosts

Relying on inherited root ink leaves paper text vulnerable to foregrounds supplied by host element styles. The contrast-corrected reference addresses the reported white-on-paper failure with explicit local colors. Set both background and foreground on actual paper regions, and reset descendant color inheritance **inside the component root**. Keep semantic color overrides after that base rule.

```css
#levitate-v3 {
  --lev-paper: #F2EEE4;
  --lev-ink: #14221A;
  --lev-pine: #214438;
  --lev-red: #B22F27;
  background: var(--lev-paper);
  color: var(--lev-ink);
  color-scheme: light;
  container-type: inline-size;
}
#levitate-v3 * {
  box-sizing: border-box;
  color: inherit;
  -webkit-text-fill-color: currentColor;
}
#levitate-v3 :is(.lev-hero-paper, .lev-reading, .lev-guide) {
  background: var(--lev-paper);
  color: var(--lev-ink);
}
#levitate-v3 :is(h1, h2, h3, p) { color: var(--lev-ink); }
#levitate-v3 :is(.lev-headline, .lev-kicker, .lev-number) {
  color: var(--lev-pine);
}
#levitate-v3 .lev-open {
  background: var(--lev-red);
  color: var(--lev-paper);
}
#levitate-v3 .lev-open:hover {
  background: #95271F;
  border-color: #95271F;
}
```

Adapt the root ID consistently across selectors, anchors and script queries. Include nested `span`, `em`, `strong`, disclosure text and icons in the inheritance behavior. SVG interface strokes should follow `currentColor`. The dark ending explicitly sets both its surface and all heading/link foregrounds. Keep the Acorn section explicitly brown on paper. Do not replace the descendant reset with a hard-coded dark color: that would darken the button label and arrow. Ink on this red is only **2.61:1**. Keep all resets scoped; the surrounding host must retain its own styles.

## Typography and composition

Use **Newsreader 400/500** for the main statement, section headings and a restrained editorial aside. Use **Instrument Sans 400/500** for navigation, body copy, annotations and controls. Load the supplied fonts locally with `font-display: swap`; retain Georgia and Arial/sans-serif fallbacks. Keep the font notices in the package. Use optical sizing for Newsreader and real italic where emphasis is needed.

The hero headline is “Know what you run.” Set it in two deliberate lines, left aligned, approximately 42–100px across the supported width range, with a tight display line-height near 0.94. Treat these as starting values: preserve the words and prevent clipping at the narrow end. Body copy uses roughly 14–17px with 1.6–1.8 line-height. Small uppercase labels use 11px, medium weight and restrained tracking; they must remain secondary.

Use an asymmetric paper composition: headline, short deck and action share a strong left edge; the 56px leaf sits at the upper right. Reserve horizontal room for that mark so the kicker cannot run beneath it. Keep the text group compact, with approximately 370px maximum deck width. Do not restore a centered emblem/headline/button stack: it turns the framed page into an invitation and adds avoidable height.

Below the hero, use a two-column introduction and three numbered principles. Collapse these to a single readable sequence when space tightens; the reference switches near a 580px component width. Use thin rules and editorial spacing rather than a grid of raised cards. Let content determine height. Keep corners square and the primary button a compact rectangle.

## Frame implementation

The web asset is **1536 × 1024**, approximately **106KB**. Render it as the border of a real HTML surface, with the exact slice values below. The artwork supplies material and botanical detail; headings, logos, controls and all reading text remain live DOM content.

```css
#levitate-v3 .lev-hero {
  border: solid transparent;
  border-width: clamp(20px, calc(8.24cqi - 6.37px), 78px);
  border-image-source: url("assets/artwork/levitate-frame.webp");
  border-image-slice: 15% 10%;
  border-image-width: 1;
  border-image-repeat: stretch;
  background: #214438;
}
```

The thickness is a design target of 20px at a 320px component and 78px at 1024px. The container supplies the `cqi` reference. The example assumes inline CSS at the package root; adjust the URL if the stylesheet moves. Keep an ordinary opaque paper child inside the border; omit `fill` from `border-image-slice`, so the source image's dark center is not painted behind the content. Keep the paper flush with the inner edge and avoid adding a second frame, rounded card or floating shadow. Use the artwork once at hero scale; repeated textures would dilute its weight. The Acorn family shares typography, paper and composition without automatically inheriting Levitate-specific leaf artwork.

## Logo sizes and Plasma candidates

Recommended starting sizes are **micro at 16/20px**, **standard at 24/32px and above**. Prefer the standard mark at 40–64px when featured independently. For web lockups, aim for at least 28px high, allowing a compact-navigation minimum of 24px, and preserve the intrinsic aspect ratio; judge the wordmark, not merely the outer SVG box. Allow clear space of approximately one quarter of the mark box. The curved ground line belongs to Levitate's symbol and must not become a page underline.

Use ink assets on paper and paper assets on a sufficiently dark surface. Keep icons one color; preserve Acorn's tilt and sculpted silhouette. Do not add the generated texture, glow or a wordmark to a small launcher icon.

The launcher proof shows 16/20px micro and 24/32px standard at native pixel scale. It is a size comparison, **not an actual Plasma integration test**. Proposed start-button defaults are the micro asset for a small icon slot and the standard asset from 24px upward, selecting ink/paper for the actual panel background. These existing fixed-color files are not promised theme-aware symbolic assets. Theme recoloring, optical balance, fractional scaling and final applet sizing require review in the real Plasma configuration before describing the result as verified.

## Interaction and review sequence

Use native links, buttons and `details`/`summary`. The primary action opens the guide, moves focus to its summary and keeps `aria-expanded` synchronized with the actual disclosure state, including manual toggles. Keep decorative arrows and the plus glyph hidden from assistive technology. The guide remains directly usable through its native summary without the enhancement script. Retain visible native keyboard focus; never remove an outline without providing a visible replacement. Respect reduced motion for scrolling and disable the short hover transition when requested.

Implement in this order: copy approved assets and notices; establish scoped tokens and fonts; build the paper content and native controls; apply the frame; connect the guide enhancement. Then use three concrete review gates:

1. **Reading:** inspect the actual embedded host for dark paper text, light red-button labels, inherited inline text and legible loaded/fallback fonts. Confirm default, hover and keyboard focus states.
2. **Composition:** inspect 320, 660, 736 and 1024px widths for headline clipping, mark collisions, distorted corners and horizontal overflow. Check that the frame remains substantial while the paper remains useful. Do not hide overflow to conceal a layout fault.
3. **Behavior and marks:** exercise navigation, keyboard disclosure, synchronized labels and reduced-motion scrolling. Review launcher proofs at native size, and keep real Plasma validation explicitly pending until it occurs.

Record any actual observations alongside these gates. This document specifies what to review; it does not assert that browser or desktop checks have already passed.

## Platform references

For native integration, consult the current [KDE icon guidance](https://develop.kde.org/hig/icons/) and [Plasma system-color documentation](https://develop.kde.org/docs/plasma/theme/theme-colors/). These are implementation references; the fixed-color assets in this package do not claim automatic theme recoloring. Font source URLs are retained in `assets/fonts/font-sources.json`.
