# Bundle Builder — Wyze-style "Build Your Security System"

A single-page, two-column experience for assembling a home-security bundle:

- **Left — the builder:** a 4-step accordion (Cameras → Plan → Sensors → Extra
  protection) with product cards (badge, image, variants, quantity stepper,
  pricing).
- **Right — the review panel ("Your security system"):** a live summary grouped
  by category with per-line steppers, shipping, guarantee seal, financing line,
  total, savings callout, Checkout, and "Save my system for later".

Built with **Vite + React + TypeScript** and **Tailwind CSS v4**.

**Live demo:** https://bundle-builder-wine.vercel.app/

---

## Run it locally

Requirements: **Node 18+** (developed on Node 22) and npm.

```bash
# 1. install dependencies
npm install

# 2. start the dev server (http://localhost:5173)
npm run dev
```

Then open the URL Vite prints (default **http://localhost:5173**).

A clean clone + `npm install` + `npm run dev` (or `npm run build`) is all that's
needed — there is no backend and no environment configuration.

---

## Notes on the implementation vs. the Figma

A few places intentionally differ from the Figma, with reasons:

- **Font.** The design uses **Gilroy**, which is a paid font and isn't available
  for free from Google Fonts, so it couldn't be used legitimately. I substituted
  **Manrope** (the closest free match). Real Gilroy can be dropped in later via
  `@font-face` with no other changes.
- **Empty steps.** Only **Step 1 (Cameras)** has its content designed in the
  Figma; steps 2–4 (Plan, Sensors, Extra protection) have no card content in the
  provided design, so I left them as empty placeholders rather than inventing UI.
- **Responsive type sizes.** The Figma reuses the **same (large) font sizes on
  mobile**, and the initial title sizes are already quite big — at phone widths
  that overflows/looks oversized. I used **rem-based sizing and scale the root
  font-size down on small screens**, so the whole UI shrinks proportionally and
  stays readable. This is a deliberate deviation to keep mobile usable.
- **Minor design inconsistencies kept as-is.** The design has a few small
  inconsistencies (e.g. some text that reads like it should be bold/highlighted
  but isn't). I generally followed the design as given rather than "fixing" it.
- **Not pixel-perfect — and that's intentional.** I matched the design closely
  but didn't chase exact pixel parity. Colors and sizes were eyeballed from
  screenshots (no exported Figma tokens), so some values are approximations. As
  this isn't a paid engagement, I prioritized a faithful, working result over
  spending excessive time on pixel-perfection.
