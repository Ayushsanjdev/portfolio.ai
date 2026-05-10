# Handoff: Ayush Sanj — Frontend Engineer Portfolio (Next.js)

## Overview
A maximalist, kinetic, awwwards-level personal portfolio for **Ayush Sanj** — frontend engineer based in Bangalore (4 yoe). Single long-scroll landing page with 10 sections: WebGL shader hero, selected work, about, skills, experience timeline, writing, lab, now, testimonials, contact. Heavy on motion: custom cursor, magnetic links, scroll reveals, follow-cursor project preview, page-load curtain, marquees, kinetic type, and a konami easter egg.

## About the Design Files
The files in this bundle (`reference/Portfolio.html`, `reference/styles/`, `reference/js/`) are **design references created in HTML** — a working prototype showing the intended look, motion, and behavior. They are **not production code to copy directly**.

Your task is to **recreate this design in a fresh Next.js 15 codebase** (App Router, TypeScript, Tailwind 4) using best-in-class animation libraries (GSAP, Framer Motion, Lenis, @react-three/fiber). Treat the HTML files as the spec — match the visual rhythm, motion timings, and interaction details, but write idiomatic React + Next.js with proper component boundaries, accessibility, and SSR/CSR seams.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, motion curves, and interaction states are all decided. Aim for pixel-fidelity to the HTML reference. Use the exact tokens listed under **Design Tokens** below.

---

## Recommended Stack

| Concern | Library | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router, RSC where possible) | Streaming, route transitions, edge ready |
| Lang | **TypeScript** strict | |
| Styling | **Tailwind CSS v4** + a `globals.css` for design tokens | tokens as CSS vars |
| Smooth scroll | **Lenis** (`lenis` / `@studio-freight/lenis`) | drives every scroll-linked animation |
| Scroll-driven motion | **GSAP** + **ScrollTrigger** | for marquees, masked text reveals, pinning |
| Component motion | **Framer Motion** | enter/exit, layout, gestures |
| 3D / shaders | **@react-three/fiber** + **@react-three/drei** + **three** + raw GLSL | hero shader |
| Cursor | custom hook driven by `requestAnimationFrame` | matches reference 0.18 lerp |
| Type | next/font/google: `Instrument Serif`, `Space Grotesk`, `JetBrains Mono` (+ optional pairings) | self-host, no FOUT |
| Icons | inline SVGs only | match reference |
| State | React `useState` / Zustand for tweaks if needed | |
| Theme | `next-themes` or `data-theme` on `<html>` | dark + palette |

```bash
npx create-next-app@latest ayush-portfolio --typescript --tailwind --app --src-dir --eslint
cd ayush-portfolio
pnpm add gsap lenis framer-motion three @react-three/fiber @react-three/drei
pnpm add -D @types/three
```

---

## File / Component Structure

```
src/
├── app/
│   ├── layout.tsx              # fonts, <ThemeProvider>, <SmoothScroll>, <Cursor>
│   ├── page.tsx                # composes all sections in order
│   ├── globals.css             # design tokens, base styles, keyframes
│   └── opengraph-image.tsx     # social card
├── components/
│   ├── chrome/
│   │   ├── Cursor.tsx          # custom cursor (ring + dot + label)
│   │   ├── Nav.tsx             # fixed top nav, mix-blend-difference
│   │   ├── Curtain.tsx         # 4-panel page-load reveal
│   │   ├── SmoothScroll.tsx    # Lenis provider
│   │   └── EasterEgg.tsx       # konami listener + ASCII overlay
│   ├── sections/
│   │   ├── Hero.tsx            # type + meta + marquee + scroll cue
│   │   ├── HeroShader.tsx      # R3F canvas with FRAG_WARP/BLOBS/GRID
│   │   ├── Work.tsx            # rows / grid / stack layouts
│   │   ├── WorkPreview.tsx     # follow-cursor preview card
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Timeline.tsx
│   │   ├── Writing.tsx
│   │   ├── Lab.tsx
│   │   ├── Now.tsx             # live IST clock
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx         # magnetic CTA
│   │   └── Footer.tsx          # marquee + meta
│   ├── primitives/
│   │   ├── Magnetic.tsx        # wraps any element; lerps toward cursor
│   │   ├── MaskReveal.tsx      # masked-line text reveal on scroll
│   │   ├── Marquee.tsx         # CSS-anim marquee, motion-multiplier aware
│   │   └── Reveal.tsx          # opacity+Y reveal w/ IntersectionObserver
│   └── tweaks/
│       ├── TweaksPanel.tsx     # floating panel UI (optional in prod)
│       └── useTweaks.ts        # zustand store w/ localStorage
├── shaders/
│   ├── warp.frag.glsl          # domain-warped fbm color noise
│   ├── blobs.frag.glsl         # metaball-ish color blobs
│   ├── grid.frag.glsl          # synthwave perspective grid
│   └── plane.vert.glsl
├── data/
│   ├── projects.ts
│   ├── timeline.ts
│   ├── skills.ts
│   ├── writing.ts
│   ├── testimonials.ts
│   └── palettes.ts
└── hooks/
    ├── useMagnetic.ts
    ├── useReveal.ts
    └── useLiveTime.ts          # IST clock
```

**Render strategy:** the page can be a Server Component, but every section that needs motion or refs must be a Client Component (`"use client"`). Hero, Cursor, Curtain, SmoothScroll, Now (live clock) are all client. Static text content (testimonials, writing list, timeline) can be passed as props from the RSC into client wrappers.

---

## Design Tokens

Drop these into `globals.css` as CSS variables, then map them into Tailwind via `@theme` (Tailwind 4):

### Colors — palette "Voltage" (default)
| Token | Value |
|---|---|
| `--bg` | `#F2EFE7` |
| `--ink` | `#0D0D0B` |
| `--ink-2` | `#1B1B17` |
| `--muted` | `rgba(13,13,11,0.55)` |
| `--rule` | `rgba(13,13,11,0.14)` |
| `--rule-strong` | `rgba(13,13,11,0.32)` |
| `--c-cobalt` (accent-1) | `#2540F2` |
| `--c-lime` (accent-2) | `#D4FF3D` |
| `--c-coral` (accent-3) | `#FF4A1F` |
| `--c-plum` | `#6B2EFF` |
| `--c-peach` | `#FFB199` |

### Palette "Inkwell" (dark variant)
- `--bg #0B0B0A`, `--ink #F2EFE7`, accents: `#D4FF3D`, `#3A3A36`, `#F2EFE7`

### Palette "Sunburn"
- `--bg #FFEFE2`, `--ink #1B0F0A`, accents: `#FF7A4A`, `#FFD479`, `#6B2EFF`

### Typography
- **Display**: `Instrument Serif`, italic frequently, `letter-spacing: -0.02em`, `line-height: 0.86–0.95`
- **UI**: `Space Grotesk` 400/500/600/700
- **Mono**: `JetBrains Mono`, mostly uppercase + `letter-spacing: 0.10–0.14em` for metadata
- Optional pairings: Editorial (`DM Serif Display` × `Inter Tight` × `IBM Plex Mono`); Brutal (`Bricolage Grotesque` solo)
- Hero headline: `clamp(72px, 17vw, 280px)`
- Section H2: `clamp(48px, 7vw, 112px)`
- Project name: `clamp(36px, 5vw, 72px)`
- Body large: `clamp(20px, 2.2vw, 28px)` line-height 1.4
- Mono metadata: 11–12px, uppercase

### Spacing & Layout
- Container max: `1480px`
- Gutter: `clamp(20px, 4vw, 64px)`
- Section vertical padding: `clamp(80px, 10vw, 160px)`
- Section header bottom margin: `clamp(40px, 5vw, 80px)`

### Radius / Borders
- Cards: `4–8px`
- Pills / chips: `999px`
- Hairlines: `1px solid var(--rule)`

### Motion curves
- General reveal: `cubic-bezier(.2,.7,.2,1)`, 800ms
- Mask line reveal: `cubic-bezier(.2,.8,.2,1)`, 900ms
- Hover sweep: `cubic-bezier(.7,0,.3,1)`, 500ms
- Curtain panels: `cubic-bezier(.7,0,.2,1)`, 900ms, staggered 80ms each
- Cursor lerp factor: `0.18`
- Magnetic strength: `0.35` (0.4 on big CTAs)

### Z-indexes
- Cursor: `9999`
- Curtain: `100`
- Easter egg: `80`
- Nav: `50`
- Work preview (follow-cursor): `30`

---

## Sections — Detailed Spec

### Nav (sticky, top)
- Position fixed, `mix-blend-mode: difference`, color white (so it auto-inverts over hero + light sections).
- Left: monogram SVG + `AYUSH SANJ`. Center: links (`Work`, `About`, `CV`, `Writing`, `Lab`, `Contact`) — underline expands left→right on hover (`right: 100% → 0`, 280ms). Right: green pulse dot + live IST time (updates every 30s).
- Hide center links < 880px.

### 1. Hero
- Full viewport min-height 100vh.
- **Background**: `<canvas>` (R3F) running one of three fragment shaders, picked by tweak (`warp` default).
  - **Warp** (default): domain-warped fbm noise, mouse-pull, 4-color blend (`c1 cobalt`, `c2 lime`, `c3 coral`, `c4 cream`), vignette, mouse glow.
  - **Blobs**: 6 metaball-ish blobs sin/cos drifting, mouse offset, grain.
  - **Grid**: synthwave perspective grid lines, sun radial, scanlines.
- Mouse position smoothed (lerp 0.05) before passing to shader.
- DPR clamped to `min(devicePixelRatio, 2)`.
- Above shader: SVG grain overlay (turbulence, opacity 0.18, `mix-blend-mode: overlay`) + linear-gradient bottom darken.
- Meta strip (3 cols): `// Portfolio · v3.4` | `// 12.97°N · 77.59°E · BANGALORE, IN` | `// Status · ↗ Booking Aug '26`. Mono 11px, uppercase, letter-spacing 0.14em, white at 0.85 alpha.
- Headline (4 lines, display serif on white, mix of stroke and italic):
  ```
  AYUSH
  Sanj.            ← italic, color = lime accent
  Frontend         ← -webkit-text-stroke 1.5px white, transparent fill
  Engineer*        ← italic, * in coral, normal style
  ```
- Role pills row: `React · TS`, `WebGL`, `Design Eng` (solid coral), `Node · Edge` + arrow.
- Edge-to-edge italic marquee strip below — 36s loop (`marq` keyframe `translateX 0 → -50%`), duration scaled by `1 / motion`.
- Bottom-right scroll cue: "SCROLL ↘" with bobbing chevron (1.6s ease-in-out infinite).

### 2. Selected Work `/01`
- Section header pattern (use everywhere): grid `1fr 2fr`, left = section number mono, right = display H2 (mask reveal) + lead paragraph.
- Default `rows` layout (also `grid` and `stack` variants for the Tweaks):
  - 5 rows, grid `60px 1fr auto auto` columns: `(01)` num, project name (display), tag pills, `— 2025`.
  - Hover: an `::before` pseudo with `background: var(--ink)` scales from `scaleY(0)` (origin bottom) to `scaleY(1)` (origin top) over 500ms with `cubic-bezier(.7,0,.3,1)`. Text inverts to `var(--bg)`. Project name flips to italic.
  - On enter, set `hovered` state → render a **floating preview card** (`position: fixed`, 360×240, `pointer-events: none`) that follows cursor (set left/top in mousemove). Card shows project's color background + accent-color italic name + `[ROLE • YEAR]`.
- Projects (`src/data/projects.ts`): see reference `js/projects.jsx` `PROJECTS` array (5 items: Helio Atlas, Forma Studio, Lumen DS, Verse FM, Tessera).

### 3. About `/02`
- 2-col `1.4fr 1fr`. Left: 3 paragraphs at `clamp(20px, 2.2vw, 28px)`, with selected words wrapped in `<em>` styled as italic display serif at 1.15em, colored with accent-1 / accent-3.
- Right: bordered card with `// Stats` heading + `<dl class="kv">` (Based, Years, Stack, Available, Type, Refs). Footer line about previous companies.
- Stack to 1 col < 880px.

### 4. Skills `/03`
- Top: chip cloud — 15 skills as pill chips with a tiny level meter (4px tall × 28px, scaled `--lvl` 0.6–0.95), accent color rotates across `nth-child`. Hover: invert to ink/bg.
- Bottom: 4-col 1px-rule grid (`Frontend`, `Motion & 3D`, `Systems`, `Backend-ish`), each with `// heading` + bullet list. Stack to 2 cols < 880px.

### 5. Experience Timeline `/04`
- Section heading "A short *history*." — italic in lime with a `drop-shadow(0 0 12px lime)` glow.
- Rows grid `140px 1fr 1.2fr`: year range mono · role + `@ company` (italic accent-1, flips to coral on row hover) · description mono 15px muted.
- 5 rows (Forma 2025→, Razorpay 23–25, Postman 22–23, stealth 21–22, BITS 20–21).

### 6. Writing `/05`
- 2-col 1px-grid, 4 cards. Each card hover: invert to ink/bg. Card has tag (`Essay · 12 min`), title (display 22–30px), and `Read essay →` pinned bottom.

### 7. Lab `/06`
- 3×2 grid of 1:1 square tiles. Each tile has a radial-gradient background that shifts from `30% 70%` to `70% 30%` on hover (600ms), an SVG dot pattern overlay (`mix-blend-mode: screen`), and a name like `01 / fluid type →` mix-blend-difference white.

### 8. Now `/07`
- 2-col cards. Left "// In hand": current focus + rows (Reading, Listening, **Local time** ← live updating, Coffee). Right "// Open to": capacity, geo, equity, speaking.
- Live IST clock via `useLiveTime()` updating every 1s for the in-hand card.

### 9. Testimonials `/08`
- 3-col 1px-grid. Each: `“`-prefixed display blockquote at clamp(20–24px) line-height 1.3 + mono `who` line.

### 10. Contact
- Inset card (`background: var(--ink)`, `color: var(--bg)`, 8px radius, large padding clamp(40–88px), 1080px breakpoint to stack).
- Decorative SVG dot pattern at 18% opacity in lime over the dark bg.
- Headline: "Let's *build* something ↘" — display, lime italic on "build", clamp(56px, 7.6vw, 152px), `word-break: break-word; overflow-wrap: anywhere; hyphens: auto;`.
- Right: lead paragraph, magnetic CTA pill (`hi@ayush.dev → arrow`), then 6 social links in a 2-col grid each with arrow that translates 8px right on hover.

### Footer
- Big italic display marquee (`Available August 2026 ↗ ...`) at `clamp(80px, 16vw, 220px)`, 28s loop.
- Small footer row: copyright · "Crafted in TypeScript & GLSL · v3.4" · "↑ Back to top".

---

## Interactions

### Custom cursor (`Cursor.tsx`)
- Two fixed elements (`.cursor-dot` 8px white, `.cursor-ring` 36px outline) + label.
- Both `position: fixed; pointer-events: none; z-index: 9999; mix-blend-mode: difference;`.
- Dot snaps to mouse on every mousemove. Ring lerps with factor 0.18 in a `requestAnimationFrame` loop.
- On `mouseover`, walk up to nearest `a, button, [data-cursor]`. If found:
  - Add `.is-link` (dot 0×0, ring 56×56). For inputs/contenteditable use `.is-text` (4×28 rounded line).
  - If element has `data-cursor="View case"`, render that label below the cursor (mono uppercase, mix-blend-difference).
- Hide entirely on `(hover: none)` or `< 720px`. Toggleable by Tweaks.

### Magnetic (`useMagnetic` / `<Magnetic strength={0.35}>`)
- On `mousemove` over the element, compute offset from element center × strength → animate `transform: translate(x, y)` via lerped rAF.
- Reset to 0,0 on `mouseleave`. Used on contact CTA (0.4) and could wrap nav links / buttons.

### Smooth scroll
- Lenis with `lerp: 0.1`, `wheelMultiplier: 1.0`, integrate with GSAP ScrollTrigger via `ScrollTrigger.scrollerProxy` if needed.

### Scroll reveals
- `data-reveal` attribute → IntersectionObserver (`threshold: 0.12`, `rootMargin: 0 0 -8% 0`) → adds `.in` → CSS transitions opacity (0→1) and `translateY(28px → 0)` 800ms.
- `.mask-line > span` for line-by-line text reveal (translateY 110% → 0 over 900ms). Stagger via `--rd` custom property delay.

### Page-load curtain
- 4 vertical panels of `var(--ink)` covering viewport, all `transform: scaleY(1)` origin top.
- 50ms after mount, add `.opening` → each panel transitions to `scaleY(0)` origin bottom, staggered 0/80/160/240ms, 900ms `cubic-bezier(.7,0,.2,1)`.

### Hover-fill rows (Work)
- `::before` overlay sweeps in (origin top after sweep) on hover. Body text inverts. See "Selected Work" above.

### Konami easter egg
- Listen on `keydown` for sequence: `↑↑↓↓←→←→ B A`.
- On match: full-screen overlay (`background: rgba(13,13,11,0.92)`, lime mono text), ASCII cat, "WELL FOUND.", auto-dismiss after 5500ms.

### Live IST clock
- `useLiveTime()` returns formatted `Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour12: false, hour: "2-digit", minute: "2-digit" })`. Nav updates every 30s; "Now" card updates every 1s with seconds.

### Marquee (`Marquee.tsx`)
- Two duplicated `<span>` tracks inside `.track`, animation `translateX(0) → translateX(-50%)`, duration `BASE / max(motion, 0.2)`.

---

## Tweaks Panel (optional in prod, useful for portfolio.dev demos)
Floating bottom-right glass panel exposing:
1. **Theme** — Palette radio: Voltage / Inkwell / Sunburn. Dark mode toggle.
2. **Type** — Pairing radio: Classic / Editorial / Brutal.
3. **Motion** — Intensity slider 0–2 step 0.05 (multiplies all animation durations and shader time). Cursor on/off toggle.
4. **Hero shader** — Variant radio: Warp / Blobs / Grid.
5. **Work grid** — Layout radio: Rows / Grid / Stack.
6. **Easter egg** — Trigger button.

State in a Zustand store with `persist` middleware → localStorage. Each change updates CSS variables on `:root` (palette, font family) or component state (hero variant, work layout).

---

## Accessibility
- Respect `prefers-reduced-motion: reduce` — disable cursor follow, marquees, shader animation (still render gradient frame), curtain instant, magnetic disabled.
- All interactive elements reachable by keyboard. Focus-visible rings on links/buttons (2px solid `--c-cobalt`, offset 2px).
- Color contrast on dark hero: text always on dimmed-overlay area (`linear-gradient` overlay) so `#fff` on shader passes AA.
- Live regions: nav clock has `aria-live="off"` (ambient).
- Reduce shader intensity automatically if `(prefers-reduced-motion)` or device pixel ratio × screen area suggests low-end.

---

## Performance
- Hero canvas: cap DPR at 2, pause `requestAnimationFrame` when tab hidden (`visibilitychange`).
- `loading="lazy"` for any below-fold images you add later.
- Lenis paused during page-load curtain.
- Use `next/font` to self-host all fonts; preload only Instrument Serif + Space Grotesk weights actually used above the fold.
- Code-split: lab section + tweaks panel via dynamic `next/dynamic({ ssr: false })`.

---

## Responsive Breakpoints
- `> 1080px`: full layout
- `880–1080px`: contact stacks to 1 col, contact-links 2-col
- `< 880px`: nav links hide; section headers go 1-col; about, skills-grid (→2col), timeline rows go 1-col
- `< 760px`: writing 1-col; lab 2-col; work-row collapses to 2-col with metadata wrapping
- `< 720px`: gutter to 20px; hero meta strip stacks left
- `< 560px`: contact-links 1-col
- Cursor disabled on `(hover: none)` or `< 720px`

---

## Content / Copy
All copy is in the reference files under `js/sections.jsx`, `js/projects.jsx`, and `js/app.jsx` (hero strings). Lift verbatim — it's the voice (technical & precise, lightly self-aware) and density that makes it work.

Personas: Ayush Sanj — Frontend Engineer, 4 yoe, Bangalore IN, available Aug 2026, hi@ayush.dev (placeholder).

---

## Assets
No raster assets required. Everything is SVG, CSS, or shader-generated:
- Monogram logo: inline SVG (rect + A glyph) in `Nav.tsx`.
- Grain: inline SVG turbulence data-URL.
- Lab tile patterns: inline SVG dot pattern.
- Contact bg: inline SVG dot grid.
- All shaders: GLSL strings in `src/shaders/*.glsl` (use `?raw` import or inline).

---

## Files in this Bundle
- `reference/Portfolio.html` — entry HTML (loads CSS + JSX modules)
- `reference/styles/main.css` — all design tokens + section styles
- `reference/js/app.jsx` — root composition + tweaks wiring + curtain + easter egg
- `reference/js/cursor.jsx` — Cursor + useMagnetic + useReveal
- `reference/js/hero-shader.jsx` — three GLSL fragment shaders + WebGL plumbing
- `reference/js/projects.jsx` — Work section (rows/grid/stack) + project data + follow-cursor preview
- `reference/js/sections.jsx` — About, Skills, Timeline, Writing, Lab, Now, Testimonials, Contact, Footer
- `reference/js/tweaks-panel.jsx` — TweaksPanel + useTweaks + control primitives

Open `Portfolio.html` in a browser to see the live reference. Use it as your fidelity target.

---

## Acceptance Checklist
- [ ] Hero shader renders on all three variants and is interactive with mouse
- [ ] Custom cursor lerps, morphs over links, shows label, hides on touch
- [ ] All scroll reveals + masked-line text reveals fire once on enter
- [ ] Work rows hover-fill sweep + cursor-following preview card
- [ ] Magnetic CTA on contact lerps toward cursor
- [ ] Curtain plays on first load, never re-plays on client-side nav within page
- [ ] Konami egg works
- [ ] Live IST clock updates in nav (30s) and Now card (1s)
- [ ] Lighthouse ≥ 95 perf, 100 a11y on desktop with shader at default intensity
- [ ] `prefers-reduced-motion` disables shader animation, marquees, curtain, cursor lerp
- [ ] Responsive: nothing overflows at any width 320 → 2560
- [ ] Tweaks panel (if shipped) persists to localStorage

Happy shipping. — design notes by Claude
