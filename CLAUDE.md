# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Commands

```bash
npm run dev      # start Next.js dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint via next lint
```

No test suite is configured.

## Architecture

Single long-scroll landing page (Next.js 15 App Router). `src/app/page.tsx` is a Server Component that imports all 11 sections in order; the layout wraps them in `SmoothScroll` (Lenis) with `Cursor`, `Nav`, `Curtain`, and `EasterEgg` as chrome.

**Component layers:**
- `components/chrome/` — full-page persistent UI (cursor, nav, curtain, smooth scroll, konami egg)
- `components/sections/` — each page section as its own Client Component
- `components/primitives/` — reusable animation wrappers (`Magnetic`, `Marquee`, `MaskReveal`, `Reveal`)
- `src/data/` — static typed data arrays (projects, timeline, skills, writing, testimonials, palettes)
- `src/hooks/` — `useMagnetic`, `useReveal`, `useLiveTime` (IST clock)
- `src/shaders/` — raw GLSL for the R3F hero canvas (warp/blobs/grid variants)

**Render boundary rule:** `page.tsx` and static data sections can be RSC; anything touching refs, GSAP, Lenis, or browser APIs must be `"use client"`.

## Design Token System

All design tokens live as CSS custom properties in `src/app/globals.css` under `:root`. Tailwind 4's `@theme` block re-exports them as Tailwind color/font utilities. **Do not override tokens with raw Tailwind utilities** — always use the CSS vars or the mapped Tailwind classes (e.g. `bg-bg`, `text-ink`, `text-c-cobalt`).

Key vars: `--bg`, `--ink`, `--muted`, `--rule`, `--c-cobalt`, `--c-lime`, `--c-coral`, `--gutter`, `--max`, `--motion`.

## Motion Conventions

- **`--motion` multiplier** (default `1`, range 0.2–2.0): all animation durations must scale with it via `calc(Xms / max(var(--motion), 0.2))`.
- **Cursor** uses `requestAnimationFrame` + `lerp(factor: 0.18)` — never CSS transitions for the follow effect.
- **Marquee** requires duplicated content inline (two `<span>` tracks) so `translateX(0 → -50%)` loops seamlessly.
- **`data-reveal`** attribute + `.in` class drives scroll reveals via `IntersectionObserver` in `useReveal`. CSS handles the actual transition.
- **`prefers-reduced-motion`**: `globals.css` collapses all durations to 1ms and force-shows hidden reveals — don't add motion that bypasses this.

## SSR / Hydration Pitfalls

- Palette/theme switching that touches `document` or CSS vars must be inside `useEffect` (fails on SSR otherwise).
- `useLiveTime` and anything reading `window` must be in a Client Component.
- Lab section and TweaksPanel are code-split via `next/dynamic({ ssr: false })`.

## Hero Shader

`HeroShader.tsx` renders an R3F `<Canvas>` filling the hero background. Three GLSL fragment shader variants (warp/blobs/grid) in `src/shaders/*.glsl` are imported with `?raw`. Mouse position is smoothed with lerp `0.05` before being passed as a uniform. DPR is clamped to `min(devicePixelRatio, 2)`. The canvas RAF loop pauses on `visibilitychange`.

## Z-index Stack

| Layer | Value |
|---|---|
| Cursor | 9999 |
| Curtain | 100 |
| Easter egg | 80 |
| Nav | 50 |
| Work preview (follow-cursor) | 30 |

## Responsive Breakpoints

`880px` — nav links hidden, section headers go 1-col, about/timeline stack  
`760px` — writing/now go 1-col, lab goes 2-col  
`720px` — gutter collapses to 20px, cursor disabled  
`560px` — contact-links, skills-grid, lab-grid go 1-col  
`1080px` — contact section stacks to 1-col
