# Axentia.AI — Project Guide for Claude Code

This file captures the design system, color scheme, typography, layout patterns, and coding conventions for the Axentia.AI website. Follow these guidelines strictly to maintain visual and code consistency across sessions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router, Turbopack) |
| Language | TypeScript 5.x (strict mode) |
| Styling | Tailwind CSS 4.x (inline `@theme` in `globals.css`) |
| Animation | Framer Motion 12.x |
| 3D/Graphics | Three.js 0.183.2, cobe 0.6.5 |
| Icons | lucide-react 0.577.0 |
| Backend | Supabase 2.x (PostgreSQL + Auth) |
| Utilities | clsx, tailwind-merge |

---

## Color Scheme

All colors are defined via Tailwind v4 `@theme` tokens in `app/globals.css`. **Never hardcode hex values — always use Tailwind token classes.**

### Brand Palette (Purple → Pink)

| Token | Hex | Usage |
|---|---|---|
| `brand-50` | `#faf5ff` | Light backgrounds, hover tints |
| `brand-100` | `#f3e8ff` | FAQ section bg, subtle fills |
| `brand-200` | `#e9d0ff` | Borders, dividers |
| `brand-300` | `#E473BA` | Decorative accents |
| `brand-400` | `#D44DC8` | Secondary highlights |
| `brand-500` | `#C010DA` | **Primary brand color** |
| `brand-600` | `#A20EBF` | **Buttons, headings, CTAs** |
| `brand-700` | `#8929AC` | Hover states on buttons |
| `brand-800` | `#6B1D8E` | Deep accents |
| `brand-900` | `#58179B` | Darkest brand shade |

### Accent Palette (Golden Orange)

| Token | Hex | Usage |
|---|---|---|
| `accent-50` | `#fef8ec` | Light accent backgrounds |
| `accent-300` | `#F7C87A` | Soft highlights |
| `accent-500` | `#E89B3A` | **Secondary accent, badges** |
| `accent-600` | `#D08425` | Accent hover states |

### Base / Neutral Colors (Tailwind slate)

- Background: `bg-slate-50` (off-white page bg)
- Primary text: `text-slate-900`
- Secondary text: `text-slate-600`, `text-slate-400`
- Borders: `border-slate-100`, `border-slate-200`
- Dark sections: `bg-black`, `bg-slate-900`

### Common Gradient Patterns

```
text gradient (brand):    bg-gradient-to-r from-brand-600 to-pink-400 bg-clip-text text-transparent
button gradient:          bg-gradient-to-r from-brand-600 to-brand-500
footer dark bg:           bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900
hero overlay:             bg-gradient-to-b from-black/60 to-black/30
```

---

## Typography

### Fonts

Configured in `app/layout.tsx` via `next/font/google`:

```typescript
const inter = Inter({ variable: "--font-inter", weight: ["400","500","600","700","800","900"] })
const playfairDisplay = Playfair_Display({ variable: "--font-playfair", weight: ["400","700"], style: ["italic"] })
```

CSS theme mapping:
- `--font-sans` → Inter (body text, UI, labels)
- `--font-cursive` → Playfair Display (headings, decorative italic accents)

### Heading Scale

| Use | Classes |
|---|---|
| Hero H1 | `text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold` |
| Section H2 | `text-4xl md:text-5xl font-bold` |
| Subsection H2 | `text-2xl md:text-3xl font-bold` |
| Card title | `text-xl font-semibold` |
| Body | `text-base` or `text-lg` |
| Caption | `text-sm text-slate-600` |

### Decorative Text Pattern

Italicized Playfair headings often used as accent lines:
```tsx
<span className="font-cursive italic text-brand-600">Heading Word</span>
```

---

## Spacing & Layout

### Page Container

```tsx
<section className="py-16 md:py-24">
  <div className="mx-auto px-4 md:px-8 xl:px-12 max-w-7xl">
    {/* content */}
  </div>
</section>
```

### Responsive Breakpoints

Mobile-first with: `sm:` `md:` `lg:` `xl:` `2xl:`

Common patterns:
- `hidden md:block` / `md:hidden` for responsive show/hide
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for responsive grids
- `flex-col md:flex-row` for stacked → horizontal layouts

---

## Component Patterns

### Button Component (`components/ui/Button.tsx`)

Always use the custom `Button` component, never raw `<button>` with manual styles.

```tsx
// Variants
<Button variant="primary">  // brand-600 bg, white text, rounded-full
<Button variant="secondary"> // white bg, slate-900 text, shadow
<Button variant="outline">  // brand-600 border + text, brand-50 hover
<Button variant="ghost">    // transparent, slate-100 hover

// Sizes
<Button size="sm">  // h-9 px-4 text-sm
<Button size="md">  // h-11 px-8 text-base (default)
<Button size="lg">  // h-14 px-10 text-lg
```

All buttons: `rounded-full`, `focus-visible:ring-2 focus-visible:ring-brand-500`

### Glass Card Pattern

```tsx
// Light glass
<div className="glass rounded-2xl p-6">  // white/70, backdrop-blur-md
// Dark glass
<div className="glass-dark rounded-2xl p-6">  // slate-900/70, backdrop-blur-md
```

### Section Background Alternation

Pages alternate between:
1. `bg-slate-50` or `bg-white` — light sections
2. `bg-black` or `bg-slate-900` — dark sections
3. `bg-brand-50` — soft brand tint sections (e.g., FAQ)
4. Dark brand gradient — footer, CTA sections

### Animated Counter (`components/ui/AnimatedCounter.tsx`)

Scroll-triggered number animation via `IntersectionObserver`. Use for stats/metrics sections.

```tsx
<AnimatedCounter target={500} suffix="+" duration={2000} />
```

---

## Animation Conventions

All animations use **Framer Motion**. Patterns to follow:

```tsx
// Fade-up on scroll (standard entry)
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>

// Staggered children
transition={{ delay: 0.1 * index, duration: 0.4 }}

// Spring hover lift
whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
transition={{ type: "spring", stiffness: 300 }}
```

- Always use `viewport={{ once: true }}` — animations fire once on scroll into view
- Use `next/dynamic` with `{ ssr: true }` for heavy below-fold sections
- `will-change: transform` for GPU-accelerated animated elements

---

## App Router Structure

```
app/
  layout.tsx          — Root layout (fonts, NavbarWrapper, MingersFooter)
  globals.css         — All theme tokens + custom CSS
  page.tsx            — Home page (imports section components)
  programs/           — Program catalog
  about/
  faculty/
  student-life/
    page.tsx
    learning-journey/
    culture/
  enterprises/
  outcomes/
  forum/
  admin/              — Dashboard (no navbar/footer)
  auth/callback/
  api/
    subscribe/        — Email signup → Supabase
    enterprise-inquiry/ — B2B form → Supabase
  privacy/ terms/ refund/  — Policy pages

components/
  Navbar.tsx           — Fixed header with mega-menu
  MingersFooter.tsx    — Two-part footer (light + dark gradient)
  ui/
    Button.tsx
    AnimatedCounter.tsx
    FloatingLines.tsx  — WebGL animated lines (Three.js shaders)
    Globe.tsx          — cobe 3D globe

lib/
  supabase/           — Supabase client + server helpers

supabase/
  migrations/         — SQL migration files
```

### Navbar / Footer Visibility

Admin pages (`/admin`) are excluded from Navbar and Footer via `NavbarWrapper` conditional rendering.

---

## Key Design Rules

1. **Brand color is purple-pink** (`brand-600` = `#A20EBF`). Use it for primary buttons, text gradients, and CTAs. The accent gold (`accent-500`) is secondary only.
2. **Rounded-full for buttons**, `rounded-2xl` or `rounded-3xl` for cards, `rounded-xl` for smaller UI elements.
3. **Shadows follow brand hue** — use `shadow-brand-500/30` on primary buttons, not generic shadows.
4. **No shadcn/ui** — this project uses a fully custom design system. Do not install or use shadcn components.
5. **Tailwind v4** — no `tailwind.config.ts`. All custom tokens live in `globals.css` `@theme {}` block.
6. **Text justify** is the default body text alignment (`text-justify` in `@layer base`).
7. **Overflow hidden** on sections that use absolute-positioned backgrounds.
8. **Path alias**: Use `@/` to import from the project root, not relative paths.

---

## Section Component Checklist

When adding a new section, follow this pattern:

- [ ] Wrap in `<section>` with `py-16 md:py-24` and appropriate bg color
- [ ] Use container div `mx-auto px-4 md:px-8 xl:px-12`
- [ ] Add `motion.div` with `whileInView` + `viewport={{ once: true }}`
- [ ] Use `Button` component for all CTAs
- [ ] Use `font-cursive italic` for decorative heading accents
- [ ] Use brand gradient for emphasized text spans
- [ ] Test at `sm`, `md`, `lg`, `xl` breakpoints
