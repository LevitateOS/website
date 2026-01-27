# LevitateOS Image Generation Prompts

## Base Brand DNA

All images should share this foundation. Mix with local prompts below.

```
ENVIRONMENT: Deep space void, not pure black but a rich dark purple-black (#0a0612) fading to true black at edges, subtle distant nebula-like wisps in deep violet (#2d1b4e) barely visible, no stars or obvious space elements - this is abstract void not literal space

OBJECTS: Floating geometric crystalline polyhedra - primarily octahedrons, icosahedrons, and elongated hexagonal prisms, surfaces are semi-translucent like frosted glass or amethyst crystal, internal glow emanating from core in soft purple-pink (#9d4edd), edges catch light with sharp white highlights, some faces more transparent than others creating depth within each shape

MATERIAL: Glass-like with subsurface scattering, not plastic or metal, refractive caustics where light passes through, subtle internal fractures like natural crystal formations, surfaces have micro-texture like brushed glass not perfectly smooth

LIGHTING: Primary soft purple rim light from upper left (#7b2cbf), secondary cooler fill from lower right (#3c096c), no harsh shadows - objects seem to emit their own gentle luminosity, atmospheric haze creating depth layers, volumetric light subtle fog effect

MOTION: Objects mid-levitation with slight rotation implied, subtle motion blur on trailing edges suggesting gentle perpetual drift, not frozen but captured mid-float, some objects closer (larger, sharper) some distant (smaller, hazier) creating z-depth

MOOD: Calm technological transcendence, the feeling of code compiling at 3am when everything works, control without tension, precision without coldness, solitary but not lonely
```

---

## 1. OG Image (Social Sharing)

**File:** `public/og-image.png`
**Dimensions:** 1200 x 630px
**Purpose:** First impression when shared on Twitter, Discord, LinkedIn, etc.

```
[BASE BRAND DNA]

COMPOSITION: Centered with rule-of-thirds awareness, main focal point slightly above center accounting for platform UI cropping, safe margins of 100px on all sides for text overlay zones

TYPOGRAPHY:
- "LevitateOS" in clean geometric sans-serif (similar to Google Sans or Inter), pure white (#ffffff), tracking +2%, weight 600, sized to span roughly 60% of width
- Tagline "Be Your Own Maintainer" below in 40% smaller size, muted silver-gray (#a0a0a0), weight 400, tracking +1%
- Text has extremely subtle drop shadow (2px blur, 20% opacity black) for depth separation

GEOMETRIC ELEMENTS:
- Primary: One medium octahedron floating to the upper-left of text, rotated 15° on Y-axis, 20° on X-axis, close enough to feel connected but not touching text
- Secondary: Smaller icosahedron lower-right, further back in z-space (70% size, slightly hazier), rotated opposite direction
- Tertiary: 3-4 tiny crystalline fragments scattered in mid-ground, like debris from a larger formation, adds organic imperfection
- One elongated hexagonal prism horizontal behind text, very subtle, acts as underline/platform for the wordmark

LIGHTING SPECIFICS: Stronger rim light on the primary octahedron making it hero element, text receives subtle purple ambient bounce from the crystals, background darker in corners (vignette) pushing focus to center

COLOR TEMPERATURE: Overall warm-purple, avoid any green or yellow contamination, pure purple-pink-white palette only

DETAILS: Subtle lens flare artifact where brightest crystal edge catches light (small, tasteful, not JJ Abrams), faint grid pattern in deep background suggesting structure/code (barely visible, 5% opacity)
```

---

## 2. 404 Page Illustration

**File:** `public/404-illustration.png`
**Dimensions:** 800 x 600px (transparent PNG)
**Purpose:** Turn an error into a brand moment, evoke "lost in a beautiful way"

```
[BASE BRAND DNA]

COMPOSITION: Asymmetric, object in upper-right quadrant moving toward corner, leaving negative space in lower-left where the 404 text will sit, diagonal flow from bottom-left to upper-right suggesting departure trajectory

NARRATIVE: A single crystalline shape has detached and is drifting away - not fallen or broken, but peacefully departing, the visual equivalent of "this page floated away"

PRIMARY OBJECT:
- One perfect icosahedron, larger than in other images (hero of this composition)
- Rotated to show interesting facet arrangement, not flat-on
- Position: 65% from left, 30% from top
- Core glow slightly dimmer than usual - like it's powering down or entering sleep mode
- Trailing edge has stronger motion blur, leading edge sharp

TRAIL ELEMENTS:
- 5-7 tiny crystalline fragments in a loose arc behind the main shape
- Fragments get progressively smaller and hazier with distance
- Spacing irregular but rhythmic, like breadcrumbs
- Smallest fragments nearly dissolved into the void
- Trail curves slightly suggesting the object changed direction once

ATMOSPHERIC:
- Faint purple glow in lower-left corner (where object came FROM) like residual warmth
- Upper-right corner deepest black, the void it's heading into
- Middle ground has subtle dust particles catching light, floating aimlessly
- One very faint, very distant geometric shape barely visible in far background - suggesting there's somewhere to go, not pure emptiness

EMOTIONAL TONE: Melancholic but accepting, Studio Ghibli farewell scene energy, beautiful transience, the page isn't broken it just doesn't exist here anymore

TRANSPARENCY: Background should be transparent or easily removable, object and particles only, allow page background to show through
```

---

## 3. Hero Background

**File:** `public/hero-bg.png`
**Dimensions:** 1920 x 1080px
**Purpose:** Subtle atmosphere behind hero section, MUST NOT compete with text/logo

```
[BASE BRAND DNA - BUT SIGNIFICANTLY MUTED]

CRITICAL CONSTRAINT: This is a background. It should be felt, not seen. When you think you've made it subtle enough, make it 50% more subtle. Text readability is paramount.

COMPOSITION: Radial, center is clearest/darkest, complexity increases toward edges, absolutely nothing in center 40% of image where logo and headline sit

BACKGROUND GRADIENT:
- Center: Near-black with hint of purple (#0c0814)
- Edges: Slightly lighter purple-black (#12091f)
- Gradient is radial, centered, very gentle transition
- Additional subtle vignette darkening corners

PARTICLE FIELD:
- Hundreds of micro-particles, each 1-4px in size
- Varied opacity: most at 5-15%, a few accent particles at 30%
- Slight size variation with depth (larger = closer)
- Distribution: sparse in center, denser toward edges
- Colors: mix of pure white, soft purple (#c77dff), and pale pink (#e0aaff)
- Some particles have tiny 1px glow halo

DISTANT GEOMETRY:
- 4-6 very small geometric shapes positioned ONLY in outer 20% margins
- Extremely low opacity (10-20%)
- Heavily blurred (gaussian 20-40px)
- Suggest presence without demanding attention
- Like seeing shapes through frosted glass in peripheral vision

DEPTH LAYERS (back to front):
1. Solid dark gradient base
2. Very faint nebula-like color variations (organic, cloudy)
3. Distant blurred geometric shapes
4. Mid-ground subtle dust/particles
5. Foreground slightly larger particles (still tiny)

MOTION SUGGESTION: Particles should look like they're frozen mid-drift, not static, slight directional bias (upper-left to lower-right) implying gentle current

WHAT TO AVOID:
- Any element that draws the eye
- Bright spots or high contrast areas
- Patterns that create visual rhythm competing with text
- Anything in the center third
- Sharp edges anywhere
```

---

## 4. Download Page Variant Comparison

**File:** `public/download-variants.png`
**Dimensions:** 1400 x 400px
**Purpose:** Visual metaphor for LevitateOS (comprehensive) vs AcornOS (minimal)

```
[BASE BRAND DNA - WITH INTENTIONAL VARIATION BETWEEN HALVES]

COMPOSITION:
- Clean vertical divide at center (can be soft gradient blend, not hard line)
- Each half tells its own story while sharing visual language
- Horizontal format emphasizes the comparison/choice aspect

═══════════════════════════════════════════════════════════════════
LEFT HALF: LEVITATEOS (glibc / systemd / GNU)
═══════════════════════════════════════════════════════════════════

CONCEPT: Comprehensive ecosystem, everything you need, interconnected power

COLOR TEMPERATURE: Warmer purples, hint of magenta warmth
- Background: (#0f0818)
- Accent glow: (#bd4dee) - warmer pink-purple
- Rim lights: (#ff6b9d) - subtle magenta kiss on edges

GEOMETRIC ARRANGEMENT:
- 8-12 shapes of varying sizes in loose constellation
- Shapes are CONNECTED: thin luminous threads/lines between some (like dependency graph or constellation lines)
- Mix of shape types: octahedrons, prisms, small cubes, one larger central dodecahedron as anchor
- Cluster suggests "complete toolkit" - many parts working together
- Shapes overlap in z-depth, some partially occluding others
- Denser arrangement but not cluttered - organized complexity

SPECIFIC SHAPES:
- Central: Large dodecahedron (12-faced) - represents systemd as comprehensive init
- Orbiting: 3 medium octahedrons connected to center
- Scattered: 5-6 smaller varied polyhedra filling space
- Detail: Tiny cube fragments suggesting extensibility

ENERGY: Active, interconnected, the shapes seem to be in communication, slight pulsing implied in the connection lines

═══════════════════════════════════════════════════════════════════
RIGHT HALF: ACORNOS (musl / OpenRC / busybox)
═══════════════════════════════════════════════════════════════════

CONCEPT: Intentional minimalism, lean and fast, seed of potential

COLOR TEMPERATURE: Cooler, more blue in the purple
- Background: (#080810)
- Accent glow: (#7b68ee) - cooler blue-purple
- Rim lights: (#4cc9f0) - hint of cyan/ice

GEOMETRIC ARRANGEMENT:
- Only 3-4 shapes total, generous negative space between
- NO connection lines - each shape is independent, self-sufficient
- More negative space than positive space
- Shapes are sharper, more defined edges (representing clarity/simplicity)
- Arranged with intentional breathing room - minimalist gallery placement

SPECIFIC SHAPES:
- Hero: One ACORN-INSPIRED geometric form - an elongated shape, wider at bottom tapering to point at top, faceted like a crystal but silhouette suggests acorn/seed
- Supporting: 2 small perfect octahedrons, one above-left, one below-right of hero
- Optional: One tiny cube fragment, emphasizing "just what you need"

ENERGY: Calm, potential energy rather than kinetic, the acorn hasn't sprouted yet but contains everything needed, stillness with purpose

═══════════════════════════════════════════════════════════════════
CENTER TRANSITION
═══════════════════════════════════════════════════════════════════

- Soft gradient blend over ~100px width, not hard edge
- A subtle vertical beam of lighter purple (#1a1025) as divider
- Maybe one tiny particle caught in the transition zone, belonging to neither side
- The transition should feel like a choice point, not a wall
```

---

## Implementation Checklist

### File Placement
```
public/
├── og-image.png           # CRITICAL - social sharing
├── 404-illustration.png   # HIGH VALUE - brand personality
├── hero-bg.png           # MEDIUM VALUE - atmosphere
└── download-variants.png  # MEDIUM VALUE - visual storytelling
```

### Technical Requirements
- [ ] All files run through compression (pngquant, optipng)
- [ ] Generate WebP versions for modern browsers
- [ ] OG image: test on Twitter Card Validator, LinkedIn Post Inspector, Discord preview
- [ ] 404 illustration: export with transparency
- [ ] Hero background: test with actual text overlay, ensure readability
- [ ] Download variants: test at mobile widths

### Color Reference
| Name | Hex | Usage |
|------|-----|-------|
| Void Black | #0a0612 | Base background |
| Deep Purple | #1a1025 | Lighter background areas |
| Crystal Core | #9d4edd | Inner glow of shapes |
| Rim Light Primary | #7b2cbf | Main edge lighting |
| Rim Light Secondary | #3c096c | Fill lighting |
| Warm Accent | #bd4dee | LevitateOS side |
| Cool Accent | #7b68ee | AcornOS side |
| Pure White | #ffffff | Text, brightest highlights |
| Muted Silver | #a0a0a0 | Secondary text |
