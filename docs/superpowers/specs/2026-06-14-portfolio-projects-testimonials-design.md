# Portfolio — Projects Grid, Numbering & Testimonials

**Date:** 2026-06-14
**Status:** Design — pending user approval (revised)

## Context

Evaluation of the portfolio surfaced three credibility/engagement gaps. This spec
covers the three the user chose to act on first:

- **Point 3 — Credibility:** dead links + inconsistent project numbering.
- **Point 4 — Social proof:** no testimonials anywhere.
- **Point 5 — Projects hidden:** the entire portfolio loads collapsed behind a
  "click to expand" chip, hiding the single most important content.

## Scope

In scope:
1. **Project numbering** — renumber sequentially to close the `13`/`15` gaps.
2. **Testimonials section** — new, general (not project-specific) praise, marquee layout, placeholder content.
3. **Projects restructure** — every project shown on load as a card grid; no accordion, no toggle.

Out of scope (explicitly):
- The fake `github.com` links — **already removed** in commit `953ceed`; they were never rendered. No work remaining.
- Any change to project descriptions or metrics (user chose "links + numbering only").
- Relabeling projects as real/concept (user declined the authenticity pass).
- All other evaluation items (fonts, next/image, broader a11y, social links, etc.) — separate future work.

## Locked decisions (from brainstorm)

- **All 16 projects** render as cards. No featured/non-featured split, no "show all"
  toggle, no collapse — the grid is **always visible on load**.
- **Card = Option A "Showcase":** screenshot on top, content below.
- **Layout = 3-column grid** (rows of three). Responsive: 3 columns desktop → 2 tablet
  → 1 mobile.
- **Numbering:** data renumbered `01`–`16` (closes the gap); a small index chip shows on
  each card. (User may opt to drop numbers entirely.)
- **Testimonials = Option B marquee:** horizontally auto-scrolling quote cards, pause on
  hover, respect `prefers-reduced-motion`. Placeholder quotes, clearly marked.
- **Placement:** Testimonials section sits **after Portfolio, before Blog**.

## Design

### A. Projects grid (`components/PortfolioClient.tsx`)

Replace the collapsible list (the `projectsOpen` state, the expand chip, the
`AnimatePresence` height animation, and the two-column list rows) with a static card grid.

**Data.** Each card derives its thumbnail and optional live URL from the existing
`PROJECT_DETAILS` map (`lib/projects.ts`):
- thumbnail → `PROJECT_DETAILS[slug].images[0].src` (all 16 have images; fall back to the
  existing gradient placeholder if ever missing)
- live URL → `PROJECT_DETAILS[slug].preview` (present for 4 of 16)

No duplication of image/URL data; `lib/projects.ts` is imported, not changed.

**Grid.** CSS grid, 3 columns desktop / 2 tablet / 1 mobile, `1px` gaps over `C.border`
to match the existing section seams. Renders all 16 `PROJECTS` in array order.

**Card (Showcase layout).** Thumbnail (16:10, cyan/pink corner accents reusing the
photo-frame motif) · small index chip (`01`–`16`) · title · one-line description · up to
4 stack pills · action row:
- `Live ↗` (filled cyan, opens `preview` in a new tab) — **only when `preview` exists**.
- `Explore →` (pink outline) → `/projects/{slug}` (or the project's existing `project` href).

Hover keeps the existing accent treatment (top gradient line + left bar) adapted to the card.

### B. Renumbering (Point 3)

Reassign each `PROJECTS[i].index` to `String(i+1).padStart(2,'0')` in array order →
`01`–`16`, no gaps. Shown as the per-card index chip.

### C. Testimonials section (new)

**Data.** New `TESTIMONIALS` array of `{ quote, name, role, company }`, seeded with
3–4 clearly-marked placeholder entries and a `// TODO: replace with real quotes` comment.

**Component.** A marquee:
- Two copies of the testimonial list in a flex track, animated with a CSS keyframe
  (`translateX(0 → -50%)`) for a seamless loop. Edge fade via `mask-image`.
- `:hover` pauses the animation.
- Each card: decorative quote mark · quote text · divider · avatar initial (bordered
  box) · name (mono) · role · company.
- Section header `04 · TESTIMONIALS` (pink accent line, matching Services/Blog).

**Surrounding changes:**
- Insert `<section id="testimonials">` between Projects and Blog → Testimonials becomes
  section `04`, Blog becomes `05`.
- Renumber the **Blog** section's decorative label `04` → `05`.
- Add `testimonials` to the `IntersectionObserver` id list and a `testimonials` link to
  both the desktop and mobile nav.

**Accessibility / motion.** The marquee keyframe lives in `globals.css`; a
`@media (prefers-reduced-motion: reduce)` block disables the animation and lets the
track wrap/scroll statically so the content stays readable. (This is the only motion
guard in this scope; the broader reduced-motion pass remains future work.)

## Files touched

- `components/PortfolioClient.tsx` — `PROJECTS` (renumber), remove `projectsOpen`/accordion, new card-grid JSX, new `TESTIMONIALS` data + section, nav link, blog label `04`→`05`, observer id.
- `app/globals.css` — marquee keyframes, edge-fade, hover-pause, reduced-motion guard.
- `lib/projects.ts` — **no change** (imported for `preview` + `images`).

> Implementation note: `PortfolioClient.tsx` changed on disk this session (commit
> `953ceed`). Re-read it fresh before editing — cached views may be stale.

## Edge cases

- Project without a `preview` → card omits the `Live ↗` button, shows only `Explore →`.
- Missing thumbnail → fall back to the existing gradient placeholder treatment.
- Reduced motion → marquee static, fully readable.
- Empty `TESTIMONIALS` → section renders nothing (guard like the blog's empty state).
- Mobile → grid collapses to a single column; marquee cards full-width.

## Verification

1. `npm run build` succeeds.
2. All 16 project cards show in a 3-column grid on load (no toggle, no collapse); `Live ↗`
   appears on the 4 with live URLs and opens the correct external links in a new tab.
3. Card index chips read `01`–`16` with no gaps.
4. Testimonials marquee scrolls, pauses on hover, and renders static under
   `prefers-reduced-motion: reduce` (toggle via DevTools rendering emulation).
5. Light and dark themes both look correct (CSS-variable tokens only).
6. Mobile viewport: single-column cards and full-width testimonial cards.
