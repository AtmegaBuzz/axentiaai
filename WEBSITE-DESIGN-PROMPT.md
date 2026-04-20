# Axentia.AI Website — Design & Development Context Prompt

Use this prompt when working with any AI tool or developer to maintain consistency across the Axentia.AI website. It captures the current state of the site, the design system, and the intended feel.

---

## Who We Are

Axentia.AI is a B2B enterprise consulting firm that helps organisations embed AI into the workflows and decisions that already run their business. We are not a SaaS product company — we are a consulting and capability-building firm, built on 25+ years of real SAP project delivery experience through our parent company, Orane Consulting. Our work spans enterprise AI transformation, SAP-integrated AI solutions, and structured academy programs for upskilling teams. We operate across India, Middle East, Africa, and South East Asia.

---

## Tech Stack

- **Framework**: Next.js (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 with custom `@theme` tokens
- **Animations**: Framer Motion 12.x (`useScroll`, `useTransform`, `useMotionValueEvent`, `AnimatePresence`, `useInView`, spring physics)
- **Icons**: Lucide React
- **Fonts**: Google Fonts via `next/font` — Inter (sans) + Playfair Display (serif/italic accents)
- **3D/Visual**: Lottie animations (`@lottiefiles/dotlottie-react`), custom WebGL FloatingLines, animated Globe component
- **Images**: `next/image` with lazy loading, Unsplash for stock, local `/public/images/` for curated assets
- **Performance**: Dynamic imports for below-fold sections, GPU-composited scroll animations via `will-change: transform`, no React state re-renders for scroll-driven motion

---

## Design System

### Color Palette

- **Brand Purple**: `#8A29AC` (dark) → `#C010DA` (primary) → `#D44DC8` (pink endpoint). Used for gradients on accent text, badges, buttons, and dividers.
- **Gold Accent**: `#F7C87A` (light) → `#F3B15F` (mid) → `#E89B3A` (deep). Used for hero italic text highlights, gold badges on dark sections, and warm accent moments.
- **Neutrals**: Slate scale — `slate-50` (#f8fafc) for light section backgrounds, `slate-900` (#0f172a) for dark text and dark sections, `slate-400`/`slate-500` for muted body text.
- **Dark Backgrounds**: `#0a0a14` or pure `black` for hero and immersive sections.
- **Light Section BG**: White (`#ffffff`) or `#f8fafc` (slate-50) or `#f8f6fb` (light purple tint).

### Typography

- **Primary (Sans)**: Inter — weights 400 through 900. Used for all body text, navigation, buttons, labels, descriptions. Variable: `--font-sans`.
- **Accent (Serif)**: Playfair Display — italic, weights 400 and 700. Used exclusively for hero headlines, section heading accent words, and italic callout phrases. Variable: `--font-playfair`. Always applied as: `font-[family-name:var(--font-playfair)] italic`.
- **Fluid Sizing**: All major headings use `clamp()` for responsive scaling. Example: `clamp(2.8rem, 8vw, 8rem)` for enterprise hero, `clamp(1.4rem, 3vw, 2.8rem)` for section headings.
- **Tracking**: Headings use `tracking-tight` or `tracking-tighter`. Eyebrow badges use `tracking-widest` or `tracking-[0.2em]`.

### Heading Badge Patterns (Consistent Across Site)

There are two badge styles used to label sections, matched to the section's background:

1. **Light sections** (white/slate-50 background): Slate pill badge — `text-slate-500 border border-slate-200 bg-slate-50 rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest`
2. **Dark/accent sections** (dark background or SAP section): Gold badge — `background: '#F7C87A', color: '#232322'`, same sizing as above.

Section headings follow the badge with a large bold heading (`text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight`) that often includes one Playfair italic phrase with a purple gradient: `bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent`.

### Glass Effects

```css
.glass { @apply bg-white/70 backdrop-blur-md border border-white/20 shadow-xl; }
.glass-dark { @apply bg-slate-900/70 backdrop-blur-md border border-white/10 shadow-xl text-white; }
```

### Card Styles

- **Standard card**: `border border-slate-200 rounded-xl p-6 md:p-8 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-300`
- **Glass card**: `bg-white/70 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl`
- **Dark card**: `bg-slate-900/70 backdrop-blur-md border border-white/10 text-white rounded-2xl`

### Buttons

- **Primary (dark)**: `bg-slate-900 text-white rounded-full px-6 py-3 font-medium hover:bg-slate-800`
- **Primary (brand)**: `bg-gradient-to-r from-brand-700 to-brand-500 text-white rounded-full`
- **Ghost/glass**: `bg-white/8 backdrop-blur-md border border-white/15 text-white rounded-full`
- **Animated border**: `.gradient-border-btn` — conic gradient border that rotates on a 4s loop using CSS `@property`

---

## Animation Philosophy

All animations serve a purpose — they guide the eye, create depth, and reinforce the premium consulting feel. Nothing is decorative for its own sake.

### Scroll-Driven Animations (GPU-Composited)
- **Parallax**: Hero sections use `useScroll` + `useTransform` to move text faster than background images. Text fades out as it scrolls away.
- **Stacking images**: Enterprise "What We Build" section renders all 6 images simultaneously. Each image slides up from bottom on scroll, stacking on top of the previous one with `box-shadow: 0 -30px 80px rgba(0,0,0,0.6)`. Uses `useTransform` mapped to scroll segments — no React state re-renders.
- **Horizontal scroll**: "How It Works" timeline maps vertical scroll progress to horizontal card translation. Progress bar fills as the user scrolls.
- **Progress indicators**: Timeline lines that fill with scroll, horizontal nav strips that translate.

### Entry Animations
- **Staggered reveals**: Cards and list items fade up (`opacity: 0, y: 30-40`) with cascading delays (`0.06s` to `0.15s` per item). Triggered by `useInView` or `whileInView` with `once: true`.
- **Spring physics**: Number circles, badges, and interactive elements use spring animations (`stiffness: 120-300, damping: 18-30`).
- **Scale pops**: Elements that need attention use `scale: 0 → 1` with spring timing.

### Looping Animations
- **Marquee**: Horizontal infinite scroll for testimonials and trust badges (30s linear).
- **Testimonial columns**: Two-column infinite vertical scroll in opposite directions (25s).
- **ShinyText**: Gold gradient sweep that loops across italic text using `backgroundPosition` animation (3s linear infinite).
- **Typewriter**: Character-by-character text reveal with blinking cursor, runs once on page load.
- **Border spin**: Conic gradient rotation on CTA buttons (4s).
- **Orbit rings, spinning gears, floating diamonds**: Decorative SVG animations on the About page.

### Timing Conventions
- Quick transitions: `0.3-0.5s` (hover states, button clicks)
- Medium reveals: `0.5-0.8s` (section entries, card reveals)
- Viewport trigger margin: `-80px` to `-100px` (triggers slightly before element is fully visible)
- Ease curve: `[0.22, 1, 0.36, 1]` for smooth deceleration, or `[0.16, 1, 0.3, 1]` for hero content

---

## Page Structure

### Homepage (`/`)

| Order | Section | Background | Layout | Key Feature |
|-------|---------|------------|--------|-------------|
| 1 | Hero | Black + video BG | Centered text, sticky 200vh | Parallax scroll, gold Playfair italic, glass pill badge |
| 2 | Why Axentia.AI | slate-50 | 2-col: text + animated globe | Floating WebGL lines, animated counters, cert badges |
| 3 | Offerings (x3) | White | Alternating 2-col image+text | Parallax images, purple gradient text, checklists |
| 4 | SAP + AI | Light purple (#f8f6fb) | Center Lottie + 4 surrounding cards | Gold badge, glass cards |
| 5 | How It Works | White | Horizontal scroll timeline | 4 steps, scroll-driven progress bar, period badges |
| 6 | Industry Use Cases | White | Horizontal carousel | 6 use cases, auto-advance, stat cards with overlays |
| 7 | Why Enterprises Choose | Light purple | 4x2 card grid | Animated counters, glass cards, gold CTA card |
| 8 | Where We Fit | White | Tab switcher (Enterprise/Talent) | Persona cards with grayscale→color hover |
| 9 | Programs | Black + image BG | Carousel with nav controls | 5 programs, dark overlay, spring-animated scroll |
| 10 | Leaders | slate-900 | 3-col grid | Grayscale photos, LinkedIn hover, gradient overlays |
| 11 | Testimonials | slate-50 | 2-col infinite scroll | Opposite-direction auto-scroll, star ratings |
| 12 | CTA | White → brand gradient | Banner with circular image | Scale animation, Playfair watermark, 3 CTA buttons |

### Enterprise Page (`/enterprises`)

| Order | Section | Background | Layout | Key Feature |
|-------|---------|------------|--------|-------------|
| 1 | Hero | Black + static image | Centered, full viewport | ShinyText gold sweep, typewriter description, scroll parallax |
| 2 | Deliverables | White | 2-col: text + tilt card | 6 checkmark outcomes, 3D mouse-tracking tilt card |
| 3 | What We Build | Dark left + image right | Sticky split, 600vh scroll | 6 stacking grayscale images, scroll-driven content swap |
| 4 | How We Engage | White | 3-col card grid | Step labels, staggered entry, clean bordered cards |
| 5 | SAP Depth | White | 2-col: text + image | Gold badge, blue accent, checklist with checks |

### About Page (`/about`)
- Decorative SVG icon system (consulting, globe, target, heart, lightbulb, shield, building, brain, SAP)
- Animated ornamental widgets: OrbitRing (20s rotation), SpinningGear, RotatingCross, FloatingDiamond

---

## Image Style

- **Hero backgrounds**: Dark, atmospheric. Either video (homepage) or high-quality static photo (enterprise). Always overlaid with dark gradients (`from-black/90 via-black/50 to-black/30`). Opacity 25-30%.
- **Section images**: Professional, real-world enterprise/business photography. Clean, well-lit. Sourced from Unsplash or custom shoots.
- **Enterprise "What We Build"**: All images rendered in `grayscale` filter for a unified, editorial look.
- **Persona/team photos**: Grayscale by default, full color on hover. 4:5 aspect ratio for team, varied for personas.
- **Program thumbnails**: Color, 440x256px, subtle hover scale (1.03x).
- **Use case cards**: Full-bleed images with dark gradient overlay, white stat panel overlaid.

---

## Brand Voice & Content Tone

- **Professional but not corporate-stiff**. We sound like senior consultants having a direct conversation, not a marketing department writing copy.
- **Outcome-focused**. We talk about what changes in how the business runs, not about technology features. "20-40% reduction in manual effort" over "AI-powered automation engine".
- **Action-oriented verbs**: "embed", "settle", "extend", "build", "move", "shape". Not passive constructions.
- **Acknowledges complexity without jargon**. We reference SAP modules (PM, FI, IBP, SuccessFactors) where relevant because our audience knows them, but we don't hide behind acronyms.
- **Consultative CTAs**: "Book a Discovery Workshop", "Schedule a Consultation", "Explore Program" — never "Buy Now" or "Get Started Free".
- **No hype**. We say "measurable, lasting change" not "revolutionary breakthrough". We say "the work extends into adjacent areas" not "unlimited scalability".

---

## The Feel We Want

Think **McKinsey/BCG/Accenture meets a modern design studio**. The site should feel like a premium consulting firm that also happens to have exceptional design taste. Specifically:

1. **Authority without arrogance**: Dark hero sections with large, confident typography establish credibility. But the content is grounded — specific numbers, named SAP modules, clear timelines ("2-3 days", "4-8 weeks").

2. **Depth through interaction**: Scroll-driven animations, parallax effects, and stacking images reward engagement. The site feels like it has layers to discover, mirroring the depth of our consulting work.

3. **Restraint in color**: The purple-and-gold palette is used sparingly. Most of the site is white/slate with purple or gold appearing only in badges, gradient text accents, and key CTAs. This creates visual hierarchy without visual noise.

4. **Editorial quality**: Playfair Display italic used for 1-2 words per heading creates a magazine/editorial feel. Grayscale photography with selective color reinforces this.

5. **Smooth, purposeful motion**: Every animation serves navigation or attention. Parallax creates depth. Staggered reveals guide reading order. Horizontal scrolls handle dense content without overwhelming. Nothing bounces or jiggles for fun.

6. **Enterprise-appropriate but not boring**: Glass effects, gradient borders, and subtle backdrop blurs add modern sophistication. But card layouts are clean, spacing is generous, and information is structured clearly.

7. **Consultative flow**: The page structure mirrors a consulting engagement — we establish credibility (hero + why us), show what we do (offerings + use cases), explain how we work (timeline + engagement model), and make it easy to start (persona matching + CTAs).

---

## What to Avoid

- Startup/SaaS aesthetic (neon gradients, floating 3D objects, "Get started free" buttons)
- Over-animation (elements that move when they don't need to, parallax on everything)
- Dense text blocks without visual structure
- Stock photos that look staged or generic
- Inconsistent badge/heading patterns across sections
- Breaking the two-font rule (Inter + Playfair only, no third font)
- Using brand purple as a background color for large areas (it's an accent, not a surface)
- Emojis, casual language, or first-person singular ("I" — we always say "we")
