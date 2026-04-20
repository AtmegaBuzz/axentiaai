# Axentia.AI — Heading Style Guide

A design reference for replicating the heading patterns used across the Axentia.AI landing page.

---

## Fonts

The site uses two fonts loaded via Next.js `next/font`:

| Role | Font | Weights | CSS Variable |
|------|------|---------|--------------|
| Primary (sans) | **Inter** | 400 – 900 | `--font-inter` |
| Accent (serif) | **Playfair Display** | 400, 700 — always *italic* | `--font-playfair` |

Inter handles all body copy, navigation, buttons, and badges. Playfair Display is reserved exclusively for hero headlines and the one or two accent words inside every section heading.

---

## Color Palette (Highlights Only)

### Gold / Yellow spectrum (hero accent)

```
#F7C87A   accent-300   (light gold)
#F3B15F   accent-400   (mid gold)
#E89B3A   accent-500   (deep gold)
```

### Purple spectrum (section accent)

```
#f3e8ff   brand-100    (light tint)
#C010DA   brand-500    (primary purple)
#8A29AC   brand-700    (dark purple)
```

### Neutrals

```
#0a0a14   hero background (near-black)
#0f172a   slate-900 (heading text on light sections)
#94a3b8   slate-400 (muted body text)
#f8f6fb   light purple tint (section backgrounds)
```

---

## Heading Anatomy

Every heading on the page follows the same three-part structure:

```
┌─────────────────────────────────────┐
│  EYEBROW BADGE                      │  ← small uppercase pill
│                                     │
│  Main Heading with *accent word*    │  ← large bold + italic highlight
│                                     │
│  Subtext paragraph goes here and    │  ← muted description
│  provides supporting context.       │
└─────────────────────────────────────┘
```

---

## 1. Hero Heading (Dark Background)

**Structure:** `"Ecosystem for "` (white) + `"AI Era"` (gold gradient, italic serif)

### Main text

```css
font-family: Inter, sans-serif;
font-size: clamp(2.5rem, 6vw, 5rem);
font-weight: 700;
line-height: 0.95;
letter-spacing: -0.02em;          /* tracking-tight */
color: #ffffff;
```

### Highlighted word(s) — gold gradient

```css
font-family: 'Playfair Display', serif;
font-style: italic;
background: linear-gradient(to right, #F7C87A, #F3B15F, #E89B3A);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

Tailwind shorthand:

```html
<span class="font-[family-name:var(--font-playfair)] italic
             bg-gradient-to-r from-[#F7C87A] via-[#F3B15F] to-[#E89B3A]
             bg-clip-text text-transparent">
  AI Era
</span>
```

### Subtext

```css
font-family: Inter, sans-serif;
font-size: clamp(0.875rem, 1.2vw, 1rem);   /* text-sm → text-base */
color: rgba(255, 255, 255, 0.65);           /* text-white/65 */
line-height: 1.625;                          /* leading-relaxed */
max-width: 36rem;                            /* max-w-xl */
```

### Eyebrow badge (glass pill)

```html
<span class="bg-white/8 backdrop-blur-sm border border-white/12
             text-white/70 text-[10px] font-bold uppercase
             tracking-[0.2em] px-4 py-2 rounded-full">
  <!-- green pulse dot -->
  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
  Enterprise AI Platform
</span>
```

---

## 2. Section Headings (Light Background)

Used in: Offerings, Why Enterprises Choose, Key Differentiators, etc.

### Main text

```css
font-family: Inter, sans-serif;
font-size: clamp(1.4rem, 3vw, 2.8rem);
font-weight: 700;
line-height: 1.1;
letter-spacing: -0.02em;
color: #0f172a;                              /* slate-900 */
```

### Highlighted word(s) — purple gradient

One or two words per heading are set in italic Playfair with a purple gradient:

```css
font-family: 'Playfair Display', serif;
font-style: italic;
padding-left: 4px;                           /* slight optical spacing */
background: linear-gradient(to right, #8A29AC, #C010DA);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

Tailwind shorthand:

```html
<span class="font-[family-name:var(--font-playfair)] italic pl-[4px]
             bg-gradient-to-r from-[#8A29AC] to-[#C010DA]
             bg-clip-text text-transparent">
  alignment
</span>
```

**Examples from the site:**

| Section | Full heading | Accent word(s) |
|---------|-------------|-----------------|
| Offerings | "An ecosystem in perfect *alignment*" | alignment |
| Why Choose | "Why enterprises choose *Axentia.AI*" | Axentia.AI |
| CTA | "You're in the *right place*" | right place |

### Subtext

```css
font-family: Inter, sans-serif;
font-size: clamp(0.875rem, 1.1vw, 1.125rem); /* text-sm → text-lg */
color: #64748b;                                /* slate-500 */
line-height: 1.625;
max-width: 42rem;                              /* max-w-2xl */
```

### Eyebrow badge (light sections)

```html
<span class="text-slate-500 border border-slate-300 bg-white
             rounded-lg px-3 py-1 text-[10px] font-bold
             uppercase tracking-widest">
  Enterprise Heritage
</span>
```

---

## 3. Section Headings (Dark / SAP Purple Background)

### Eyebrow badge — gold filled

```html
<span class="inline-block px-3 py-1 rounded-md text-xs font-bold
             uppercase tracking-widest"
      style="background: #F7C87A; color: #232322;">
  Integration at the core
</span>
```

Heading and subtext follow the same rules as light sections but with inverted colors (white text on dark background).

---

## Animation Pattern

All heading elements enter with a fade-up:

```
initial:  { opacity: 0, y: 20 }
animate:  { opacity: 1, y: 0  }
duration: 0.6s
ease:     [0.16, 1, 0.3, 1]
```

Elements are staggered with 80–200 ms delays (badge → heading → subtext). Triggered once on viewport entry via `viewport={{ once: true }}`.

---

## Quick-Copy Snippet

A complete section heading block ready to drop into a new section:

```jsx
{/* Eyebrow */}
<span className="text-slate-500 border border-slate-300 bg-white
                 rounded-lg px-3 py-1 text-[10px] font-bold
                 uppercase tracking-widest">
  Section Label
</span>

{/* Heading */}
<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold
               tracking-tight leading-tight text-slate-900 mt-4">
  Your heading with{' '}
  <span className="font-[family-name:var(--font-playfair)] italic pl-[4px]
                   bg-gradient-to-r from-[#8A29AC] to-[#C010DA]
                   bg-clip-text text-transparent">
    accent word
  </span>
</h2>

{/* Subtext */}
<p className="text-sm md:text-lg text-slate-500 leading-relaxed
              max-w-2xl mt-4">
  Supporting description goes here.
</p>
```

---

## Rules of Thumb

1. **One accent word per heading** — pick the most meaningful word and make it italic Playfair with a gradient.
2. **Gold gradient on dark backgrounds, purple gradient on light backgrounds.**
3. **Eyebrow badges are always uppercase, 10 px, bold, wide-tracked** — glass style on dark, bordered on light, gold-filled on purple sections.
4. **Subtext is always muted** — `white/65` on dark, `slate-500` on light — and capped at `max-w-xl` to `max-w-2xl`.
5. **Fluid sizing with `clamp()`** — no breakpoint jumps for font sizes.
