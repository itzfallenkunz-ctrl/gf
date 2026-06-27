# 🥛 Greenfields — Fresh Dairy Brand Experience

A scroll-driven storytelling website for a fictional premium dairy brand, built around a custom canvas-based image-sequence renderer instead of a video file — giving full control over playback, sharpness, and scroll-sync without the bandwidth cost or stutter of `<video>` scrubbing.

**Video Demo:** _..._
**Live Demo:** _https://gf-fc81zptei-kazuisme.vercel.app/_
**GitHub Repo:** _https://github.com/itzfallenkunz-ctrl/gf.git_

#### CS50 Final Project
This is my final project for **CS50x**, by **Muhammad Fadhil Ganjar Aghisni**, **Bogor, 2026**.

---

## 📖 Overview

Most "scroll-tells-a-story" landing pages either embed a heavy `.mp4` and scrub it with `currentTime`, or rely on a SaaS animation plugin. Both have real costs: video scrubbing is choppy on Safari/iOS, and most scroll-animation libraries don't let you touch individual frames.

This project solves that by treating the hero section as a **sequence of 240 still frames**, drawn to an HTML `<canvas>` and advanced frame-by-frame as the user scrolls — the same technique Apple uses on its product pages, rebuilt from scratch in React.

Everything below the hero (about, product range, stats, testimonials, CTA, footer) is a normal marketing site, but each section has its own scroll-triggered motion, built to feel cohesive with the hero rather than bolted on.

## 🎬 What It Does

| Section | File | What's actually happening |
|---|---|---|
| Preloader | `Preloader.tsx` | Loads all 240 frames into memory **before** anything renders, tracking real load progress (not a fake timer) via per-image `onload`/`onerror`, animated as a filling milk-droplet SVG |
| Hero sequence | `SequenceScroll.tsx` | Maps scroll progress (0–1) to a frame index (0–191) using Framer Motion's `useScroll`/`useTransform`, draws the active frame to canvas with a "cover" crop, and samples a pixel from the frame to drive a smoothly-transitioning background color |
| Smooth scroll | `LenisProvider.tsx` | Wraps the whole app in Lenis so scroll-linked animations stay buttery instead of jittering on trackpad/wheel input |
| Story reveal | `AboutSection.tsx` | Splits a paragraph into individual characters and fades each one in based on its own slice of scroll progress — a per-character scrub, not a single fade |
| Product range | `BentoCards.tsx` | Bento-style grid, staggered `whileInView` reveal |
| Impact stats | `StatsSection.tsx` | Numbers count up from 0 only once they scroll into view, using a Framer Motion `motionValue` rather than a `setInterval` |
| Testimonials | `TestimonialSection.tsx` | Auto-advancing carousel with manual prev/next override and direction-aware transitions |
| Navbar | `Navbar.tsx` | Transparent-to-solid on scroll, mobile drawer that calls `lenis.stop()`/`lenis.start()` so the page can't scroll behind an open menu |
| CTA | `CtaSection.tsx` | Looping animated SVG wave background, magnetic-hover button |

## 🛠️ Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | File-based routing, React Server Components where it matters, zero-config builds |
| UI library | React 18 | `use client` boundary is used deliberately — every component that touches scroll position, canvas, or browser APIs is client-rendered |
| Language | TypeScript | Props for every component are typed; no `any` outside one unavoidable `window.lenis` escape hatch |
| Styling | Tailwind CSS v4 | Utility-first, no separate CSS files to keep in sync with markup |
| Animation | Framer Motion | `useScroll`, `useTransform`, `useMotionValueEvent`, `useInView` — used for *scroll-derived* state, not just `animate()` presets |
| Smooth scroll | Lenis | Normalizes scroll behavior across browsers so frame-stepping in the canvas stays in sync with the scrollbar |
| Icons | Lucide React | Lightweight, tree-shakeable |

## 📁 Project Structure

```
gf-main/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Composes all sections; gates rendering until preload completes
│   │   ├── layout.tsx        # Root layout, fonts, <LenisProvider> wrapper
│   │   └── globals.css       # Tailwind entry + CSS custom properties (e.g. --sequence-bg)
│   └── components/
│       ├── Preloader.tsx
│       ├── SequenceScroll.tsx
│       ├── LenisProvider.tsx
│       ├── Navbar.tsx
│       ├── AboutSection.tsx
│       ├── BentoCards.tsx
│       ├── StatsSection.tsx
│       ├── TestimonialSection.tsx
│       ├── CtaSection.tsx
│       └── Footer.tsx
├── public/
│   ├── sequences/             # 192 JPEG frames (ezgif-frame-001.jpg … 192.jpg)
│   └── assets/                # Product/brand imagery
└── package.json
```

## 🤔 Design Decisions

**Why a canvas image sequence instead of a video file?**
`<video>` scrubbing via `currentTime` is unreliable across browsers (especially Safari/iOS, which throttles seeking), and you can't easily sample pixel data from a video element for the dynamic background-color effect. Discrete JPEG frames drawn to canvas give exact, glitch-free control over which frame is shown at any scroll position, at the cost of more HTTP requests — which is why the preloader exists.

**Why preload everything up front instead of lazily?**
Lazy-loading frames during scroll causes visible pop-in/blank frames the instant the user scrolls faster than the network can deliver. Preloading trades a one-time wait (with honest progress feedback) for a guaranteed-smooth scroll experience afterward.

**Why Lenis instead of native scroll?**
Framer Motion's `useScroll` reads the native scrollbar position. Native wheel/trackpad scroll is inherently jittery in short bursts, which translated directly into jittery frame-stepping. Lenis intercepts scroll input and applies inertia/easing, so the *position* `useScroll` reads is already smoothed.

**Why is there no backend?**
This iteration is intentionally frontend-only to focus on the scroll-rendering engineering. The clearest next step (see Roadmap) is to make the testimonials, product range, and contact form dynamic via a real database instead of hardcoded arrays.

## 🚧 Known Limitations & Roadmap

This project is deliberately scoped as a frontend rendering exercise. Honest limitations, and what I'd build next:

- [ ] **No backend/database** — testimonials, products, and stats are hardcoded arrays in each component. Next step: Next.js API routes + SQLite/Postgres so content is editable without redeploying.
- [ ] **No real contact/lead capture** — the CTA button doesn't submit anywhere yet.
- [ ] **No automated tests** — would add component tests for `SequenceScroll`'s frame-index math and `Preloader`'s load-completion logic, since those are the parts with actual conditional logic.
- [ ] **No accessibility audit yet** — canvas-based content needs an `aria-label`/fallback description for screen readers; reduced-motion users currently still get the full animation set.
- [ ] **Next.js 14.2.3 has a known security advisory** — the project currently pins this version; upgrading to the latest 14.x patch is a straightforward next step.

## 🚀 Getting Started

```bash
git clone <your-repo-url>
cd gf-main
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

## 🤖 Use of AI Tools
During development, I used Gemini, Claude, and Ezgif to:

Gemini: Generate assets, including product photos via Google Whisk and animation videos via Google Flow.
Ezgif: Convert video assets into sequence of PNG frames at 30 FPS for the scroll-animation.
Claude: Diagnosed and fixed build-breaking errors (missing dependencies in `package.json`, TypeScript strict-mode typing errors, JSX/syntax errors), debugged code, fixed typos, refined project structure, and mapped out the project's logic for the README mindmap.

I personally orchestrated the overall production workflow, which included conceptualizing the asset pipeline from generating animations via Google Flow and product photos via Google Whisk, down to manually processing the videos into 30 FPS PNG sequences using Ezgif. I also oversaw the entire frontend assembly, directed the debugging and code refinement process, and mapped out the project's logic and architecture. I can walk through and explain any part of this codebase.

## 👤 Author

**Muhammad Fadhil Ganjar Aghisni**
[CS50 username: Fadhil_learning / GitHub: https://github.com/itzfallenkunz-ctrl / portfolio: -]

## 📄 License

MIT — see [LICENSE](./LICENSE).
