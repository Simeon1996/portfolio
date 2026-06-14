# Portfolio — Categorized Spotlight Layout

**Date:** 2026-06-14
**Status:** Design — pending user approval

## Context

The projects were just rebuilt as an always-visible 3-column card grid (commits
`990aa96`, `38ebe28`, `f1f43d8`). The user finds that grid **too dense** (16 cards is a
wall) and **too generic** (a card grid doesn't match the site's bold cyberpunk identity).

This spec replaces that grid with an **interactive spotlight**: a category-grouped list on
the left drives a large single-project preview on the right — showing one project at a
time, and reusing the same split-screen interaction the **Services** section already uses
so the site reads as one coherent design.

## Scope

In scope:
1. Replace the project card grid with a categorized spotlight (list + preview panel).
2. Group all 16 projects into 5 categories.
3. Remove the now-dead grid code (`ProjectCard`, `.project-grid`).

Out of scope:
- Testimonials, nav, blog, and all other sections — unchanged.
- Project copy/metrics and the real/concept question — unchanged (per earlier decisions).
- `PROJECT_DETAILS` in `lib/projects.ts` — imported, not modified.

## Locked decisions (from brainstorm)

- **Layout:** Direction A — Spotlight. Left rail (project list) + right preview panel.
  One project in focus at a time. Mirrors the Services split-screen.
- **Categories (ordered), with project slugs:**
  1. **AI Web Apps** — `quizforge`, `cookingintelligence`, `ai-detector`, `botversehub`
  2. **AI Engineering & Platforms** — `rag`, `email-rag`, `langchain-platform`, `mcp-platform`, `saas`, `resume`, `style`
  3. **DevOps & Cloud** — `agent`, `devops`
  4. **Web / Full-Stack** — `cheatsheet`, `freelance`
  5. **Mobile** — `android-freelance`
- **Default selection:** first project of the first category (`quizforge` / QuizzYourself).
- **Numbering:** a flat index `01`–`16` following the category display order, shown on each
  rail row and as a faint watermark in the panel.

## Design

### Data (`components/PortfolioClient.tsx`)

- Add a `category` field to each `PROJECTS` item (one of the five category labels).
- Add an ordered `CATEGORY_ORDER: string[]` constant listing the five labels in display
  order.
- The rail is rendered by iterating `CATEGORY_ORDER`, and within each category iterating
  the `PROJECTS` whose `category` matches, in array order. A flat counter assigns the
  `01`–`16` display index. (The existing per-item `index` field is no longer read by the
  spotlight; leave it in place to minimize churn.)

### Component: spotlight (replaces the grid section)

Built with the existing toolkit (framer-motion `AnimatePresence`, `revealVariant`,
`EASE`, `Pill`, `C`, `mono`) and inline styles, matching the Services section.

State: `const [activeSlug, setActiveSlug] = useState(<first display slug>)`.

**Left rail** (`flex: 0 0` ~300px on desktop):
- For each category: a header row — small pink uppercase mono label + count + a thin
  gradient rule (rendered as an explicit element, not a CSS pseudo) — followed by its
  project rows.
- Each **row** is a focusable `<button>` (keyboard-accessible): index · title · optional
  `LIVE` badge (shown when `PROJECT_DETAILS[slug].preview` exists). Active row gets the
  cyan left-bar + tint treatment from the mockup; hover mirrors it faintly.
- `onClick`/`onFocus` (click only) sets `activeSlug`.
- Rail scrolls within a capped height on desktop so the panel stays in view.

**Right panel** (`flex: 1`):
- `AnimatePresence mode="wait"` swaps content on `activeSlug` change (fade + small slide,
  reusing the Services panel transition).
- Content for the active project: large screenshot (`PROJECT_DETAILS[slug].images[0].src`,
  16:9, cyan/pink corner accents + faux browser chrome, `onError` → gradient fallback) ·
  category tagline · title (`PROJECT_DETAILS[slug].title` or `PROJECTS.title`) · full
  description · stack pills · `Live ↗` (filled cyan, `preview`, new tab — only when present)
  + `Explore →` (pink outline → `p.project ?? /projects/{slug}`) · faint index watermark.

### Responsive

- **Desktop (`!isCompact`):** two-column split (`~300px 1fr`), as mocked.
- **Phone/compact:** stack vertically (rail on top, panel below), mirroring the Services
  section's `flexDirection: column`. Tapping a row updates the panel below it and smooth-
  scrolls the panel into view.

### Cleanup

- Remove the `ProjectCard` component (no longer used). `TestimonialCard` stays.
- Remove the `.project-grid` rules from `app/globals.css` (no longer used). The
  `.testi-*` marquee styles stay.

## Files touched

- `components/PortfolioClient.tsx` — add `category` to `PROJECTS` + `CATEGORY_ORDER`;
  replace the grid section with the spotlight (rail + panel + `activeSlug` state); remove
  `ProjectCard`.
- `app/globals.css` — remove `.project-grid` rules.
- `lib/projects.ts` — **no change** (imported for `preview`, `images`, `title`).

## Edge cases

- Project without `preview` → no `Live ↗` button.
- Missing/broken thumbnail → gradient placeholder (existing pattern).
- A category with zero matching projects → its header is skipped (guard, though all five
  are populated).
- `prefers-reduced-motion` → the panel-swap animation is reduced to a plain cross-fade
  (no slide).
- Mobile → single column; rail above, panel below.

## Verification

1. `npm run build` succeeds (use a dummy `RESEND_API_KEY`, as `/api/contact` instantiates
   Resend at module load — a pre-existing, unrelated constraint).
2. Rendered HTML contains all five category headers, all 16 project titles, and the
   default panel (QuizzYourself) with a `Live ↗` link to its real URL.
3. Clicking each category's projects swaps the preview; `Live ↗` shows only on the 4
   projects with live URLs and opens the correct external links.
4. Light and dark themes both correct (CSS-variable tokens only).
5. Mobile viewport: rail stacks above the panel; tapping a project updates it.
6. No remaining references to `ProjectCard` or `.project-grid`.
