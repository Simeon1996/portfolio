# Portfolio Projects Grid & Testimonials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the collapsed projects accordion with an always-visible 3-column card grid showing all 16 projects (renumbered 01–16), and add an auto-scrolling testimonials marquee after it.

**Architecture:** All changes are presentational and live in two files. `components/PortfolioClient.tsx` (a client component) gets new module-level `ProjectCard` and `TestimonialCard` components, a `TESTIMONIALS` data array, a renumbered `PROJECTS` array, the new grid + marquee sections, and small nav/observer updates. `app/globals.css` gets the marquee keyframes and a `prefers-reduced-motion` guard. Thumbnails and live URLs are derived from the existing `PROJECT_DETAILS` map in `lib/projects.ts` (imported, not modified).

**Tech Stack:** Next.js 14, React 18, framer-motion, TypeScript, plain CSS (CSS custom-property theme tokens).

**Testing note:** This project has **no unit-test harness** (`package.json` defines only `dev`/`build`/`start`/`lint`). Per-task verification is therefore `npm run lint` + `npm run build` (Next's build type-checks) plus a visual checklist run via `npm run dev`. Adding a test framework is out of scope for this change.

**Pre-flight:** `components/PortfolioClient.tsx` changed on disk earlier this session (commit `953ceed`). Re-read it before editing so your `old_string` matches.

---

### Task 1: Import `PROJECT_DETAILS`, renumber projects, add testimonial data

**Files:**
- Modify: `components/PortfolioClient.tsx`

- [ ] **Step 1: Add the `PROJECT_DETAILS` import**

After the existing import block (the line `import ThemeToggle from './ThemeToggle'`), add:

```tsx
import { PROJECT_DETAILS } from '@/lib/projects'
```

- [ ] **Step 2: Renumber the four projects with gapped indexes**

In the `PROJECTS` array, change these four `index` values (slugs are unchanged). Only these four lines change; `01`–`12` stay as-is.

`cookingintelligence`: `index: '14',` → `index: '13',`
`botversehub`: `index: '16',` → `index: '14',`
`ai-detector`: `index: '17',` → `index: '15',`
`freelance`: `index: '18',` → `index: '16',`

- [ ] **Step 3: Add the `TESTIMONIALS` data array**

Immediately AFTER the closing `]` of the `PROJECTS` array (the line that is just `]`), insert:

```tsx

// TODO: replace these placeholder quotes with real ones (general praise, not project-specific)
const TESTIMONIALS = [
  { quote: 'Simeon shipped faster than our whole team expected, and the architecture still holds up a year later.', name: 'Client Name', role: 'CTO', company: 'Company' },
  { quote: 'Rare to find someone equally strong across AI, backend, and infrastructure. He just makes hard things work.', name: 'Client Name', role: 'Founder', company: 'Startup' },
  { quote: 'Clear communicator, zero hand-holding, and the quality bar never dropped under deadline.', name: 'Client Name', role: 'Head of Engineering', company: 'Scale-up' },
  { quote: 'He turned a vague idea into a production system in weeks. I would hire him again without hesitation.', name: 'Client Name', role: 'Product Lead', company: 'Agency' },
]
```

- [ ] **Step 4: Verify it still builds**

Run: `npm run build`
Expected: build succeeds (the new array/import are unused so far — that is fine; module-level consts do not trigger `no-unused-vars`).

- [ ] **Step 5: Commit**

```bash
git add components/PortfolioClient.tsx
git commit -m "feat(projects): renumber projects 01-16 and add testimonial data"
```

---

### Task 2: Add `ProjectCard` and `TestimonialCard` components

**Files:**
- Modify: `components/PortfolioClient.tsx`

- [ ] **Step 1: Add both components after `SectionTopLine`**

Find the `SectionTopLine` function. Immediately after its closing `}` (and before the `interface Post {...}` line), insert both components below. They use the module-level `C`, `mono`, `Pill`, the imported `Link` and `PROJECT_DETAILS`, and `useState` (already imported).

```tsx
function ProjectCard({ p }: { p: typeof PROJECTS[number] }) {
  const [hover, setHover] = useState(false)
  const [imgError, setImgError] = useState(false)
  const detail = PROJECT_DETAILS[p.slug]
  const thumb = detail?.images?.[0]?.src
  const live = detail?.preview
  const exploreHref = p.project ?? `/projects/${p.slug}`
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: C.card, border: `1px solid ${hover ? 'rgba(var(--cyan-rgb),.35)' : C.border}`, boxShadow: hover ? '0 0 24px rgba(var(--cyan-rgb),.12)' : 'none', overflow: 'hidden', position: 'relative', transition: 'border-color .3s, box-shadow .3s' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,${C.cyan},transparent)`, opacity: hover ? .6 : .3, zIndex: 3 }} />
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', background: 'linear-gradient(150deg,var(--card),var(--surface) 60%,var(--card))' }}>
        <span style={{ position: 'absolute', top: 0, left: 0, width: 16, height: 16, borderTop: `2px solid ${C.cyan}`, borderLeft: `2px solid ${C.cyan}`, zIndex: 2 }} />
        <span style={{ position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, borderBottom: `2px solid ${C.pink}`, borderRight: `2px solid ${C.pink}`, zIndex: 2 }} />
        {thumb && !imgError ? (
          <img src={thumb} alt={p.title} loading="lazy" onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transform: hover ? 'scale(1.04)' : 'scale(1)', transition: 'transform .4s ease' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted, fontFamily: mono, fontSize: 10, letterSpacing: 2 }}>NO PREVIEW</div>
        )}
        <span style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: C.cyan, background: 'rgba(var(--bg-rgb),.7)', border: `1px solid rgba(var(--cyan-rgb),.3)`, padding: '3px 7px' }}>{p.index}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 18, flex: 1 }}>
        <h3 style={{ margin: 0, fontFamily: mono, fontSize: 15, fontWeight: 700, letterSpacing: .5, color: hover ? C.cyan : C.text, transition: 'color .2s' }}>{p.title}</h3>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 300, color: C.muted2, lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.stack.slice(0, 4).map(t => <Pill key={t} label={t} />)}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 6 }}>
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', padding: '8px 14px', background: C.cyan, color: '#001016', boxShadow: '0 0 16px rgba(var(--cyan-rgb),.3)' }}>Live ↗</a>
          )}
          <Link href={exploreHref}
            style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', padding: '8px 14px', border: `1px solid rgba(var(--pink-rgb),.28)`, color: C.pink }}>Explore →</Link>
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[number] }) {
  return (
    <div style={{ flex: '0 0 330px', width: 330, background: C.card, border: `1px solid ${C.border}`, padding: '26px 24px 22px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,${C.cyan},transparent)`, opacity: .5 }} />
      <div style={{ fontFamily: mono, fontSize: 54, lineHeight: .6, color: C.cyan, opacity: .18, height: 24 }}>&ldquo;</div>
      <p style={{ fontSize: 13, fontWeight: 300, color: C.muted2, lineHeight: 1.8, margin: '6px 0 20px' }}>{t.quote}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
        <div style={{ width: 38, height: 38, flex: '0 0 38px', border: `1px solid ${C.cyan}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontWeight: 700, color: C.cyan, background: 'rgba(var(--cyan-rgb),.06)', fontSize: 14 }}>{t.name.charAt(0)}</div>
        <div>
          <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, letterSpacing: .5, color: C.text }}>{t.name}</div>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: C.muted, marginTop: 3 }}>{t.role} · {t.company}</div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify it still builds**

Run: `npm run build`
Expected: build succeeds. The components are still unused (rendered in Tasks 4–5); that is fine for module-level functions.

- [ ] **Step 3: Commit**

```bash
git add components/PortfolioClient.tsx
git commit -m "feat(projects): add ProjectCard and TestimonialCard components"
```

---

### Task 3: Add marquee styles to global CSS

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append the marquee styles at the end of the file**

Add to the very end of `app/globals.css`:

```css

/* ── Testimonials marquee ── */
.testi-marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}
.testi-track {
  display: flex;
  gap: 16px;
  width: max-content;
  padding: 4px 16px;
  animation: testi-scroll 40s linear infinite;
}
.testi-marquee:hover .testi-track {
  animation-play-state: paused;
}
@keyframes testi-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .testi-track { animation: none; }
  .testi-marquee { overflow-x: auto; }
}

/* ── Projects card grid ── */
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: stretch;
}
@media (max-width: 1100px) {
  .project-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .project-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Verify it still builds**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(projects): add marquee + project-grid styles with reduced-motion guard"
```

---

### Task 4: Replace the projects accordion with the card grid

**Files:**
- Modify: `components/PortfolioClient.tsx`

- [ ] **Step 1: Remove the now-unused list state**

Delete these two lines from the top of the `PortfolioClient` component body:

```tsx
  const [hoveredRow, setHoveredRow]       = useState<string | null>(null)
  const [projectsOpen, setProjectsOpen]   = useState(false)
```

- [ ] **Step 2: Replace the entire PROJECTS `<section>`**

Replace the whole projects section — from the line `{/* ════════════════════════════════════` that precedes `PROJECTS` (the comment banner above `<section id="projects" ...>`) through that section's closing `</section>` — with:

```tsx
      {/* ════════════════════════════════════
          PROJECTS
      ════════════════════════════════════ */}
      <section id="projects" style={{ padding: `${sectionVerticalPad}px ${horizontalPad}px`, borderTop: `1px solid ${C.border}`, position: 'relative' }}>
        <SectionTopLine />
        <motion.div variants={staggerVariant} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={revealVariant} style={{ display: 'flex', alignItems: isPhone ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isPhone ? 'column' : 'row', gap: isPhone ? 10 : 0, marginBottom: isPhone ? 28 : 44 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isPhone ? 12 : 20 }}>
              <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.cyan, opacity: .6 }}>03</span>
              <span style={{ fontFamily: mono, fontSize: isPhone ? 20 : 24, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>Portfolio</span>
            </div>
            <span style={{ fontSize: 10, letterSpacing: 2, color: C.muted }}>{`${PROJECTS.length} projects`}</span>
          </motion.div>

          <div className="project-grid">
            {PROJECTS.map(p => (
              <motion.div key={p.slug} variants={revealVariant} style={{ display: 'flex' }}>
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
```

- [ ] **Step 3: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: both succeed with no errors. (If lint complains about an unused `Link` or `AnimatePresence`, do not remove those imports — `Link` is used by `ProjectCard`/blog and `AnimatePresence` is used by the mobile nav and services panel.)

- [ ] **Step 4: Commit**

```bash
git add components/PortfolioClient.tsx
git commit -m "feat(projects): replace collapsed accordion with always-visible 3-col card grid"
```

---

### Task 5: Insert the testimonials section + nav/observer/blog updates

**Files:**
- Modify: `components/PortfolioClient.tsx`

- [ ] **Step 1: Add `testimonials` to the IntersectionObserver ids**

Change:

```tsx
    const ids = ['home','about','projects','services','blog']
```

to:

```tsx
    const ids = ['home','about','projects','services','testimonials','blog']
```

- [ ] **Step 2: Add the testimonials link to the desktop nav**

Change the desktop nav array (the one inside `{!isCompact && (` ):

```tsx
            {[['about', 'about'],['projects', 'portfolio'],['services', 'services'],['blog', 'blog']].map(([id, label]) => (
```

to:

```tsx
            {[['about', 'about'],['projects', 'portfolio'],['services', 'services'],['testimonials', 'testimonials'],['blog', 'blog']].map(([id, label]) => (
```

- [ ] **Step 3: Add the testimonials link to the mobile nav**

Change the mobile nav array (inside the `isCompact && mobileNavOpen` panel) — identical literal — the same way:

```tsx
            {[['about', 'about'],['projects', 'portfolio'],['services', 'services'],['blog', 'blog']].map(([id, label]) => (
```

to:

```tsx
            {[['about', 'about'],['projects', 'portfolio'],['services', 'services'],['testimonials', 'testimonials'],['blog', 'blog']].map(([id, label]) => (
```

> Note: the two nav arrays are byte-identical. Use an editor that replaces the first occurrence for Step 2 and the second for Step 3, or replace both occurrences (they need the same change).

- [ ] **Step 4: Insert the testimonials `<section>` before the BLOG section**

Directly BEFORE the blog comment banner (the `{/* ════…  BLOG  ════ */}` block that precedes `<section id="blog" ...>`), insert:

```tsx
      {/* ════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════ */}
      <section id="testimonials" style={{ padding: `${sectionVerticalPad}px 0`, borderTop: `1px solid ${C.border}`, background: C.surface, position: 'relative', overflow: 'hidden' }}>
        <SectionTopLine color={C.pink} />
        <motion.div variants={staggerVariant} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={revealVariant} style={{ display: 'flex', alignItems: 'center', gap: isPhone ? 12 : 20, marginBottom: isPhone ? 28 : 44, padding: `0 ${horizontalPad}px` }}>
            <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.cyan, opacity: .6 }}>04</span>
            <span style={{ fontFamily: mono, fontSize: isPhone ? 20 : 24, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>Testimonials</span>
          </motion.div>
          {TESTIMONIALS.length > 0 && (
            <motion.div variants={revealVariant} className="testi-marquee">
              <div className="testi-track">
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => <TestimonialCard key={i} t={t} />)}
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

```

- [ ] **Step 5: Renumber the BLOG section label `04` → `05`**

In the blog section header, change the decorative number span. The blog header currently contains `>04<` next to a `Writing` label. Change:

```tsx
              <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.cyan, opacity: .6 }}>04</span>
              <span style={{ fontFamily: mono, fontSize: isPhone ? 20 : 24, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>Writing</span>
```

to (only the `04` becomes `05`):

```tsx
              <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.cyan, opacity: .6 }}>05</span>
              <span style={{ fontFamily: mono, fontSize: isPhone ? 20 : 24, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>Writing</span>
```

- [ ] **Step 6: Verify lint + build**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 7: Commit**

```bash
git add components/PortfolioClient.tsx
git commit -m "feat(testimonials): add marquee section, nav link, observer id; bump blog to 05"
```

---

### Task 6: Visual verification

**Files:** none (manual verification)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Open `http://localhost:3000`.

- [ ] **Step 2: Walk the visual checklist**

Confirm each, in both dark and light themes (toggle in the nav):

- Projects section shows **all 16 cards** in a grid, visible on load — no "click to expand" chip, no toggle.
- Desktop shows 3 columns; narrow the window to confirm 2 columns < 1100px and 1 column < 768px.
- Each card shows a screenshot thumbnail, an index chip reading `01`–`16` (no gaps, no `13`/`15` missing), title, description (max 3 lines), up to 4 stack pills, and an `Explore →` button.
- The four projects with live links — Cheatsheet, QuizzYourself, CookingIntelligence, Freelance Android — also show a cyan `Live ↗` button that opens the correct external URL in a new tab.
- A **Testimonials** section appears after Portfolio and before Writing, with cards scrolling horizontally; hovering pauses the scroll.
- The nav (desktop and mobile menu) includes a `testimonials` link that scrolls to the section and highlights when active.
- The Writing/blog section header now reads `05`.

- [ ] **Step 3: Verify reduced-motion**

In Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce". Reload. Confirm the testimonials marquee no longer auto-scrolls and can be scrolled horizontally by hand (content stays readable).

- [ ] **Step 4: Final confirmation**

Run: `npm run build`
Expected: clean production build. Implementation complete.
