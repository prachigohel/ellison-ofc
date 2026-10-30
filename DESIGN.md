# Ellison Oil Field Services: Website Design System & Blueprint

Single-page marketing site for **Ellison Oil Field Services Pvt. Ltd.** (gas compression, by-product recovery, dew point conditioning).
Stack: **Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · GSAP + ScrollTrigger · Lenis · Canvas 2D**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

---

## 1. Visual direction

| Principle | Execution |
|---|---|
| **Premium dark industrial** | Matte near-black canvas (`#0A0C10`) with two alternating section tones (`ink` / `ink-2`) so sections read as separate plates without hard borders. |
| **Engineering precision** | 64px blueprint grid texture, mono "instrument" labels (`01 / SOLUTIONS`, `EQ-03`, `P 210 bar`), 1px hairline borders, tabular numerals. |
| **Energy as light** | Cyan is the "live gas" colour, used only for things that flow, glow or are active. Amber marks heat, liquids and by-products. Blue marks the low-pressure, cold side. |
| **Restraint** | One accent per element. Glows are reserved for primary CTAs, active process nodes and hovered card borders. |

---

## 2. Colour palette

Defined as Tailwind v4 theme tokens in [app/globals.css](app/globals.css) (`bg-ink`, `text-cyan`, `border-line`, …).

| Token | HEX | Role |
|---|---|---|
| `ink` | `#0A0C10` | Page background |
| `ink-2` | `#0E1116` | Alternate section background, diagram wells |
| `surface` | `#12161D` | Cards, form panel |
| `surface-2` | `#181D26` | Hovered card cells, pipe tracks |
| `line` | `#232935` | Hairline borders, dividers |
| `line-2` | `#313949` | Stronger borders, inactive nodes |
| `fg` | `#E8ECF2` | Primary text |
| `muted` | `#8A93A3` | Body copy |
| `dim` | `#5B6474` | Labels, metadata |
| `cyan` | `#22D3EE` | **Primary accent**: CTAs, active state, gas flow, focus |
| `blue` | `#2F7BFF` | Secondary accent: low-pressure side, gradient partner |
| `amber` | `#FFB020` | Heat, NGL/condensate, by-product highlights |
| `ok` | `#3DDC97` | Live/running status dots, success messages |
| `danger` | `#FF5C7A` | Form validation errors only |

**Signature gradient** (`.text-gradient`): `linear-gradient(100deg, #22D3EE → #2F7BFF → #8FB6FF)`. Used on 1–2 keywords per headline.
**Process gradient**: `blue → cyan → amber` (intake → compressed → conditioned/liquids).

---

## 3. Typography

| Role | Typeface | Usage |
|---|---|---|
| Display | **Space Grotesk** 500/600 | Headlines, card titles, counters. Tight tracking (`-0.03em`), leading `~1.0`. |
| Body | **Inter** 400/500 | Paragraphs, UI text, nav. |
| Technical | **JetBrains Mono** 400/500 | Eyebrows, specs, readouts, tags. Uppercase, `0.2–0.25em` tracking, 10–11px. |

Loaded via `next/font/google` in [app/layout.tsx](app/layout.tsx) (self-hosted, no layout shift).

**Type scale (fluid)**

| Element | Size |
|---|---|
| Hero H1 | `clamp(2.5rem, 5.4vw, 5rem)` |
| Section H2 | `clamp(2rem, 4–4.4vw, 3.6–4rem)` |
| Card H3 | `1.5–1.75rem` |
| Body | `1rem` (hero lede `1.125rem`) |
| Mono labels | `10–11px` |

---

## 4. Page architecture

```
<Navbar/>            fixed · blur on scroll · hides on fast scroll-down
<main>
  <Hero/>            100svh · canvas gas flow · split-text H1 · telemetry gauge · 4 counters
  <Marquee/>         capability ticker
  <About/>     #about       01 · statement + 3 gauges + 3 pillars
  <Solutions/> #solutions   02 · GSAP pinned horizontal scroll, 3 service cards
  <ProcessFlow/> #technology 03 · 300vh sticky, scroll-scrubbed 4-stage pipeline
  <Equipment/> #operations  04 · 6-card equipment grid + standards strip
  <Contact/>   #contact     05 · details + custom form
</main>
<Footer/>            link columns · oversized outlined wordmark
```

### Component breakdown

```
app/
  layout.tsx            fonts, metadata, <SmoothScroll>
  page.tsx              section composition
  globals.css           tokens, keyframes, .glow-card, diagram play-state rules
  icon.svg              favicon
lib/
  content.ts            ALL copy & data (services, steps, equipment, metrics)
components/
  providers/SmoothScroll.tsx   Lenis ↔ GSAP ticker ↔ ScrollTrigger sync, anchor routing
  canvas/GasFlowCanvas.tsx     particle streamlines, cursor swirl, offscreen pause
  diagrams/ServiceDiagram.tsx  animated SVG schematics (compression/separator/dew point)
  diagrams/EquipmentIcon.tsx   line-art equipment schematics
  ui/MagneticButton.tsx        spring-follow CTA (primary / ghost)
  ui/SplitText.tsx             word-masked reveal, gradient keyword highlight
  ui/Reveal.tsx                fade-rise on view
  ui/Counter.tsx               count-up on view
  ui/GlowCard.tsx              cursor-tracked glowing border
  ui/Gauge.tsx                 SVG pressure gauge with needle overshoot + idle jitter
  ui/SectionLabel.tsx          "02 —— CORE SOLUTIONS" eyebrow
  ui/Logo.tsx                  placeholder hex-vessel mark + wordmark
  sections/*                   Navbar, Hero, Marquee, About, Solutions, ProcessFlow,
                               Equipment, Contact, Footer
```

---

## 5. Layout blueprints

Container: `max-w-7xl` (1280px), gutters `24px` mobile / `40px` desktop. Section padding `py-28 md:py-36`.

**Hero**
```
┌──────────────────────────────────────────────────────────────┐
│ [logo]      About Solutions Technology Operations Contact [CTA]│  ← floating blur pill
│                                                              │
│  ● GAS PROCESSING & ENERGY SOLUTIONS · AHMEDABAD             │
│  Engineering High-Efficiency Gas                ┌──────────┐ │
│  Compression & By-Product                       │ TRAIN A ●│ │
│  Recovery                                       │  (gauge) │ │
│  lede paragraph                                 │ 212 bar  │ │
│  [Request Consultation →] [Explore Solutions]   │FLOW  HCDP│ │
│                                                 └──────────┘ │
│ ~~~~~~~~~ canvas: wide low-P streams → tight HP jet ~~~~~~~~ │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│ 99.8%        │ 250 bar      │ Zero         │ 24/7            │
│ Recovery Eff.│ Compression  │ Leakage Std. │ Telemetry       │
└──────────────┴──────────────┴──────────────┴─────────────────┘
```

**Solutions (desktop pin, ≥1024px)**
```
 pinned viewport ─────────────────────────────────────────────►  scroll = horizontal travel
┌────────────┬──────────────────┬──────────────────┬──────────────────┐
│ 02 SOLUTIONS│ ┌──schematic───┐ │ ┌──schematic───┐ │ ┌──schematic───┐ │
│ Three       │ │ LP▢ MP▢ HP▢ ◔│ │ │ ⊂══separator═⊃│ │ │ coil ╲__ temp │ │
│ systems.    │ ├──────────────┤ │ ├──────────────┤ │ ├──────────────┤ │
│ One value   │ │01/03  title  │ │ │02/03  title  │ │ │03/03  title  │ │
│ chain.      │ │ spec│spec    │ │ │ spec│spec    │ │ │ spec│spec    │ │
│ Scroll →    │ │ — points     │ │ │ — points     │ │ │ — points     │ │
└────────────┴──────────────────┴──────────────────┴──────────────────┘
 ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ progress bar (scaleX = scroll progress)
```
Mobile: same cards stacked vertically, diagrams autoplay (`@media (hover:none)`).

**Process Flow (300vh, sticky 100vh)**
```
 03 PROCESS TECHNOLOGY                               ┌PRESSURE┐┌TEMP ┐
 From raw field gas to pipeline-grade energy.        │ 207 bar││6.7°C│
                                                     └────────┘└─────┘
 ══(01)════════(02)════════(03)════════(04)══   pipe fills with scroll
  Intake     Processing   Dew Point    Output
 ┌────────────────────────────────────────────────────────────────┐
 │ 04  Output & Distribution · Marketable Gas            P 210 bar│
 │     description (AnimatePresence swap per stage)      T 30 °C  │
 └────────────────────────────────────────────────────────────────┘
```

**Equipment**: 3×2 grid (`lg`), 2-col (`sm`), 1-col mobile. Card: tag pill · EQ-id · schematic well · title · body · mono spec rows. Standards pill strip below.

**About**: 2 columns: statement + paragraph + 3-gauge "Operations Snapshot" | 3 stacked pillar cards.

**Contact**: 2 columns: headline, email (large link), address + Maps link | form panel (floating-label inputs, service chips, magnetic submit).

---

## 6. Motion & interaction spec

| Interaction | Implementation | Timing |
|---|---|---|
| Inertia scroll | Lenis `duration 1.15`, expo-out easing, driven by `gsap.ticker` | Global |
| Anchor nav | Click delegation → `lenis.scrollTo(target, { offset: -72 })` | — |
| Headline reveal | `SplitText`: each word masked, `y: 110% → 0` | 0.9s, stagger 50ms, `cubic-bezier(.16,1,.3,1)` |
| Section reveal | `Reveal`: `opacity 0→1, y 28→0`, once, 8% margin | 0.9s |
| Magnetic CTA | Pointer offset × 0.35 → spring (k220, d16); label × 0.4 extra | Spring |
| Card glow | `--mx/--my` CSS vars → radial-gradient masked to 1px border + inner wash | Instant |
| Service diagrams | CSS keyframes paused; `.group:hover` → `running` | 1–2.4s loops |
| Horizontal pin | GSAP ScrollTrigger `pin`, `scrub: 1`, `x: -(scrollWidth − vw)`; desktop + motion-OK only via `gsap.matchMedia` | Scroll-linked |
| Process pipe | `useScroll` → spring → `scaleX`; stage index = `floor(progress × 4)`; readouts via `useTransform` | Scroll-linked |
| Counters / gauges | `useInView` once → `animate()`; gauge needle overshoots then idles ±1.4° | 2–2.2s |
| Hero canvas | ~400 particles on 9 converging streamlines; trails via alpha fill; cursor radial push + swirl (R=140px); paused off-screen | 60fps |
| Navbar | Transparent → blurred pill after 24px; hides on scroll-down past 600px, returns on scroll-up | 0.45s |

**Accessibility**: `prefers-reduced-motion` disables Lenis, the horizontal pin, CSS loops and renders one static canvas frame. Split headlines expose the full sentence via `aria-label`. Form fields are real `<label>`s; service chips use `aria-pressed`.

---

## 7. Content & placeholders: verify before launch

All copy lives in [lib/content.ts](lib/content.ts).

- **Technical figures** (pressures, throughput, `99.8%`, power ratings, HCDP targets) are illustrative placeholders. Engineering must confirm them.
- **Standards strip** (`API 618`, `PESO`, `OISD`, `ISO …`) is labelled "Design & safety references". Keep only codes Ellison actually designs or certifies to.
- **Logo** is a placeholder mark ([components/ui/Logo.tsx](components/ui/Logo.tsx)) and `app/icon.svg`.
- **Contact form** currently opens a pre-filled `mailto:` to `eofspl10@gmail.com`. For server-side delivery, add a Route Handler (`app/api/contact/route.ts`) with Resend/Nodemailer or a form service, and swap `onSubmit` in [components/sections/Contact.tsx](components/sections/Contact.tsx).
- **Photography**: none used. If real site/equipment photos become available, they slot into the equipment card "schematic well" (`h-36`) and an About-section media panel.

## 8. Possible extensions

- Swap `GasFlowCanvas` for a React Three Fiber scene (instanced particles + 3D compressor skid model) behind the same component boundary.
- Per-service detail pages (`app/solutions/[slug]`) generated from `services` in `content.ts`.
- Case-study section with before/after flare-reduction metrics.
