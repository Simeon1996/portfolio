# Categorized Spotlight Projects Layout — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the projects card grid with an interactive, category-grouped spotlight — a left rail of projects that drives a single large preview panel — reusing the Services split-screen interaction.

**Architecture:** All changes are in `components/PortfolioClient.tsx` plus a small CSS deletion in `app/globals.css`. Two new module-level components (`SpotlightShot`, `ProjectSpotlight`) replace the old `ProjectCard`. An ordered `CATEGORIES` list plus derived lookup maps group the 16 projects; the spotlight derives thumbnails/live URLs from the existing `PROJECT_DETAILS` map (imported, unmodified). `ProjectSpotlight` owns its own `activeSlug` selection state.

**Tech Stack:** Next.js 14, React 18, framer-motion (`AnimatePresence`, `useReducedMotion`), TypeScript, inline-style theming via CSS custom properties.

**Testing note:** No unit-test harness exists (`package.json` has only `dev`/`build`/`start`/`lint`, and `next lint` is unconfigured/interactive). Verification = `npm run build` (type-checks + compiles; use a dummy `RESEND_API_KEY` because `/api/contact` instantiates Resend at module load) + a rendered-HTML smoke test.

**Pre-flight:** Anchors below were read fresh at plan time. If an `old_string` fails to match, re-read the region before retrying.

---

### Task 1: Imports + category data structures

**Files:** Modify `components/PortfolioClient.tsx`

- [ ] **Step 1: Add `useRef` to the React import**

Change line 3:

```tsx
import { useState, useEffect } from 'react'
```
to:
```tsx
import { useState, useEffect, useRef } from 'react'
```

- [ ] **Step 2: Add `useReducedMotion` to the framer-motion import**

Change line 4:

```tsx
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
```
to:
```tsx
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
```

- [ ] **Step 3: Add category data after the `PROJECTS` array**

The `PROJECTS` array ends with the `freelance` project followed by `]`. Find that closing `]` (the line immediately after the `freelance` block's `},`). Insert the following immediately AFTER that `]`:

```tsx

// Ordered project categories for the spotlight rail. Edit membership here.
const CATEGORIES: { label: string; slugs: string[] }[] = [
  { label: 'AI Web Apps', slugs: ['quizforge', 'cookingintelligence', 'ai-detector', 'botversehub'] },
  { label: 'AI Engineering & Platforms', slugs: ['rag', 'email-rag', 'langchain-platform', 'mcp-platform', 'saas', 'resume', 'style'] },
  { label: 'DevOps & Cloud', slugs: ['agent', 'devops'] },
  { label: 'Web / Full-Stack', slugs: ['cheatsheet', 'freelance'] },
  { label: 'Mobile', slugs: ['android-freelance'] },
]
const PROJECT_BY_SLUG: Record<string, typeof PROJECTS[number]> = Object.fromEntries(PROJECTS.map(p => [p.slug, p]))
const FLAT_SLUGS: string[] = CATEGORIES.flatMap(c => c.slugs)
const DISPLAY_NUM = new Map(FLAT_SLUGS.map((s, i) => [s, String(i + 1).padStart(2, '0')]))
const CATEGORY_OF = new Map(CATEGORIES.flatMap(c => c.slugs.map(s => [s, c.label] as [string, string])))
```

> Sanity check: every slug in `CATEGORIES` must exist in `PROJECTS` (16 total: quizforge, cookingintelligence, ai-detector, botversehub, rag, email-rag, langchain-platform, mcp-platform, saas, resume, style, agent, devops, cheatsheet, freelance, android-freelance).

- [ ] **Step 4: Verify build**

Run: `RESEND_API_KEY=re_dummy_build_only npm run build`
Expected: `✓ Compiled successfully` and a full route table. (New consts are unused so far — fine.)

- [ ] **Step 5: Commit**

```bash
git add components/PortfolioClient.tsx
git commit -m "feat(projects): add category data structures for spotlight"
```

---

### Task 2: Replace `ProjectCard` with `SpotlightShot` + `ProjectSpotlight`, and swap the section

**Files:** Modify `components/PortfolioClient.tsx`

- [ ] **Step 1: Replace the `ProjectCard` component with the two new components**

Replace the entire `ProjectCard` function (it begins at `function ProjectCard({ p }: { p: typeof PROJECTS[number] }) {` and ends at its closing `}` just before `function TestimonialCard`) with:

```tsx
function SpotlightShot({ src, alt }: { src?: string; alt: string }) {
  const [err, setErr] = useState(false)
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', border: `1px solid ${C.border}`, background: 'linear-gradient(150deg,#0e2236,#163150 60%,#0c1c2e)', display: 'flex', flexDirection: 'column' }}>
      <span style={{ position: 'absolute', top: -1, left: -1, width: 18, height: 18, borderTop: `2px solid ${C.cyan}`, borderLeft: `2px solid ${C.cyan}`, zIndex: 3, pointerEvents: 'none' }} />
      <span style={{ position: 'absolute', bottom: -1, right: -1, width: 18, height: 18, borderBottom: `2px solid ${C.pink}`, borderRight: `2px solid ${C.pink}`, zIndex: 3, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', gap: 5, padding: '9px 11px', borderBottom: `1px solid rgba(var(--cyan-rgb),.12)`, flex: '0 0 auto' }}>
        {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
      </div>
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        {src && !err && (
          <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
        )}
      </div>
    </div>
  )
}

function ProjectSpotlight({ isPhone, isCompact }: { isPhone: boolean; isCompact: boolean }) {
  const [activeSlug, setActiveSlug] = useState<string>(FLAT_SLUGS[0])
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)

  const select = (slug: string) => {
    setActiveSlug(slug)
    if (isCompact) requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const p = PROJECT_BY_SLUG[activeSlug]
  if (!p) return null
  const detail = PROJECT_DETAILS[activeSlug]
  const live = detail?.preview
  const thumb = detail?.images?.[0]?.src
  const exploreHref = p.project ?? `/projects/${p.slug}`
  const category = CATEGORY_OF.get(activeSlug) ?? ''

  return (
    <div style={{ display: 'flex', flexDirection: isCompact ? 'column' : 'row', gap: 1, background: C.border, border: `1px solid ${C.border}`, minHeight: isCompact ? 'auto' : 480 }}>
      {/* RAIL */}
      <div style={{ flex: isCompact ? '0 0 auto' : '0 0 300px', width: isCompact ? '100%' : 300, background: C.card, maxHeight: isCompact ? 'none' : 540, overflowY: isCompact ? 'visible' : 'auto' }}>
        {CATEGORIES.map(cat => {
          const items = cat.slugs.map(s => PROJECT_BY_SLUG[s]).filter(Boolean)
          if (items.length === 0) return null
          return (
            <div key={cat.label}>
              <div style={{ padding: '15px 16px 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: C.pink, opacity: .85, whiteSpace: 'nowrap' }}>{cat.label}</span>
                <span style={{ fontFamily: mono, fontSize: 8, color: C.muted, opacity: .7 }}>· {items.length}</span>
                <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(var(--pink-rgb),.4),transparent)' }} />
              </div>
              {items.map(item => {
                const on = item.slug === activeSlug
                const hasLive = Boolean(PROJECT_DETAILS[item.slug]?.preview)
                return (
                  <button key={item.slug} type="button" onClick={() => select(item.slug)}
                    style={{ width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px 9px 18px', border: 'none', borderLeft: `2px solid ${on ? C.cyan : 'transparent'}`, background: on ? 'rgba(var(--cyan-rgb),.07)' : 'transparent', color: on ? C.cyan : C.muted2, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12.5, transition: 'background .15s, color .15s, border-color .15s' }}
                    onMouseEnter={e => { if (!on) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(var(--cyan-rgb),.04)' }}
                    onMouseLeave={e => { if (!on) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}>
                    <span style={{ fontFamily: mono, fontSize: 9, color: on ? C.cyan : C.muted, opacity: .7 }}>{DISPLAY_NUM.get(item.slug)}</span>
                    <span style={{ flex: 1 }}>{item.title}</span>
                    {hasLive && <span style={{ fontSize: 7, fontFamily: mono, letterSpacing: 1, color: C.green, border: `1px solid rgba(var(--green-rgb),.4)`, padding: '1px 5px' }}>LIVE</span>}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* PANEL */}
      <div ref={panelRef} style={{ flex: 1, position: 'relative', overflow: 'hidden', background: C.bg }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeSlug}
            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : -24 }}
            transition={{ duration: .3, ease: EASE }}
            style={{ padding: isPhone ? '24px 22px' : '26px 30px', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 18, right: 26, fontFamily: mono, fontSize: isPhone ? 64 : 90, fontWeight: 900, color: C.cyan, opacity: .04, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{DISPLAY_NUM.get(activeSlug)}</div>
            <SpotlightShot src={thumb} alt={p.title} />
            <div style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: C.pink, opacity: .8 }}>{category}{live ? ' — Live Product' : ''}</div>
            <h3 style={{ margin: 0, fontFamily: mono, fontSize: isPhone ? 20 : 24, fontWeight: 900, letterSpacing: .5, lineHeight: 1.1, color: C.text }}>{p.title}</h3>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 300, color: C.muted2, lineHeight: 1.8, maxWidth: 560 }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {p.stack.map(t => <Pill key={t} label={t} />)}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
              {live && (
                <a href={live} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', padding: '10px 18px', background: C.cyan, color: '#001016', boxShadow: '0 0 18px rgba(var(--cyan-rgb),.35)' }}>Live ↗</a>
              )}
              <Link href={exploreHref}
                style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', padding: '10px 18px', border: `1px solid rgba(var(--pink-rgb),.4)`, color: C.pink }}>Explore →</Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Swap the projects section body to use `ProjectSpotlight`**

Replace this block (the grid markup inside the projects `<section>`):

```tsx
          <div className="project-grid">
            {PROJECTS.map(p => (
              <motion.div key={p.slug} variants={revealVariant} style={{ display: 'flex' }}>
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </div>
```
with:
```tsx
          <motion.div variants={revealVariant}>
            <ProjectSpotlight isPhone={isPhone} isCompact={isCompact} />
          </motion.div>
```

- [ ] **Step 3: Update the project count label to mention categories**

Replace:
```tsx
            <span style={{ fontSize: 10, letterSpacing: 2, color: C.muted }}>{`${PROJECTS.length} projects`}</span>
```
with:
```tsx
            <span style={{ fontSize: 10, letterSpacing: 2, color: C.muted }}>{`${PROJECTS.length} projects · ${CATEGORIES.length} categories`}</span>
```

- [ ] **Step 4: Verify build**

Run: `RESEND_API_KEY=re_dummy_build_only npm run build`
Expected: `✓ Compiled successfully` + full route table. `ProjectCard` is now gone and `ProjectSpotlight` is wired in.

- [ ] **Step 5: Commit**

```bash
git add components/PortfolioClient.tsx
git commit -m "feat(projects): replace card grid with categorized spotlight"
```

---

### Task 3: Remove the dead `.project-grid` CSS

**Files:** Modify `app/globals.css`

- [ ] **Step 1: Delete the project-grid rules**

Remove this block (currently at the end of the file):

```css

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

- [ ] **Step 2: Verify build + no dead references**

Run:
```bash
RESEND_API_KEY=re_dummy_build_only npm run build && \
grep -rn "project-grid\|ProjectCard" components app && echo "DEAD REFS FOUND" || echo "no dead refs"
```
Expected: build succeeds; prints `no dead refs`.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "chore(projects): remove unused project-grid styles"
```

---

### Task 4: Verification

**Files:** none (verification)

- [ ] **Step 1: Start the dev server and fetch the homepage**

```bash
PORT=3212 npm run dev > /tmp/spot-dev.log 2>&1 &
html=$(curl -s --retry 40 --retry-delay 1 --retry-connrefused --max-time 90 http://localhost:3212/)
echo "bytes: ${#html}"
```

- [ ] **Step 2: Assert the spotlight rendered correctly**

```bash
for s in "AI Web Apps" "AI Engineering" "DevOps &amp; Cloud" "Web / Full-Stack" "Mobile"; do
  printf "%-26s" "$s:"; grep -qo "$s" <<<"$html" && echo OK || echo MISSING
done
echo "QuizzYourself in default panel: $(grep -qo 'QuizzYourself' <<<"$html" && echo OK || echo MISSING)"
echo "LIVE badges (expect 4): $(grep -o '>LIVE<' <<<"$html" | wc -l)"
echo "Live ↗ button (expect 1, default panel): $(grep -o 'Live ↗' <<<"$html" | wc -l)"
echo "all 16 titles present:"
for t in QuizzYourself CookingIntelligence "AI Content Detector" BotverseHub "GPT Document Intelligence" "Email RAG Engine" "LangChain AI Application Platform" "Claude MCP Integration Platform" "Voice Revenue Copilot" "Talent Intelligence Graph" "Generative Brand Studio" "Autonomous Incident Commander" "FinOps Autopilot" "Cheatsheet" "Freelance Web Development" "Freelance Android Development"; do
  grep -qo "$t" <<<"$html" || echo "  MISSING: $t"
done
echo "(no 'MISSING' lines above = all present)"
pkill -9 -f "next-server" 2>/dev/null; pkill -9 -f "next dev" 2>/dev/null; rm -f /tmp/spot-dev.log; true
```
Expected: all five categories OK, QuizzYourself OK, 4 LIVE badges, 1 `Live ↗`, no MISSING title lines.

- [ ] **Step 3: Manual visual pass (`npm run dev`)**

Confirm in the browser, dark and light themes:
- Left rail shows 5 category headers with their projects; clicking any project swaps the right preview.
- `Live ↗` shows only on the 4 live projects and opens the right external URL in a new tab.
- Index chips run `01`–`16` down the rail in category order.
- Narrow to mobile width: rail stacks above the panel; tapping a project updates the panel below and scrolls to it.
- `prefers-reduced-motion` (DevTools → Rendering): panel swaps cross-fade with no horizontal slide.
