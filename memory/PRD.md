# Northstar — Interactive 3D AI Agent Landing Page

## Original Problem Statement
Highly interactive 3D landing page for an AI agent app. Hero: a friendly, soft-shaded
companion robot physically pinned to scroll position — rotates, tilts, and shifts poses
in real time tied to scroll progress (scroll-scrubbed). Scroll sequence: Hero → Modes
(Study/Code/Late Night Talk/General with holographic icons + color light wash) → Memory
(orbiting glowing fragments / neural recall) → CTA ("Start Talking"). Dark near-black
(#0a0a0f) with neon violet (#8b5cf6), cyan (#22d3ee), hot pink (#ec4899) glow/rim-light,
soft bloom, drifting starfield, parallax depth.

## User Choices
- Procedurally-built Three.js robot (no external model).
- Frontend-only — NO backend, NO AI chat, NO auth wiring.
- Brand name: **Northstar**. Headline corrected to "...every time you talk to it."

## Architecture (implemented)
- **Stack**: React 19 + CRA/craco. Three.js via @react-three/fiber v9 + drei v10 +
  @react-three/postprocessing (Bloom). Lenis (momentum scroll). framer-motion (reveals +
  scroll-linked overlays). react-fast-marquee.
- **Scroll sync**: single 900vh scroll driver. `useLenis` writes normalized progress (0..1)
  to both `scrollState.progress` (read by 3D `useFrame`) and a framer `progressMV` MotionValue
  (drives DOM overlay cross-fades) — guarantees the 3D scene and DOM sections stay in lockstep.
- **3D**: `Robot.jsx` (capsule body, sphere head, glowing eyes/antenna/chest-core, soft
  additive radial glow), `Scene.jsx` (light rig with per-section color wash, camera pan/zoom
  rig, drifting Stars), `Experience.jsx` (Canvas + Bloom).
- **DOM overlays** (fixed, cross-fading by scroll range): Nav, Hero (masked line reveal),
  4 Mode panels, Memory (orbiting fragments), Manifesto (numbered chapters + marquee), CTA.
- Fonts: Outfit (display) + JetBrains Mono (labels).

## Implemented (2026-07-15)
- Full scroll-scrubbed 3D robot experience end-to-end.
- Hero with on-load masked line-by-line headline reveal + gradient accent line.
- Modes: Study (blue/book), Code (green/terminal), Late Night (purple/moon),
  General (white/orbit) — robot rotates/tilts + light wash + camera move per mode.
- Memory: bright tinted chest core + orbiting glowing memory-fragment snippets.
- Manifesto (01/02/03) + editorial marquee "NORTHSTAR — ALWAYS LEARNING".
- CTA: camera pull-back + pulsing gradient "Start Talking" button.
- Bloom post-processing, aurora gradient backdrop, grain overlay, scroll progress rail.
- Lenis-powered nav links + brand. Verified: testing agent 100% frontend, 0 console errors.

## Backlog / Next
- P1: Add a real "Start Talking" AI chat demo (backend + LLM) if desired later.
- P2: Reduced-motion fallback (static robot pose) for accessibility.
- P2: Mobile-tuned camera distances + smaller robot framing.
- P2: Sound design / audio-reactive eye pulse toggle.
