# Agent Instructions for Ayush Sanj Portfolio Project

## Project Overview
This is a design handoff for a high-fidelity personal portfolio website. The HTML/JS/CSS files in `reference/` are a working prototype/spec — **not production code**. Recreate this design in Next.js 15 (App Router, TypeScript, Tailwind 4) matching pixel-perfect visuals and motion timings.

See [README.md](README.md) for detailed stack recommendations, component structure, and implementation guidance.

## Key Conventions
- **Design Tokens**: All colors, fonts, spacing locked in CSS custom properties in `globals.css`. Do not override with Tailwind utilities.
- **Motion Multiplier**: All animations scale with `var(--motion)` (0.2–2.0). Use `calc(duration / max(var(--motion), 0.2))`.
- **Cursor Implementation**: Custom cursor with 0.18 lerp via `requestAnimationFrame` — not CSS transitions. Ring follows dot smoothly.
- **Marquee Pattern**: Duplicate content inline for seamless loops. Duration scales with motion multiplier.
- **Responsive Spacing**: Use `clamp()` for fluid scaling across viewports.
- **Blend Modes**: Test `mix-blend-mode: difference` on all backgrounds/palettes.
- **SSR/CSR Split**: Static content as RSC props; motion/refs as Client Components.

## Build and Run
Follow the setup in [README.md](README.md#recommended-stack). Use `npx create-next-app@latest` with the specified flags, then add dependencies.

## Architecture Decisions
- 10-section single-scroll page with Lenis smooth scroll.
- GSAP ScrollTrigger for scroll-linked animations.
- Framer Motion for component transitions.
- @react-three/fiber for WebGL hero shaders.
- Zustand for optional tweaks panel (dev tool).

## Common Pitfalls
- Cursor feels sluggish if using CSS transitions instead of RAF lerp.
- Marquee stutters without inline content duplication.
- Palette switching fails on SSR without `useEffect`.
- Mobile cursor visible on touch devices — hide with `@media (hover: none)`.
- Lenis + GSAP integration requires proper setup for ScrollTrigger.

## Key Files
- `reference/Portfolio.html`: Visual and motion spec.
- `js/cursor.jsx`: Cursor implementation reference.
- `js/hero-shader.jsx`: Shader variants.
- `styles/main.css`: Design tokens and animations.

Always reference the HTML spec for fidelity. Write idiomatic React/Next.js, not direct copies.